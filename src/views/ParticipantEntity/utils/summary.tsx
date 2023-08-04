import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag, Tooltip } from 'antd';
import { FamilyType, IParticipantEntity } from 'graphql/participants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../styles/styles.module.scss';

export const familyTypeText = {
  [FamilyType.PROBAND]: intl.get('entities.participant.proband_only'),
  [FamilyType.DUO]: intl.get('entities.participant.duo'),
  [FamilyType.TRIO]: intl.get('entities.participant.trio'),
  [FamilyType.TRIO_PLUS]: intl.get('entities.participant.trio_plus'),
  [FamilyType.OTHER]: intl.get('entities.participant.other'),
};

export const getSummaryItems = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.global.id'),
    value: participant?.participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <Tooltip
        className={styles.tooltip}
        title={intl.get('entities.participant.external_id_tooltip')}
      >
        {intl.get('entities.participant.external_id')}
      </Tooltip>
    ),
    value: participant?.external_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study'),
    value:
      `${participant?.study.study_name} (${participant?.study?.study_code})` ||
      TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.dbgap'),
    value: participant?.study.external_id ? (
      <ExternalLink
        className={styles.link}
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${participant?.study.external_id}`}
      >
        {participant?.study.external_id}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.participant.family_unit'),
    value: participant?.family_type ? (
      <Tag color="cyan">{familyTypeText[participant.family_type]}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];
