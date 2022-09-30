import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useStudies } from 'graphql/studies/actions';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import StudyPopoverRedirect from '../DataExploration/components/StudyPopoverRedirect';

import styles from './index.module.scss';

const { Title } = Typography;

const enum DataCategory {
  METABOLOMIC = 'Metabolomics',
  GENOMIC = 'Genomics',
  PROTEOMIC = 'Proteomics',
  TRANSCRIPTOMIC = 'Transcriptomics',
  CLINICAL = 'Clinical',
  IMMUNE_MAP = 'Immune-Map',
}

const hasDataCategory = (dataCategory: string[], category: DataCategory) =>
  dataCategory ? dataCategory.includes(category) ? <CheckOutlined /> : undefined : undefined;

const columns: ProColumnType<any>[] = [
  {
    key: 'study_id',
    title: 'Study Code',
    render: (record: IStudyEntity) => (
      <ExternalLink href={record.website}>{record.study_id}</ExternalLink>
    ),
  },
  {
    key: 'study_name',
    title: 'Name',
    width: 500,
    render: (record: IStudyEntity) => (
      <StudyPopoverRedirect
        studyId={record.study_id}
        text={record.study_name}
      ></StudyPopoverRedirect>
    ),
  },
  {
    key: 'program',
    title: 'Program',
    dataIndex: 'program',
  },
  {
    key: 'external_id',
    title: 'dbGaP',
    dataIndex: 'external_id',
    render: (external_id: string) => (
      <ExternalLink
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${external_id}`}
      >
        {external_id}
      </ExternalLink>
    ),
  },
  {
    key: 'participant_count',
    title: 'Participants',
    render: (record: IStudyEntity) => {
      const participantCount = record.participant_count;

      return participantCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_id',
                    value: [record.study_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {participantCount}
        </Link>
      ) : (
        participantCount || 0
      );
    },
  },
  {
    key: 'family_count',
    title: 'Families',
    dataIndex: 'family_count',
  },
  {
    key: 'biospecimen_count',
    title: 'Biospecimens',
    render: (record: IStudyEntity) => {
      const biospecimenCount = record.biospecimen_count;

      return biospecimenCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_id',
                    value: [record.study_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {biospecimenCount}
        </Link>
      ) : (
        biospecimenCount || 0
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
    title: 'Proteomic',
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
    title: 'Metabolomic',
    align: 'center',
    render: (record: IStudyEntity) =>
      hasDataCategory(record.data_category, DataCategory.METABOLOMIC),
  },
];

const Studies = () => {
  const { loading, data, total } = useStudies({
    sort: [
      {
        field: 'study_id',
        order: 'desc',
      },
    ],
  });

  return (
    <Space direction="vertical" size={16} className={styles.studiesWrapper}>
      <Title className={styles.title} level={4}>
        Studies
      </Title>
      <GridCard
        content={
          <ProTable
            tableId="studies"
            wrapperClassName={styles.tableWrapper}
            size="small"
            bordered
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
            headerConfig={{
              itemCount: {
                pageIndex: 1,
                pageSize: 20,
                total,
              },
            }}
            dictionary={getProTableDictionary()}
          />
        }
      />
    </Space>
  );
};

export default Studies;
