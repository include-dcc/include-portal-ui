import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import { BarChartOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Space, Tag, Typography } from 'antd';

import HTPLogo from 'components/assets/analytics/htpWidget.svg';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

const { Title, Paragraph } = Typography;

const HtpWidget = () => {
  const navigate = useNavigate();
  return (
    <Card className={styles.widget}>
      <Space direction="vertical" size={16} className={styles.spaceWrapper}>
        <Space direction="vertical" size={24} className={styles.contentWrapper}>
          <img alt="HTP Logo" src={HTPLogo} />
          <div>
            <Title level={5}>{intl.get('screen.analytics.transcriptomic.title')}</Title>
            <Paragraph className={styles.description}>
              {intl.get('screen.analytics.transcriptomic.description')}
            </Paragraph>
          </div>
          <Space size={8}>
            <Tag color="cyan">
              {intl.get('screen.analytics.transcriptomic.tags.transcriptomics')}
            </Tag>
            <Tag color="green">{intl.get('screen.analytics.transcriptomic.tags.gene')}</Tag>
          </Space>
        </Space>
        <Divider className={styles.divider} />
        <Button
          onClick={() => {
            navigate(STATIC_ROUTES.ANALYTICS_TRANSCRIPTOMIC);
          }}
          icon={<BarChartOutlined />}
        >
          {intl.get('screen.analytics.widget.launch')}
        </Button>
      </Space>
    </Card>
  );
};

export default HtpWidget;
