import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Modal, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

import TooMuchFilesAlert from '../TooMuchFilesAlert';

import FilesTable from './FilesTable';

import styles from './index.module.css';

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  type?: 'default' | 'primary';
  size?: SizeType;
  isDisabled?: boolean;
  disabledTooltip?: string;
  hasTooManyFiles?: boolean;
}

const DownloadFileManifestModal = ({
  sqon,
  type = 'default',
  size = undefined,
  isDisabled,
  disabledTooltip,
  hasTooManyFiles,
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  let tooltipText = undefined;
  if (isDisabled) {
    if (disabledTooltip) {
      tooltipText = disabledTooltip;
    } else {
      tooltipText = intl.get('screen.dataExploration.itemSelectionTooltip');
    }
  }

  return (
    <>
      <Tooltip title={tooltipText}>
        <Button
          icon={<DownloadOutlined />}
          onClick={(event) => {
            event.stopPropagation();
            setIsModalVisible(true);
          }}
          size={size}
          type={type}
          disabled={isDisabled}
        >
          {intl.get('api.report.fileManifest.button')}
        </Button>
      </Tooltip>
      <Modal
        open={isModalVisible}
        title={intl.get('api.report.fileManifest.title')}
        okText={intl.get('api.report.fileManifest.okText')}
        okButtonProps={{ disabled: hasTooManyFiles }}
        cancelText={intl.get('api.report.fileManifest.cancel')}
        onCancel={(event) => {
          event.stopPropagation();
          setIsModalVisible(false);
        }}
        onOk={(event) => {
          event.stopPropagation();
          dispatch(
            fetchReport({
              data: {
                name: ReportType.FILE_MANIFEST,
                fileName: ReportType.FILE_MANIFEST,
                sqon,
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
      >
        <p>{intl.getHTML('api.report.fileManifest.text')}</p>
        {hasTooManyFiles && <TooMuchFilesAlert />}
        {!hasTooManyFiles && isModalVisible && <FilesTable sqon={sqon} />}
      </Modal>
    </>
  );
};

export default DownloadFileManifestModal;
