import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, List, Progress, Typography } from 'antd';
import cx from 'classnames';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TFenceStudy } from 'store/fenceStudies/types';
import { STATIC_ROUTES } from 'utils/routes';
import { numberWithCommas } from 'utils/string';

import styles from './index.module.scss';

interface OwnProps {
  id: any;
  data: TFenceStudy;
}

const { Text } = Typography;

const AuthorizedStudiesListItem = ({ id, data }: OwnProps) => (
  <List.Item key={id} className={cx('wrapped', styles.AuthorizedStudiesListItem)}>
    <List.Item.Meta
      title={
        <Text title={data.studyShortName} ellipsis>
          {data.studyShortName}
        </Text>
      }
      description={
        <div className={styles.filesCount}>
          {intl.get('screen.dashboard.cards.authorizedStudies.authorization')}:{' '}
          <Link
            to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'study.study_code',
                      value: [data.code],
                      index: INDEXES.PARTICIPANT,
                    }),
                    generateValueFilter({
                      field: 'acl',
                      value: data.acl,
                      index: INDEXES.FILE,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            <Button className={styles.fileLink} type="link">
              <span>{numberWithCommas(data.authorizedFiles)}</span>
            </Button>
          </Link>{' '}
          {intl.get('screen.dashboard.cards.authorizedStudies.of')}{' '}
          <Link
            to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'study.study_code',
                      value: [data.code],
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            <Button className={styles.fileLink} type="link">
              <span>{numberWithCommas(data.totalFiles)}</span>
            </Button>
          </Link>{' '}
          {intl.get('screen.dashboard.cards.authorizedStudies.files')}
        </div>
      }
      className={styles.itemMeta}
    />
    <Text type="secondary" className={styles.dataUseGroups}>
      {intl.get('screen.dashboard.cards.authorizedStudies.dataGroups', {
        groups: data.acl.join(', '),
      })}
    </Text>
    <Progress
      className={styles.progress}
      size="small"
      percent={Math.round((data.authorizedFiles / data.totalFiles) * 100)}
    ></Progress>
  </List.Item>
);

export default AuthorizedStudiesListItem;
