import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Form, Input, Modal, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { MAX_TITLE_LENGTH } from 'views/DataExploration/components/PageContent';

import { SetType } from 'services/api/savedSet/models';
import { PROJECT_ID, useSavedSet } from 'store/savedSet';
import { createSavedSet } from 'store/savedSet/thunks';

import RequestBiospecimenTable, { IRequestBioDataRow } from './RequestBiospecimenTable';

import styles from './requestBiospecimen.module.scss';

type OwnProps = {
  biospecimenIds: string[];
  isOpen: boolean;
  idField: string;
  onCancel: () => void;
  sqon?: ISqonGroupFilter;
};

const { Text } = Typography;
export const REQUEST_BIOSPECIMEN_PREFIXE = 'reqbio_';

const RequestBiospecimenModal = ({ biospecimenIds, idField, isOpen, onCancel, sqon }: OwnProps) => {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, savedSets } = useSavedSet();

  // TODO Backend call to have table data if is open
  const tableData = [
    { study_code: 'HTP', nb_participants: 256, nb_samples: 10, nb_containers: 7 },
    { study_code: 'Hakonarson', nb_participants: 23, nb_samples: 5, nb_containers: 2 },
  ];
  let availableSamplesCount = 0;
  tableData.forEach((data: IRequestBioDataRow) => {
    availableSamplesCount += data.nb_samples;
  });

  const isNameExists = (newSetName: string) => {
    const requestBioNamesExisting = savedSets
      .filter(
        (set) =>
          set.setType === SetType.BIOSPECIMEN && set.tag.startsWith(REQUEST_BIOSPECIMEN_PREFIXE),
      )
      .map((s) => s.tag);

    return requestBioNamesExisting.includes(newSetName);
  };

  const onFinish = async (values: Store) => {
    const { name } = values;

    if (isNameExists(name)) {
      editForm.setFields([
        {
          name: 'name',
          errors: [
            intl.get(
              'screen.dataExploration.tabs.biospecimens.request.modal.nameForm.existingNameError',
            ),
          ],
        },
      ]);
    } else {
      dispatch(
        createSavedSet({
          idField: idField || 'fhir_id',
          projectId: PROJECT_ID,
          sort: [],
          sqon: sqon!,
          tag: `${REQUEST_BIOSPECIMEN_PREFIXE}${name}`,
          type: SetType.BIOSPECIMEN,
          onCompleteCb: onCancel,
        }),
      );
    }
  };

  return (
    <Modal
      cancelText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.cancelText')}
      title={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.title')}
      open={isOpen}
      onCancel={() => {
        editForm.resetFields();
        onCancel();
      }}
      okButtonProps={{ disabled: isLoading, loading: isLoading }}
      okText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.okText')}
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
            fields={[{ name: ['name'], value: '' }]}
            form={editForm}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              required={false}
              rules={[
                {
                  type: 'string',
                  max: MAX_TITLE_LENGTH,
                  message: (
                    <span>
                      <WarningFilled /> {MAX_TITLE_LENGTH}{' '}
                      {intl.get(
                        'screen.dataExploration.tabs.biospecimens.request.modal.nameForm.maximumLength',
                      )}
                    </span>
                  ),
                  validateTrigger: 'onSubmit',
                },
                {
                  message: intl.get(
                    'screen.dataExploration.tabs.biospecimens.request.modal.nameForm.requiredError',
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
