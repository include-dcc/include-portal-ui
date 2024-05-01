import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useNavigate, useParams } from 'react-router';
import { InfoCircleOutlined } from '@ant-design/icons';
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
  EntityTitleLogo,
} from '@ferlab/ui/core/pages/EntityPage';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { useStudy } from 'graphql/studies/actions';

import DownloadClinicalDataDropdown from 'components/reports/DownloadClinicalDataDropdown';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';

import ExternalLinkIcon from '../../components/Icons/ExternalLinkIcon';
import {
  DATA_CATEGORY_QUERY,
  DATATYPE_QUERY,
  DEMOGRAPHIC_QUERY,
  PARTICIPANT_DOWN_SYNDROME_STATUS_QUERY,
  SAMPLES_QUERY,
} from '../../graphql/summary/queries';
import useApi from '../../hooks/useApi';
import { ARRANGER_API_PROJECT_URL } from '../../provider/ApolloProvider';
import { STATIC_ROUTES } from '../../utils/routes';
import { DATA_EXPLORATION_QB_ID } from '../DataExploration/utils/constant';
import { getFlattenTree, TreeNode } from '../DataExploration/utils/OntologyTree';
import { PhenotypeStore } from '../DataExploration/utils/PhenotypeStore';

import getDataAccessDescriptions from './utils/dataAccess';
import getDatasetDescription from './utils/datasets';
import getFileTables from './utils/file';
import getSummaryDescriptions from './utils/summary';
import { getLogoByStudyCode } from './utils/title';
import SummaryHeader from './SummaryHeader';

import style from './index.module.scss';

const { Text, Title } = Typography;

const queryId = 'include-study-repo-key';

enum SectionId {
  SUMMARY = 'summary',
  STATISTIC = 'statistic',
  DATA_ACCESS = 'data_access',
  DATA_FILE = 'data_file',
  DATASET = 'dataset',
}

