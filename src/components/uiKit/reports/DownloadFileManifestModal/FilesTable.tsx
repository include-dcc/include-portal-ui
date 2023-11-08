import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Table } from 'antd';
import { AxiosRequestConfig } from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import useApi from 'hooks/useApi';
import { headers, REPORTS_ROUTES } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';
import { formatFileSize } from 'utils/formatFileSize';

import styles from './index.module.scss';

const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

interface IFileByDataType {
  key: string;
  value: string;
  nb_participants: number;
  nb_files: number;
  size: number;
}

export const getDataTypeColumns = (): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('api.report.fileManifest.dataType'),
    render: (value: string) => value || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_participants',
    dataIndex: 'nb_participants',
    title: intl.get('api.report.fileManifest.participants'),
    render: (nb_participants: number) =>
      nb_participants ? numberWithCommas(nb_participants) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    dataIndex: 'nb_files',
    title: intl.get('api.report.fileManifest.files'),
    render: (nb_files: number) =>
      nb_files ? numberWithCommas(nb_files) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'size',
    dataIndex: 'size',
    title: intl.get('api.report.fileManifest.size'),
    render: (size: number) =>
      formatFileSize(size, { output: 'string' }) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const FilesTable = ({ sqon }: { sqon: ISyntheticSqon }) => {
  const config: AxiosRequestConfig = {
    // @ts-ignore
    url: REPORTS_ROUTES[ReportType.FILE_MANIFEST_STATS],
    method: 'POST',
    responseType: 'json',
    data: {
      sqon,
      projectId: ARRANGER_PROJECT_ID,
    },
    headers: headers(),
  };

  const { loading, result } = useApi({ config });
  const files = (result as IFileByDataType[]) || [];

  return (
    <Table
      columns={getDataTypeColumns()}
      dataSource={files}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
      className={styles.table}
      bordered
      loading={loading}
    />
  );
};

export default FilesTable;
