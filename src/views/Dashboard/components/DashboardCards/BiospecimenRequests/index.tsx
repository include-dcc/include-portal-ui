import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Typography } from 'antd';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;

const getItemList = (
  savedSets: IUserSetOutput[],
  fetchingError: boolean,
  isLoading: boolean,
  queryBuilderId = DATA_EXPLORATION_QB_ID,
) => {
  const dataSource = savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN_REQUEST);

  return (
    <List<IUserSetOutput>
      className={styles.biospecimenRequestList}
      bordered
      locale={{
        emptyText: fetchingError ? (
          <CardErrorPlaceholder
            title={intl.get('screen.dashboard.cards.biospecimenRequest.error.title')}
            subTitle={
              <Text>
                {intl.getHTML('screen.dashboard.cards.biospecimenRequest.error.text', {
                  href: `mailto:${SUPPORT_EMAIL}`,
                })}
              </Text>
            }
          />
        ) : (
          <Empty
            imageType="grid"
            description={intl.getHTML(
              'screen.dashboard.cards.biospecimenRequest.noBiospecimenRequests',
              {
                href: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
              },
            )}
          />
        ),
      }}
      dataSource={fetchingError ? [] : dataSource}
      loading={isLoading}
      renderItem={(item) => <ListItem set={item} queryBuilderId={queryBuilderId} />}
    />
  );
};

const BiospecimenRequests = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedSets, isLoading, fetchingError } = useSavedSet();

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.biospecimenRequest.title')}
          withHandle
          infoPopover={{
            title: intl.get('screen.dashboard.cards.biospecimenRequest.titleInfo.title'),
            content: (
              <Text>
                {intl.getHTML('screen.dashboard.cards.biospecimenRequest.titleInfo.text', {
                  href: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
                })}
              </Text>
            ),
          }}
        />
      }
      content={
        <div className={styles.biospecimenRequestWrapper}>
          {getItemList(savedSets, fetchingError, isLoading)}
        </div>
      }
    />
  );
};

export default BiospecimenRequests;
