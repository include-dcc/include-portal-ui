import intl from 'react-intl-universal';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { termToSqon } from '@ferlab/ui/core/data/sqon/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Modal } from 'antd';
import { IFileEntity, IFileResultTree, IFileStudyEntity } from 'graphql/files/models';
import { SEARCH_FILES_QUERY } from 'graphql/files/queries';
import { hydrateResults } from 'graphql/models';
import { toNodes } from 'graphql/utils/helpers';
import EnvironmentVariables from 'helpers/EnvVariables';
import { chunk, isEmpty } from 'lodash';
import { CAVATICA_FILE_BATCH_SIZE } from 'views/DataExploration/utils/constant';

import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';
import { ArrangerApi } from 'services/api/arranger';
import { CavaticaApi } from 'services/api/cavatica';
import {
  CAVATICA_TYPE,
  ICavaticaBillingGroup,
  ICavaticaCreateProjectBody,
  ICavaticaDRSImportItem,
  ICavaticaProject,
} from 'services/api/cavatica/models';
import { globalActions } from 'store/global';
import { RootState } from 'store/types';
import { handleThunkApiReponse } from 'store/utils';
import { userHasAccessToFile } from 'utils/dataFiles';
import { keepOnly } from 'utils/helper';

import { makeUniqueWords as unique } from '../../helpers';

import { IBulkImportData, ICavaticaTreeNode, TCavaticaProjectWithMembers } from './types';

const BATCH_SIZE = 100;
const USER_BASE_URL = EnvironmentVariables.configFor('CAVATICA_USER_BASE_URL');

const fetchAllProjects = createAsyncThunk<
  TCavaticaProjectWithMembers[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/projects',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchProjects();
    const projects = data?.items || [];

    if (error) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('api.cavatica.error.title'),
          description: intl.get('api.cavatica.error.projects.fetch'),
        }),
      );
      return thunkAPI.rejectWithValue(error.message);
    }

    const projectList = await Promise.all(
      (projects || []).map(async (project) => {
        const [memberResponse] = await Promise.all([CavaticaApi.fetchProjetMembers(project.id)]);

        return { ...project, memberCount: memberResponse.data?.items.length || 0 };
      }),
    );

    return projectList;
  },
  {
    condition: (_, { getState }) => {
      const { fenceCavatica } = getState();

      return isEmpty(fenceCavatica.projects);
    },
  },
);

const beginAnalyse = createAsyncThunk<
  IBulkImportData,
  {
    sqon: ISqonGroupFilter;
    fileIds: string[];
  },
  { rejectValue: string; state: RootState }
>('cavatica/begin/analyse', async (args, thunkAPI) => {
  const { fenceConnection } = thunkAPI.getState();
  const allFencesAcls = Object.values(fenceConnection.fencesAcls).flat();

  const sqon: ISqonGroupFilter = {
    op: BooleanOperators.and,
    content: [args.sqon],
  };

  if (args.fileIds.length > 0) {
    sqon.content = [
      ...sqon.content,
      termToSqon({
        field: 'file_id',
        value: args.fileIds,
      }),
    ];
  }

  const { data, error } = await ArrangerApi.graphqlRequest<{ data: IFileResultTree }>({
    query: SEARCH_FILES_QUERY.loc?.source.body,
    variables: {
      sqon,
      first: CAVATICA_FILE_BATCH_SIZE,
    },
  });

  if (error) {
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('api.cavatica.error.title'),
        description: intl.get('api.cavatica.error.bulk.fetchFiles'),
      }),
    );
    return thunkAPI.rejectWithValue(error.message);
  }

  const {
    data: { file },
  } = data!;

  const files = hydrateResults(file?.hits?.edges || []);

  const authorizedFiles = getAuthorizedFiles(
    allFencesAcls,
    files,
    fenceConnection.connectionStatus.cavatica === FENCE_CONNECTION_STATUSES.connected,
    fenceConnection.connectionStatus.gen3 === FENCE_CONNECTION_STATUSES.connected,
  );

  if (!authorizedFiles.length) {
    Modal.error({
      type: 'error',
      title: intl.get('api.cavatica.error.fileAuth.title'),
      content: intl.get('api.cavatica.error.fileAuth.description'),
    });
    return thunkAPI.rejectWithValue('0 authorized files');
  }

  return {
    files,
    authorizedFiles,
  };
});

const fetchAllBillingGroups = createAsyncThunk<
  ICavaticaBillingGroup[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/billingGroups',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchBillingGroups();

    return handleThunkApiReponse({
      error,
      data: data?.items || [],
      reject: thunkAPI.rejectWithValue,
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('api.cavatica.error.title'),
            description: intl.get('api.cavatica.error.billingGroups.fetch'),
          }),
        ),
    });
  },
  {
    condition: (_, { getState }) => {
      const { fenceCavatica } = getState();

      return isEmpty(fenceCavatica.billingGroups);
    },
  },
);

