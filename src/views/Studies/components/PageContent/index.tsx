import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  defaultQueryBuilderState,
  setQueryBuilderState,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { FilterOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, isEmptySqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Input, Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useStudies } from 'graphql/studies/actions';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';
import { cloneDeep } from 'lodash';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList } from 'utils/helper';
import { resolveSyntheticSqonWithReferences } from 'utils/query';
import { getProTableDictionary } from 'utils/translation';

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_STUDY_QUERY_SORT,
  STUDIES_REPO_QB_ID,
} from '../../utils/constants';

import NdaGuidsModal from './NdaGuidsModal';

import styles from './index.module.css';

const { Title } = Typography;

type OwnProps = {
  defaultColumns: ProColumnType<any>[];
};

const PAGE_SIZE = 50;

const generateSearchFilter = (search: string) => {
  const query = generateQuery({
    operator: FilterOperators.filter,
    newFilters: [],
  });

  return {
    ...query,
    content: {
      fields: ['search_text'],
      value: `*${search}*`,
    },
  };
};

const generateMultipleQuery = (searchValue: string, activeQuery: ISyntheticSqon) => {
  const searchQuery = generateSearchFilter(searchValue);
  const newQuery: any = activeQuery;
  newQuery.content = [cloneDeep(searchQuery), cloneDeep(activeQuery)];
  return newQuery;
};

const PageContent = ({ defaultColumns = [] }: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_REPO_QB_ID);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_STUDY_QUERY_SORT,
  });
  const resolvedSqon: ISyntheticSqon = resolveSyntheticSqonWithReferences(
    queryList,
    searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
  );

  const { loading, total, data } = useStudies({
    first: PAGE_SIZE,
    offset: PAGE_SIZE * (queryConfig.pageIndex - 1),
    sqon: resolveSyntheticSqonWithReferences(
      queryList,
      searchValue.length === 0 ? activeQuery : generateMultipleQuery(searchValue, activeQuery),
    ),
    sort: tieBreaker({
      sort: queryConfig.sort,
      defaultSort: DEFAULT_STUDY_QUERY_SORT,
      field: 'study_code',
      order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  });

  useEffect(() => {
    setQueryConfig((prevQueryConfig) => ({
      ...prevQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    }));
  }, [queryConfig.pageIndex]);

  const displayNDAGuids = getFTEnvVarByKey('NDA_GUIDS');
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const searchPrescription = (value: any) => {
    if (value?.target?.value) {
      setSearchValue(value.target.value);
    } else {
      setSearchValue('');
    }
  };

  const clearFilter = () => {
    searchPrescription(undefined);
    const defaultQBState = defaultQueryBuilderState(STUDIES_REPO_QB_ID);
    setQueryBuilderState(STUDIES_REPO_QB_ID, defaultQBState);
  };

  return (
    <Space direction="vertical" size={16} className={styles.pageContent}>
      <Title className={styles.title} level={4}>
        {intl.get('screen.studies.title')}
      </Title>

      <div className={styles.patientContentHeader}>
        <ProLabel className={styles.label} title={intl.get('screen.studies.searchLabel.title')} />
        <div className={styles.inputContainer}>
          <Input
            allowClear
            onChange={searchPrescription}
            placeholder={intl.get('screen.studies.searchLabel.placeholder')}
            size="large"
            value={searchValue}
          />
          {displayNDAGuids === 'true' && (
            <Button className={styles.guidButton} type="primary" onClick={handleOpenModal}>
              {intl.get('screen.studies.ndaGuids.button')}
            </Button>
          )}
        </div>
      </div>

      <GridCard
        content={
          <ProTable
            tableId={STUDIES_REPO_QB_ID}
            columns={defaultColumns}
            initialColumnState={userInfo?.config.study?.tables?.study?.columns}
            wrapperClassName={styles.tableWrapper}
            loading={loading}
            showSorterTooltip={false}
            bordered
            onChange={(_pagination, _filter, sorter) => {
              setQueryConfig({
                pageIndex: DEFAULT_PAGE_INDEX,
                size: queryConfig.size!,
                sort: formatQuerySortList(sorter),
              });
            }}
            headerConfig={{
              itemCount: {
                pageIndex: queryConfig.pageIndex,
                pageSize: PAGE_SIZE,
                total,
              },
              enableColumnSort: true,
              onColumnSortChange: (newState) =>
                dispatch(
                  updateUserConfig({
                    study: {
                      tables: {
                        study: {
                          columns: newState,
                        },
                      },
                    },
                  }),
                ),
              enableTableExport: true,
              onTableExportClick: () => {
                dispatch(
                  fetchTsvReport({
                    columnStates: userInfo?.config.study?.tables?.study?.columns,
                    columns: defaultColumns,
                    index: INDEXES.STUDY,
                    sqon: resolvedSqon,
                  }),
                );
              },
              hasFilter: !isEmptySqon(resolvedSqon),
              clearFilter,
            }}
            size="small"
            dataSource={data.map((i) => ({ ...i, key: i.study_code }))}
            dictionary={getProTableDictionary()}
          />
        }
      />

      {isModalOpen && displayNDAGuids === 'true' && (
        <NdaGuidsModal open={isModalOpen} onClose={handleCloseModal} />
      )}
    </Space>
  );
};

export default PageContent;
