import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { CHECK_PARTICIPANT_MATCH } from 'graphql/participants/queries';

import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const ParticipantUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="participant"
    entityIdTrans="Participant"
    entityIdentifiers="Participant ID"
    placeHolder="e.g. pt-005X8BR9"
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: CHECK_PARTICIPANT_MATCH.loc?.source.body,
        variables: {
          first: 10000,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['participant_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.PARTICIPANT,
              }),
            ),
          }),
        },
      });

      const participants: IParticipantEntity[] = hydrateResults(
        response.data?.data?.participant?.hits?.edges || [],
      );

      return participants?.flatMap((participant) => {
        const matchedIds: string[] = ids.filter(
          (id: string) => participant.participant_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${participant.participant_id}:${index}`,
          submittedId: id,
          mappedTo: participant.study_id,
          matchTo: participant.participant_id,
        }));
      });
    }}
    onUpload={(matches) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'participant_facet_ids.participant_fhir_id_2',
        value: matches.map((match) => match.matchTo),
        index: INDEXES.PARTICIPANT,
        overrideValuesName: intl.get('components.uploadIds.modal.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
        isUploadedList: true,
      })
    }
  />
);

export default ParticipantUploadIds;
