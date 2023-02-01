import { useParticipantEntity } from 'graphql/participants/actions';
import { GET_PARTICIPANT_DOWN_SYNDROME_STATUS } from 'graphql/participants/queries';

interface OwnProps {
  participantId: string;
}

const DownSyndromeStatus = ({ participantId }: OwnProps) => {
  const { participant } = useParticipantEntity({
    value: participantId,
    query: GET_PARTICIPANT_DOWN_SYNDROME_STATUS,
  });

  return <div>{participant?.down_syndrome_status}</div>;
};

export default DownSyndromeStatus;
