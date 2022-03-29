import { Space, Typography } from 'antd';
import { ReactNode } from 'react';

import styles from './index.module.scss';

interface OwnProps {
  icon?: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
}

const { Text } = Typography;

const SelectItem = ({ icon, title, caption }: OwnProps) => {
  return (
    <Space size={10} align="start">
      <div className={styles.iconWrapper}>{icon}</div>
      <Space direction="vertical" size={0}>
        {title}
        <Text type="secondary">{caption}</Text>
      </Space>
    </Space>
  );
};

export default SelectItem;