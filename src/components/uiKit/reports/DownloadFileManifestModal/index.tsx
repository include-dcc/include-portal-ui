import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Checkbox, Modal, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

import TooMuchFilesAlert from '../TooMuchFilesAlert';

import FilesTable from './FilesTable';

import styles from './index.module.css';

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  className?: string;
  disabledTooltip?: string;
  familyCheckbox?: boolean;
  fileName?: string;
  hasTooManyFiles?: boolean;
  isDisabled?: boolean;
  size?: SizeType;
  type?: 'default' | 'primary';
}

const DownloadFileManifestModal = ({
  sqon,
  className = '',
  disabledTooltip,
  familyCheckbox = true,
  fileName,
  hasTooManyFiles,
  isDisabled,
  size = undefined,
  type = 'default',
}: IDownloadFileManifestProps) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFamilyChecked, setIsFamilyChecked] = useState(false);
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
          className={className}
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
                fileName:
                  fileName || (isFamilyChecked ? `familyManifest` : ReportType.FILE_MANIFEST),
                sqon,
                withFamily: isFamilyChecked,
              },
              callback: () => setIsModalVisible(false),
            }),
          );
        }}
        className={styles.modal}
      >
        <p>{intl.getHTML('api.report.fileManifest.text')}</p>
        {familyCheckbox && (
          <Checkbox checked={isFamilyChecked} onChange={() => setIsFamilyChecked(!isFamilyChecked)}>
            {intl.get('api.report.fileManifest.textCheckbox')}
          </Checkbox>
        )}
        {hasTooManyFiles && <TooMuchFilesAlert />}
        {!hasTooManyFiles && isModalVisible && <FilesTable sqon={sqon} />}
      </Modal>
    </>
  );
};

export default DownloadFileManifestModal;
