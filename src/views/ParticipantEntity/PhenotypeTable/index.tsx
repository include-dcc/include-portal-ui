import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity, IParticipantPhenotype } from 'graphql/participants/models';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getPhenotypeDefaultColumns from '../utils/getPhenotypeColumns';

const COLUMNS_PREFIX = 'phenotype.';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const PhenotypeTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const phenotype: IParticipantPhenotype[] =
    participant?.phenotype?.hits?.edges?.map((e) => ({ key: e.node.fhir_id, ...e.node })) || [];

  const userColumnPreferences = userInfo?.config.participants?.tables?.phenotype?.columns || [];
  const userColumnPreferencesOrDefault =
    userColumnPreferences.length > 0
      ? [...userColumnPreferences]
      : getPhenotypeDefaultColumns().map((c, index) => ({
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
      id={SectionId.PHENOTYPE}
      loading={loading}
      data={phenotype}
      total={phenotype.length}
      title={intl.get('entities.participant.phenotype')}
      header={intl.get('entities.participant.phenotype')}
      columns={getPhenotypeDefaultColumns()}
      initialColumnState={initialColumnState}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  phenotype: {
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
              columns: getPhenotypeDefaultColumns(),
              index: INDEXES.PARTICIPANT,
              fileName: 'phenotypes',
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

export default PhenotypeTable;
