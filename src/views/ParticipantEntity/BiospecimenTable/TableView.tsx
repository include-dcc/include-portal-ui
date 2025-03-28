import { ReactElement, useCallback, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Card, Space } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';

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

  return (
    <Card className={styles.card} loading={loading}>
      {!loading && data.length ? (
        <ProTable
          bordered={true}
          columns={biospecimensDefaultColumns}
          dataSource={data}
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
