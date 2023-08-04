import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { useParticipantEntity } from 'graphql/participants/actions';
import { IParticipantEntity } from 'graphql/participants/models';
import { IFamilyRelationToProband } from 'graphql/participants/models';
import { GET_PARTICIPANT_DOWN_SYNDROME_STATUS } from 'graphql/participants/queries';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';

import FamilyIdLink from './FamilyIdLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Link } from 'react-router-dom';
import { STATIC_ROUTES } from 'utils/routes';
import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { Tag } from 'antd';
import { capitalize } from 'lodash';

interface OwnProps {
  participant: IParticipantEntity;
  familyMembers: IFamilyRelationToProband[];
}

const sortMembersForDisplay = (selectedParticipantId: string, ms: IFamilyRelationToProband[]) => {
  if (!ms?.length) {
    return [];
  }
  const first = ms.find((m) => m.participant_id === selectedParticipantId);
  const others = ms.filter((m) => m.participant_id !== selectedParticipantId);
  //cond <first && others> must always be true, but still, adding a defensive check
  return first && others ? [{ ...first }, ...others] : ms;
};

const getFamilyColumns = (current_participant_id: string): ProColumnType[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('entities.participant.participant_id'),
    render: (participant_id: string) => {
      if (participant_id === current_participant_id) {
        return participant_id;
      }

      return participant_id ? (
        <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}>{participant_id}</Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: intl.get('entities.participant.family_relationship'),
    render: (role: string) =>
      role ? (
        <Tag color={role.includes('proband') ? 'purple' : ''}>{capitalize(role)}</Tag>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'down_syndrome_status',
    dataIndex: 'down_syndrome_status',
    title: intl.get('entities.participant.down_syndrome_status'),
    render: (status: string) => (status ? <div>{status}</div> : TABLE_EMPTY_PLACE_HOLDER),
  },
];

const FamilyTable = ({ familyMembers = [], participant }: OwnProps) => {
  const { loading: loadDownSyndromStatus, participants: participantsWithDownSyndromeStatus = [] } =
    useParticipantEntity({
      value: familyMembers.map((x) => x.participant_id),
      query: GET_PARTICIPANT_DOWN_SYNDROME_STATUS,
    });
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const sortedFamilyMembers = sortMembersForDisplay(participant.participant_id, familyMembers);

  return (
    <EntityTable
      id={SectionId.FAMILY}
      loading={loadDownSyndromStatus}
      data={sortedFamilyMembers.map((x) => ({
        key: x.participant_id,
        participant_id: x.participant_id,
        role: x.role,
        down_syndrome_status: participantsWithDownSyndromeStatus.find(
          (y) => y.participant_id === x.participant_id,
        )?.down_syndrome_status,
      }))}
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
                    value: familyMembers.map((x) => x.participant_id),
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
