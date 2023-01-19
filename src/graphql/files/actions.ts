import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IFileResultTree } from './models';
import { SEARCH_FILES_QUERY } from './queries';

export const useDataFiles = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IFileResultTree>(SEARCH_FILES_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.files?.hits?.edges || []),
    total: result?.files?.hits?.total || 0,
  };
};
