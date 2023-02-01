import { DocumentNode } from 'graphql';
import { INDEXES } from 'graphql/constants';
import { hydrateResults, IQueryResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IParticipantEntity, IParticipantResultTree } from './models';
import { GET_PARTICIPANT_COUNT, GET_PARTICIPANT_ENTITY, SEARCH_PARTICIPANT_QUERY } from './queries';

export const useParticipants = (variables?: QueryVariable): IQueryResults<IParticipantEntity[]> => {
  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(SEARCH_PARTICIPANT_QUERY, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.participant?.hits?.edges || []),
    total: result?.participant?.hits?.total || 0,
  };
};

interface IUseParticipantProps {
  field?: string;
  value?: string | string[];
  query?: DocumentNode;
}

export const useParticipantEntity = ({
  field = 'participant_id',
  value,
  query = GET_PARTICIPANT_ENTITY,
}: IUseParticipantProps): { loading: boolean; participant?: IParticipantEntity } => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PARTICIPANT }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(query, {
    variables: { sqon },
  });

  const participant = result?.participant?.hits?.edges[0]?.node || undefined;

  return {
    loading,
    participant,
  };
};

export const useParticipantsFromField = ({
  field = 'participant_id',
  value,
  query = GET_PARTICIPANT_COUNT,
}: IUseParticipantProps): {
  loading: boolean;
  participants?: IParticipantEntity[];
  total: number;
} => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PARTICIPANT }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IParticipantResultTree>(query, {
    variables: { sqon },
  });

  return {
    loading,
    participants: hydrateResults(result?.participant?.hits?.edges || []),
    total: result?.participant?.hits?.total || 0,
  };
};
