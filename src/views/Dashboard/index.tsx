import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import SortableGrid from '@ferlab/ui/core/layout/SortableGrid';
import { Space, Typography } from 'antd';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { AlterTypes } from 'common/types';
import { BIOSPECIMEN_REQUEST_KEY } from 'components/Biospecimens/Request/requestBiospecimen.utils';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { orderCardIfNeeded } from 'utils/helper';

import useFeatureToggle from '../../hooks/useFeatureToggle';
import { globalActions } from '../../store/global';
import { SubscriptionStatus } from '../../store/user/types';

import { biospecimenRequestCard, dashboardCards } from './components/DashboardCards';
import DataExplorationLinks from './components/DashboardCards/DataExplorationLinks';

import styles from './index.module.scss';

const { Title } = Typography;

const FT_FLAG_KEY = 'DASHBOARD_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';
const FT_FLAG_NEWSLETTER_KEY = 'NEWSLETTER_NOTIFICATION';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isEnabled, hideFeature } = useFeatureToggle(FT_FLAG_NEWSLETTER_KEY);
  const { userInfo } = useUser();
  const hasRequestBio = getFTEnvVarByKey(BIOSPECIMEN_REQUEST_KEY);
  const cards =
    hasRequestBio === 'true' ? [...dashboardCards, biospecimenRequestCard] : dashboardCards;

  useEffect(() => {
    if (isEnabled && userInfo?.newsletter_subscription_status === SubscriptionStatus.FAILED) {
      dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('screen.profileSettings.cards.newsletter.error.title'),
          description: intl.get('screen.profileSettings.cards.newsletter.error.unsubscribeMessage'),
          onClose: hideFeature,
          duration: 0,
        }),
      );
    }
  }, [dispatch, hideFeature, isEnabled, userInfo?.newsletter_subscription_status]);

  return (
    <Space direction="vertical" size={24} className={styles.dashboardWrapper}>
      <Space className={styles.dataIntroWrapper} direction="vertical" size={16}>
        <NotificationBanner
          featureToggleKey={FT_FLAG_KEY}
          type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'info')}
          message={getFTEnvVarByKey(BANNER_MSG_KEY)}
          closable
          showIcon
        />
        <Title level={4} className={styles.greeting}>
          {intl.get('screen.dashboard.hello')}, {userInfo?.first_name}
        </Title>
        <DataExplorationLinks />
      </Space>
      <SortableGrid
        onReorder={(ids) =>
          dispatch(
            updateUserConfig({
              dashboard: {
                cards: {
                  order: ids,
                },
              },
            }),
          )
        }
        items={orderCardIfNeeded(cards, userInfo?.config.dashboard?.cards?.order)}
        gutter={[24, 24]}
      />
    </Space>
  );
};

export default Dashboard;
