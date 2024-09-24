import React from 'react';
import intl from 'react-intl-universal';
import { Button, Modal, Typography } from 'antd';

import styles from './index.module.css';

const { Title } = Typography;

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose, children, title }) => (
  <Modal
    title={<Title className={styles.title}>{title}</Title>}
    open={open}
    onCancel={onClose}
    footer={
      <Button type="primary" onClick={onClose}>
        {intl.get('screen.analytics.transcriptomic.about.close')}
      </Button>
    }
  >
    {children}
  </Modal>
);

export default AboutModal;
