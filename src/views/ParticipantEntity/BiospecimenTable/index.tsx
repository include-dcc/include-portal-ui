import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { DownloadOutlined } from '@ant-design/icons';
import RequestBiospecimenButton from '@ferlab/ui/core/components/BiospecimenRequest/RequestBiospecimenButton';
import { generateColumnState } from '@ferlab/ui/core/components/ProTable';
import ColumnSelector from '@ferlab/ui/core/components/ProTable/ColumnSelector';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityCustomContent } from '@ferlab/ui/core/pages/EntityPage';
import { Button, Space, Tabs, Tooltip } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import EnvironmentVariables from 'helpers/EnvVariables';
import {
  getDataTypeColumns,
  getRequestBiospecimenDictionary,
} from 'views/DataExploration/components/PageContent/tabs/Biospecimens/utils';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import BiospecimenTree from 'components/Biospecimens/Tree';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import useApi from 'hooks/useApi';
import { trackRequestBiospecimen } from 'services/analytics';
import { headers } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';
import { fetchReport, generateLocalTsvReport } from 'store/report/thunks';
import { PROJECT_ID, useSavedSet } from 'store/savedSet';
import { fetchSavedSet } from 'store/savedSet/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
import { userColsHaveSameKeyAsDefaultCols } from 'utils/tables';

import { SectionId } from '../utils/anchorLinks';
import {
  getBiospecimensDefaultColumns,
  getBiospecimensFromParticipant,
} from '../utils/biospecimens';

import TableView from './TableView';

import styles from './index.module.css';

const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');
const REPORTS_API_URL = EnvironmentVariables.configFor('REPORTS_API_URL');

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

enum BiospecimenTabs {
  TreeView = 'tree',
  TableView = 'table',
}

const BiospecimenTable = ({ participant, loading }: OwnProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [activeTab, setActiveTab] = useState<string>(BiospecimenTabs.TreeView);
  const [columnsState, setColumnsState] = useState<TColumnStates>();

  const { biospecimens, total } = getBiospecimensFromParticipant(participant);

  const biospecimensDefaultColumns = getBiospecimensDefaultColumns();

  const userColumnPreferences = userInfo?.config?.participants?.tables?.biospecimens?.columns || [];
  const userColumnPreferencesOrDefault = userColsHaveSameKeyAsDefaultCols(
    userColumnPreferences,
    biospecimensDefaultColumns,
  )
    ? [...userColumnPreferences]
    : biospecimensDefaultColumns.map((c, index) => ({
        visible: true,
        index,
        key: c.key,
      }));
  const orderedColumns = generateColumnState(
    userColumnPreferencesOrDefault ?? [],
    biospecimensDefaultColumns,
  );

  const requestSqon = {
    content: [
      {
        content: {
          field: 'sample_id',
          index: INDEXES.BIOSPECIMEN,
          value: biospecimens.map((s) => s.sample_id),
        },
        op: TermOperators.in,
      },
    ],
    op: BooleanOperators.and,
  };

  const config: AxiosRequestConfig = {
    url: `${REPORTS_API_URL}/reports/biospecimen-request/stats`,
    method: 'POST',
    responseType: 'json',
    data: {
      sqon: requestSqon,
      projectId: ARRANGER_PROJECT_ID,
    },
    headers: headers(),
  };

  const fetchRequestBioReport = (name: string) => {
    dispatch(
      fetchReport({
        data: {
          sqon: requestSqon,
          name: ReportType.BIOSEPCIMEN_REQUEST,
          projectId: PROJECT_ID,
          biospecimenRequestName: name,
        },
        translation: {
          errorMessage: intl.get('api.biospecimenRequest.error.manifestReport'),
          successMessage: intl.get('api.biospecimenRequest.success.manifestReport'),
        },
        callback: () => {
          dispatch(fetchSavedSet());
        },
      }),
    );
  };

  const collectionFhirIds = [
    ...new Set(biospecimens.map((biospecimen) => biospecimen.collection_fhir_id)),
  ];

  return (
    <EntityCustomContent
      id={SectionId.BIOSPECIMEN}
      loading={loading}
      customContent={
        <Tabs
          className={styles.tabs}
          defaultActiveKey={BiospecimenTabs.TreeView}
          onChange={(activeKey) => setActiveTab(activeKey)}
          items={[
            {
              key: BiospecimenTabs.TreeView,
              label: intl.get('screen.hierarchicalBiospecimen.treeViewTab'),
              children: <BiospecimenTree collectionFhirIds={collectionFhirIds} />,
            },
            {
              key: BiospecimenTabs.TableView,
              label: intl.get('screen.hierarchicalBiospecimen.tableViewTab'),
              children: (
                <TableView
                  biospecimensDefaultColumns={biospecimensDefaultColumns}
                  data={biospecimens}
                  loading={loading}
                  userColumnPreferencesOrDefault={userColumnPreferencesOrDefault}
                />
              ),
            },
          ]}
          tabBarExtraContent={
            <Space size={8}>
              <RequestBiospecimenButton
                additionalHandleClick={() => trackRequestBiospecimen('Participant - open modal')}
                additionalHandleFinish={() =>
                  trackRequestBiospecimen('Participant - download manifest')
                }
                createAndFetchReport={(name) => fetchRequestBioReport(name)}
                dictionary={getRequestBiospecimenDictionary({ isParticipantEntity: true })}
                columns={getDataTypeColumns()}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                getSamples={() => useApi({ config })}
                getSavedSets={useSavedSet}
                key="requestBiospecimen"
                maxTitleLength={200}
                nbBiospecimenSelected={biospecimens.length}
                sqon={requestSqon}
                size="small"
                disabled={biospecimens.filter((b) => b.status === 'available').length === 0}
              />
              <DownloadDataButton
                biospecimenIds={[...biospecimens.map((biospecimen) => biospecimen.sample_id)]}
                key="downloadSampleData"
                size="small"
              />
              {activeTab === BiospecimenTabs.TableView && (
                <>
                  <Tooltip title={intl.get('screen.hierarchicalBiospecimen.exportAsTsv')}>
                    <Button
                      icon={<DownloadOutlined />}
                      key="biospecimen-table-export"
                      onClick={() => {
                        dispatch(
                          generateLocalTsvReport({
                            index: INDEXES.PARTICIPANT,
                            fileName: 'biospecimens',
                            headers: biospecimensDefaultColumns,
                            cols: userColumnPreferencesOrDefault.map((x) => ({
                              visible: x.visible,
                              key: x.key,
                            })),
                            rows: biospecimens,
                          }),
                        );
                      }}
                      size="small"
                      type="text"
                    />
                  </Tooltip>
                  <ColumnSelector
                    columnStates={columnsState || orderedColumns.dynamic || []}
                    columns={biospecimensDefaultColumns}
                    key="column-selector"
                    onChange={(newColumnState) => {
                      setColumnsState(newColumnState);
                      dispatch(
                        updateUserConfig({
                          participants: {
                            tables: {
                              biospecimens: {
                                columns: newColumnState,
                              },
                            },
                          },
                        }),
                      );
                    }}
                  />
                </>
              )}
            </Space>
          }
        />
      }
      header={intl.get('entities.biospecimen.biospecimen')}
      title={intl.get('entities.biospecimen.biospecimen')}
      total={total}
      titleExtra={[
        <Button
          size="small"
          onClick={() => {
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: participant ? [participant.participant_id] : [],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            });
            navigate(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);
          }}
        >
          {intl.get('global.viewInExploration')}
          <ExternalLinkIcon />
        </Button>,
      ]}
    />
  );
};

export default BiospecimenTable;
