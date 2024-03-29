import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { ReadOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import {
  aggregationToChartData,
  treeNodeToChartData,
} from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import EntityPage, {
  EntityDataset,
  EntityDescriptions,
  EntityStatistics,
  EntityTableMultiple,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import { Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { useStudy } from 'graphql/studies/actions';

import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';

import {
  DATA_CATEGORY_QUERY,
  DATATYPE_QUERY,
  DEMOGRAPHIC_QUERY,
  PARTICIPANT_DOWN_SYNDROME_STATUS_QUERY,
  SAMPLES_QUERY,
} from '../../graphql/summary/queries';
import useApi from '../../hooks/useApi';
import { ARRANGER_API_PROJECT_URL } from '../../provider/ApolloProvider';
import { getFlattenTree, TreeNode } from '../DataExploration/utils/OntologyTree';
import { PhenotypeStore } from '../DataExploration/utils/PhenotypeStore';

import getDataAccessDescriptions from './utils/dataAccess';
import getDatasetDescription from './utils/datasets';
import getFileTables from './utils/file';
import getSummaryDescriptions from './utils/summary';
import SummaryHeader from './SummaryHeader';

import style from './index.module.scss';

const queryId = 'include-study-repo-key';

enum SectionId {
  SUMMARY = 'summary',
  STATISTIC = 'statistic',
  DATA_ACCESS = 'data_access',
  DATA_FILE = 'data_file',
  DATASET = 'dataset',
}

const StudyEntity = () => {
  const { study_code } = useParams<{ study_code: string }>();
  const { sqon: participantSqon } = useParticipantResolvedSqon(queryId);
  const { sqon: fileSqon } = useFileResolvedSqon(queryId);

  const { data: study, loading } = useStudy({
    field: 'study_code',
    value: study_code ?? '',
  });
  const [phenotypes, setPhenotypes] = useState<any>([]);
  const [mondo, setMondo] = useState<any>([]);
  const [phenotypesLoading, setPhenotypesLoading] = useState<boolean>(true);
  const [mondoLoading, setMondoLoading] = useState<boolean>(true);

  /** We initialize here a sqon by queryBuilderId to handle actions */
  useEffect(() => {
    if (study_code) {
      addQuery({
        queryBuilderId: queryId,
        query: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'study.study_code',
              value: [study_code],
              index: INDEXES.PARTICIPANT,
            }),
          ],
        }),
        setAsActive: true,
      });
    }
  }, [study_code]);

  const sqon = {
    content: [
      {
        content: {
          field: 'study.study_code',
          index: 'participant',
          value: [study_code],
        },
        op: 'in',
      },
    ],
    op: 'and',
  } as ISyntheticSqon;

  // TODO: we should change that after phenotype store refact
  const phenotypeStore = useRef<PhenotypeStore | undefined>(new PhenotypeStore());

  useEffect(() => {
    phenotypeStore.current?.fetch({ field: 'observed_phenotype', sqon }).then(() => {
      setPhenotypesLoading(false);
      setPhenotypes(
        getFlattenTree(phenotypeStore.current?.tree as TreeNode).sort((a, b) => {
          if ((a.exactTagCount ?? 0) > (b.exactTagCount ?? 0)) {
            return -1;
          }
          if ((a.exactTagCount ?? 0) < (b.exactTagCount ?? 0)) {
            return 1;
          }
          return 0;
        }),
      );
    });
    phenotypeStore.current?.fetch({ field: 'mondo', sqon }).then(() => {
      setMondoLoading(false);
      setMondo(
        getFlattenTree(phenotypeStore.current?.tree as TreeNode).sort((a, b) => {
          if ((a.exactTagCount ?? 0) > (b.exactTagCount ?? 0)) {
            return -1;
          }
          if ((a.exactTagCount ?? 0) < (b.exactTagCount ?? 0)) {
            return 1;
          }
          return 0;
        }),
      );
    });
  }, []);

  // Demography
  const demographic = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: DEMOGRAPHIC_QUERY,
        variables: {
          sqon,
        },
      },
    },
  });

  // Data category
  const dataCategory = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: DATA_CATEGORY_QUERY,
        variables: {
          sqon,
        },
      },
    },
  });

  // Data Type
  const dataType = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: DATATYPE_QUERY,
        variables: {
          sqon,
        },
      },
    },
  });

  // down_syndrome status
  const downSyndromeStatus = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: PARTICIPANT_DOWN_SYNDROME_STATUS_QUERY,
        variables: {
          sqon,
        },
      },
    },
  });

  // sample
  const samples = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: SAMPLES_QUERY,
        variables: {
          sqon,
        },
      },
    },
  });

  const hasDataset = study?.dataset?.hits?.edges && study.dataset.hits.edges.length > 0;

  const defaultLinks = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
    { href: `#${SectionId.STATISTIC}`, title: intl.get('entities.study.statistic.title') },
  ];
  let datasetLength = 0;
  if (hasDataset) {
    defaultLinks.push(
      { href: `#${SectionId.DATA_ACCESS}`, title: intl.get('entities.study.data_access') },
      { href: `#${SectionId.DATASET}`, title: intl.get('entities.study.dataset.title') },
    );
    datasetLength = study?.dataset?.hits.edges.length || 0;
  }

  defaultLinks.push({ href: `#${SectionId.DATA_FILE}`, title: intl.get('entities.study.file') });

  return (
    <EntityPage
      links={defaultLinks}
      data={study}
      loading={loading}
      pageId="study-entity-page"
      emptyText={intl.get('no.data.available')}
    >
      <>
        <EntityTitle
          text={study?.study_name}
          icon={<ReadOutlined />}
          loading={loading}
          extra={
            <Space>
              {study && (
                <DownloadClinicalDataDropdown sqon={participantSqon} key="actionDropdown" />
              )}
              {study && (
                <DownloadFileManifestModal
                  key="download-file-manifest"
                  sqon={fileSqon}
                  type="primary"
                />
              )}
            </Space>
          }
        />

        <EntityDescriptions
          id={SectionId.SUMMARY}
          title={intl.get('global.summary')}
          header={intl.get('entities.global.summary')}
          descriptions={getSummaryDescriptions(study)}
          loading={loading}
          noDataLabel={intl.get('no.data.available')}
          subheader={<SummaryHeader study={study} />}
        />

        <EntityStatistics
          id={SectionId.STATISTIC}
          title={intl.get('entities.study.statistic.title')}
          loading={loading}
          header={intl.get('entities.study.statistic.header')}
          dictionary={{
            phenotype: {
              headerTitle: intl.get('entities.study.statistic.phenotype'),
              legendAxisLeft: intl.get('entities.study.statistic.phenotype'),
              legendAxisBottom: intl.get(
                'screen.dataExploration.tabs.summary.observed_phenotype.legendAxisBottom',
              ),
            },
            mondo: {
              headerTitle: intl.get('entities.study.statistic.mondo'),
              legendAxisLeft: intl.get('entities.study.statistic.mondo'),
              legendAxisBottom: intl.get(
                'screen.dataExploration.tabs.summary.mondo.legendAxisBottom',
              ),
            },
            demography: {
              headerTitle: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
              sexTitle: intl.get('screen.dataExploration.tabs.summary.demographic.sexTitle'),
              ethnicityTitle: intl.get(
                'screen.dataExploration.tabs.summary.demographic.ethnicityTitle',
              ),
              raceTitle: intl.get('screen.dataExploration.tabs.summary.demographic.raceTitle'),
            },
            downSyndromeStatus: {
              headerTitle: intl.get(
                'screen.dataExploration.tabs.summary.downSyndromeStatus.cardTitle',
              ),
            },
            sampleType: {
              headerTitle: intl.get('screen.dataExploration.tabs.summary.sampleType.cardTitle'),
            },
            sampleAvailability: {
              headerTitle: intl.get(
                'screen.dataExploration.tabs.summary.sampleAvailability.cardTitle',
              ),
            },
            dataCategory: {
              headerTitle: intl.get(
                'screen.dataExploration.tabs.summary.availableData.dataCategoryTitle',
              ),
              legendAxisLeft: intl.get(
                'screen.dataExploration.tabs.summary.graphs.dataCategory.legendAxisLeft',
              ),
              legendAxisBottom: intl.get(
                'screen.dataExploration.tabs.summary.graphs.dataCategory.legendAxisBottom',
              ),
            },
            dataType: {
              headerTitle: intl.get(
                'screen.dataExploration.tabs.summary.availableData.dataTypeTitle',
              ),
              legendAxisLeft: intl.get(
                'screen.dataExploration.tabs.summary.graphs.dataTypeGraph.legendAxisLeft',
              ),
              legendAxisBottom: intl.get(
                'screen.dataExploration.tabs.summary.graphs.dataTypeGraph.legendAxisBottom',
              ),
            },
          }}
          statistic={{
            phenotype: {
              loading: phenotypesLoading,
              data: treeNodeToChartData(phenotypes),
              filter: {
                total: 10,
                unique: true,
              },
            },
            mondo: {
              loading: mondoLoading,
              data: treeNodeToChartData(mondo),
              filter: {
                total: 10,
                unique: true,
                excludes: [
                  'complete trisomy 21 (MONDO:0700030)',
                  'Down syndrome (MONDO:0008608)',
                  'mosaic translocation Down syndrome (MONDO:0700129)',
                  'mosaic trisomy 21 (MONDO:0700127)',
                  'partial segmental duplication (MONDO:0700130)',
                  'translocation Down syndrome (MONDO:0700128)',
                ],
              },
            },
            demography: {
              loading: demographic.loading,
              race: aggregationToChartData(
                demographic.result?.data?.participant?.aggregations?.race?.buckets,
                demographic.result?.data?.participant?.hits?.total,
              ),
              sex: aggregationToChartData(
                demographic.result?.data?.participant?.aggregations?.sex?.buckets,
                demographic.result?.data?.participant?.hits?.total,
              ),
              ethnicity: aggregationToChartData(
                demographic.result?.data?.participant?.aggregations?.ethnicity?.buckets,
                demographic.result?.data?.participant?.hits?.total,
              ),
            },
            dataCategory: {
              loading: dataCategory.loading,
              data: aggregationToChartData(
                dataCategory.result?.data?.participant?.aggregations?.files__data_category.buckets,
              ),
              filter: {
                total: 10,
              },
            },
            dataType: {
              loading: dataType.loading,
              data: aggregationToChartData(
                dataType.result?.data?.participant?.aggregations?.files__data_type.buckets,
              ),
              filter: {
                total: 10,
              },
            },
            downSyndromeStatus: {
              loading: downSyndromeStatus.loading,
              data: aggregationToChartData(
                downSyndromeStatus.result?.data?.participant?.aggregations?.down_syndrome_status
                  ?.buckets,
                downSyndromeStatus.result?.data?.participant?.hits?.total,
              ),
            },
            sampleType: {
              loading: samples.loading,
              data: aggregationToChartData(
                samples.result?.data?.biospecimen?.aggregations?.sample_type?.buckets,
                samples.result?.data?.participant?.hits?.total,
              ),
            },
            sampleAvailability: {
              loading: samples.loading,
              data: aggregationToChartData(
                samples.result?.data?.biospecimen?.aggregations?.status?.buckets,
                samples.result?.data?.participant?.hits?.total,
              ),
            },
          }}
        />

        {hasDataset && (
          <EntityDescriptions
            descriptions={getDataAccessDescriptions(study)}
            header={intl.get('entities.study.data_access')}
            id={SectionId.DATA_ACCESS}
            loading={loading}
            noDataLabel={intl.get('no.data.available')}
            title={intl.get('entities.study.data_access')}
          />
        )}

        {hasDataset && (
          <>
            <Typography.Title level={4} className={style.datasetTitle}>
              {intl.get('entities.study.dataset.title')}
            </Typography.Title>
            {study?.dataset?.hits.edges.map(({ node: dataset }, index: number) => (
              <EntityDataset
                containerClassName={index != datasetLength - 1 ? style.datasetContainer : ''}
                descriptions={getDatasetDescription(dataset)}
                dictionnary={{
                  participants: intl.get('entities.participant.participants'),
                  files: intl.get('entities.file.files'),
                }}
                file_count={dataset?.file_count || 0}
                header={dataset?.dataset_name || ''}
                id={SectionId.DATASET}
                key={dataset?.id}
                loading={loading}
                participant_count={dataset?.participant_count || 0}
              />
            ))}
          </>
        )}

        <EntityTableMultiple
          header={intl.get('entities.study.files')}
          id={SectionId.DATA_FILE}
          loading={loading}
          tables={getFileTables(study)}
          title={intl.get('entities.study.file')}
          total={study?.file_count}
        />
      </>
    </EntityPage>
  );
};

export default StudyEntity;
