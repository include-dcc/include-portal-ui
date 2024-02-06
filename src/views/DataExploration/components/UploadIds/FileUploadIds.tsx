import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { extractUploadValues } from '@ferlab/ui/core/components/UploadIds/utils';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { CHECK_FILE_MATCH } from 'graphql/files/queries';
import { hydrateResults } from 'graphql/models';

import { ArrangerApi } from 'services/api/arranger';

import EntityUploadIds from './EntityUploadIds';

interface OwnProps {
  queryBuilderId: string;
}

const FileUploadIds = ({ queryBuilderId }: OwnProps) => (
  <EntityUploadIds
    entityId="file"
    entityIdTrans="File"
    entityIdentifiers={intl.get('components.uploadIds.modal.identifiers.file')}
    placeHolder={intl.get('components.uploadIds.modal.placeholders.file')}
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: CHECK_FILE_MATCH.loc?.source.body,
        variables: {
          first: 10000,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['file_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.PARTICIPANT,
              }),
            ),
          }),
        },
      });

      const files: IFileEntity[] = hydrateResults(response.data?.data?.file?.hits?.edges || []);

      return files?.flatMap((file) => {
        const matchedIds: string[] = ids.filter(
          (id: string) => file.file_id.toLocaleLowerCase() === id.toLocaleLowerCase(),
        );

        return matchedIds.map((id, index) => ({
          key: `${file.file_id}:${index}`,
          submittedId: id,
          mappedTo: file.study.study_code,
          matchTo: file.file_id,
          value: file.fhir_id,
        }));
      });
    }}
    onUpload={(matches: MatchTableItem[]) =>
      updateActiveQueryField({
        queryBuilderId,
        field: 'file_facet_ids.file_fhir_id_2',
        value: extractUploadValues(matches, 'value'),
        index: INDEXES.FILE,
        overrideValuesName: intl.get('components.uploadIds.modal.pillTitle'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
        isUploadedList: true,
      })
    }
  />
);

export default FileUploadIds;
