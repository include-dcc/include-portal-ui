import intl from 'react-intl-universal';
import { Alert, Modal } from 'antd';

type OwnProps = {
  isOpen: boolean;
  onCancel: () => void;
};

const NoSampleModal = ({ isOpen, onCancel }: OwnProps) => (
  <Modal
    cancelButtonProps={{ style: { display: 'none' } }}
    okText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.closeText')}
    onCancel={() => {
      onCancel();
    }}
    onOk={() => {
      onCancel();
    }}
    open={isOpen}
    title={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.title')}
    width={680}
  >
    <Alert
      type="info"
      message={intl.getHTML(
        'screen.dataExploration.tabs.biospecimens.request.modal.alert.infoMessage',
      )}
      description={intl.getHTML(
        'screen.dataExploration.tabs.biospecimens.request.modal.alert.infoDescription',
      )}
    />
  </Modal>
);

export default NoSampleModal;
