import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';
import { useLocation, useParams } from 'react-router';
import { InfoCircleOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import EntityPage, {
  EntityDataset,
  EntityDescriptions,
  EntityStatistics,
  EntityTableMultiple,
  EntityTitleLogo,
} from '@ferlab/ui/core/pages/EntityPage';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import SummaryHeader from 'views/StudyEntity/SummaryHeader';
import { getStatisticsDictionary, queryId, SectionId } from 'views/StudyEntity/utils/constants';
import getDataAccessDescriptions, { getFlatDataset } from 'views/StudyEntity/utils/dataAccess';
import getDatasetDescription from 'views/StudyEntity/utils/datasets';
import getFileTable from 'views/StudyEntity/utils/file';
import getSummaryDescriptions from 'views/StudyEntity/utils/summary';
import { getLogoByStudyCode } from 'views/StudyEntity/utils/title';

import PublicLayout from 'components/PublicLayout';
import LoginModal from 'components/PublicLayout/LoginModal';

import ExternalLinkIcon from '../../components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from '../../utils/routes';
import { DATA_EXPLORATION_QB_ID } from '../DataExploration/utils/constant';

import { mockPublicStudyEntity } from './mock';
import { mockGraph, mockMondo, mockPhenotypes } from './mockGraph';

import style from './index.module.css';

const { Text, Title } = Typography;
const SCROLL_WRAPPER_ID = 'public-study-scroll-wrapper';

const hasData = (data: unknown[]) => data && data.length > 0;

// eslint-disable-next-line complexity
const PublicStudyEntity = () => {
  const location = useLocation();
  const { study_code } = useParams<{ study_code: string }>();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [redirectUri, setRedirectUri] = useState<string>();
  const manageLoginModal = (isOpen: boolean) => setOpenLoginModal(isOpen);
  const manageRedirectUri = (uri: string) => setRedirectUri(uri);

  // TODO block by SJIP-1373 backend
  const study = mockPublicStudyEntity;
  const loading = false;
  const graphs = mockGraph;
  const graphLoading = false;
  const phenotypes = mockPhenotypes;
  const phenotypesLoading = false;
  const mondo = mockMondo;
  const mondoLoading = false;

  const hasDataset = study?.datasets?.hits?.edges && study.datasets.hits.edges.length > 0;

  useEffect(() => {
    const params = new URLSearchParams(location.hash.substring(1));
    const dataset_id = params.get('dataset_id');
    if (hasDataset && dataset_id)
      setTimeout(() => {
        document
          .getElementById(dataset_id)
          ?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
      }, 100);
  }, [hasDataset, location.hash]);

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

  const flatDataset = getFlatDataset(study?.datasets);
  const hasDataAccess =
    flatDataset?.accessLimitations.size || flatDataset?.accessRequirements.size ? true : false;

  const hasFiles = (study?.file_count ?? 0) > 0;

  const defaultLinks = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
  ];

  const hasStatistics =
    !loading &&
    (hasData(phenotypes) ||
      hasData(mondo) ||
      hasData(aggregationToChartData(graphs?.demographic?.race)) ||
      hasData(aggregationToChartData(graphs?.demographic?.sex)) ||
      hasData(aggregationToChartData(graphs?.demographic?.ethnicity)) ||
      hasData(aggregationToChartData(graphs?.files_data_category?.data)) ||
      hasData(aggregationToChartData(graphs?.files_data_type?.data)) ||
      hasData(aggregationToChartData(graphs?.down_syndrome_status?.data)) ||
      hasData(aggregationToChartData(graphs?.samples?.sample_type)) ||
      hasData(aggregationToChartData(graphs?.samples?.status)));

  if (hasStatistics) {
    defaultLinks.push({
      href: `#${SectionId.STATISTIC}`,
      title: intl.get('entities.study.statistic.title'),
    });
  }

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
    datasetLength = study?.datasets?.hits.edges.length || 0;
  }

  const dataTypes = hydrateResults(study?.data_types?.hits?.edges || []).filter(
    (dateType) => dateType.file_count > 0,
  );
  const experimentStrategies = hydrateResults(
    study?.experimental_strategies?.hits?.edges || [],
  ).filter((dateType) => dateType.file_count > 0);

  if (hasFiles && (dataTypes.length > 0 || experimentStrategies.length > 0)) {
    defaultLinks.push({ href: `#${SectionId.DATA_FILE}`, title: intl.get('entities.study.file') });
  }

  return (
    <PublicLayout>
      <div className={style.studyPage}>
        <Helmet>
          <title>INCLUDE Data Hub - {study_code}</title>
        </Helmet>
        <ScrollContent id={SCROLL_WRAPPER_ID} className={style.scrollContent}>
          <EntityPage
            links={defaultLinks}
            data={study}
            loading={loading}
            pageId="public-study-entity-page"
            emptyText={intl.get('no.data.available')}
          >
            <EntityTitleLogo
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
              subheader={
                <SummaryHeader
                  study={study}
                  manageLoginModal={manageLoginModal}
                  manageRedirectUri={manageRedirectUri}
                  isPublicStudyEnabled={true}
                />
              }
            />

            {hasStatistics && (
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
                      onClick={(event) => {
                        event.stopPropagation();
                        manageRedirectUri(STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS);
                        manageLoginModal(true);
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
                      }}
                    >
                      {intl.get('global.viewInExploration')}
                      <ExternalLinkIcon />
                    </Button>
                  </Tooltip>,
                ]}
                dictionary={getStatisticsDictionary(study?.study_code)}
                statistic={{
                  phenotype: {
                    loading: phenotypesLoading,
                    data: phenotypes,
                    filter: {
                      total: 10,
                      excludeZeroValue: true,
                      unique: true,
                    },
                  },
                  mondo: {
                    loading: mondoLoading,
                    data: mondo,
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
                    loading: graphLoading,
                    race: aggregationToChartData(
                      graphs?.demographic?.race,
                      graphs?.demographic?.totalParticipant,
                    ),
                    sex: aggregationToChartData(
                      graphs?.demographic?.sex,
                      graphs?.demographic?.totalParticipant,
                    ),
                    ethnicity: aggregationToChartData(
                      graphs?.demographic?.ethnicity,
                      graphs?.demographic?.totalParticipant,
                    ),
                  },
                  dataCategory: {
                    loading: graphLoading,
                    data: aggregationToChartData(graphs?.files_data_category?.data),
                    filter: {
                      total: 10,
                    },
                  },
                  dataType: {
                    loading: graphLoading,
                    data: aggregationToChartData(graphs?.files_data_type?.data),
                    filter: {
                      total: 10,
                    },
                  },
                  downSyndromeStatus: {
                    loading: graphLoading,
                    data: aggregationToChartData(
                      graphs?.down_syndrome_status?.data,
                      graphs?.down_syndrome_status?.totalParticipant,
                    ),
                  },
                  sampleType: {
                    loading: graphLoading,
                    data: aggregationToChartData(
                      graphs?.samples?.sample_type,
                      graphs?.samples?.totalBiospecimen,
                    ),
                  },
                  sampleAvailability: {
                    loading: graphLoading,
                    data: aggregationToChartData(
                      graphs?.samples?.status,
                      graphs?.samples?.totalBiospecimen,
                    ),
                  },
                }}
                withDownload={false}
              />
            )}

            {hasDataAccess && (
              <EntityDescriptions
                descriptions={getDataAccessDescriptions(flatDataset)}
                header={intl.get('entities.study.data_access')}
                id={SectionId.DATA_ACCESS}
                loading={loading}
                noDataLabel={intl.get('no.data.available')}
                title={intl.get('entities.study.data_access')}
              />
            )}

            {hasDataset && (
              <>
                <Title level={4} className={style.datasetTitle} id={SectionId.DATASET}>
                  {intl.get('entities.study.dataset.title')}
                  <Tooltip title={intl.get('entities.study.dataset.infoTootlip')}>
                    <InfoCircleOutlined className={style.datasetInfo} />
                  </Tooltip>
                </Title>
                {study?.datasets?.hits.edges.map(({ node: dataset }, index: number) => {
                  const titleExtra = [];

                  if (dataset.dataset_name && dataset.is_harmonized) {
                    titleExtra.push(
                      <Button
                        className={style.datasetBtn}
                        onClick={(event) => {
                          event.stopPropagation();
                          manageRedirectUri(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
                          manageLoginModal(true);

                          addQuery({
                            queryBuilderId: DATA_EXPLORATION_QB_ID,
                            query: generateQuery({
                              newFilters: [
                                generateValueFilter({
                                  field: 'dataset_names',
                                  index: INDEXES.FILE,
                                  value: [dataset.dataset_name!],
                                }),
                              ],
                            }),
                            setAsActive: true,
                          });
                        }}
                        size="small"
                      >
                        {intl.get('global.viewInExploration')}
                        <ExternalLinkIcon />
                      </Button>,
                    );
                  }

                  return (
                    <EntityDataset
                      containerClassName={index != datasetLength - 1 ? style.datasetContainer : ''}
                      descriptions={getDatasetDescription(dataset)}
                      dictionnary={{
                        participants: intl.get('entities.participant.participants'),
                        files: intl.get('entities.file.files'),
                      }}
                      file_count={dataset?.expected_number_of_files || 0}
                      titleExtra={titleExtra}
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
                      id={dataset?.external_dataset_id || SectionId.DATASET}
                      key={dataset?.id}
                      loading={loading}
                      participant_count={dataset?.expected_number_participants || 0}
                    />
                  );
                })}
              </>
            )}

            {hasFiles && (experimentStrategies.length > 0 || dataTypes.length > 0) && (
              <EntityTableMultiple
                header={intl.get('entities.study.files')}
                id={SectionId.DATA_FILE}
                loading={loading}
                tables={getFileTable({
                  dataTypes,
                  experimentStrategies,
                  study,
                  manageLoginModal,
                  manageRedirectUri,
                  isPublicStudyEnabled: true,
                })}
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
                      onClick={(event) => {
                        event.stopPropagation();
                        manageRedirectUri(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
                        manageLoginModal(true);
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
          </EntityPage>
        </ScrollContent>
        {openLoginModal && (
          <LoginModal
            isOpen={openLoginModal}
            onClose={() => manageLoginModal(false)}
            redirectUri={redirectUri}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default PublicStudyEntity;
