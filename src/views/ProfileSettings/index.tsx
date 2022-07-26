import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Alert, Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useUser } from 'store/user';
import intl from 'react-intl-universal';
import IdentificationCard from './cards/Identification';

import styles from './index.module.scss';

const { Title } = Typography;

const ProfileSettings = () => {
  const { userInfo } = useUser();

  return (
    <div className={styles.profileSettingsWrapper}>
      <Space size={16} direction="vertical" className={styles.profileSettings}>
        <div className={styles.profileSettingsHeader}>
          <Title level={4}>{intl.get('screen.profileSettings.title')}</Title>
          <Link to={`/member/${userInfo?.keycloak_id}`}>
            <Button type="primary">{intl.get('screen.profileSettings.viewProfile')}</Button>
          </Link>
        </div>
        <IdentificationCard />
      </Space>
    </div>
  );
};

export default ProfileSettings;
