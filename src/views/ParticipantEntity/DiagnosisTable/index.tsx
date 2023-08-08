import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantDiagnosis, IParticipantEntity } from 'graphql/participants/models';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getDiagnosisDefaultColumns from '../utils/getDiagnosisColumns';

const COLUMNS_PREFIX = 'diagnosis.';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const DiagnosisTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const diagnoses: IParticipantDiagnosis[] =
    participant?.diagnosis?.hits?.edges?.map((e) => ({ key: e.node.diagnosis_id, ...e.node })) ||
    [];

  const userColumnPreferences = userInfo?.config.participants?.tables?.diagnosis?.columns || [];
  const userColumnPreferencesOrDefault =
    userColumnPreferences.length > 0
      ? [...userColumnPreferences]
      : getDiagnosisDefaultColumns().map((c, index) => ({
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
      id={SectionId.DIAGNOSIS}
      loading={loading}
      data={diagnoses}
      total={diagnoses.length}
      title={intl.get('entities.participant.diagnosis')}
      header={intl.get('entities.participant.diagnosis')}
      columns={getDiagnosisDefaultColumns()}
      initialColumnState={initialColumnState}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  diagnosis: {
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
              columns: getDiagnosisDefaultColumns(),
              index: INDEXES.PARTICIPANT,
              fileName: 'diagnoses',
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

export default DiagnosisTable;
