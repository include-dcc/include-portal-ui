import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  ICavaticaAuthentification,
  PASSPORT_AUTHENTIFICATION_STATUS,
} from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { Alert, Button, Modal, Space } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

import { connectCavaticaPassport } from 'store/passport/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface NdaGuidsModalProps {
  authentification: ICavaticaAuthentification;
  open: boolean;
  onClose: () => void;
  handleOpenCavaticaModal: () => void;
}

const NdaGuidsModal: React.FC<NdaGuidsModalProps> = ({
  authentification,
  open,
  onClose,
  handleOpenCavaticaModal,
}) => {
  const dispatch = useDispatch();

  const analyzeCavatica = () => {
    if (authentification.status !== PASSPORT_AUTHENTIFICATION_STATUS.connected) {
      Modal.confirm({
        cancelText: intl.get('screen.dataExploration.tabs.datafiles.cavatica.authWarning.cancel'),
        content: intl.get('screen.dataExploration.tabs.datafiles.cavatica.authWarning.description'),
        icon: <ExclamationCircleOutlined />,
        okText: intl.get('screen.dataExploration.tabs.datafiles.cavatica.authWarning.connect'),
        // onCancel: onResetModal,
        onOk: () => {
          dispatch(connectCavaticaPassport());
        },
        title: intl.get('screen.dataExploration.tabs.datafiles.cavatica.authWarning.title'),
        type: 'warn',
      });
    } else {
      handleOpenCavaticaModal();
      onClose();
    }
  };

  return (
    <Modal
      title={intl.get('screen.studies.ndaGuids.modal.title')}
      open={open}
      onCancel={onClose}
      okText={intl.get('screen.studies.ndaGuids.modal.close')}
      onOk={onClose}
      cancelButtonProps={{ hidden: true }}
      className={styles.guidModal}
    >
      <Space size={24} direction="vertical">
        <div>
          <Paragraph>{intl.getHTML('screen.studies.ndaGuids.modal.firstText')}</Paragraph>
          <Paragraph>{intl.getHTML('screen.studies.ndaGuids.modal.secondText')}</Paragraph>
          <Paragraph>
            {intl.getHTML('screen.studies.ndaGuids.modal.thirdTextStart')}
            <Link to={STATIC_ROUTES.STUDIES} className={styles.studiesLink} target="_blank">
              {intl.get('screen.studies.ndaGuids.modal.thirdTextLink')}
            </Link>
            .
          </Paragraph>
          <span>{intl.get('screen.studies.ndaGuids.modal.steps')}</span>
        </div>
        <Alert
          showIcon
          icon={<CheckCircleOutlined />}
          type="info"
          className={styles.step}
          message={intl.get('screen.studies.ndaGuids.modal.step1.title')}
          description={
            <div className={styles.description}>
              {intl.get('screen.studies.ndaGuids.modal.step1.message')}
              <Button
                href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs003678.v1.p1"
                target="_blank"
                type="primary"
              >
                {intl.get('screen.studies.ndaGuids.modal.step1.buttonLabel')}
              </Button>
            </div>
          }
        />
        <Alert
          showIcon
          icon={<CheckCircleOutlined />}
          type="info"
          className={styles.step}
          message={intl.get('screen.studies.ndaGuids.modal.step2.title')}
          description={
            <div className={styles.description}>
              {intl.getHTML('screen.studies.ndaGuids.modal.step2.message')}
              <Button type="primary" onClick={analyzeCavatica}>
                {intl.get('screen.studies.ndaGuids.modal.step2.buttonLabel')}
              </Button>
            </div>
          }
        />
      </Space>
    </Modal>
  );
};

export default NdaGuidsModal;
