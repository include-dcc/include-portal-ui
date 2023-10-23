import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { MAX_TITLE_LENGTH } from 'views/DataExploration/components/PageContent';
import { SetActionType } from 'views/DataExploration/components/SetsManagementDropdown';

import { isNameExists } from 'components/Biospecimens/Request/requestBiospecimen.utils';
import { IUserSetOutput } from 'services/api/savedSet/models';
import { useSavedSet } from 'store/savedSet';
import { updateSavedSet } from 'store/savedSet/thunks';

import styles from './editBiospecimenRequestModal.module.scss';

type EditProps = {
  biospecimenRequest: IUserSetOutput;
  hideModal: () => void;
  isOpen: boolean;
};

const EditBiospecimenRequestModal = ({ biospecimenRequest, hideModal, isOpen }: EditProps) => {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, savedSets } = useSavedSet();

  const onFinish = async (values: Store) => {
    const { name } = values;

    if (isNameExists(name, savedSets)) {
      editForm.setFields([
        {
          name: 'name',
          errors: [
            intl.get('screen.dashboard.cards.biospecimenRequest.editModal.existingNameError'),
          ],
        },
      ]);
    } else {
      dispatch(
        updateSavedSet({
          onCompleteCb: hideModal,
          id: biospecimenRequest.id,
          subAction: SetActionType.RENAME_TAG,
          newTag: name,
          isBiospecimenRequest: true,
        }),
      );
    }
  };

  return (
    <Modal
      cancelText={intl.get('screen.dashboard.cards.biospecimenRequest.editModal.cancelText')}
      title={intl.get('screen.dashboard.cards.biospecimenRequest.editModal.title')}
      open={isOpen}
      onCancel={() => {
        editForm.resetFields();
        hideModal();
      }}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      okText={intl.get('screen.dashboard.cards.biospecimenRequest.editModal.okText')}
      onOk={() => editForm.submit()}
    >
      <div className={styles.modalWrapper}>
        <Form
          fields={[
            {
              name: ['name'],
              value: biospecimenRequest.tag,
            },
          ]}
          form={editForm}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label={intl.get('screen.dashboard.cards.biospecimenRequest.editModal.inputLabel')}
            required={false}
            className={styles.formItem}
            rules={[
              {
                type: 'string',
                max: MAX_TITLE_LENGTH,
                message: (
                  <span>
                    <WarningFilled /> {MAX_TITLE_LENGTH}{' '}
                    {intl.get('screen.dashboard.cards.biospecimenRequest.editModal.maximumLength')}
                  </span>
                ),
                validateTrigger: 'onSubmit',
              },
              {
                message: intl.get(
                  'screen.dashboard.cards.biospecimenRequest.editModal.requiredError',
                ),
                required: true,
                type: 'string',
                validateTrigger: 'onSubmit',
              },
            ]}
          >
            <Input
              autoFocus
              placeholder={intl.get(
                'screen.dashboard.cards.biospecimenRequest.editModal.placeholder',
              )}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditBiospecimenRequestModal;
