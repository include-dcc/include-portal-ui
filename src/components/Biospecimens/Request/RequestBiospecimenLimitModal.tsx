import intl from 'react-intl-universal';
import { Alert, Modal, Typography } from 'antd';

import styles from './requestBiospecimen.module.scss';

type OwnProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const { Text } = Typography;

const RequestBiospecimenLimitModal = ({ isOpen, closeModal }: OwnProps) => (
  <Modal
    cancelText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.cancelText')}
    title={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.title')}
    open={isOpen}
    onCancel={() => {
      closeModal();
    }}
    okButtonProps={{
      disabled: true,
    }}
    okText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.okText')}
    width={680}
  >
    <div className={styles.modalWrapper}>
      <div className={styles.description}>
        <Text>
          {intl.get(`screen.dataExploration.tabs.biospecimens.request.modal.description`)}
        </Text>
      </div>
      <Alert
        type="error"
        message={intl.getHTML(
          'screen.dataExploration.tabs.biospecimens.request.modal.alert.limitMessage',
        )}
        description={intl.getHTML(
          'screen.dataExploration.tabs.biospecimens.request.modal.alert.limitDescription',
        )}
      />
    </div>
  </Modal>
);

export default RequestBiospecimenLimitModal;
