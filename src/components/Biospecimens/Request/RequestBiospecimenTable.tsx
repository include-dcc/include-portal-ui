import intl from 'react-intl-universal';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Table, Tooltip } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from './requestBiospecimen.module.scss';

export interface IRequestBioDataRow {
  study_code: string;
  nb_participants: number;
  nb_available_samples: number;
  nb_containers: number;
}

export const getDataTypeColumns = (): ColumnType<any>[] => [
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('screen.dataExploration.tabs.biospecimens.request.modal.table.studyCode'),
    render: (value: string) => value || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_participants',
    dataIndex: 'nb_participants',
    title: intl.get('screen.dataExploration.tabs.biospecimens.request.modal.table.nbParticipants'),
    render: (nb_participants: number) =>
      nb_participants ? numberWithCommas(nb_participants) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_available_samples',
    dataIndex: 'nb_available_samples',
    title: (
      <Tooltip
        className={styles.tooltip}
        title={intl.get(
          'screen.dataExploration.tabs.biospecimens.request.modal.table.nbAvailableSamplesTooltip',
        )}
      >
        {intl.get(
          'screen.dataExploration.tabs.biospecimens.request.modal.table.nbAvailableSamples',
        )}
      </Tooltip>
    ),
    render: (nb_samples: number) =>
      nb_samples ? numberWithCommas(nb_samples) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_containers',
    dataIndex: 'nb_containers',
    title: intl.get('screen.dataExploration.tabs.biospecimens.request.modal.table.nbContainers'),
    render: (nb_containers: number) =>
      nb_containers ? numberWithCommas(nb_containers) : TABLE_EMPTY_PLACE_HOLDER,
  },
];

const RequestBiospecimenTable = ({
  data,
  loading,
  sqon,
}: {
  data: IRequestBioDataRow[];
  loading: boolean;
  sqon?: ISqonGroupFilter;
}) => {
  if (!sqon) return <></>;

  return (
    <Table
      columns={getDataTypeColumns()}
      dataSource={data.map((i) => ({ ...i, key: i.study_code }))}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
      bordered
      loading={loading}
    />
  );
};
export default RequestBiospecimenTable;
