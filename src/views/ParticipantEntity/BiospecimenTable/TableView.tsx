import { ReactElement, useCallback, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import Empty from '@ferlab/ui/core/components/Empty';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { Card, Space } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userColsHaveSameKeyAsDefaultCols } from 'utils/tables';

import { SectionId } from '../utils/anchorLinks';
import { getBiospecimensDefaultColumns } from '../utils/biospecimens';

import styles from './index.module.css';

interface TableViewProps {
  loading: boolean;
  data: IBiospecimenEntity[];
}

const TableView = ({ data, loading }: TableViewProps): ReactElement => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [scroll, setScroll] = useState<{ y: number } | undefined>(undefined);
  const tableRef = useCallback((node: any) => {
    const height = node?.clientHeight ?? 0;
    if (height > 400) {
      setScroll({ y: 400 });
    }
  }, []);

  const biospecimensDefaultColumns = getBiospecimensDefaultColumns();

  const userColumnPreferences = userInfo?.config?.participants?.tables?.biospecimens?.columns || [];
  const userColumnPreferencesOrDefault = userColsHaveSameKeyAsDefaultCols(
    userColumnPreferences,
    biospecimensDefaultColumns,
  )
    ? [...userColumnPreferences]
    : biospecimensDefaultColumns.map((c, index) => ({
        visible: true,
        index,
        key: c.key,
      }));

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
            extra: [
              <DownloadDataButton
                biospecimenIds={[...data.map((biospecimen) => biospecimen.sample_id)]}
                key="downloadSampleData"
              />,
            ],
            enableTableExport: true,
            enableColumnSort: true,
            onColumnSortChange: (newState) =>
              dispatch(
                updateUserConfig({
                  participants: {
                    tables: {
                      biospecimens: {
                        columns: newState,
                      },
                    },
                  },
                }),
              ),
            onTableExportClick: () =>
              dispatch(
                generateLocalTsvReport({
                  index: INDEXES.PARTICIPANT,
                  fileName: 'biospecimens',
                  headers: biospecimensDefaultColumns,
                  cols: userColumnPreferencesOrDefault.map((x) => ({
                    visible: x.visible,
                    key: x.key,
                  })),
                  rows: data,
                }),
              ),
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
