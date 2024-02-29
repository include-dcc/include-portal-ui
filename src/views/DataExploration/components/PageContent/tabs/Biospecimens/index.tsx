import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
  updateActiveQueryField,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Tooltip } from 'antd';
import { useBiospecimen } from 'graphql/biospecimens/actions';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import StudyPopoverRedirect from 'views/DataExploration/components/StudyPopoverRedirect';
import {
  BIOSPECIMENS_SAVED_SETS_FIELD,
  DATA_EXPLORATION_QB_ID,
  DEFAULT_BIOSPECIMEN_QUERY_SORT,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';
import AgeCell from 'views/ParticipantEntity/AgeCell';
import { DEFAULT_OFFSET } from 'views/Variants/utils/constants';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import { BIOSPECIMEN_REQUEST_KEY } from 'components/Biospecimens/Request/requestBiospecimen.utils';
import RequestBiospecimenButton from 'components/Biospecimens/Request/RequestBiospecimenButton';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'sample_id',
    title: 'Sample ID',
    dataIndex: 'sample_id',
    sorter: { multiple: 1 },
    className: styles.sampleIdCell,
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'study',
    dataIndex: 'study',
    title: 'Study',
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
    key: 'sample_type',
    title: 'Sample Type',
    dataIndex: 'sample_type',
    sorter: { multiple: 1 },
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_id',
    title: 'Parent Sample ID',
    dataIndex: 'parent_sample_id',
    sorter: { multiple: 1 },
    render: (parent_sample_id: string) => parent_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_type',
    title: 'Parent Sample Type',
    dataIndex: 'parent_sample_type',
    sorter: { multiple: 1 },
    render: (parent_sample_type: string) => parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.participant_id',
    title: 'Participant ID',
    dataIndex: 'participant',
    sorter: { multiple: 1 },
    render: (participant: IParticipantEntity) =>
      participant?.participant_id ? (
        <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant.participant_id}`}>
          {participant.participant_id}
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'collection_sample_id',
    title: 'Collection ID',
    dataIndex: 'collection_sample_id',
    sorter: { multiple: 1 },
    render: (collection_sample_id: string) => {
      if (!collection_sample_id) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <a
          type="link"
          onClick={() =>
            updateActiveQueryField({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              field: 'collection_sample_id',
              value: [collection_sample_id],
              index: INDEXES.BIOSPECIMEN,
            })
          }
        >
          {collection_sample_id}
        </a>
      );
    },
  },
  {
    key: 'collection_sample_type',
    title: 'Collection Sample Type',
    dataIndex: 'collection_sample_type',
    sorter: { multiple: 1 },
    render: (collection_sample_type: string) => collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'container_id',
    title: 'Container ID',
    dataIndex: 'container_id',
    render: (container_id: string) => container_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_biospecimen_collection',
    tooltip: 'Age at Biospecimen Collection',
    title: 'Age',
    dataIndex: 'age_at_biospecimen_collection',
    render: (age_at_biospecimen_collection) => (
      <AgeCell ageInDays={age_at_biospecimen_collection} />
    ),
  },
  {
    key: 'external_sample_id',
    title: 'External Sample ID',
    dataIndex: 'external_sample_id',
    defaultHidden: true,
    render: (external_sample_id: string) => external_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume',
    title: 'Volume',
    dataIndex: 'volume',
    defaultHidden: true,
    render: (volume: number) => (volume ? numberWithCommas(volume) : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'volume_unit',
    title: 'Volume Unit',
    defaultHidden: true,
    render: (record: IBiospecimenEntity) =>
      record?.volume ? record.volume_unit : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'status',
    title: 'Sample Availability',
    dataIndex: 'status',
    sorter: { multiple: 1 },
    render: (status: string) => (status?.toLowerCase() === 'available' ? 'Yes' : 'No'),
  },
  {
    key: 'laboratory_procedure',
    title: 'Laboratory Procedure',
    dataIndex: 'laboratory_procedure',
    defaultHidden: true,
    render: (laboratory_procedure: string) => laboratory_procedure || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_storage',
    title: 'Biospecimen Storage',
    dataIndex: 'biospecimen_storage',
    defaultHidden: true,
    render: (biospecimen_storage: string) => biospecimen_storage || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: 'Files',
    sorter: { multiple: 1 },
    render: (record: IBiospecimenEntity) => {
      const nbFiles = record?.nb_files || 0;

      return nbFiles ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'sample_id',
                    value: [record.sample_id],
                    index: INDEXES.BIOSPECIMEN,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberWithCommas(nbFiles)}
        </Link>
      ) : (
        nbFiles
      );
    },
  },
];

const BioSpecimenTab = ({ sqon }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.biospecimens?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useBiospecimen(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
        field: 'sample_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateSelectionSqon(TAB_IDS.BIOSPECIMENS, selectedKeys, '_id');

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
        size:
          userInfo?.config?.data_exploration?.tables?.biospecimens?.viewPerQuery ||
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

  const hasRequestBio = getFTEnvVarByKey(BIOSPECIMEN_REQUEST_KEY);

  return (
    <ProTable
      tableId="biospecimen_table"
      columns={getDefaultColumns()}
      wrapperClassName={styles.biospecimenTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.biospecimens?.columns}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
      showSorterTooltip={false}
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
        onSelectedRowsChange: (keys) => setSelectedKeys(keys),
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  biospecimens: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config.data_exploration?.tables?.biospecimens?.columns,
              columns: getDefaultColumns(),
              index: INDEXES.BIOSPECIMEN,
              sqon: getCurrentSqon(),
            }),
          ),
        extra: [
          hasRequestBio === 'true' && (
            <RequestBiospecimenButton
              disabled={selectedKeys.length === 0 && !selectedAllResults}
              key="requestBiospecimen"
              nbBiospecimenSelected={selectedAllResults ? results.total : selectedKeys.length}
              sqon={getCurrentSqon()}
              type="primary"
            />
          ),
          <SetsManagementDropdown
            idField={BIOSPECIMENS_SAVED_SETS_FIELD}
            key="setManagementDropdown"
            results={results}
            sqon={getCurrentSqon()}
            selectedAllResults={selectedAllResults}
            type={SetType.BIOSPECIMEN}
            selectedKeys={selectedKeys}
          />,
          <DownloadDataButton
            disabled={selectedKeys.length === 0 && !selectedAllResults}
            biospecimenIds={selectedAllResults ? [] : selectedKeys}
            sqon={getCurrentSqon()}
            key="downloadSampleData"
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
                  biospecimens: {
                    ...userInfo?.config.data_exploration?.tables?.biospecimens,
                    viewPerQuery,
                  },
                },
              },
            }),
          );
        },
        defaultViewPerQuery: queryConfig.size,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default BioSpecimenTab;
