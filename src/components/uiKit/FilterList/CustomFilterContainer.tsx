import { ReactNode, useEffect, useState } from 'react';
import FilterContainer from '@ferlab/ui/core/components/filters/FilterContainer';
import {
  IFilter,
  IFilterGroup,
  TExtendedMapping,
  TFilterGroupDefaults,
} from '@ferlab/ui/core/components/filters/types';
import { updateActiveQueryFilters } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterGroup } from '@ferlab/ui/core/data/filters/utils';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { IExtendedMappingResults, IGqlResults } from '@ferlab/ui/core/graphql/types';
import { getFilters } from 'graphql/utils/Filters';
import { isUndefined } from 'lodash';

import { trackFacetSearch } from 'services/analytics';
import { getFacetsDictionary, getFiltersDictionary } from 'utils/translation';

import CustomFilterSelector from './CustomFilterSelector';
import { TCustomFilterMapper } from '.';

type OwnProps = {
  classname: string;
  index: string;
  queryBuilderId: string;
  filterKey: string;
  defaultOpen?: boolean;
  defaults?: TFilterGroupDefaults;
  extendedMappingResults: IExtendedMappingResults;
  filtersOpen?: boolean;
  filterMapper?: TCustomFilterMapper;
  headerTooltip?: boolean;
  noDataInputOption?: boolean;
  intervalDecimal?: number;
  filterWithFooter?: boolean;
  categoryIcon?: ReactNode;
};

const CustomFilterContainer = ({
  classname,
  index,
  queryBuilderId,
  filterKey,
  filtersOpen,
  defaultOpen,
  defaults,
  extendedMappingResults,
  filterMapper,
  headerTooltip,
  noDataInputOption,
  intervalDecimal,
  filterWithFooter = true,
  categoryIcon,
}: OwnProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [results, setResults] = useState<IGqlResults<any>>();
  const found = (extendedMappingResults?.data || []).find(
    (f: TExtendedMapping) => f.field === underscoreToDot(filterKey),
  );

  useEffect(() => {
    if (!isUndefined(filtersOpen) && isOpen !== filtersOpen) {
      setIsOpen(filtersOpen);
    }
    // eslint-disable-next-line
  }, [filtersOpen]);

  const onChange = (fg: IFilterGroup, f: IFilter[]) => {
    trackFacetSearch(index, fg.field);
    updateActiveQueryFilters({
      queryBuilderId,
      filterGroup: fg,
      selectedFilters: f,
      index,
    });
  };

  const aggregations = results?.aggregations ? results?.aggregations[filterKey] : {};
  const filterGroup = getFilterGroup({
    extendedMapping: found,
    aggregation: aggregations,
    defaults,
    rangeTypes: [],
    filterFooter: filterWithFooter,
    headerTooltip,
    dictionary: getFacetsDictionary(),
    noDataInputOption,
    intervalDecimal,
    categoryIcon,
  });

  const filters = results?.aggregations ? getFilters(results?.aggregations, filterKey) : [];
  const selectedFilters = results?.data
    ? getSelectedFilters({
        queryBuilderId,
        filters,
        filterGroup,
      })
    : [];

  return (
    <div className={classname} key={filterKey}>
      <FilterContainer
        maxShowing={5}
        isOpen={isOpen}
        filterGroup={filterGroup}
        filters={filters}
        onChange={() => {}}
        selectedFilters={selectedFilters}
        onSearchVisibleChange={setIsSearchVisible}
        collapseProps={{
          headerBorderOnly: true,
        }}
        customContent={
          <CustomFilterSelector
            index={index}
            queryBuilderId={queryBuilderId}
            filterKey={filterKey}
            dictionary={getFiltersDictionary()}
            filters={filters}
            filterGroup={filterGroup}
            maxShowing={5}
            onChange={onChange}
            selectedFilters={selectedFilters}
            searchInputVisible={isSearchVisible}
            onDataLoaded={setResults}
            extendedMappingResults={extendedMappingResults}
            filterMapper={filterMapper}
          />
        }
      />
    </div>
  );
};

export default CustomFilterContainer;
