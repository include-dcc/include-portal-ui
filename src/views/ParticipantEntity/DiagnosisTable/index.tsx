import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantDiagnosis, IParticipantEntity } from 'graphql/participants/models';

import { fetchLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getDiagnosisDefaultColumns from '../utils/getDiagnosisColumns';

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

  const diagnosisDefaultColumns = getDiagnosisDefaultColumns();

  const userColumnPreferences = userInfo?.config?.participants?.tables?.diagnosis?.columns || [];
  const userColumnPreferencesOrDefault =
    userColumnPreferences.length > 0
      ? [...userColumnPreferences]
      : diagnosisDefaultColumns.map((c, index) => ({
          visible: true,
          index,
          key: c.key,
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
      initialColumnState={userColumnPreferencesOrDefault}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  diagnosis: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchLocalTsvReport({
              fileName: 'diagnoses',
              index: INDEXES.PARTICIPANT,
              headers: diagnosisDefaultColumns,
              cols: userColumnPreferencesOrDefault.map((x) => ({
                visible: x.visible,
                key: x.key,
              })),
              rows: diagnoses,
            }),
          ),
      }}
    />
  );
};

export default DiagnosisTable;
