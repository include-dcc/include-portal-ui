import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './index.module.scss';

interface OwnProps {
  isOwnUser: boolean;
}

const Banner = ({ isOwnUser }: OwnProps) => (
  <div className={styles.bannerActions}>
    <Button className={styles.communityBtn} type="link" icon={<ArrowLeftOutlined />}>
      Community
    </Button>
    {isOwnUser && (
      <Button className={styles.editBtn} type="primary" ghost icon={<EditOutlined />}>
        Edit Profile
      </Button>
    )}
  </div>
);

export default Banner;
