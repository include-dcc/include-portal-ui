import intl from 'react-intl-universal';
import { Typography } from 'antd';

import HtpWidget from './HtpWidget';
import NewsletterWidget from './NewsletterWidget';

import styles from './index.module.css';

const { Title, Paragraph } = Typography;

const Analytics = () => (
  <div className={styles.analyticsWrapper}>
    <Title className={styles.title} level={4}>
      {intl.get('screen.analytics.title')}
    </Title>
    <Paragraph className={styles.subtitle}>{intl.get('screen.analytics.subtitle')}</Paragraph>
    <div className={styles.widgetsWrapper}>
      <HtpWidget />
      <NewsletterWidget />
    </div>
  </div>
);

export default Analytics;
