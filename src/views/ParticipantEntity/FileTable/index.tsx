import intl from 'react-intl-universal';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTableMultiple, EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from 'utils/routes';

import { SectionId } from '../utils/anchorLinks';
import { getDataCategoryColumns, getDataCategoryInfo } from '../utils/dataCategory';
import {
  getExperimentalStrategyColumns,
  getExperimentalStrategyInfo,
} from '../utils/experimentalStrategy';

interface IFilesTableProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const FileTable = ({ participant, loading }: IFilesTableProps) => {
  const participantId = participant?.participant_id || '';

  const files: IFileEntity[] = participant?.files?.hits.edges.map(({ node }) => node) || [];
  const fileCount = participant?.nb_files || 0;

  const dataCategoryInfo = getDataCategoryInfo(files, fileCount);
  const experimentalStrategyInfo = getExperimentalStrategyInfo(files, fileCount);

  return (
    <div>
      <EntityTableMultiple
        total={fileCount}
        id={SectionId.FILES}
        loading={loading}
        title={intl.get('entities.file.file')}
        titleExtra={[
          <EntityTableRedirectLink
            key="1"
            to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'participant_id',
                      value: participant ? [participant.participant_id] : [],
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
            icon={<ExternalLinkIcon width={14} />}
          >
            {intl.get('global.viewInDataExploration')}
          </EntityTableRedirectLink>,
        ]}
        header={intl.get('entities.file.file')}
        tables={[
          {
            columns: getDataCategoryColumns(fileCount, participantId),
            data: dataCategoryInfo,
            subTitle: intl.get('entities.file.data_category_count'),
          },
          {
            columns: getExperimentalStrategyColumns(fileCount, participantId),
            data: experimentalStrategyInfo,
            subTitle: intl.get('entities.file.experimental_strategy_count'),
          },
        ]}
      />
    </div>
  );
};
export default FileTable;
