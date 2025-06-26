import { ReactElement, useCallback, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Card, Space } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';

import { formatQuerySortList } from 'utils/helper';

import { SectionId } from '../utils/anchorLinks';

import styles from './index.module.css';

interface TableViewProps {
  loading: boolean;
  data: IBiospecimenEntity[];
  biospecimensDefaultColumns: ProColumnType[];
  userColumnPreferencesOrDefault: {
    index: number;
    key: string;
    visible: boolean;
  }[];
}

const sortByKey = ({
  array,
  sortList,
}: {
  array: any[];
  sortList: { field: string; order: SortDirection }[];
}): any[] => {
  if (!sortList || !sortList.length) {
    return array;
  }
  let resultSorted = array;
  sortList.forEach((sort) => {
    resultSorted = resultSorted.sort((a, b) => {
      const x = a[sort.field];
      const y = b[sort.field];
      return sort.order === SortDirection.Asc
        ? x < y
          ? -1
          : x > y
          ? 1
          : 0
        : x > y
        ? -1
        : x < y
        ? 1
        : 0;
    });
  });
  return resultSorted;
};

const TableView = ({
  biospecimensDefaultColumns,
  data,
  loading,
  userColumnPreferencesOrDefault,
}: TableViewProps): ReactElement => {
  const [scroll, setScroll] = useState<{ y: number } | undefined>(undefined);
  const tableRef = useCallback((node: any) => {
    const height = node?.clientHeight ?? 0;
    if (height > 400) {
      setScroll({ y: 400 });
    }
  }, []);
  const [biospecimens, setBiospecimens] = useState<IBiospecimenEntity[]>(
    data.map((i) => ({ ...i, key: i.id })),
  );

  return (
    <Card className={styles.card} loading={loading}>
      {!loading && biospecimens.length ? (
        <ProTable
          bordered
          columns={biospecimensDefaultColumns}
          dataSource={biospecimens}
          showSorterTooltip={false}
          onChange={(_pagination, _filter, sorter) => {
            const bioSorted = sortByKey({
              array: biospecimens,
              sortList: formatQuerySortList(sorter),
            });
            setBiospecimens(bioSorted);
          }}
          headerConfig={{
            hideItemsCount: true,
            itemCount: {
              pageIndex: 0,
              pageSize: 0,
              total: 0,
            },
          }}
          initialColumnState={userColumnPreferencesOrDefault}
          loading={loading}
          rowClassName={styles.notStriped}
          tableId={SectionId.BIOSPECIMEN}
          size="small"
          tableHeaderClassName={styles.tableHeader}
          wrapperClassName={styles.contentTable}
          tableRef={tableRef}
          scroll={scroll}
        />
      ) : (
        <Space className={styles.content} direction="vertical" size={12}>
          <Empty
            align="left"
            description={intl.get('no.data.available')}
            noPadding
            showImage={false}
            size="mini"
          />
        </Space>
      )}
    </Card>
  );
};

export default TableView;
