import React from 'react';
import intl from 'react-intl-universal';
import { Alert, Button, Modal, Space } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

import styles from './index.module.css';

interface NdaGuidsModalProps {
  open: boolean;
  onClose: () => void;
}

const NdaGuidsModal: React.FC<NdaGuidsModalProps> = ({ open, onClose }) => (
  <Modal
    title={intl.get('screen.studies.ndaGuids.modal.title')}
    open={open}
    onCancel={onClose}
    okText={intl.get('screen.studies.ndaGuids.modal.close')}
    onOk={onClose}
    cancelButtonProps={{ hidden: true }}
    className={styles.modal}
  >
    <Space size={24} direction="vertical">
      <div>
        <Paragraph>{intl.getHTML('screen.studies.ndaGuids.modal.firstText')}</Paragraph>
        <Paragraph>{intl.getHTML('screen.studies.ndaGuids.modal.secondText')}</Paragraph>
        <Paragraph>{intl.getHTML('screen.studies.ndaGuids.modal.thirdText')}</Paragraph>
        <span>{intl.get('screen.studies.ndaGuids.modal.steps')}</span>
      </div>
      <Alert
        showIcon
        type="info"
        className={styles.step1}
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
    </Space>
  </Modal>
);

export default NdaGuidsModal;
