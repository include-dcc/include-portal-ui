import intl from 'react-intl-universal';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';

export enum SectionId {
  SUMMARY = 'summary',
  DATA_ACCESS = 'data-access',
  DATA_TYPE = 'data-type',
  PARTICIPANT_SAMPLE = 'participant-sample',
}

export const getLinks = (): IAnchorLink[] => [
  { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
  { href: `#${SectionId.DATA_ACCESS}`, title: intl.get('entities.file.data_access') },
  { href: `#${SectionId.DATA_TYPE}`, title: intl.get('entities.file.data_type') },
  {
    href: `#${SectionId.PARTICIPANT_SAMPLE}`,
    title: intl.get('entities.file.participant_sample'),
  },
];
