import intl from 'react-intl-universal';
import { Typography } from 'antd';

import useFeatureToggle from 'hooks/useFeatureToggle';

import HtpWidget from './HtpWidget';
import NewsletterWidget from './NewsletterWidget';
import SetOperationsWidget from './SetOperationsWidget';

import styles from './index.module.css';

const { Title, Paragraph } = Typography;
const FT_SET_OPERATIONS = 'ANALYTICS_SET_OPERATIONS';

const Analytics = () => {
  const { isEnabled: isSetOperationsEnabled } = useFeatureToggle(FT_SET_OPERATIONS);
  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.analytics}>
        <Title className={styles.title} level={4}>
          {intl.get('screen.analytics.title')}
        </Title>
        <Paragraph className={styles.subtitle}>{intl.get('screen.analytics.subtitle')}</Paragraph>
        <div className={styles.widgetsWrapper}>
          <HtpWidget />
          {isSetOperationsEnabled && <SetOperationsWidget />}
          <NewsletterWidget />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