const createProjet = createAsyncThunk<
  {
    isAnalyseModalVisible: boolean;
    newProject: ICavaticaProject;
  },
  {
    openAnalyseModalOnDone?: boolean;
    showSuccessNotification?: boolean;
    showErrorNotification?: boolean;
    body: ICavaticaCreateProjectBody;
  },
  { rejectValue: string; state: RootState }
>('cavatica/create/project', async (args, thunkAPI) => {
  const { data, error } = await CavaticaApi.createProject(args.body);

  return handleThunkApiReponse({
    error,
    reject: thunkAPI.rejectWithValue,
    onError: () => {
      if (args.showErrorNotification) {
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('api.cavatica.error.title'),
            description: intl.get('api.cavatica.error.projects.create'),
          }),
        );
      }
    },
    onSuccess: () => {
      if (args.showSuccessNotification) {
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'success',
            message: intl.get('api.cavatica.success.title'),
            description: intl.get('api.cavatica.success.projects.create'),
          }),
        );
      }
    },
    data: {
      isAnalyseModalVisible: args.openAnalyseModalOnDone || false,
      newProject: data!,
    },
  });
});

const joinUniquely = (l: string[]) => unique(l).join(',');

const extractFileMetaData = (file: IFileEntity) => ({
  fhir_document_reference: file.fhir_document_reference,
  file_id: file.file_id,
  external_file_id: file.external_id,
  file_name: file.file_name,
  data_category: file.data_category,
  data_type: file.data_type,
  file_format: file.file_format,
  repository: file.repository,
  acl: joinUniquely(file.acl),
  access_url: file.access_urls,
});

const extractParticipantMetaData = (participants: any[]) => {
  const diagnosis = participants.flatMap((participant) => toNodes(participant.diagnosis));
  const outcomes = participants.flatMap((participant) => toNodes(participant.outcomes));
  const phenotype = participants.flatMap((participant) => toNodes(participant.phenotype));
  const relation = participants.flatMap((participant) =>
    participant.family ? toNodes(participant.family.relations_to_proband) : '',
  );

  return {
    participant_ids: joinUniquely(participants.map((x) => x.participant_id)),
    external_participant_ids: joinUniquely(participants.map((x) => x.external_id)),
    down_syndrom_status: joinUniquely(participants.map((x) => x.down_syndrome_status)),
    ethnicity: joinUniquely(participants.map((x) => x.ethnicity)),
    sex: joinUniquely(participants.map((x) => x.sex)),
    race: joinUniquely(participants.map((x) => x.race)),
    age_at_diagnosis: joinUniquely(diagnosis.map((d) => d.age_at_event_days)),
    age_at_vital_status: joinUniquely(outcomes.map((o) => o.age_at_event_days.value)),
    age_at_phenotype_assignment: joinUniquely(phenotype.map((p) => p.age_at_event_days)),
    diagnosis_mondo: joinUniquely(diagnosis.map((d) => d.mondo_id_diagnosis)),
    condition_source_text: joinUniquely(diagnosis.map((d) => d.source_text)),
    family_id: joinUniquely(participants.map((x) => x.families_id)),
    family_unit: joinUniquely(participants.map((x) => x.family_type)),
    family_role: joinUniquely(relation.map((r) => r.role)),
    observed_phenotype_hpo: joinUniquely(phenotype.map((p) => p.hpo_phenotype_observed)),
    vital_status: joinUniquely(outcomes.map((o) => o.vital_status)),
  };
};

const extractBioSpecimenMetaData = (biospecimens: any[]) => ({
  sample_id: joinUniquely(biospecimens.map((x) => x.sample_id)),
  sample_type: joinUniquely(biospecimens.map((x) => x.sample_type)),
  collection_id: joinUniquely(biospecimens.map((x) => x.collection_sample_id)),
  collection_sample_type: joinUniquely(biospecimens.map((x) => x.collection_sample_type)),
  external_sample_id: joinUniquely(biospecimens.map((x) => x.external_sample_id)),
  parent_sample_id: joinUniquely(biospecimens.map((x) => x.parent_sample_id)),
  parent_sample_type: joinUniquely(biospecimens.map((x) => x.parent_sample_type)),
  biospecimen_storage: joinUniquely(biospecimens.map((x) => x.biospecimen_storage)),
  container_id: joinUniquely(biospecimens.map((x) => x.container_id)),
  laboratory_procedure: joinUniquely(biospecimens.map((x) => x.laboratory_procedure)),
  volume_unit: joinUniquely(biospecimens.map((x) => x.volume_unit)),
  volume: joinUniquely(biospecimens.map((x) => x.volume)),
  age_at_biospecimen_collection: joinUniquely(
    biospecimens.map((x) => x.age_at_biospecimen_collection),
  ),
  sample_availability: joinUniquely(biospecimens.map((x) => x.status)),
  external_parent_sample_id: joinUniquely(biospecimens.map((x) => x.external_parent_sample_id)),
  external_collection_sample_id: joinUniquely(
    biospecimens.map((x) => x.external_collection_sample_id),
  ),
  external_container_id: joinUniquely(biospecimens.map((x) => x.external_container_id)),
});

