import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Table } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from './requestBiospecimen.module.scss';

// const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

export interface IRequestBioDataRow {
  study_code: string;
  nb_participants: number;
  nb_samples: number;
  nb_containers: number;
}

export const getDataTypeColumns = (): ProColumnType<any>[] => [
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: 'Study',
    render: (value: string) => value || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_participants',
    dataIndex: 'nb_participants',
    title: 'Participants',
    render: (nb_participants: number) =>
      nb_participants ? numberWithCommas(nb_participants) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_samples',
    dataIndex: 'nb_samples',
    title: 'Available Samples',
    render: (nb_samples: number) =>
      nb_samples ? numberWithCommas(nb_samples) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_containers',
    dataIndex: 'nb_containers',
    title: 'Containers',
    render: (nb_containers: number) =>
      nb_containers ? numberWithCommas(nb_containers) : TABLE_EMPTY_PLACE_HOLDER,
  },
];

const RequestBiospecimenTable = ({
  data,
  loading = false,
}: {
  data: IRequestBioDataRow[];
  loading: boolean;
}) => (
  //   const config: AxiosRequestConfig = {
  //     // @ts-ignore
  //     url: REPORTS_ROUTES[ReportType.FILE_MANIFEST_STATS],
  //     method: 'POST',
  //     responseType: 'json',
  //     data: {
  //       sqon,
  //       projectId: ARRANGER_PROJECT_ID,
  //     },
  //     headers: headers(),
  //   };

  //   const { loading, result } = useApi({ config });
  //   const files = (result as IFileByDataType[]) || [];

  <Table
    columns={getDataTypeColumns()}
    dataSource={data}
    pagination={false}
    size="small"
    rowClassName={styles.notStriped}
    // className={styles.table}
    bordered
    loading={loading}
  />
);
export default RequestBiospecimenTable;
