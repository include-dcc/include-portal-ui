import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import cx from 'classnames';
import { usageOptions } from 'views/Community/contants';

import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';
import { lowerAll } from 'utils/array';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import { OTHER_KEY, removeOtherKey } from '../utils';

import formStyles from '../form.module.css';

enum FORM_FIELDS {
  DATA_USAGE = 'data_use',
  OTHER_DATA_USAGE = 'other_data_use',
  COMMERCIAL_USE_REASON = 'commercial_use_reason',
}

const initialChangedValues = {
  [FORM_FIELDS.DATA_USAGE]: false,
  [FORM_FIELDS.OTHER_DATA_USAGE]: false,
  [FORM_FIELDS.COMMERCIAL_USE_REASON]: false,
};

const hasOtherUsage = (userUsages: string[]) =>
  userUsages.filter(
    (usage) =>
      !usageOptions.find(
        (defaultUsage) => defaultUsage.value.toLowerCase() === usage.toLowerCase(),
      ),
  );

const ResearchAndUsagesCard = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.DATA_USAGE]: hasOtherUsage(lowerAll(userInfo?.portal_usages ?? [])).length
        ? [...lowerAll(userInfo?.portal_usages ?? []), OTHER_KEY]
        : lowerAll(userInfo?.portal_usages ?? []),
      [FORM_FIELDS.OTHER_DATA_USAGE]: hasOtherUsage(userInfo?.portal_usages ?? [])[0],
      [FORM_FIELDS.COMMERCIAL_USE_REASON]: userInfo?.commercial_use_reason || '',
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [userInfo]);

  return (
    <BaseCard
      form={form}
      title="Research & Data Use"
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const otherUsage = hasOtherUsage(values[FORM_FIELDS.DATA_USAGE]);
          dispatch(
            updateUser({
              data: {
                portal_usages: removeOtherKey(
                  values[FORM_FIELDS.DATA_USAGE].filter((val: string) => !otherUsage.includes(val)),
                  values[FORM_FIELDS.OTHER_DATA_USAGE],
                ),
                commercial_use_reason: values[FORM_FIELDS.COMMERCIAL_USE_REASON],
              },
            }),
          );
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.DATA_USAGE}
          label="I intend to use the INCLUDE Portal data for:"
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>Check all that apply</span>
            <Space direction="vertical">
              {usageOptions.map((option) => (
                <Checkbox key={option.key} value={option.value.toLowerCase()}>
                  {option.label}
                </Checkbox>
              ))}
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues[FORM_FIELDS.DATA_USAGE] !== currentValues[FORM_FIELDS.DATA_USAGE]
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue(FORM_FIELDS.DATA_USAGE)?.includes(
                    usageOptions.find((option) => option.key === 'commercial')?.value,
                  ) ? (
                    <Form.Item
                      className={cx(formStyles.dynamicField, formStyles.inner)}
                      label="Please provide a minimum of 1-2 sentences to describe your commercial use:"
                      name={FORM_FIELDS.COMMERCIAL_USE_REASON}
                      required={false}
                      rules={[{ required: true, min: 70, validateTrigger: 'onSubmit' }]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Checkbox value={OTHER_KEY}>Other</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.DATA_USAGE] !== currentValues[FORM_FIELDS.DATA_USAGE]
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(FORM_FIELDS.DATA_USAGE)?.includes(OTHER_KEY) ? (
              <Form.Item
                className={cx(
                  formStyles.withCustomHelp,
                  formStyles.dynamicField,
                  formStyles.noMargin,
                )}
                label="Please specify your use"
              >
                <Form.Item
                  name={FORM_FIELDS.OTHER_DATA_USAGE}
                  className={formStyles.noMargin}
                  rules={[{ required: true, validateTrigger: 'onSubmit' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default ResearchAndUsagesCard;
