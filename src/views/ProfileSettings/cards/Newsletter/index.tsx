import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { MailOutlined } from '@ant-design/icons';
import { Alert, Checkbox, Form, Input, Space, Spin, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import cx from 'classnames';

import { useUser } from 'store/user';
import {
  refreshNewsletterStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
} from 'store/user/thunks';
import { SubscriptionStatus } from 'store/user/types';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';

import formStyles from '../form.module.scss';
import cardStyles from './index.module.scss';

enum FORM_FIELDS {
  NEWSLETTER_SUBSCRIPTION = 'newsletter_subscription_status',
  NEWSLETTER_EMAIL = 'newsletter_email',
}

const initialChangedValues = {
  [FORM_FIELDS.NEWSLETTER_SUBSCRIPTION]: false,
  [FORM_FIELDS.NEWSLETTER_EMAIL]: false,
};

const NewsletterCard = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo, isUpdating, isLoading } = useUser();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, boolean | string>>();

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  const handleSumbit = (values: any) => {
    const { newsletter_subscription_status, newsletter_email } = values;

    if (newsletter_subscription_status === SubscriptionStatus.SUBSCRIBED && newsletter_email) {
      dispatch(
        subscribeNewsletter({
          data: {
            newsletter_email,
          },
        }),
      );
    } else {
      unsubscribeNewsletter({});
    }
  };

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.NEWSLETTER_SUBSCRIPTION]:
        userInfo?.newsletter_subscription_status === 'subscribed' ?? false,
      [FORM_FIELDS.NEWSLETTER_EMAIL]: userInfo?.newsletter_email ?? '',
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, userInfo]);

  useEffect(() => {
    dispatch(refreshNewsletterStatus({}));
  }, [dispatch]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.newsletter.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={handleSumbit}
      >
        <Spin spinning={isLoading || isUpdating}>
          <Space size={24} direction="vertical">
            {userInfo?.newsletter_subscription_status === SubscriptionStatus.FAILED && (
              <Alert
                showIcon
                type="warning"
                message={intl.get('screen.profileSettings.cards.newsletter.warning')}
              />
            )}
            <Typography.Text className={cardStyles.allFieldRequiredNotice}>
              {intl.getHTML('screen.profileSettings.cards.newsletter.consent', {
                policyLink: intl.get('screen.profileSettings.cards.newsletter.policyLink'),
                policyLinkHref: 'https://includedcc.org/policies',
              })}
            </Typography.Text>
          </Space>
          <Space size={24} direction="vertical">
            <Form.Item
              name={FORM_FIELDS.NEWSLETTER_SUBSCRIPTION}
              valuePropName="checked"
              className={cardStyles.noMargin}
            >
              <Checkbox>{intl.get('screen.profileSettings.cards.newsletter.checkbox')}</Checkbox>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues[FORM_FIELDS.NEWSLETTER_SUBSCRIPTION] !==
                currentValues[FORM_FIELDS.NEWSLETTER_SUBSCRIPTION]
              }
            >
              {({ getFieldValue }) =>
                getFieldValue(FORM_FIELDS.NEWSLETTER_SUBSCRIPTION) ? (
                  <Form.Item
                    className={cx(
                      formStyles.withCustomHelp,
                      formStyles.dynamicField,
                      cardStyles.noMargin,
                    )}
                    label={'Which email address should we use?'}
                  >
                    <Form.Item
                      name={FORM_FIELDS.NEWSLETTER_EMAIL}
                      rules={[{ required: true, type: 'email' }]}
                      className={cardStyles.noMargin}
                    >
                      <Input
                        placeholder={intl.get(
                          'screen.profileSettings.cards.newsletter.placeholder',
                        )}
                        suffix={<MailOutlined className={cardStyles.iconSuffix} />}
                      />
                    </Form.Item>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Space>
        </Spin>
      </BaseForm>
    </BaseCard>
  );
};

export default NewsletterCard;
