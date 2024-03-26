import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';
import { numberWithCommas } from 'utils/string';

import { FilterInfo } from '../../components/uiKit/FilterList/types';
import useGetExtendedMappings from '../../hooks/graphql/useGetExtendedMappings';
import StudyPopoverRedirect from '../DataExploration/components/StudyPopoverRedirect';

import PageContent from './components/PageContent';
import SideBarFacet from './components/SideBarFacet';
import StudySearch from './components/StudySearch';
import { SCROLL_WRAPPER_ID, STUDIES_REPO_QB_ID } from './utils/constants';

import styles from './index.module.scss';

const enum DataCategory {
  METABOLOMIC = 'Metabolomics',
  GENOMIC = 'Genomics',
  PROTEOMIC = 'Proteomics',
  TRANSCRIPTOMIC = 'Transcriptomics',
  CLINICAL = 'Clinical',
  IMMUNE_MAP = 'Immune-Map',
}

const hasDataCategory = (dataCategory: string[], category: DataCategory) =>
  dataCategory?.includes(category) ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;

const filterInfo: FilterInfo = {
  customSearches: [<StudySearch key={1} queryBuilderId={STUDIES_REPO_QB_ID} />],
  defaultOpenFacets: [
    'program',
    'domain',
    'data_category',
    'experimental_strategy',
    'part_lifespan_stage',
    'family_data',
    'data_source',
    'study_design',
    'controlled_access',
  ],
  groups: [
    {
      facets: [
        'program',
        'domain',
        'data_category',
        'experimental_strategy',
        'part_lifespan_stage',
        'family_data',
        'data_source',
        'study_design',
        'controlled_access',
      ],
    },
  ],
};

const columns: ProColumnType<any>[] = [
  {
    key: 'study_id',
    title: 'Study Code',
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) =>
      record.website ? (
        <ExternalLink href={record.website}>{record.study_code}</ExternalLink>
      ) : (
        record.study_code
      ),
  },
  {
    key: 'study_name',
    title: 'Name',
    width: 500,
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) => (
      <StudyPopoverRedirect
        studyId={record?.study_id}
        studyName={record?.study_name}
        text={record?.study_name}
      ></StudyPopoverRedirect>
    ),
  },
  {
    key: 'program',
    title: 'Program',
    dataIndex: 'program',
    render: (program: string) => program || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'external_id',
    title: 'dbGaP',
    sorter: { multiple: 1 },
    dataIndex: 'external_id',
    render: (external_id: string) =>
      external_id ? (
        <ExternalLink
          href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${external_id}`}
        >
          {external_id}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'participant_count',
    title: 'Participants',
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) => {
      const participantCount = record?.participant_count || 0;

      return participantCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study.study_code',
                    value: [record.study_code],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(participantCount)}
        </Link>
      ) : (
        participantCount
      );
    },
  },
  {
    key: 'family_count',
    title: 'Families',
    dataIndex: 'family_count',
    sorter: { multiple: 1 },
    render: (family_count: number) =>
      family_count ? numberWithCommas(family_count) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_count',
    title: 'Biospecimens',
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) => {
      const biospecimenCount = record?.biospecimen_count || 0;

      return biospecimenCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study.study_code',
                    value: [record.study_code],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(biospecimenCount)}
        </Link>
      ) : (
        biospecimenCount
      );
    },
  },
  {
    key: 'genomic',
    title: DataCategory.GENOMIC,
    align: 'center',
    render: (record: IStudyEntity) => hasDataCategory(record.data_category, DataCategory.GENOMIC),
  },
  {
    key: 'transcriptomic',
    title: DataCategory.TRANSCRIPTOMIC,
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.TRANSCRIPTOMIC),
  },
  {
    key: 'proteomic',
    title: DataCategory.PROTEOMIC,
    align: 'center',
    render: (record: IStudyEntity) => hasDataCategory(record.data_category, DataCategory.PROTEOMIC),
  },
  {
    key: 'immune_map',
    title: 'Immune Map',
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.IMMUNE_MAP),
  },
  {
    key: 'metabolic',
    title: DataCategory.METABOLOMIC,
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.METABOLOMIC),
  },
];

const Studies = () => {
  const studiesMappingResults = useGetExtendedMappings(INDEXES.STUDY);

  return (
    <div className={styles.studiesPage}>
      <SideBarFacet
        extendedMappingResults={studiesMappingResults}
        filterInfo={filterInfo}
        filterWithFooter={false}
      />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent defaultColumns={columns} extendedMappingResults={studiesMappingResults} />
      </ScrollContent>
    </div>
  );
};

export default Studies;
