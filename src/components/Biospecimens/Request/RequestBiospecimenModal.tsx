import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Alert, Form, Input, Modal, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import keycloak from 'auth/keycloak-api/keycloak';
import { AxiosRequestConfig } from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';
import { MAX_TITLE_LENGTH } from 'views/DataExploration/components/PageContent';

import useApi from 'hooks/useApi';
import { trackRequestBiospecimen } from 'services/analytics';
import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';
import { PROJECT_ID, useSavedSet } from 'store/savedSet';
import { fetchSavedSet } from 'store/savedSet/thunks';

import NoSampleModal from './NoSampleModal';
import { isNameExists } from './requestBiospecimen.utils';
import RequestBiospecimenTable, { IRequestBioDataRow } from './RequestBiospecimenTable';

import styles from './requestBiospecimen.module.scss';

const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');
const REPORTS_API_URL = EnvironmentVariables.configFor('REPORTS_API_URL');

type OwnProps = {
  isOpen: boolean;
  closeModal: () => void;
  sqon?: ISqonGroupFilter;
};

const { Text } = Typography;

export const headers = () => ({
  'Content-Type': 'application/json',
  Accept: '*/*',
  Authorization: `Bearer ${keycloak.token}`,
});

const RequestBiospecimenModal = ({ isOpen, closeModal, sqon }: OwnProps) => {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, savedSets } = useSavedSet();

  const config: AxiosRequestConfig = {
    url: `${REPORTS_API_URL}/reports/biospecimen-request/stats`,
    method: 'POST',
    responseType: 'json',
    data: {
      sqon,
      projectId: ARRANGER_PROJECT_ID,
    },
    headers: headers(),
  };

  const { error, loading, result } = useApi({ config });
  const samples = (result as IRequestBioDataRow[]) || [];

  const onFinish = async (values: Store) => {
    trackRequestBiospecimen('download manifest');
    const { name } = values;

    if (isNameExists(name, savedSets)) {
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
      // set creation and download zip
      dispatch(
        fetchReport({
          data: {
            sqon: sqon!,
            name: ReportType.BIOSEPCIMEN_REQUEST,
            projectId: PROJECT_ID,
            biospecimenRequestName: name,
          },
          translation: {
            errorMessage: intl.get('api.biospecimenRequest.error.manifestReport'),
            successMessage: intl.get('api.biospecimenRequest.success.manifestReport'),
          },
          callback: () => {
            dispatch(fetchSavedSet());
            closeModal();
          },
          errorCallback: () => closeModal(),
        }),
      );
    }
  };

  if (loading) return <></>;

  if (!error && !samples.length) return <NoSampleModal isOpen={isOpen} closeModal={closeModal} />;

  return (
    <Modal
      cancelText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.cancelText')}
      title={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.title')}
      open={isOpen}
      onCancel={() => {
        editForm.resetFields();
        closeModal();
      }}
      okButtonProps={{ disabled: isLoading || error, loading: isLoading }}
      okText={intl.get('screen.dataExploration.tabs.biospecimens.request.modal.okText')}
      onOk={() => editForm.submit()}
      width={680}
    >
      {error && (
        <Alert
          type="error"
          message={
            <span className={styles.alertTitle}>
              {intl.get(
                'screen.dataExploration.tabs.biospecimens.request.modal.alert.errorMessage',
              )}
            </span>
          }
          description={intl.get(
            'screen.dataExploration.tabs.biospecimens.request.modal.alert.errorDescription',
          )}
        />
      )}
      {!error && (
        <div className={styles.modalWrapper}>
          <div className={styles.description}>
            <Text>
              {intl.get(`screen.dataExploration.tabs.biospecimens.request.modal.description`)}
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
          <RequestBiospecimenTable data={samples} loading={loading} sqon={sqon} />
        </div>
      )}
    </Modal>
  );
};

export default RequestBiospecimenModal;
