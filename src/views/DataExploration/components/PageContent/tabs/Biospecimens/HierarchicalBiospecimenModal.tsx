import intl from 'react-intl-universal';
import { Modal } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';

import BiospecimenTree from 'components/Biospecimens/Tree';

import styles from './index.module.css';

interface OwnProps {
  biospecimen?: IBiospecimenEntity;
  isOpen: boolean;
  onClose: () => void;
}

const HierarchicalBiospecimenModal = ({ biospecimen, isOpen, onClose }: OwnProps) => (
  <Modal
    onCancel={onClose}
    open={isOpen}
    title={intl.get('screen.dataExploration.tabs.biospecimens.hierarchicalBiospecime.modal.title', {
      participantId: biospecimen?.participant?.participant_id,
    })}
    onOk={onClose}
    cancelButtonProps={{ hidden: true }}
    className={styles.hierarchicalModal}
  >
    <BiospecimenTree />
  </Modal>
);

export default HierarchicalBiospecimenModal;
