import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Tag } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';
import { capitalize } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import DownSyndromeStatus from '../FamilyTable/DownSyndromeStatus';

interface IFamilyMember {
  key: string;
  participant_id: string;
  family: {
    family_relations: {
      relation: string;
    };
  };
  down_syndrome_status?: string;
}

export const getFamilyColumns = (current_participant_id: string): ProColumnType[] => [
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
    key: 'family.family_relations.relation',
    title: intl.get('entities.participant.family_relationship'),
    render: (member: IFamilyMember) => {
      const relation = member.family.family_relations.relation;
      return relation ? (
        <Tag color={relation === 'Proband' ? 'purple' : ''}>{capitalize(relation)}</Tag>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'down_syndrome_status',
    title: intl.get('entities.participant.down_syndrome_status'),
    render: (familyMember: IFamilyMember) => {
      if (familyMember.participant_id === current_participant_id) {
        return familyMember.down_syndrome_status;
      }

      return familyMember.participant_id ? (
        <DownSyndromeStatus participantId={familyMember.participant_id} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
];

const getCurrentFamilyMember = (participant: IParticipantEntity): IFamilyMember => ({
  key: participant.participant_id,
  participant_id: participant.participant_id,
  family: {
    family_relations: {
      relation: 'Proband',
    },
  },
  down_syndrome_status: participant.down_syndrome_status,
});

export const getFamilyMembers = (participant: IParticipantEntity): IFamilyMember[] => {
  const otherFamilyMembers: IFamilyMember[] =
    participant?.family?.family_relations.hits?.edges?.map((e) => ({
      key: e.node.related_participant_id,
      participant_id: e.node.related_participant_id,
      family: {
        family_relations: {
          relation: e.node.relation,
        },
      },
    })) || [];

  return [getCurrentFamilyMember(participant), ...otherFamilyMembers];
};
