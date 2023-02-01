import intl from 'react-intl-universal';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';

export enum SectionId {
  SUMMARY = 'summary',
  PROFILE = 'profile',
  FAMILY = 'family',
  DIAGNOSIS = 'diagnosis',
  PHENOTYPE = 'phenotype',
  BIOSPECIMEN = 'biospecimen',
  FILES = 'files',
}

export const getLinks = (showFamilyTable: boolean): IAnchorLink[] => {
  const links = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.participant.summary.title') },
    { href: `#${SectionId.PROFILE}`, title: intl.get('entities.participant.profile.title') },
    { href: `#${SectionId.DIAGNOSIS}`, title: intl.get('entities.participant.diagnosis.title') },
    { href: `#${SectionId.PHENOTYPE}`, title: intl.get('entities.participant.phenotype.title') },
    {
      href: `#${SectionId.BIOSPECIMEN}`,
      title: intl.get('entities.participant.biospecimen.title'),
    },
    { href: `#${SectionId.FILES}`, title: intl.get('entities.participant.files.title') },
  ];

  if (showFamilyTable) {
    links.splice(2, 0, {
      href: `#${SectionId.FAMILY}`,
      title: intl.get('entities.participant.family.title'),
    });
  }

  return links;
};
