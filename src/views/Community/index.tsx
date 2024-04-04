import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import TableHeader from '@ferlab/ui/core/components/ProTable/Header';
import { List, Space, Typography } from 'antd';
import debounce from 'lodash/debounce';

import { MAIN_SCROLL_WRAPPER_ID } from 'common/constants';
import { ISearchParams, UserApi } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { scrollToTop } from 'utils/helper';
import { numberWithCommas } from 'utils/string';

import FiltersBox from './components/Filters/Box';
import { SortItems } from './components/Filters/Sorter';
import MemberCard from './components/MemberCard';

import styles from './index.module.scss';

const { Title } = Typography;
const DEFAULT_PAGE_SIZE = 25;

const CommunityPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  const [usageFilter, setUsageFilter] = useState('');

  const defaultActiveFilter: ISearchParams = {
    pageIndex: 0,
    sort: SortItems[0].sort,
    match: '',
  };
  const [activeFilter, setActiveFilter] = useState<ISearchParams>(defaultActiveFilter);
  const onMatchFilterChange = (match: string) => setActiveFilter({ ...defaultActiveFilter, match });
  const onSortChange = (sort: string) => setActiveFilter({ ...defaultActiveFilter, sort });
  const setCurrentPage = (pageIndex: number) => setActiveFilter({ ...activeFilter, pageIndex });

  useEffect(() => {
    setIsLoading(true);
    UserApi.search({
      pageIndex: activeFilter.pageIndex,
      pageSize: DEFAULT_PAGE_SIZE,
      match: activeFilter.match,
      sort: activeFilter.sort,
      roles: roleFilter,
      dataUses: usageFilter,
    }).then(({ data }) => {
      setUsers(data?.users || []);
      setCount(data?.total || 0);
      setIsLoading(false);
    });
  }, [activeFilter, roleFilter, usageFilter]);

  return (
    <Space direction="vertical" size={24} className={styles.communityWrapper}>
      <Title className={styles.title} level={4}>
        {intl.get('screen.community.title')}
      </Title>
      <FiltersBox
        onMatchFilterChange={debounce((match) => onMatchFilterChange(match), 300)}
        onRoleFilterChange={setRoleFilter}
        onUsageFilterChange={setUsageFilter}
        onSortChange={onSortChange}
        hasFilters={!!(roleFilter || usageFilter)}
      />
      <Space className={styles.usersListWrapper} size={24} direction="vertical">
        <TableHeader
          pageIndex={(activeFilter.pageIndex || 0) + 1}
          pageSize={DEFAULT_PAGE_SIZE}
          total={count}
          dictionary={{
            itemCount: {
              result: intl.get('screen.community.resultMember'),
              results: intl.get('screen.community.resultsMember'),
              noResults: intl.get('screen.community.noResults'),
              clear: '',
              of: '',
              selectAllResults: '',
              selected: '',
              selectedPlural: '',
              clearFilters: '',
            },
            numberFormat: numberWithCommas,
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
            current: (activeFilter.pageIndex || 0) + 1,
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
              <MemberCard user={item} match={activeFilter.match || ''} />
            </List.Item>
          )}
        />
      </Space>
    </Space>
  );
};

export default CommunityPage;
