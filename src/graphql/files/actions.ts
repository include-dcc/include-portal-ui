import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IFileEntity, IFileResultTree } from './models';
import { GET_FILE_ENTITY, SEARCH_FILES_QUERY } from './queries';

export const useDataFiles = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IFileResultTree>(SEARCH_FILES_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.file?.hits?.edges || []),
    total: result?.file?.hits?.total || 0,
  };
};

interface IUseFileProps {
  field: string;
  value: string;
}

interface IUseFileReturn {
  loading: boolean;
  file?: IFileEntity;
}

export const useFileEntity = ({ field, value }: IUseFileProps): IUseFileReturn => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.FILE }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IFileResultTree>(GET_FILE_ENTITY, {
    variables: { sqon },
  });

  const file = result?.file?.hits?.edges[0]?.node || undefined;

  return {
    loading,
    file,
  };
};
