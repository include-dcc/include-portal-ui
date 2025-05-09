import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { ISort } from '@ferlab/ui/core/graphql/types';

import { IUserSetOutput, SetType, TBiospecimenRequest } from 'services/api/savedSet/models';

export interface ISavedSet {
  idField: string;
  projectId: string;
  sqon: ISqonGroupFilter;
  tag: string;
  type: string;
  sort: ISort[];
}

export interface IDashboardCompareSets {
  entityType?: SetType;
  ids?: string[];
}

export type initialState = {
  defaultFilter?: ISavedSet;
  savedSets: IUserSetOutput[];
  sharedBiospecimenRequest?: TBiospecimenRequest;
  isLoading: boolean;
  isUpdating: boolean;
  error?: any;
  fetchingError?: any;
  selectedId?: string;
  dashboardCompareSets?: IDashboardCompareSets;
};
