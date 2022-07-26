import ProLabel from '@ferlab/ui/core/components/ProLabel';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { useKeycloak } from '@react-keycloak/web';
import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { capitalize } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';

const { Title } = Typography;

enum FORM_FIELDS {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  PUBLIC_EMAIL = 'public_email',
  LINKEDIN = 'linkedin',
}

const initialChangedValues = {
  [FORM_FIELDS.FIRST_NAME]: false,
  [FORM_FIELDS.LAST_NAME]: false,
  [FORM_FIELDS.PUBLIC_EMAIL]: false,
  [FORM_FIELDS.LINKEDIN]: false,
};

const IdentificationCard = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { keycloak } = useKeycloak();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.FIRST_NAME]: userInfo?.first_name,
      [FORM_FIELDS.LAST_NAME]: userInfo?.last_name,
      [FORM_FIELDS.PUBLIC_EMAIL]: userInfo?.public_email,
      [FORM_FIELDS.LINKEDIN]: userInfo?.linkedin,
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [userInfo]);

  return (
    <GridCard
      title={
        <Title level={4}>{intl.get('screen.profileSettings.cards.identification.title')}</Title>
      }
      footer={
        <Space>
          <Button type="primary" disabled={!isValueChanged()} onClick={form.submit}>
            Save changes
          </Button>
          {isValueChanged() && (
            <Button type="text" onClick={onDiscardChanges}>
              Discard changes
            </Button>
          )}
        </Space>
      }
      content={
        <Space size={24} direction="vertical">
          <Alert
            showIcon
            type="info"
            message={intl.getHTML('screen.profileSettings.cards.identification.alert', {
              provider: capitalize(tokenParsed.identity_provider),
              email: userInfo?.email,
            })}
          />
          <Form
            layout="vertical"
            form={form}
            initialValues={initialValues}
            onFieldsChange={(changedFields) => {
              const field = changedFields[0];
              setHasChanged({
                ...hasChanged,
                [field.name as FORM_FIELDS]:
                  initialValues.current &&
                  initialValues.current[field.name as FORM_FIELDS] !== field.value,
              });
            }}
            onFinish={(values) =>
              dispatch(
                updateUser({
                  data: values,
                }),
              )
            }
            validateMessages={{
              required: intl.get('global.forms.errors.requiredField'),
              types: {
                email: intl.get('global.forms.errors.enterValidEmail'),
                url: intl.get('global.forms.errors.enterValidUrl'),
              },
            }}
          >
            <Form.Item
              name={FORM_FIELDS.FIRST_NAME}
              label={<ProLabel title="First Name" />}
              rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
              required={false}
            >
              <Input placeholder="Your First Name"></Input>
            </Form.Item>
            <Form.Item
              name={FORM_FIELDS.LAST_NAME}
              label={<ProLabel title="Last Name" />}
              rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
              required={false}
            >
              <Input placeholder="Your Last Name"></Input>
            </Form.Item>
            <Form.Item
              name={FORM_FIELDS.PUBLIC_EMAIL}
              label={
                <ProLabel
                  title="Public Email"
                  popoverProps={{
                    placement: 'top',
                    overlayStyle: {
                      maxWidth: 250,
                    },
                    content:
                      'This email will be displayed on your profile page and accessible to all logged-in users of the portal.',
                  }}
                />
              }
              rules={[{ type: 'email', validateTrigger: 'onSubmit' }]}
              required={false}
            >
              <Input placeholder="email@domain.com"></Input>
            </Form.Item>
            <Form.Item
              className="noMargin"
              name={FORM_FIELDS.LINKEDIN}
              label={<ProLabel title="Linkedin" />}
              rules={[{ type: 'url', validateTrigger: 'onSubmit' }]}
              required={false}
            >
              <Input placeholder="https://www.linkedin.com/in/username/"></Input>
            </Form.Item>
          </Form>
        </Space>
      }
    />
  );
};

export default IdentificationCard;
