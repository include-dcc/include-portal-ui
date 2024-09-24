import React from 'react';
import { Button, Modal } from 'antd';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  title: string;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose, content, title }) => (
  <Modal
    title={title}
    open={open}
    onCancel={onClose}
    footer={
      <Button type="primary" onClick={onClose}>
        Close
      </Button>
    }
  >
    {content}
  </Modal>
);

export default AboutModal;
