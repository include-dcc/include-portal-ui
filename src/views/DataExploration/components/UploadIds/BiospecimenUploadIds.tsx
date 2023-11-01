import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { CHECK_BIOSPECIMEN_MATCH } from 'graphql/biospecimens/queries';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';

import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const BiospecimenUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="biospecimen"
    entityIdTrans="Sample"
    entityIdentifiers="Sample ID"
    placeHolder="e.g. bs-022KAEZW"
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: CHECK_BIOSPECIMEN_MATCH.loc?.source.body,
        variables: {
          first: 10000,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['sample_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.BIOSPECIMEN,
              }),
            ),
          }),
        },
      });

      const biospecimens: IBiospecimenEntity[] = hydrateResults(
        response.data?.data?.biospecimen?.hits?.edges || [],
      );

      return biospecimens?.flatMap((biospecimen) => {
        const matchedIds: string[] = ids.filter(
          (id: string) => biospecimen.sample_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${biospecimen.sample_id}:${index}`,
          submittedId: id,
          mappedTo: biospecimen.study_id,
          matchTo: biospecimen.sample_id,
        }));
      });
    }}
    onUpload={(matches) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'biospecimen_facet_ids.biospecimen_fhir_id_2',
        value: matches.map((match) => match.matchTo),
        index: INDEXES.BIOSPECIMEN,
        overrideValuesName: intl.get('components.uploadIds.modal.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
        isUploadedList: true,
      })
    }
  />
);

export default BiospecimenUploadIds;
