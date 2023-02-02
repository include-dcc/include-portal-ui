import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tooltip } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../styles/styles.module.scss';

const getSummaryItems = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
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
      `${participant?.study.study_name} (${participant?.study.study_code})` ||
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
    value: capitalize(participant?.family_type) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getSummaryItems;
