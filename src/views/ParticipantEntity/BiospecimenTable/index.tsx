import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { DownloadOutlined } from '@ant-design/icons';
import { generateColumnState } from '@ferlab/ui/core/components/ProTable';
import ColumnSelector from '@ferlab/ui/core/components/ProTable/ColumnSelector';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityCustomContent } from '@ferlab/ui/core/pages/EntityPage';
import { Button, Space, Tabs, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import BiospecimenTree from 'components/Biospecimens/Tree';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { generateLocalTsvReport } from 'store/report/thunks';
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
              children: (
                <>
                  <BiospecimenTree />
                </>
              ),
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
