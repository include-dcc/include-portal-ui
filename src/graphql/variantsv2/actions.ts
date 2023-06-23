import {
  IQueryOperationsConfig,
  IQueryResults,
  IQueryVariable,
} from '@ferlab/ui/core/graphql/types';
import { computeSearchAfter, hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { INDEXES } from 'graphql/constants';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IVariantEntity, IVariantEntityResultTree, IVariantResultTree } from './models';
import { GET_VARIANT_ENTITY_V2, SEARCH_VARIANT_QUERY_V2 } from './queries';

export const useVariant = (
  variables?: IQueryVariable,
  operations?: IQueryOperationsConfig,
): IQueryResults<IVariantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IVariantResultTree>(SEARCH_VARIANT_QUERY_V2, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.variants?.hits?.edges || [], operations?.previous),
    total: result?.variants?.hits?.total || 0,
    searchAfter: computeSearchAfter(result?.variants?.hits?.edges || [], operations),
  };
};

interface IUseVariantEntityProps {
  field: string;
  values: string[];
}

interface IUseVariantEntityReturn {
  loading: boolean;
  data?: IVariantEntity;
}

export const useVariantEntity = ({
  field,
  values,
}: IUseVariantEntityProps): IUseVariantEntityReturn => {
  const sqon = {
    content: [{ content: { field, value: values, index: INDEXES.VARIANTS_V2 }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IVariantEntityResultTree>(GET_VARIANT_ENTITY_V2, {
    variables: { sqon },
  });

  const data = result?.variants?.hits?.edges[0]?.node;

  return {
    loading,
    data,
  };
};
