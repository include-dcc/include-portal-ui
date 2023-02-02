import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import { getFamilyColumns, getFamilyMembers } from '../utils/family';

import FamilyIdLink from './FamilyIdLink';

interface OwnProps {
  participant: IParticipantEntity;
  loading: boolean;
}

const FamilyTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  return (
    <EntityTable
      id={SectionId.FAMILY}
      loading={loading}
      data={getFamilyMembers(participant)}
      title={intl.get('entities.participant.family')}
      header={[
        intl.get('entities.participant.family_id'),
        ' (',
        <FamilyIdLink key={1} familyId={participant.family.family_id} />,
        ')',
      ]}
      columns={getFamilyColumns(participant.participant_id)}
      initialColumnState={userInfo?.config.participants?.tables?.family?.columns}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { family: { columns: newState } } } }),
          ),
      }}
    />
  );
};

export default FamilyTable;
