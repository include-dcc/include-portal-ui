import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Popover, Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity, Sex } from 'graphql/participants/models';
import { capitalize } from 'lodash';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import AgeCell from '../AgeCell';

import styles from '../styles/styles.module.css';

const getProfileItems = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => {
  const columns: IEntityDescriptionsItem[] = [];
  if (participant?.person?.person_id) {
    columns.push({
      label: intl.get('entities.participant.person_id'),
      value: (
        <>
          {participant.person.person_id}
          <Popover
            overlayStyle={{ maxWidth: '420px' }}
            title={intl.get('screen.participantEntity.personPopover.title')}
            content={
              <>
                <p>
                  {intl.get('screen.participantEntity.personPopover.content1')}
                  <Link
                    to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                    onClick={() =>
                      addQuery({
                        queryBuilderId: DATA_EXPLORATION_QB_ID,
                        query: generateQuery({
                          newFilters: [
                            generateValueFilter({
                              field: 'person.person_id',
                              value: [participant?.person?.person_id!],
                              index: INDEXES.PARTICIPANT,
                            }),
                          ],
                        }),
                        setAsActive: true,
                      })
                    }
                    style={{ textDecoration: 'underline' }}
                  >
                    {intl.get('screen.participantEntity.personPopover.content2')}
                  </Link>
                </p>
                <span>
                  {intl.getHTML('screen.participantEntity.personPopover.content3', {
                    studiesHref: STATIC_ROUTES.STUDIES,
                  })}
                </span>
              </>
            }
          >
            <TeamOutlined className={styles.person} />
          </Popover>
        </>
      ),
    });
  }

  return [
    ...columns,
    {
      label: intl.get('entities.participant.race'),
      value: participant?.race,
    },
    {
      label: intl.get('entities.participant.ethnicity'),
      value: participant?.ethnicity,
    },
    {
      label: intl.get('entities.participant.sex'),
      value: (
        <Tag
          color={
            participant?.sex === Sex.FEMALE
              ? 'magenta'
              : participant?.sex === Sex.MALE
              ? 'geekblue'
              : ''
          }
        >
          {capitalize(participant?.sex)}
        </Tag>
      ),
    },
    {
      label: (
        <Tooltip
          className={styles.tooltip}
          title={
            <>
              <div>{intl.get('entities.participant.trisomy')}</div>
              <div>{intl.get('entities.participant.disomy')}</div>
            </>
          }
        >
          {intl.get('entities.participant.down_syndrome_status')}
        </Tooltip>
      ),
      value: participant?.down_syndrome_status,
    },
    {
      label: intl.get('entities.participant.age_at_first_patient_engagement_complete'),
      value: <AgeCell ageInDays={participant?.age_at_first_patient_engagement?.value} />,
    },
  ];
};

export default getProfileItems;
