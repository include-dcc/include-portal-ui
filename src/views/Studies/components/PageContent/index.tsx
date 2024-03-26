import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { ReadOutlined } from '@ant-design/icons';
import { TExtendedMapping } from '@ferlab/ui/core/components/filters/types';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IExtendedMappingResults } from '@ferlab/ui/core/graphql/types';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useStudies } from 'graphql/studies/actions';
import { IStudyResultTree } from 'graphql/studies/models';
import { GET_STUDY_COUNT } from 'graphql/studies/queries';

import { ArrangerApi } from 'services/api/arranger';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { combineExtendedMappings } from 'utils/fieldMapper';
import { formatQuerySortList } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';
import { getQueryBuilderDictionary } from 'utils/translation';

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  DEFAULT_STUDY_QUERY_SORT,
  STUDIES_REPO_QB_ID,
} from '../../utils/constants';

import styles from './index.module.scss';

const { Title } = Typography;

type OwnProps = {
  defaultColumns: ProColumnType<any>[];
  extendedMappingResults?: IExtendedMappingResults;
};

const PAGE_SIZE = 50;

const PageContent = ({
  defaultColumns = [],
  extendedMappingResults = { data: [], loading: false },
}: OwnProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_REPO_QB_ID);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_STUDY_QUERY_SORT,
  });
  const resolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const { loading, total, data } = useStudies({
    first: PAGE_SIZE,
    offset: PAGE_SIZE * (queryConfig.pageIndex - 1),
    sqon: resolvedSqon,
    sort: tieBreaker({
      sort: queryConfig.sort,
      defaultSort: DEFAULT_STUDY_QUERY_SORT,
      field: 'study_code',
      order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
    }),
  });

  useEffect(() => {
    setQueryConfig({
      ...queryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([extendedMappingResults])?.data?.find(
          (mapping: TExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  return (
    <Space direction="vertical" size={16} className={styles.pageContent}>
      <Title className={styles.title} level={4}>
        {intl.get('screen.studies.title')}
      </Title>
      <QueryBuilder
        id={STUDIES_REPO_QB_ID}
        className="studies-repo__query-builder"
        headerConfig={{
          showHeader: false,
          showTools: false,
          defaultTitle: intl.get('components.querybuilder.defaultTitle'),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
          },
        }}
        enableCombine
        IconTotal={<ReadOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={total}
        dictionary={getQueryBuilderDictionary(facetTransResolver)}
        getResolvedQueryForCount={(sqon) => resolveSyntheticSqon(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IStudyResultTree }>({
            query: GET_STUDY_COUNT.loc?.source.body,
            variables: {
              sqon: resolveSyntheticSqon(queryList, sqon),
            },
          });

          return data?.data?.study.hits.total ?? 0;
        }}
      />
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
            }}
            size="small"
            dataSource={data.map((i) => ({ ...i, key: i.id }))}
            dictionary={getProTableDictionary()}
          />
        }
      />
    </Space>
  );
};

export default PageContent;
