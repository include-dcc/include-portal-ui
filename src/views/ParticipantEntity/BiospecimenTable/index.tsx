import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable, EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import { SectionId } from '../utils/anchorLinks';
import {
  getBiospecimensDefaultColumns,
  getBiospecimensFromParticipant,
} from '../utils/biospecimens';

const COLUMNS_PREFIX = 'files.biospecimens.';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const BiospecimenTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const { biospecimens, total } = getBiospecimensFromParticipant(participant);

  const userColumnPreferences = userInfo?.config.participants?.tables?.biospecimens?.columns || [];
  const userColumnPreferencesOrDefault =
    userColumnPreferences.length > 0
      ? [...userColumnPreferences]
      : getBiospecimensDefaultColumns().map((c, index) => ({
          visible: true,
          index,
          key: `${COLUMNS_PREFIX}${c.key}`,
        }));

  const initialColumnState = userColumnPreferencesOrDefault.map((column) => ({
    ...column,
    key: column.key.replace(COLUMNS_PREFIX, ''),
  }));

  return (
    <EntityTable
      id={SectionId.BIOSPECIMEN}
      loading={loading}
      data={biospecimens}
      title={intl.get('entities.biospecimen.biospecimen')}
      titleExtra={[
        <EntityTableRedirectLink
          key="1"
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          icon={<ExternalLinkIcon width={14} />}
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
        >
          {intl.get('global.viewInDataExploration')}
        </EntityTableRedirectLink>,
      ]}
      total={total}
      header={intl.get('entities.biospecimen.biospecimen')}
      columns={getBiospecimensDefaultColumns()}
      initialColumnState={initialColumnState}
      headerConfig={{
        extra: [
          <DownloadDataButton
            biospecimenIds={[...biospecimens.map((biospecimen) => biospecimen.sample_id)]}
            key="downloadSampleData"
          />,
        ],
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  biospecimens: {
                    columns: newState.map((column) => ({
                      ...column,
                      key: `${COLUMNS_PREFIX}${column.key}`,
                    })),
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userColumnPreferencesOrDefault,
              columns: getBiospecimensDefaultColumns(),
              index: INDEXES.PARTICIPANT,
              fileName: 'biospecimens',
              sqon: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    index: INDEXES.PARTICIPANT,
                    value: participant?.participant_id ? [participant?.participant_id] : [],
                  }),
                ],
              }),
            }),
          ),
      }}
    />
  );
};

export default BiospecimenTable;
