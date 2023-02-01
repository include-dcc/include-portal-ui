import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantDiagnosis, IParticipantEntity } from 'graphql/participants/models';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getDiagnosisColumns from '../utils/getDiagnosisColumns';

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

  return (
    <EntityTable
      id={SectionId.DIAGNOSIS}
      loading={loading}
      data={diagnoses}
      title={intl.get('entities.participant.diagnosis.title')}
      header={intl.get('entities.participant.diagnosis.title')}
      columns={getDiagnosisColumns()}
      initialColumnState={userInfo?.config.participants?.tables?.diagnosis?.columns}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { diagnosis: { columns: newState } } } }),
          ),
      }}
    />
  );
};

export default DiagnosisTable;