// eslint-disable-next-line complexity
const StudyEntity = () => {
  const navigate = useNavigate();
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
  const hasDataAccess =
    hasDataset || (study?.contacts?.hits?.edges && study?.contacts?.hits?.edges.length > 0);
  const hasFiles = (study?.file_count ?? 0) > 0;

  const defaultLinks = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
    { href: `#${SectionId.STATISTIC}`, title: intl.get('entities.study.statistic.title') },
  ];

  if (hasDataAccess) {
    defaultLinks.push({
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.study.data_access'),
    });
  }

  let datasetLength = 0;
  if (hasDataset) {
    defaultLinks.push({
      href: `#${SectionId.DATASET}`,
      title: intl.get('entities.study.dataset.title'),
    });
    datasetLength = study?.dataset?.hits.edges.length || 0;
  }

  if (hasFiles) {
    defaultLinks.push({ href: `#${SectionId.DATA_FILE}`, title: intl.get('entities.study.file') });
  }

  return (
    <EntityPage
      links={defaultLinks}
      data={study}
      loading={loading}
      pageId="study-entity-page"
      emptyText={intl.get('no.data.available')}
    >
      <>
        <EntityTitleLogo
          extra={
            <Space>
              {study && (
                <DownloadClinicalDataDropdown
                  sqon={participantSqon}
                  key="actionDropdown"
                  disabled={!study?.is_harmonized}
                  disabledTooltip={intl.get('entities.study.unharmonizedWarningTooltip')}
                />
              )}
              {study && (
                <DownloadFileManifestModal
                  key="download-file-manifest"
                  sqon={fileSqon}
                  type="primary"
                  isDisabled={!study?.is_harmonized}
                  disabledTooltip={intl.get('entities.study.unharmonizedWarningTooltip')}
                />
              )}
            </Space>
          }
          loading={loading}
          logo={getLogoByStudyCode(study?.study_code)}
          title={study?.study_name}
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
          titleExtra={[
            <Tooltip
              title={
                !study?.is_harmonized
                  ? intl.get('entities.study.unharmonizedWarningTooltip')
                  : undefined
              }
            >
              <Button
                disabled={!study?.is_harmonized}
                size="small"
                onClick={() => {
                  addQuery({
                    queryBuilderId: DATA_EXPLORATION_QB_ID,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'study.study_code',
                          value: study ? [study.study_code] : [],
                          index: INDEXES.STUDY,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  });
                  navigate(STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS);
                }}
              >
                {intl.get('global.viewInExploration')}
                <ExternalLinkIcon />
              </Button>
            </Tooltip>,
          ]}
          dictionary={{
            download: {
              fileNameTemplate: 'include-%name-%extra-%type-%date',
              fileNameAdditionalInfo: study?.study_code,
            },
            phenotype: {
              headerTitle: intl.get('entities.study.statistic.phenotype'),
              legendAxisLeft: intl.get(
                'screen.dataExploration.tabs.summary.observed_phenotype.legendAxisLeft',
              ),
              legendAxisBottom: intl.get(
                'screen.dataExploration.tabs.summary.observed_phenotype.legendAxisBottom',
              ),
            },
            mondo: {
              headerTitle: intl.get('entities.study.statistic.mondo'),
              legendAxisLeft: intl.get('screen.dataExploration.tabs.summary.mondo.legendAxisLeft'),
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
                excludeZeroValue: true,
                unique: true,
              },
            },
            mondo: {
              loading: mondoLoading,
              data: treeNodeToChartData(mondo),
              filter: {
                total: 10,
                unique: true,
                excludeZeroValue: true,
                excludes: [
                  'complete trisomy 21 (MONDO:0700030)',
                  'Down syndrome (MONDO:0008608)',
                  'mosaic translocation Down syndrome (MONDO:0700129)',
                  'mosaic trisomy 21 (MONDO:0700127)',
                  'partial segmental duplication (MONDO:0700130)',
                  'translocation Down syndrome (MONDO:0700128)',
                  'trisomy 21 (MONDO:0700126)',
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

        {hasDataAccess && (
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
            <Title level={4} className={style.datasetTitle}>
              {intl.get('entities.study.dataset.title')}
              <Tooltip title={intl.get('entities.study.dataset.infoTootlip')}>
                <InfoCircleOutlined className={style.datasetInfo} />
              </Tooltip>
            </Title>
            {study?.dataset?.hits.edges.map(({ node: dataset }, index: number) => (
              <EntityDataset
                containerClassName={index != datasetLength - 1 ? style.datasetContainer : ''}
                descriptions={getDatasetDescription(dataset)}
                dictionnary={{
                  participants: intl.get('entities.participant.participants'),
                  files: intl.get('entities.file.files'),
                }}
                file_count={dataset?.file_count || 0}
                header={
                  dataset?.dataset_name ? (
                    <Space size={8}>
                      <Text>{dataset.dataset_name}</Text>
                      {dataset.is_harmonized ? (
                        <Tooltip title={intl.get('entities.study.harmonizedTooltip')}>
                          <Tag color="green">{intl.get('entities.study.harmonized')}</Tag>
                        </Tooltip>
                      ) : (
                        <Tooltip title={intl.get('entities.study.unharmonizedTooltip')}>
                          <Tag>{intl.get('entities.study.unharmonized')}</Tag>
                        </Tooltip>
                      )}
                    </Space>
                  ) : (
                    ''
                  )
                }
                id={SectionId.DATASET}
                key={dataset?.id}
                loading={loading}
                participant_count={dataset?.participant_count || 0}
              />
            ))}
          </>
        )}

        {hasFiles && (
          <EntityTableMultiple
            header={intl.get('entities.study.files')}
            id={SectionId.DATA_FILE}
            loading={loading}
            tables={getFileTables(study)}
            title={intl.get('entities.study.file')}
            titleExtra={[
              <Tooltip
                title={
                  !study?.is_harmonized
                    ? intl.get('entities.study.unharmonizedWarningTooltip')
                    : undefined
                }
              >
                <Button
                  disabled={!study?.is_harmonized}
                  size="small"
                  onClick={() => {
                    addQuery({
                      queryBuilderId: DATA_EXPLORATION_QB_ID,
                      query: generateQuery({
                        newFilters: [
                          generateValueFilter({
                            field: 'study.study_code',
                            value: study ? [study.study_code] : [],
                            index: INDEXES.STUDY,
                          }),
                        ],
                      }),
                      setAsActive: true,
                    });
                    navigate(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
                  }}
                >
                  {intl.get('global.viewInExploration')}
                  <ExternalLinkIcon />
                </Button>
              </Tooltip>,
            ]}
            total={study?.file_count}
          />
        )}
      </>
    </EntityPage>
  );
};

export default StudyEntity;
