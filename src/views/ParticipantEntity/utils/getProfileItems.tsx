import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tooltip } from 'antd';
import { IParticipantEntity } from 'graphql/participants/models';
import { capitalize } from 'lodash';

import styles from '../styles/styles.module.scss';

const getProfileItems = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.profile.race'),
    value: participant?.race,
  },
  {
    label: intl.get('entities.participant.profile.ethnicity'),
    value: participant?.ethnicity,
  },
  {
    label: intl.get('entities.participant.profile.sex'),
    value: capitalize(participant?.sex),
  },
  {
    label: (
      <Tooltip
        className={styles.tooltip}
        title={
          <>
            <div>{intl.get('entities.participant.profile.trisomy')}</div>
            <div>{intl.get('entities.participant.profile.disomy')}</div>
          </>
        }
      >
        {intl.get('entities.participant.profile.down_syndrome_status')}
      </Tooltip>
    ),
    value: participant?.down_syndrome_status,
  },
];

export default getProfileItems;
