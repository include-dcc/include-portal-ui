import intl from 'react-intl-universal';
import { Form, Input, Modal, Typography } from 'antd';

// import { Store } from 'antd/lib/form/interface';
import RequestBiospecimenTable, { IRequestBioDataRow } from './RequestBiospecimenTable';

import styles from './requestBiospecimen.module.scss';

type OwnProps = {
  biospecimenIds: string[];
  isOpen: boolean;
  onCancel: () => void;
};

const { Text } = Typography;

const RequestBiospecimenModal = ({ biospecimenIds, isOpen, onCancel }: OwnProps) => {
  const [editForm] = Form.useForm();

  // Backend call to have table data if is open
  const tableData = [
    { study_code: 'HTP', nb_participants: 256, nb_samples: 10, nb_containers: 7 },
    { study_code: 'Hakonarson', nb_participants: 23, nb_samples: 5, nb_containers: 2 },
  ];
  let availableSamplesCount = 0;
  tableData.forEach((data: IRequestBioDataRow) => {
    availableSamplesCount += data.nb_samples;
  });

  //   const onFinish = async (values: Store) => {
  // const { title } = values;
  // console.log('title', title);
  // Check unicité title ou dans le call back ?
  // dispatch create save set
  //   };

  return (
    <Modal
      cancelText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.cancelText')}
      title={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.title')}
      open={isOpen}
      onCancel={() => {
        editForm.resetFields();
        onCancel();
      }}
      okText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.okText')}
      // eslint-disable-next-line no-console
      onOk={() => editForm.submit()}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.description}>
          <Text>
            {intl.getHTML(`screen.dataExploration.tabs.biospecimens.request.modal.description`, {
              availableSamplesCount,
              totalCount: biospecimenIds.length,
            })}
          </Text>
        </div>
        <div className={styles.nameForm}>
          <Text strong>
            {intl.get('screen.dataExploration.tabs.biospecimens.request.modal.nameForm.title')}
          </Text>
          <p className={styles.note}>
            {intl.get('screen.dataExploration.tabs.biospecimens.request.modal.nameForm.note')}
          </p>
          <Form
            fields={[{ name: ['title'], value: '' }]}
            form={editForm}
            layout="vertical"
            // onFinish={onFinish}
          >
            <Form.Item
              name="title"
              required={false}
              rules={[
                {
                  message: (
                    <span>
                      {intl.get(
                        'screen.dataExploration.tabs.biospecimens.request.modal.nameForm.requiredError',
                      )}
                    </span>
                  ),
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <Input
                autoFocus
                placeholder={intl.get(
                  'screen.dataExploration.tabs.biospecimens.request.modal.nameForm.placeholder',
                )}
              />
            </Form.Item>
          </Form>
        </div>
        {/* change loading with back end call */}
        <RequestBiospecimenTable data={tableData} loading={false} />
      </div>
    </Modal>
  );
};

export default RequestBiospecimenModal;
