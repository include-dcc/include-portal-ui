import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApartmentOutlined } from '@ant-design/icons';
import RequestBiospecimenButton from '@ferlab/ui/core/components/BiospecimenRequest/RequestBiospecimenButton';
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
import { AxiosRequestConfig } from 'axios';
import { useBiospecimen } from 'graphql/biospecimens/actions';
import { IBiospecimenEntity, Status } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { IStudyEntity } from 'graphql/studies/models';
import EnvironmentVariables from 'helpers/EnvVariables';
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
import useApi from 'hooks/useApi';
import { trackRequestBiospecimen } from 'services/analytics';
import { headers } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';
import { SetType } from 'services/api/savedSet/models';
import { fetchReport, fetchTsvReport } from 'store/report/thunks';
import { PROJECT_ID, useSavedSet } from 'store/savedSet';
import { fetchSavedSet } from 'store/savedSet/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import HierarchicalBiospecimenModal from './HierarchicalBiospecimenModal';
import { getDataTypeColumns, getRequestBiospecimenDictionary } from './utils';

import styles from './index.module.css';

const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');
const REPORTS_API_URL = EnvironmentVariables.configFor('REPORTS_API_URL');

interface OwnProps {
  sqon?: ISqonGroupFilter;
}

const getDefaultColumns = (
  setHierarchicalModal: React.Dispatch<React.SetStateAction<boolean>>,
  setBiospecimenSelected: React.Dispatch<React.SetStateAction<IBiospecimenEntity | undefined>>,
): ProColumnType<any>[] => [
  {
    key: 'sample_id',
    title: intl.get('entities.biospecimen.sample_id'),
    sorter: { multiple: 1 },
    className: styles.sampleIdCell,
    render: (record: IBiospecimenEntity) =>
      record.sample_id ? (
        <Link
          to={''}
          onClick={() => {
            setHierarchicalModal(true);
            setBiospecimenSelected(record);
          }}
        >
          {record.sample_id}
          <ApartmentOutlined className={styles.sampleIdIcon} />
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'study.study_code',
    dataIndex: 'study',
    title: intl.get('entities.study.study'),
    sorter: { multiple: 1 },
    render: (study: IStudyEntity) =>
      study?.study_id ? (
        <StudyPopoverRedirect
          studyId={study.study_id}
          studyName={study.study_name}
          text={study.study_code || ''}
        ></StudyPopoverRedirect>
      ) : study?.study_code ? (
        <Tooltip title={study?.study_name}>{study.study_code}</Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
    dataIndex: 'sample_type',
    sorter: { multiple: 1 },
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_id',
    title: intl.get('entities.biospecimen.parent_sample_id'),
    dataIndex: 'parent_sample_id',
    sorter: { multiple: 1 },
    render: (parent_sample_id: string) => parent_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'parent_sample_type',
    title: intl.get('entities.biospecimen.parent_sample_type'),
    dataIndex: 'parent_sample_type',
    sorter: { multiple: 1 },
    render: (parent_sample_type: string) => parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.participant_id',
    title: intl.get('entities.participant.participant_id'),
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
    title: intl.get('entities.biospecimen.collection_id'),
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
    title: intl.get('entities.biospecimen.collection_sample_type'),
    dataIndex: 'collection_sample_type',
    sorter: { multiple: 1 },
    render: (collection_sample_type: string) => collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'container_id',
    title: intl.get('entities.biospecimen.container_id'),
    dataIndex: 'container_id',
    render: (container_id: string) => container_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_biospecimen_collection',
    tooltip: intl.get('entities.biospecimen.age_tooltip'),
    title: intl.get('entities.biospecimen.age'),
    dataIndex: 'age_at_biospecimen_collection',
    render: (age_at_biospecimen_collection) => (
      <AgeCell ageInDays={age_at_biospecimen_collection} />
    ),
  },
  {
    key: 'external_sample_id',
    title: intl.get('entities.biospecimen.external_sample_id'),
    dataIndex: 'external_sample_id',
    defaultHidden: true,
    render: (external_sample_id: string) => external_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'volume',
    title: intl.get('entities.biospecimen.volume'),
    dataIndex: 'volume',
    defaultHidden: true,
    render: (volume: number) => (volume ? numberWithCommas(volume) : TABLE_EMPTY_PLACE_HOLDER),
  },
  {
    key: 'volume_unit',
    title: intl.get('entities.biospecimen.volume_unit'),
    defaultHidden: true,
    render: (record: IBiospecimenEntity) =>
      record?.volume ? record.volume_unit : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'status',
    title: intl.get('entities.biospecimen.sample_availabilty'),
    dataIndex: 'status',
    sorter: { multiple: 1 },
    render: (status: string) => {
      if (!status) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return status === Status.AVAILABLE ? intl.get('global.yes') : intl.get('global.no');
    },
  },
  {
    key: 'laboratory_procedure',
    title: intl.get('entities.biospecimen.laboratory_procedure'),
    dataIndex: 'laboratory_procedure',
    defaultHidden: true,
    render: (laboratory_procedure: string) => laboratory_procedure || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_storage',
    title: intl.get('entities.biospecimen.biospecimen_storage'),
    dataIndex: 'biospecimen_storage',
    defaultHidden: true,
    render: (biospecimen_storage: string) => biospecimen_storage || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
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
  const [hierarchicalModal, setHierarchicalModal] = useState(false);
  const [biospecimenSelected, setBiospecimenSelected] = useState<IBiospecimenEntity>();
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

  const config: AxiosRequestConfig = {
    url: `${REPORTS_API_URL}/reports/biospecimen-request/stats`,
    method: 'POST',
    responseType: 'json',
    data: {
      sqon: getCurrentSqon(),
      projectId: ARRANGER_PROJECT_ID,
    },
    headers: headers(),
  };

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

  const fetchRequestBioReport = (name: string) => {
    dispatch(
      fetchReport({
        data: {
          sqon: getCurrentSqon(),
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

  return (
    <>
      <ProTable
        tableId="biospecimen_table"
        columns={getDefaultColumns(setHierarchicalModal, setBiospecimenSelected)}
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
                columns: getDefaultColumns(setHierarchicalModal, setBiospecimenSelected),
                index: INDEXES.BIOSPECIMEN,
                sqon: getCurrentSqon(),
              }),
            ),
          extra: [
            <RequestBiospecimenButton
              additionalHandleClick={() => trackRequestBiospecimen('open modal')}
              additionalHandleFinish={() => trackRequestBiospecimen('download manifest')}
              createAndFetchReport={(name) => fetchRequestBioReport(name)}
              dictionary={getRequestBiospecimenDictionary()}
              disabled={selectedKeys.length === 0 && !selectedAllResults}
              columns={getDataTypeColumns()}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              getSamples={() => useApi({ config })}
              getSavedSets={useSavedSet}
              key="requestBiospecimen"
              maxTitleLength={200}
              nbBiospecimenSelected={selectedAllResults ? results.total : selectedKeys.length}
              sqon={getCurrentSqon()}
              type="primary"
            />,
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
      {hierarchicalModal && (
        <HierarchicalBiospecimenModal
          isOpen={hierarchicalModal}
          biospecimen={biospecimenSelected}
          onClose={() => setHierarchicalModal(false)}
        />
      )}
    </>
  );
};

export default BioSpecimenTab;
