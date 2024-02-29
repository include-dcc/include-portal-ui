import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LockOutlined, SafetyOutlined, UnlockFilled } from '@ant-design/icons';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { FENCE_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/AuthorizedStudies';
import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useDataFiles } from 'graphql/files/actions';
import { FileAccessType, IFileEntity, ITableFileEntity } from 'graphql/files/models';
import { IStudyEntity } from 'graphql/studies/models';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import StudyPopoverRedirect from 'views/DataExploration/components/StudyPopoverRedirect';
import {
  DATA_EXPLORATION_QB_ID,
  DATA_FILES_SAVED_SETS_FIELD,
  DEFAULT_FILE_QUERY_SORT,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import { DEFAULT_OFFSET } from 'views/Variants/utils/constants';

import { MAX_ITEMS_QUERY, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { FENCE_NAMES } from 'common/fenceTypes';
import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';
import { SetType } from 'services/api/savedSet/models';
import { useAllFencesAcl, useFenceAuthentification } from 'store/fences';
import { useCavaticaPassport } from 'store/passport';
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
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (
  fenceAcls: string[],
  isConnectedToCavatica: boolean,
  isConnectedToGen3: boolean,
): ProColumnType<any>[] => [
  {
    key: 'lock',
    tooltip: intl.get('entities.file.fileAuthorization'),
    title: intl.get('entities.file.fileAuthorization'),
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
    tooltip: intl.get('entities.file.data_access'),
    title: intl.get('entities.file.data_access'),
    iconTitle: <SafetyOutlined />,
    dataIndex: 'controlled_access',
    align: 'center',
    width: 75,
    sorter: { multiple: 1 },
    render: (controlled_access: string) => {
      if (!controlled_access) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return controlled_access.toLowerCase() === FileAccessType.CONTROLLED.toLowerCase() ? (
        <Tooltip title="Controlled">
          <Tag color="geekblue">C</Tag>
        </Tooltip>
      ) : (
        <Tooltip title="Registered">
          <Tag color="green">R</Tag>
        </Tooltip>
      );
    },
  },
  {
    key: 'file_id',
    title: intl.get('entities.file.file_id_full'),
    dataIndex: 'file_id',
    sorter: { multiple: 1 },
    render: (file_id: string) => <Link to={`${STATIC_ROUTES.FILES}/${file_id}`}>{file_id}</Link>,
  },
  {
    key: 'file_name',
    title: intl.get('entities.file.file_name_full'),
    dataIndex: 'file_name',
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (file_name: string) => file_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'study',
    key: 'study',
    title: intl.get('entities.study.study'),
    sorter: { multiple: 1 },
    render: (study: IStudyEntity) =>
      study?.study_id ? (
        <StudyPopoverRedirect
          studyId={study.study_id}
          studyName={study.study_name}
          text={study.study_code || ''}
        ></StudyPopoverRedirect>
      ) : (
        <Tooltip title={study?.study_name}>{study?.study_code}</Tooltip> || TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'data_category',
    title: intl.get('entities.file.data_category'),
    dataIndex: 'data_category',
    sorter: { multiple: 1 },
    render: (data_category: string) => data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'data_type',
    title: intl.get('entities.file.data_type'),
    dataIndex: 'data_type',
    sorter: { multiple: 1 },
    render: (data_type: string) => data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sequencing_experiment.experiment_strategy',
    title: intl.get('entities.file.experimental_strategy'),
    sorter: { multiple: 1 },
    render: (record: IFileEntity) => {
      if (!record?.sequencing_experiment?.hits?.edges) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return record.sequencing_experiment.hits.edges
        .map((edge) => edge.node.experiment_strategy)
        .filter((strategy, index, array) => array.indexOf(strategy) === index)
        .join(', ');
    },
  },
  {
    key: 'access_urls',
    title: intl.get('entities.file.access_url'),
    dataIndex: 'access_urls',
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (access_urls: string) => access_urls || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_format',
    title: intl.get('entities.file.format'),
    dataIndex: 'file_format',
    sorter: { multiple: 1 },
    render: (file_format: string) => file_format || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'size',
    title: intl.get('entities.file.size'),
    dataIndex: 'size',
    sorter: { multiple: 1 },
    render: (size: number) => formatFileSize(size, { output: 'string' }),
  },
  {
    key: 'nb_participants',
    title: intl.get('entities.file.participants'),
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
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(nb_participants)}
        </Link>
      ) : (
        nb_participants
      );
    },
  },
  {
    key: 'nb_biospecimens',
    title: intl.get('entities.file.biospecimens'),
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
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(nb_biospecimens)}
        </Link>
      ) : (
        nb_biospecimens
      );
    },
  },
];

