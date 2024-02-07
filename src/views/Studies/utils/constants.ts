import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig, ISort } from '@ferlab/ui/core/graphql/types';

export const DEFAULT_PAGE_INDEX = 1;

export const DEFAULT_PAGE_SIZE = 100;

export const DEFAULT_STUDY_QUERY_SORT = [
  { field: 'study_code', order: SortDirection.Asc },
] as ISort[];

export const DEFAULT_QUERY_CONFIG: IQueryConfig = {
  pageIndex: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  sort: DEFAULT_STUDY_QUERY_SORT,
};