const extractSequentialExperimentMetaData = (sequentialExperiments: any[]) => ({
  experimental_strategy: joinUniquely(sequentialExperiments.map((x) => x.experiment_strategy)),
});

const extractStudyMetaData = (study: IFileStudyEntity) => ({
  investigation: study.study_code,
  study_name: study.study_name,
  study_program: study.program,
  study_domain: study.domain,
});

export const extractMetadata = (file: IFileEntity) => {
  if (!file || !Object.keys(file).length) {
    return {};
  }

  const sequentialExperiments = toNodes(file.sequencing_experiment);
  const participants = toNodes(file.participants);
  const biospecimens = participants.flatMap((participant) => toNodes(participant.biospecimens));

  const fileMetaData = extractFileMetaData(file);
  const participantsMetaData = extractParticipantMetaData(participants);
  const biospecimensMetaData = extractBioSpecimenMetaData(biospecimens);
  const sequentialExperimentsMetaData = extractSequentialExperimentMetaData(sequentialExperiments);
  const studyMetaData = extractStudyMetaData(file.study);

  return keepOnly({
    ...fileMetaData,
    ...participantsMetaData,
    ...biospecimensMetaData,
    ...sequentialExperimentsMetaData,
    ...studyMetaData,
    reference_genome: null,
  });
};

const startBulkImportJob = createAsyncThunk<
  any,
  ICavaticaTreeNode,
  { rejectValue: string; state: RootState }
>('cavatica/bulk/import', async (node, thunkAPI) => {
  const { fenceCavatica } = thunkAPI.getState();
  const selectedFiles = fenceCavatica.bulkImportData.authorizedFiles;
  const isProject = node.type === CAVATICA_TYPE.PROJECT;

  const indexFileDrsItems: ICavaticaDRSImportItem[] = [];
  const cavaticaDrsItems: ICavaticaDRSImportItem[] = selectedFiles.map((file) => {
    const destKey = isProject ? 'project' : 'parent';

    if (file.index) {
      indexFileDrsItems.push({
        drs_uri: file.index.urls,
        name: file.index.file_name,
        [destKey]: node.id,
      });
    }

    return {
      drs_uri: file.access_urls,
      name: file.file_name,
      [destKey]: node.id,
      metadata: extractMetadata(file),
    };
  });

  const drsItems = cavaticaDrsItems.concat(indexFileDrsItems);
  const itemsChunks = chunk(drsItems, BATCH_SIZE);

  const responses = await Promise.all(
    itemsChunks.map((itemsChunk) => CavaticaApi.startBulkDrsImportJob({ items: itemsChunk })),
  );
  const responseWithError = responses.find((resp) => !!resp.error);

  return handleThunkApiReponse({
    error: responseWithError?.error,
    data: true,
    reject: thunkAPI.rejectWithValue,
    onError: () =>
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('api.cavatica.error.title'),
          description: intl.get('api.cavatica.error.bulk.import'),
        }),
      ),
    onSuccess: () =>
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'success',
          message: intl.get('api.cavatica.success.title'),
          description: (
            <div>
              {intl.getHTML('api.cavatica.success.bulk.import.copySuccess', {
                destination: node.title,
              })}
              <br />
              <br />
              {intl.get('api.cavatica.success.bulk.import.possibleDelays')}
              <br />
              <br />
              <a
                href={`${USER_BASE_URL}${isProject ? node.id : node.project!}`}
                style={{ color: 'unset', textDecoration: 'underline' }}
                rel="noreferrer"
                target="_blank"
              >
                {intl.get('api.cavatica.success.bulk.import.openProject')}
              </a>
            </div>
          ),
          duration: 5,
        }),
      ),
  });
});

const getAuthorizedFiles = (
  userAcls: string[],
  files: IFileEntity[],
  isConnectedToCavatica: boolean,
  isConnectedToGen3: boolean,
) =>
  files.filter((file) =>
    userHasAccessToFile(file, userAcls, isConnectedToCavatica, isConnectedToGen3),
  );

export { fetchAllProjects, fetchAllBillingGroups, createProjet, beginAnalyse, startBulkImportJob };
