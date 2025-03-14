import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree } from 'graphql/models';
import { useParticipants } from 'graphql/participants/actions';
import {
  FamilyType,
  IParticipantDiagnosis,
  IParticipantEntity,
  IParticipantObservedPhenotype,
  ITableParticipantEntity,
  Sex,
} from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';
import { capitalize } from 'lodash';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import StudyPopoverRedirect from 'views/DataExploration/components/StudyPopoverRedirect';
import {
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PARTICIPANT_QUERY_SORT,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import {
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from 'views/DataExploration/utils/helper';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import AgeCell from 'views/ParticipantEntity/AgeCell';
import { DEFAULT_OFFSET } from 'views/Variants/utils/constants';

import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.css';

interface OwnProps {
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (): ProColumnType[] => [
  {
    key: 'participant_id',
    title: intl.get('entities.participant.participant_id'),
    dataIndex: 'participant_id',
    sorter: {
      multiple: 1,
    },
    className: styles.participantIdCell,
    render: (participant_id: string) => (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}>{participant_id}</Link>
    ),
  },
  {
    key: 'study.study_code',
    title: intl.get('entities.study.study'),
    dataIndex: 'study',
    sorter: {
      multiple: 1,
    },
    className: styles.studyIdCell,
    render: (study: IStudyEntity) =>
      study?.study_id ? (
        <StudyPopoverRedirect
          studyId={study.study_id}
          studyName={study.study_name}
          text={study.study_code || ''}
        ></StudyPopoverRedirect>
      ) : study?.study_code ? (
        <Tooltip title={study?.study_name}>{study.study_code}</Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'study_external_id',
    title: intl.get('entities.participant.dbgap'),
    dataIndex: 'study_external_id',
    render: (study_external_id: string) =>
      study_external_id ? (
        <ExternalLink
          href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_external_id}`}
        >
          {study_external_id}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'down_syndrome_status',
    tooltip: intl.get('entities.participant.down_syndrome_status_tooltip'),
    title: intl.get('entities.participant.down_syndrome_status_abvr'),
    sorter: {
      multiple: 1,
    },
    dataIndex: 'down_syndrome_status',
    render: (down_syndrome_status: 'D21' | 'T21') => (
      <Tooltip title={intl.get(`facets.options.${down_syndrome_status}`)}>
        {down_syndrome_status}
      </Tooltip>
    ),
  },
  {
    key: 'sex',
    title: intl.get('entities.participant.sex'),
    dataIndex: 'sex',
    sorter: {
      multiple: 1,
    },
    render: (sex: Sex) => (
      <Tag color={sex === Sex.FEMALE ? 'magenta' : sex === Sex.MALE ? 'geekblue' : ''}>
        {capitalize(sex)}
      </Tag>
    ),
  },
  {
    key: 'race',
    title: intl.get('entities.participant.race'),
    dataIndex: 'race',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (race: string) => race || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'ethnicity',
    title: intl.get('entities.participant.ethnicity'),
    dataIndex: 'ethnicity',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (ethnicity: string) => ethnicity || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_first_patient_engagement.value',
    title: intl.get('entities.participant.age_at_first_patient_engagement'),
    tooltip: intl.get('entities.participant.age_at_first_patient_engagement_tooltip'),
    defaultHidden: true,
    render: (participant: IParticipantEntity) => (
      <AgeCell ageInDays={participant?.age_at_first_patient_engagement?.value} />
    ),
  },
  {
    key: 'external_id',
    title: intl.get('entities.participant.external_id_full'),
    dataIndex: 'external_id',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (external_id: string) => external_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'family_type',
    title: intl.get('entities.participant.family_unit'),
    dataIndex: 'family_type',
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (family_type: FamilyType) =>
      family_type ? intl.get(`entities.participant.${family_type}`) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnosis.source_text',
    title: intl.get('entities.participant.source_text'),
    defaultHidden: true,
    render: (participant: IParticipantEntity) => {
      const mondoSourceTexts = (participant.diagnosis?.hits?.edges ?? []).map(
        (m) => m.node.source_text,
      );
      const hpoSourceTexts = (participant.phenotype?.hits?.edges ?? []).map(
        (m) => m.node.source_text,
      );
      const sourceTexts = [...mondoSourceTexts, ...hpoSourceTexts];

      if (!sourceTexts || sourceTexts.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={sourceTexts}
          renderItem={(sourceText, index): React.ReactNode => <div key={index}>{sourceText}</div>}
        />
      );
    },
  },
  {
    key: 'diagnosis.mondo_display_term',
    title: intl.get('entities.participant.mondo_diagnosis'),
    dataIndex: 'diagnosis',
    className: styles.diagnosisCell,
    render: (mondo: ArrangerResultsTree<IParticipantDiagnosis>) => {
      const mondoNames = mondo?.hits?.edges.map((m) => m.node.mondo_display_term);

      if (!mondoNames || mondoNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={mondoNames}
          renderItem={(mondo_id, index): React.ReactNode => {
            const mondoInfo = extractMondoTitleAndCode(mondo_id);

            return mondoInfo ? (
              <div key={index}>
                {capitalize(mondoInfo.title)} (MONDO:{' '}
                <ExternalLink href={`http://purl.obolibrary.org/obo/MONDO_${mondoInfo.code}`}>
                  {mondoInfo.code}
                </ExternalLink>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'phenotype.hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype_hpo'),
    dataIndex: 'observed_phenotype',
    className: styles.phenotypeCell,
    render: (observed_phenotype: ArrangerResultsTree<IParticipantObservedPhenotype>) => {
      const phenotypeNames = observed_phenotype?.hits?.edges
        .filter((p) => p.node.is_tagged)
        .map((p) => p.node.name);

      if (!phenotypeNames || phenotypeNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={phenotypeNames}
          renderItem={(hpo_id_phenotype, index): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_id_phenotype);

            return phenotypeInfo ? (
              <div key={index}>
                {capitalize(phenotypeInfo.title)} (HP:{' '}
                <ExternalLink href={`http://purl.obolibrary.org/obo/HP_${phenotypeInfo.code}`}>
                  {phenotypeInfo.code}
                </ExternalLink>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: intl.get('entities.participant.biospecimens'),
    sorter: {
      multiple: 1,
    },
    render: (record: ITableParticipantEntity) => {
      const nb_biospecimens = record?.nb_biospecimens || 0;

      return nb_biospecimens ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [record.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(nb_biospecimens)}
        </Link>
      ) : (
        nb_biospecimens
      );
    },
  },
  {
    key: 'nb_files',
    title: intl.get('entities.participant.files'),
    sorter: {
      multiple: 1,
    },
    render: (record: ITableParticipantEntity) => {
      const nb_files = record?.nb_files || 0;

      return nb_files ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [record.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(nb_files)}
        </Link>
      ) : (
        nb_files
      );
    },
  },
];

const ParticipantsTab = ({ sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_PARTICIPANT_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useParticipants(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_PARTICIPANT_QUERY_SORT,
        field: 'participant_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateSelectionSqon(TAB_IDS.PARTICIPANTS, selectedKeys);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_PARTICIPANT_QUERY_SORT,
        size:
          userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery ||
          DEFAULT_PAGE_SIZE,
      },
      setQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    if (queryConfig.firstPageFlag !== undefined || queryConfig.searchAfter === undefined) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <ProTable<ITableParticipantEntity>
      tableId="participants_table"
      columns={getDefaultColumns()}
      wrapperClassName={styles.participantTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.participants?.columns}
      enableRowSelection={true}
      showSorterTooltip={false}
      initialSelectedKey={selectedKeys}
      onChange={(_pagination, _filter, sorter) => {
        setPageIndex(DEFAULT_PAGE_INDEX);
        setQueryConfig({
          pageIndex: DEFAULT_PAGE_INDEX,
          size: queryConfig.size!,
          sort: formatQuerySortList(sorter),
        });
      }}
      headerConfig={{
        itemCount: {
          pageIndex: pageIndex,
          pageSize: queryConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        enableTableExport: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  participants: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.participants?.columns,
              columns: getDefaultColumns(),
              index: INDEXES.PARTICIPANT,
              sqon: getCurrentSqon(),
            }),
          ),
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        extra: [
          <SetsManagementDropdown
            idField="fhir_id"
            key="setManagementDropdown"
            results={results}
            selectedKeys={selectedKeys}
            selectedAllResults={selectedAllResults}
            sqon={getCurrentSqon()}
            type={SetType.PARTICIPANT}
          />,
          <DownloadClinicalDataDropdown
            sqon={getCurrentSqon()}
            participantIds={selectedKeys}
            key="actionDropdown"
          />,
        ],
      }}
      bordered
      size="small"
      pagination={{
        current: pageIndex,
        queryConfig,
        setQueryConfig,
        onChange: (page: number) => {
          scrollToTop(SCROLL_WRAPPER_ID);
          setPageIndex(page);
        },
        searchAfter: results.searchAfter,
        onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  participants: {
                    ...userInfo?.config.data_exploration?.tables?.participants,
                    viewPerQuery,
                  },
                },
              },
            }),
          );
        },
        defaultViewPerQuery: queryConfig.size,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.participant_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default ParticipantsTab;
