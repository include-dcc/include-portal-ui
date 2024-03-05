import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IStudyResultTree } from './models';
import { GET_STUDIES, GET_STUDY } from './queries';

export const useStudies = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IStudyResultTree>(GET_STUDIES, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.study?.hits?.edges || []),
    total: result?.study?.hits?.total || 0,
  };
};

export const useStudy = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value }, op: 'in' }],
    op: 'and',
  };
  const { loading, result } = useLazyResultQuery<IStudyResultTree>(GET_STUDY, {
    variables: { sqon },
  });

  return {
    loading,
    data: result?.study?.hits?.edges[0]?.node,
  };
};
