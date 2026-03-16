import intl from 'react-intl-universal';
import { Button, Modal } from 'antd';

import { getScheduleDiagramProps } from '../utils/design';

import styles from './index.module.css';

interface IScheduleDiagramModalProps {
  studyCode: string;
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleDiagramModal = ({ studyCode, isOpen, onClose }: IScheduleDiagramModalProps) => {
  const { diagramAlt, diagramSrc } = getScheduleDiagramProps(studyCode);

  return (
    <Modal
      closable
      footer={
        <Button type="primary" onClick={onClose}>
          {intl.get('global.close')}
        </Button>
      }
      onCancel={onClose}
      open={isOpen}
      title={intl.get('entities.study.clinical_trials.schedule_title')}
      className={styles.modalWrapper}
      centered={false}
    >
      <img src={diagramSrc} alt={diagramAlt} className={styles.diagram} />
    </Modal>
  );
};

export default ScheduleDiagramModal;
