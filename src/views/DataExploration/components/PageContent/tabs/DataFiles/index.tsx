import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockOutlined, SafetyOutlined, UnlockFilled } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { FileAccessType, IFileEntity, ITableFileEntity } from 'graphql/files/models';
import { IQueryResults } from 'graphql/models';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import StudyPopoverRedirect from 'views/DataExploration/components/StudyPopoverRedirect';
import {
  DATA_EXPLORATION_QB_ID,
  DATA_FILES_SAVED_SETS_FIELD,
  DEFAULT_PAGE_SIZE,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
import { SetType } from 'services/api/savedSet/models';
import { useFenceConnection } from 'store/fenceConnection';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userHasAccessToFile } from 'utils/dataFiles';
import { formatFileSize } from 'utils/formatFileSize';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IFileEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (
  fenceAcls: string[],
  isConnectedToCavatica: boolean,
  isConnectedToGen3: boolean,
): ProColumnType<any>[] => [
  {
    key: 'lock',
    tooltip: 'File Authorization',
    title: 'File Authorization',
    iconTitle: <LockOutlined />,
    align: 'center',
    render: (record: IFileEntity) => {
      const hasAccess = userHasAccessToFile(
        record,
        fenceAcls,
        isConnectedToCavatica,
        isConnectedToGen3,
      );

      return hasAccess ? (
        <Tooltip title="Authorized">
          <UnlockFilled className={styles.authorizedLock} />
        </Tooltip>
      ) : (
        <Tooltip title="Unauthorized">
          <LockOutlined className={styles.unauthorizedLock} />
        </Tooltip>
      );
    },
  },
  {
    key: 'controlled_access',
    tooltip: 'Data access',
    title: 'Data access',
    iconTitle: <SafetyOutlined />,
    dataIndex: 'controlled_access',
    align: 'center',
    width: 75,
    render: (controlled_access: string) =>
      !controlled_access ? (
        '-'
      ) : controlled_access.toLowerCase() === FileAccessType.CONTROLLED.toLowerCase() ? (
        <Tooltip title="Controlled">
          <Tag color="geekblue">C</Tag>
        </Tooltip>
      ) : (
        <Tooltip title="Registered">
          <Tag color="green">R</Tag>
        </Tooltip>
      ),
  },
  {
    key: 'file_id',
    title: 'File ID',
    dataIndex: 'file_id',
    sorter: { multiple: 1 },
  },
  {
    key: 'file_name',
    title: 'File Name',
    dataIndex: 'file_name',
    sorter: { multiple: 1 },
    defaultHidden: true,
  },
  {
    key: 'study.study_id',
    title: 'Study',
    sorter: { multiple: 1 },
    render: (record: IFileEntity) =>
      record.study.study_id ? (
        <StudyPopoverRedirect
          studyId={record.study.study_id}
          text={record.study.study_id || ''}
        ></StudyPopoverRedirect>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'data_category',
    title: 'Data Category',
    dataIndex: 'data_category',
    sorter: { multiple: 1 },
  },
  {
    key: 'data_type',
    title: 'Data Type',
    dataIndex: 'data_type',
    sorter: { multiple: 1 },
    render: (data_type) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sequencing_experiment__experiment_strategy',
    title: 'Experimental Strategy',
    sorter: { multiple: 1 },
    render: (record: IFileEntity) =>
      record.sequencing_experiment?.experiment_strategy || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'access_urls',
    title: 'Access Url',
    dataIndex: 'access_urls',
    sorter: { multiple: 1 },
    defaultHidden: true,
  },
  {
    key: 'file_format',
    title: 'Format',
    dataIndex: 'file_format',
    sorter: { multiple: 1 },
  },
  {
    key: 'size',
    title: 'Size',
    dataIndex: 'size',
    sorter: { multiple: 1 },
    render: (size) => formatFileSize(size, { output: 'string' }),
  },
  {
    key: 'nb_participants',
    title: 'Participants',
    sorter: { multiple: 1 },
    render: (record: IFileEntity) => {
      const nb_participants = record?.nb_participants || 0;
      return nb_participants ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: [record.file_id],
                    index: INDEXES.FILES,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {nb_participants}
        </Link>
      ) : (
        nb_participants
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: 'Biospecimens',
    sorter: { multiple: 1 },
    render: (record: IFileEntity) => {
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
                    field: 'file_id',
                    value: [record.file_id],
                    index: INDEXES.FILES,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {nb_biospecimens}
        </Link>
      ) : (
        nb_biospecimens
      );
    },
  },
];

const DataFilesTab = ({ results, setQueryConfig, queryConfig, sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const { fencesAllAcls, connectionStatus } = useFenceConnection();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<ITableFileEntity[]>([]);

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: DATA_FILES_SAVED_SETS_FIELD,
              index: INDEXES.FILES,
              value: selectedRows.map((row) => row[DATA_FILES_SAVED_SETS_FIELD]),
            }),
          ],
        });

  return (
    <>
      <ProTable<ITableFileEntity>
        tableId="datafiles_table"
        columns={getDefaultColumns(
          fencesAllAcls,
          connectionStatus.cavatica === FENCE_CONNECTION_STATUSES.connected,
          connectionStatus.gen3 === FENCE_CONNECTION_STATUSES.connected,
        )}
        initialSelectedKey={selectedKeys}
        wrapperClassName={styles.dataFilesTabWrapper}
        loading={results.loading}
        initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
        enableRowSelection={true}
        showSorterTooltip={false}
        onChange={({ current, pageSize }, _, sorter) =>
          setQueryConfig({
            pageIndex: current!,
            size: pageSize!,
            sort: formatQuerySortList(sorter),
          })
        }
        headerConfig={{
          itemCount: {
            pageIndex: queryConfig.pageIndex,
            pageSize: queryConfig.size,
            total: results.total,
          },
          enableColumnSort: true,
          enableTableExport: true,
          onSelectAllResultsChange: setSelectedAllResults,
          onSelectedRowsChange: (keys, rows) => {
            setSelectedKeys(keys);
            setSelectedRows(rows);
          },
          onTableExportClick: () =>
            dispatch(
              fetchTsvReport({
                columnStates: userInfo?.config.data_exploration?.tables?.datafiles?.columns,
                columns: getDefaultColumns(
                  fencesAllAcls,
                  connectionStatus.cavatica === FENCE_CONNECTION_STATUSES.connected,
                  connectionStatus.gen3 === FENCE_CONNECTION_STATUSES.connected,
                ),
                index: INDEXES.FILES,
                sqon:
                  selectedAllResults || !selectedKeys.length
                    ? sqon
                    : generateSelectionSqon(TAB_IDS.DATA_FILES, selectedKeys),
              }),
            ),
          onColumnSortChange: (newState) =>
            dispatch(
              updateUserConfig({
                data_exploration: {
                  tables: {
                    datafiles: {
                      columns: newState,
                    },
                  },
                },
              }),
            ),
          extra: [
            <SetsManagementDropdown
              key="setManagementDropdown"
              results={results}
              sqon={getCurrentSqon()}
              selectedAllResults={selectedAllResults}
              type={SetType.FILE}
              selectedKeys={selectedKeys}
            />,
            <CavaticaAnalyzeButton
              disabled={selectedKeys.length === 0 && !selectedAllResults}
              type="primary"
              fileIds={selectedAllResults ? [] : selectedKeys}
              sqon={sqon}
              key="file-cavatica-upload"
            />,
          ],
        }}
        bordered
        size="small"
        pagination={{
          current: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: results.total,
          onChange: () => scrollToTop(SCROLL_WRAPPER_ID),
        }}
        dataSource={results.data.map((i) => ({ ...i, key: i.file_id }))}
        dictionary={getProTableDictionary()}
      />
    </>
  );
};

export default DataFilesTab;
