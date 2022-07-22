import TableHeader from '@ferlab/ui/core/components/ProTable/Header';
import { Space, Typography, List, Card } from 'antd';
import { MAIN_SCROLL_WRAPPER_ID } from 'common/constants';
import { useEffect, useState } from 'react';
import { UserApi } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { scrollToTop } from 'utils/helper';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { DEFAULT_GRAVATAR_PLACEHOLDER } from 'common/constants';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { formatName } from './utils';

const { Title, Text } = Typography;
const DEFAULT_PAGE_SIZE = 25;

const CommunityPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    UserApi.search(currentPage, DEFAULT_PAGE_SIZE).then(({ data }) => {
      setUsers(data?.users || []);
      setCount(data?.total || 0);
      setIsLoading(false);
    });
  }, [currentPage]);

  return (
    <Space direction="vertical" size={16} className={styles.communityWrapper}>
      <Title className={styles.title} level={4}>
        INCLUDE Community
      </Title>
      <Space className={styles.usersListWrapper} size={24} direction="vertical">
        <TableHeader
          pageIndex={currentPage + 1}
          pageSize={DEFAULT_PAGE_SIZE}
          total={count}
          dictionary={{
            itemCount: {
              results: 'Members',
              noResults: 'No members',
              clear: '',
              of: '',
              selectAllResults: '',
              selected: '',
              selectedPlural: '',
            },
          }}
        ></TableHeader>
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={users}
          className={styles.membersList}
          pagination={{
            total: count,
            pageSize: DEFAULT_PAGE_SIZE,
            onChange: (page) => {
              setCurrentPage(page - 1);
              scrollToTop(MAIN_SCROLL_WRAPPER_ID);
            },
            size: 'small',
            hideOnSinglePage: true,
            showSizeChanger: false,
          }}
          loading={isLoading}
          renderItem={(item) => (
            <List.Item className={styles.memberListItem}>
              <Link key={item.id} className={styles.memberLink} to={`/member/${item.keycloak_id}`}>
                <Card className={styles.memberCard}>
                  <Space direction="vertical" align="center">
                    <Gravatar
                      className={styles.userGravatar}
                      circle
                      placeholder={DEFAULT_GRAVATAR_PLACEHOLDER}
                      email={item.email || ''}
                    />
                    <Typography.Title className={styles.memberCardName} level={5}>
                      {formatName(item)}
                    </Typography.Title>
                    {item.affiliation && (
                      <Text type="secondary" className={styles.memberAffiliation}>
                        {item.affiliation}
                      </Text>
                    )}
                  </Space>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Space>
    </Space>
  );
};

export default CommunityPage;
