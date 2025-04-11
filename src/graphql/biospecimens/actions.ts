import {
  IQueryOperationsConfig,
  IQueryResults,
  IQueryVariable,
} from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IBiospecimenEntity, IBiospecimenResultTree } from './models';
import {
  GET_BIOSPECIMEN_COUNT,
  GET_HIERARCHY_BIOSPECIMEN,
  SEARCH_BIOSPECIMEN_QUERY,
} from './queries';

export const useBiospecimen = (
  variables?: IQueryVariable,
  operations?: IQueryOperationsConfig,
): IQueryResults<IBiospecimenEntity[]> => {
  const { loading, result } = useLazyResultQuery<IBiospecimenResultTree>(SEARCH_BIOSPECIMEN_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.biospecimen?.hits?.edges || [], operations?.previous),
    total: result?.biospecimen?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.biospecimen?.hits?.edges || [], operations),
  };
};

export const useTotalBiospecimen = (variables?: IQueryVariable): number => {
  const { result } = useLazyResultQuery<IBiospecimenResultTree>(GET_BIOSPECIMEN_COUNT, {
    variables,
  });

  return result?.biospecimen?.hits?.total || 0;
};

export const useHierarchicalBiospecimen = (
  collectionFhirIds: string[],
): { loading: boolean; data: string[] } => {
  const { loading, result } = useLazyResultQuery<any>(GET_HIERARCHY_BIOSPECIMEN, {
    variables: {
      first: 100,
      offset: 0,
      sqon: {
        content: [{ content: { field: 'collection_fhir_id', value: collectionFhirIds }, op: 'in' }],
        op: 'and',
      },
    },
  });

  const treeStrings: string[] =
    result?.biospecimen_trees?.hits?.edges?.map((edge: any) => {
      const { node } = edge;
      return node.tree_str;
    }) || [];

  return { loading, data: [...new Set(treeStrings)] };
};
