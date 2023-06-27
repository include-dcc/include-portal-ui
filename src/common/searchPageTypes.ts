import { SortDirection } from '@ferlab/ui/core/graphql/constants';

export type TPagingConfig = {
  index: number;
  size: number;
};

export type TPagingConfigCb = (config: TPagingConfig) => void;

export type TQueryConfigCb = (config: IQueryConfig) => void;

export interface IQueryConfig {
  pageIndex: number;
  size: number;
  sort: {
    field: string;
    order: SortDirection;
  }[];
}
