import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';

import { fetchTsvReport } from 'store/report/thunks';
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
  const data = getFamilyMembers(participant);

  return (
    <EntityTable
      id={SectionId.FAMILY}
      loading={loading}
      data={data}
      title={intl.get('entities.participant.family')}
      header={[
        intl.get('entities.participant.family_id'),
        ' (',
        <FamilyIdLink key={1} familyId={participant.family.family_id} />,
        ')',
      ]}
      columns={getFamilyColumns(participant.participant_id)}
      initialColumnState={userInfo?.config?.participants?.tables?.family?.columns}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { family: { columns: newState } } } }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userInfo?.config?.participants?.tables?.family?.columns,
              columns: getFamilyColumns(participant.participant_id),
              index: INDEXES.PARTICIPANT,
              fileName: 'family',
              sqon: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    index: INDEXES.PARTICIPANT,
                    value: data ? data.map((participant) => participant.participant_id) : [],
                  }),
                ],
              }),
            }),
          ),
      }}
    />
  );
};

export default FamilyTable;
