import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { InfoCircleOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
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
import { IDataType, IExperimentalStrategy } from 'graphql/studies/models';
import SummaryHeader from 'views/StudyEntity/SummaryHeader';
import { getStatisticsDictionary, queryId, SectionId } from 'views/StudyEntity/utils/constants';
import getDataAccessDescriptions from 'views/StudyEntity/utils/dataAccess';
import getDatasetDescription from 'views/StudyEntity/utils/datasets';
import getFileTable from 'views/StudyEntity/utils/file';
import getSummaryDescriptions from 'views/StudyEntity/utils/summary';
import { getLogoByStudyCode } from 'views/StudyEntity/utils/title';

import PublicLayout from 'components/PublicLayout';
import LoginModal from 'components/PublicLayout/LoginModal';
import { ArrangerApi } from 'services/api/arranger';

import ExternalLinkIcon from '../../components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from '../../utils/routes';
import { DATA_EXPLORATION_QB_ID } from '../DataExploration/utils/constant';

import { IPublicStudyEntity, IPublicStudyGraphs } from './types';
import { getFlatDataset } from './utils';

import style from './index.module.css';

const { Text, Title } = Typography;
const SCROLL_WRAPPER_ID = 'public-study-scroll-wrapper';

const hasData = (data: unknown[]) => data && data.length > 0;

// eslint-disable-next-line complexity
const PublicStudyEntity = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { study_code } = useParams<{ study_code: string }>();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [redirectUri, setRedirectUri] = useState<string>();
  const manageLoginModal = (isOpen: boolean) => setOpenLoginModal(isOpen);
  const manageRedirectUri = (uri: string) => setRedirectUri(uri);

  const [studyData, setStudyData] = useState<IPublicStudyEntity | undefined>(undefined);
  const [graphsData, setGraphsData] = useState<IPublicStudyGraphs | undefined>(undefined);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (study_code) {
        setLoadingData(true);
        const study = await ArrangerApi.fetchPublicStudy(study_code);
        const studyGraphs = await ArrangerApi.fetchPublicStudyGraphs(study_code);

        setStudyData(study.error ? undefined : study.data);
        setGraphsData(studyGraphs.error ? undefined : studyGraphs.data);
        setLoadingData(false);
      }
    };

    fetchData();
  }, [study_code]);

  const hasDataset = studyData?.datasets && studyData.datasets.length > 0;

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

  const flatDataset = getFlatDataset(studyData?.datasets);
  const hasDataAccess =
    flatDataset?.accessLimitations.size || flatDataset?.accessRequirements.size ? true : false;

  const hasFiles = (studyData?.file_count ?? 0) > 0;

  const defaultLinks = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
  ];

  const hasStatistics =
    !loadingData &&
    (hasData(aggregationToChartData(graphsData?.participant_centric?.data?.race)) ||
      hasData(aggregationToChartData(graphsData?.participant_centric?.data?.sex)) ||
      hasData(aggregationToChartData(graphsData?.participant_centric?.data?.ethnicity)) ||
      hasData(aggregationToChartData(graphsData?.participant_centric?.data?.files_data_category)) ||
      hasData(aggregationToChartData(graphsData?.participant_centric?.data?.files_data_type)) ||
      hasData(
        aggregationToChartData(graphsData?.participant_centric?.data?.down_syndrome_status),
      ) ||
      hasData(aggregationToChartData(graphsData?.biospecimens_centric?.data?.sample_type)) ||
      hasData(aggregationToChartData(graphsData?.biospecimens_centric?.data?.status)));

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
    datasetLength = studyData?.datasets?.length || 0;
  }

  const dataTypes: IDataType[] =
    studyData?.data_types?.map((type: IDataType, index) => ({
      ...type,
      key: type.id || index,
    })) || [];

  const experimentStrategies: IExperimentalStrategy[] =
    studyData?.experimental_strategies
      ?.map((strat: IExperimentalStrategy, index) => ({
        ...strat,
        key: strat.id || index,
      }))
      .filter((dateType) => dateType.file_count > 0) || [];

  if (
    hasFiles &&
    ((dataTypes && dataTypes.length > 0) ||
      (experimentStrategies && experimentStrategies.length > 0))
  ) {
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
            data={studyData}
            loading={loadingData}
            pageId="public-study-entity-page"
            emptyText={intl.get('no.data.available')}
          >
            <EntityTitleLogo
              loading={loadingData}
              logo={getLogoByStudyCode(studyData?.study_code)}
              title={studyData?.study_name}
            />

            <EntityDescriptions
              id={SectionId.SUMMARY}
              title={intl.get('global.summary')}
              header={intl.get('entities.global.summary')}
              descriptions={getSummaryDescriptions({ study: studyData, isPublic: true, dispatch })}
              loading={loadingData}
              noDataLabel={intl.get('no.data.available')}
              subheader={
                <SummaryHeader
                  study={studyData}
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
                loading={loadingData}
                header={intl.get('entities.study.statistic.header')}
                titleExtra={[
                  <Tooltip
                    title={
                      !studyData?.is_harmonized
                        ? intl.get('entities.study.unharmonizedWarningTooltip')
                        : undefined
                    }
                  >
                    <Button
                      disabled={!studyData?.is_harmonized}
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
                                value: studyData?.study_code ? [studyData.study_code] : [],
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
                dictionary={getStatisticsDictionary(studyData?.study_code)}
                statistic={{
                  demography: {
                    loading: loadingData,
                    race: aggregationToChartData(
                      graphsData?.participant_centric?.data?.race,
                      graphsData?.participant_centric?.total,
                    ),
                    sex: aggregationToChartData(
                      graphsData?.participant_centric?.data?.sex,
                      graphsData?.participant_centric?.total,
                    ),
                    ethnicity: aggregationToChartData(
                      graphsData?.participant_centric?.data?.ethnicity,
                      graphsData?.participant_centric?.total,
                    ),
                  },
                  dataCategory: {
                    loading: loadingData,
                    data: aggregationToChartData(
                      graphsData?.participant_centric?.data?.files_data_category,
                    ),
                    filter: {
                      total: 10,
                    },
                  },
                  dataType: {
                    loading: loadingData,
                    data: aggregationToChartData(
                      graphsData?.participant_centric?.data?.files_data_type,
                    ),
                    filter: {
                      total: 10,
                    },
                  },
                  downSyndromeStatus: {
                    loading: loadingData,
                    data: aggregationToChartData(
                      graphsData?.participant_centric?.data?.down_syndrome_status,
                      graphsData?.participant_centric?.total,
                    ),
                  },
                  sampleType: {
                    loading: loadingData,
                    data: aggregationToChartData(
                      graphsData?.biospecimens_centric?.data?.sample_type,
                      graphsData?.biospecimens_centric?.total,
                    ),
                  },
                  sampleAvailability: {
                    loading: loadingData,
                    data: aggregationToChartData(
                      graphsData?.biospecimens_centric?.data?.status,
                      graphsData?.biospecimens_centric?.total,
                    ),
                  },
                }}
                withDownload={false}
                withHpoMondo={false}
              />
            )}

            {hasDataAccess && (
              <EntityDescriptions
                descriptions={getDataAccessDescriptions(flatDataset)}
                header={intl.get('entities.study.data_access')}
                id={SectionId.DATA_ACCESS}
                loading={loadingData}
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
                {studyData?.datasets?.map((dataset, index: number) => {
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
                      descriptions={getDatasetDescription({ dataset, isPublic: true, dispatch })}
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
                      loading={loadingData}
                      participant_count={dataset?.expected_number_participants || 0}
                    />
                  );
                })}
              </>
            )}

            {hasFiles &&
              ((experimentStrategies && experimentStrategies.length > 0) ||
                (dataTypes && dataTypes.length > 0)) && (
                <EntityTableMultiple
                  header={intl.get('entities.study.files')}
                  id={SectionId.DATA_FILE}
                  loading={loadingData}
                  tables={getFileTable({
                    dataTypes,
                    experimentStrategies,
                    study: studyData,
                    manageLoginModal,
                    manageRedirectUri,
                    isPublicStudyEnabled: true,
                  })}
                  title={intl.get('entities.study.file')}
                  titleExtra={[
                    <Tooltip
                      title={
                        !studyData?.is_harmonized
                          ? intl.get('entities.study.unharmonizedWarningTooltip')
                          : undefined
                      }
                    >
                      <Button
                        disabled={!studyData?.is_harmonized}
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
                                  value: studyData?.study_code ? [studyData.study_code] : [],
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
                  total={studyData?.file_count}
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