const DataFilesTab = ({ sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const gen3 = useFenceAuthentification(FENCE_NAMES.gen3);
  const cavatica = useCavaticaPassport();
  const fencesAllAcls = useAllFencesAcl();
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<ITableFileEntity[]>([]);

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_FILE_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useDataFiles(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_FILE_QUERY_SORT,
        field: 'file_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: DATA_FILES_SAVED_SETS_FIELD,
              index: INDEXES.FILE,
              value: selectedRows.map((row) => row[DATA_FILES_SAVED_SETS_FIELD]),
            }),
          ],
        });

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      setSelectedRows([]);
    }
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_FILE_QUERY_SORT,
        size:
          userInfo?.config?.data_exploration?.tables?.participants?.viewPerQuery ||
          DEFAULT_PAGE_SIZE,
      },
      setQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    if (queryConfig.firstPageFlag !== undefined || queryConfig.searchAfter === undefined) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  const hasTooManyFiles =
    selectedKeys.length > MAX_ITEMS_QUERY ||
    (selectedAllResults && results.total > MAX_ITEMS_QUERY);

  return (
    <>
      <ProTable<ITableFileEntity>
        tableId="datafiles_table"
        columns={getDefaultColumns(
          fencesAllAcls,
          cavatica.authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected,
          gen3.status === FENCE_AUTHENTIFICATION_STATUS.connected,
        )}
        showSorterTooltip={false}
        initialSelectedKey={selectedKeys}
        wrapperClassName={styles.dataFilesTabWrapper}
        loading={results.loading}
        initialColumnState={userInfo?.config.data_exploration?.tables?.datafiles?.columns}
        enableRowSelection={true}
        onChange={(_pagination, _filter, sorter) => {
          setPageIndex(DEFAULT_PAGE_INDEX);
          setQueryConfig({
            pageIndex: DEFAULT_PAGE_INDEX,
            size: queryConfig.size!,
            sort: formatQuerySortList(sorter),
          });
        }}
        headerConfig={{
          itemCount: {
            pageIndex: pageIndex,
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
                  cavatica.authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected,
                  gen3.status === FENCE_AUTHENTIFICATION_STATUS.connected,
                ),
                index: INDEXES.FILE,
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
              idField="fhir_id"
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
              sort={queryConfig.sort ?? DEFAULT_FILE_QUERY_SORT}
              key="file-cavatica-upload"
              index={INDEXES.FILE}
            />,
            <DownloadFileManifestModal
              key="download-file-manifest"
              sqon={getCurrentSqon()}
              isDisabled={!selectedKeys.length && !selectedAllResults}
              hasTooManyFiles={hasTooManyFiles}
            />,
          ],
        }}
        bordered
        size="small"
        pagination={{
          current: pageIndex,
          queryConfig,
          setQueryConfig,
          onChange: (page: number) => {
            scrollToTop(SCROLL_WRAPPER_ID);
            setPageIndex(page);
          },
          searchAfter: results.searchAfter,
          onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
            dispatch(
              updateUserConfig({
                data_exploration: {
                  tables: {
                    datafiles: {
                      ...userInfo?.config.data_exploration?.tables?.datafiles,
                      viewPerQuery,
                    },
                  },
                },
              }),
            );
          },
          defaultViewPerQuery: queryConfig.size,
        }}
        dataSource={results.data.map((i) => ({ ...i, key: i.file_id }))}
        dictionary={getProTableDictionary()}
      />
    </>
  );
};

export default DataFilesTab;
