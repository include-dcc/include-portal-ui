import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import EntityPage, { EntityDescriptions } from '@ferlab/ui/core/pages/EntityPage';
import { useParticipantEntity } from 'graphql/participants/actions';

import { getLinks, SectionId } from './utils/anchorLinks';
import getProfileItems from './utils/getProfileItems';
import getSummaryItems from './utils/getSummaryItems';
import BiospecimenTable from './BiospecimenTable';
import DiagnosisTable from './DiagnosisTable';
import FamilyTable from './FamilyTable';
import FileTable from './FileTable';
import PhenotypeTable from './PhenotypeTable';
import SummaryHeader from './SummaryHeader';
import ParticipantEntityTitle from './Title';

const ParticipantEntity = () => {
  const { participant_id } = useParams<{ participant_id: string }>();

  const { participant, loading } = useParticipantEntity({
    field: 'participant_id',
    value: participant_id,
  });

  const showFamilyTable = Boolean(
    participant?.family?.family_id && participant?.family?.family_relations?.hits?.edges?.length,
  );

  return (
    <EntityPage
      links={getLinks(showFamilyTable)}
      pageId={'participant-entity-page'}
      data={participant}
      loading={loading}
      emptyText={intl.get('no.data.available')}
    >
      <ParticipantEntityTitle participant={participant} loading={loading} />

      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryItems(participant)}
        header={intl.get('entities.participant.summary.title')}
        subheader={<SummaryHeader participant={participant} />}
      />

      <EntityDescriptions
        id={SectionId.PROFILE}
        loading={loading}
        descriptions={getProfileItems(participant)}
        title={intl.get('entities.participant.profile.title')}
        header={intl.get('entities.participant.profile.title')}
      />

      {showFamilyTable && <FamilyTable participant={participant!} loading={loading} />}

      <DiagnosisTable participant={participant} loading={loading} />

      <PhenotypeTable participant={participant} loading={loading} />

      <BiospecimenTable participant={participant} loading={loading} />

      <FileTable participant={participant} loading={loading} />
    </EntityPage>
  );
};

export default ParticipantEntity;
