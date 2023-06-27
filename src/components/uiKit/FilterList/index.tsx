import { useState } from 'react';
import intl from 'react-intl-universal';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { IExtendedMappingResults } from '@ferlab/ui/core/graphql/types';
import { Button, Layout, Space, Spin, Typography } from 'antd';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from 'components/uiKit/FilterList/Filters.module.scss';

import CustomFilterContainer from './CustomFilterContainer';
import { FilterGroup, FilterInfo } from './types';

export type TCustomFilterMapper = (filters: ISqonGroupFilter) => ISyntheticSqon;

type OwnProps = {
  loading?: boolean;
  index: string;
  queryBuilderId: string;
  extendedMappingResults: IExtendedMappingResults;
  filterInfo: FilterInfo;
  filterMapper?: TCustomFilterMapper;
};

const { Text } = Typography;

const isAllFacetOpen = (filterInfo: FilterInfo) => {
  const allOpen = concatAllFacets(filterInfo).every((facet) =>
    typeof facet === 'string' ? filterInfo.defaultOpenFacets?.includes(facet) : true,
  );
  return allOpen ? true : undefined;
};

const concatAllFacets = (filterInfo: FilterInfo) => {
  const allFacets: any[] = [];
  filterInfo.groups.forEach(({ facets }) => allFacets.push(...facets));
  return allFacets;
};

const FilterList = ({
  index,
  queryBuilderId,
  extendedMappingResults,
  filterInfo,
  filterMapper,
}: OwnProps) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean | undefined>(isAllFacetOpen(filterInfo));

  if (extendedMappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return (
    <>
      {!isEmpty(filterInfo.customSearches) && (
        <Space direction="vertical" size={16} className={styles.customSearchesWrapper}>
          {filterInfo.customSearches?.map((search, index) => (
            <div key={index}>{search}</div>
          ))}
        </Space>
      )}
      <div className={styles.filterExpandBtnWrapper}>
        <Button onClick={() => setFiltersOpen(!filtersOpen)} type="link">
          {filtersOpen
            ? intl.get('components.filterList.collapseAll')
            : intl.get('components.filterList.expandAll')}
        </Button>
      </div>
      <Layout className={styles.filterWrapper}>
        {filterInfo.groups.map((group: FilterGroup, i) => (
          <div key={i} className={styles.filtersGroup}>
            {group.title ? (
              <Text type="secondary" className={styles.filterGroupTitle}>
                {group.title}
              </Text>
            ) : null}
            {group.facets.map((facet, ii) =>
              typeof facet === 'string' ? (
                <CustomFilterContainer
                  key={facet}
                  index={index}
                  queryBuilderId={queryBuilderId}
                  classname={cx(styles.customFilterContainer, styles.filter)}
                  filterKey={facet}
                  extendedMappingResults={extendedMappingResults}
                  filtersOpen={filtersOpen}
                  defaultOpen={filterInfo.defaultOpenFacets?.includes(facet) ? true : undefined}
                  filterMapper={filterMapper}
                  headerTooltip={group.tooltips?.includes(facet)}
                />
              ) : (
                <div key={i + ii} className={cx(styles.customFilterWrapper, styles.filter)}>
                  {facet}
                </div>
              ),
            )}
          </div>
        ))}
      </Layout>
    </>
  );
};

export default FilterList;
