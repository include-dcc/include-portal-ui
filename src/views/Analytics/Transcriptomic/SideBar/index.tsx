import { ReactNode, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Button } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

export type TTranscriptomicSideBarItem = {
  key: string | number;
  title: string | ReactNode;
  content: (() => ReactNode) | ReactNode;
};

type OwnProps = {
  className?: string;
  menuItems: TTranscriptomicSideBarItem[];
};

const SideBarFacet = ({ className, menuItems }: OwnProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <StackLayout
      className={cx(className, styles.sideBarFacet, { [styles.collapsed]: collapsed })}
      vertical
      flexContent
    >
      <Button className={styles.button} type="text" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? (
          <MenuUnfoldOutlined className={styles.collapseIcon} />
        ) : (
          <MenuFoldOutlined className={styles.collapseIcon} />
        )}
      </Button>

      <ScrollContent>
        {!collapsed && (
          <div className={styles.content}>
            {menuItems.map((item) => (
              <div key={item.key} className={styles.menuItem}>
                <div className={styles.menuTitle}>{item.title}</div>
                <div className={styles.menuContent}>
                  {typeof item.content === 'function' ? item.content() : item.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollContent>
    </StackLayout>
  );
};

export default SideBarFacet;
