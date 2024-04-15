import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { AuditOutlined, CheckOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Tag, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
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
import { SCROLL_WRAPPER_ID } from './utils/constants';

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
  defaultOpenFacets: [
    'program',
    'domains',
    'data_category',
    'part_lifespan_stages',
    'family_data',
    'data_source',
    'study_designs',
    'is_harmonized',
    'controlled_access',
  ],
  groups: [
    {
      facets: [
        'program',
        'domains',
        'data_category',
        'part_lifespan_stages',
        'family_data',
        'data_source',
        'study_designs',
        'is_harmonized',
        'controlled_access',
      ],
    },
  ],
};

const getColumns = (): ProColumnType<any>[] => [
  {
    key: 'is_harmonized',
    iconTitle: <AuditOutlined />,
    title: intl.get('entities.study.harmonized'),
    popoverProps: {
      title: <b>{intl.get('screen.studies.harmonizedPopover.title')}</b>,
      overlayStyle: { maxWidth: '400px' },
      content: intl.get('screen.studies.harmonizedPopover.content'),
    },
    dataIndex: 'is_harmonized',
    align: 'center',
    render: (is_harmonized: boolean) =>
      is_harmonized ? (
        <Tooltip title={intl.get('entities.study.harmonized')}>
          <Tag color="green">{intl.get('entities.study.harmonizedAbrv')}</Tag>
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('entities.study.unharmonized')}>
          <Tag>{intl.get('entities.study.unharmonizedAbrv')}</Tag>
        </Tooltip>
      ),
  },
  {
    key: 'study_id',
    title: intl.get('entities.study.code'),
    dataIndex: 'study_code',
    sorter: { multiple: 1 },
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
  },
  {
    key: 'study_name',
    title: intl.get('entities.study.name'),
    width: 500,
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) => (
      <StudyPopoverRedirect
        studyId={record?.study_id}
        studyName={record?.study_name}
        text={record?.study_name}
      />
    ),
  },
  {
    key: 'program',
    title: intl.get('entities.study.program'),
    dataIndex: 'program',
    render: (program: string) => program || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'domains',
    title: intl.get('entities.study.domains'),
    dataIndex: 'domains',
    render: (domains: string[]) => {
      if (!domains || domains.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={domains}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
    width: 300,
  },
  {
    key: 'external_id',
    title: intl.get('entities.study.dbgap'),
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
    title: intl.get('entities.participant.participants'),
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
        participantCount || TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'family_count',
    title: intl.get('entities.participant.families'),
    dataIndex: 'family_count',
    sorter: { multiple: 1 },
    render: (family_count: number) =>
      family_count ? numberWithCommas(family_count) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_count',
    title: intl.get('entities.biospecimen.biospecimen'),
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
        biospecimenCount || TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'file_count',
    title: intl.get('entities.file.files'),
    sorter: { multiple: 1 },
    render: (record: IStudyEntity) => {
      const fileCount = record?.file_count || 0;

      return fileCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
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
          {numberWithCommas(fileCount)}
        </Link>
      ) : (
        fileCount || TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'genomic',
    title: intl.get('entities.study.dataCategory.genomic'),
    tooltip: intl.get('entities.study.dataCategory.genomicTooltip'),
    align: 'center',
    render: (record: IStudyEntity) => hasDataCategory(record.data_category, DataCategory.GENOMIC),
  },
  {
    key: 'transcriptomic',
    title: intl.get('entities.study.dataCategory.transcriptomic'),
    tooltip: intl.get('entities.study.dataCategory.transcriptomicTooltip'),
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.TRANSCRIPTOMIC),
  },
  {
    key: 'proteomic',
    title: intl.get('entities.study.dataCategory.proteomic'),
    tooltip: intl.get('entities.study.dataCategory.proteomicTooltip'),
    align: 'center',
    render: (record: IStudyEntity) => hasDataCategory(record.data_category, DataCategory.PROTEOMIC),
  },
  {
    key: 'immune_map',
    title: intl.get('entities.study.dataCategory.immuneMap'),
    tooltip: intl.get('entities.study.dataCategory.immuneMapTooltip'),
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.IMMUNE_MAP),
  },
  {
    key: 'metabolic',
    title: intl.get('entities.study.dataCategory.metabolomic'),
    tooltip: intl.get('entities.study.dataCategory.metabolomicTooltip'),
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.METABOLOMIC),
  },
  {
    key: 'description',
    title: intl.get('entities.study.description'),
    dataIndex: 'description',
    defaultHidden: true,
    render: (description: string) =>
      description ? (
        <Text
          style={{ width: '200px' }}
          ellipsis={{ tooltip: description }}
          className={styles.descriptionCell}
        >
          {description}
        </Text>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'part_lifespan_stages',
    title: intl.get('entities.study.participant_life_span'),
    dataIndex: 'part_lifespan_stages',
    defaultHidden: true,
    render: (part_lifespan_stages: string[]) => {
      if (!part_lifespan_stages || part_lifespan_stages.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={part_lifespan_stages}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
  },
  {
    key: 'data_source',
    title: intl.get('entities.study.data_source_table'),
    dataIndex: 'data_source',
    defaultHidden: true,
    render: (data_source: string[]) => {
      if (!data_source || data_source.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={data_source}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
  },
  {
    key: 'study_designs',
    title: intl.get('entities.study.study_designs_table'),
    dataIndex: 'study_designs',
    defaultHidden: true,
    render: (study_designs: string[]) => {
      if (!study_designs || study_designs.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={study_designs}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
  },
  {
    key: 'investigator_names',
    title: intl.get('entities.study.principal_investigator'),
    dataIndex: 'investigator_names',
    defaultHidden: true,
    render: (investigator_names: string[]) => {
      if (!investigator_names || investigator_names.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={investigator_names}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
  },
  {
    key: 'date_collection_start_year',
    title: intl.get('screen.studies.start'),
    tooltip: intl.get('entities.study.date_collection_start_year'),
    dataIndex: 'date_collection_start_year',
    defaultHidden: true,
    render: (date_collection_start_year: string) =>
      date_collection_start_year || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'date_collection_end_year',
    title: intl.get('screen.studies.end'),
    tooltip: intl.get('entities.study.date_collection_end_year'),
    dataIndex: 'date_collection_end_year',
    defaultHidden: true,
    render: (date_collection_end_year: string) =>
      date_collection_end_year || TABLE_EMPTY_PLACE_HOLDER,
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
        <PageContent defaultColumns={getColumns()} />
      </ScrollContent>
    </div>
  );
};

export default Studies;
