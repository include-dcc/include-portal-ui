import { ReactNode, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import AndOrIcon from '@ferlab/ui/core/components/Icons/AndOrIcon';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Select, Space, Tag, Tooltip, Typography } from 'antd';
import cx from 'classnames';

import logo from 'components/assets/analytics/newsletterWidget1.svg';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ISelectSetsProps {
  biospecimenSets: IUserSetOutput[];
  entityOptions: { value: string; label: string; icon: ReactNode; disabled: boolean }[];
  entitySelected: SetType | undefined;
  fileSets: IUserSetOutput[];
  handleCompare: (setIdsSelected: string[]) => void;
  participantSets: IUserSetOutput[];
  setEntitySelected: (value: SetType | undefined) => void;
  setIdsSelected: string[];
  setSetIdsSelected: (value: string[]) => void;
  variantSets: IUserSetOutput[];
}

const SelectSets = ({
  biospecimenSets,
  entityOptions,
  entitySelected,
  fileSets,
  handleCompare,
  participantSets,
  setEntitySelected,
  setIdsSelected,
  setSetIdsSelected,
  variantSets,
}: ISelectSetsProps) => {
  const [setOptions, setSetOptions] = useState<IUserSetOutput[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    switch (entitySelected) {
      case SetType.PARTICIPANT:
        setSetOptions(participantSets);
        break;
      case SetType.BIOSPECIMEN:
        setSetOptions(biospecimenSets);
        break;
      case SetType.FILE:
        setSetOptions(fileSets);
        break;
      case SetType.VARIANT:
        setSetOptions(variantSets);
        break;
      default:
        setSetOptions([]);
        break;
    }
  }, [entitySelected, participantSets, biospecimenSets, fileSets, variantSets]);

  useEffect(() => {
    if (entityOptions.filter((option) => !option.disabled).length === 1) {
      const selectedOption = entityOptions.find((option) => !option.disabled);
      setEntitySelected(selectedOption?.value as SetType);
      setOpenDropdown(true);
    }
  }, [entityOptions, setEntitySelected]);

  const getDisabledOption = (option: IUserSetOutput, setIdsSelected: string[]): boolean => {
    if (setIdsSelected.length < 3) return false;
    return !setIdsSelected.includes(option.id);
  };

  return (
    <Space size={24} direction="vertical" align="center" className={styles.selectSetWrapper}>
      <img alt="Logo" src={logo} height={158} width={156} />
      <div className={styles.selectSetContent}>
        <Typography.Title level={4} className={styles.noSetTitle}>
          {intl.get('screen.analytics.setOperations.selectSet.title')}
        </Typography.Title>
        <Typography.Text className={styles.noSetDescription}>
          {intl.getHTML('screen.analytics.setOperations.selectSet.description', {
            dashboard: STATIC_ROUTES.DASHBOARD,
          })}
        </Typography.Text>
      </div>
      <div className={styles.selectSetForm}>
        <ProLabel
          className={styles.inputLabel}
          title={intl.get('screen.analytics.setOperations.selectSet.entityType.label')}
        />
        <Select
          placeholder={intl.get('screen.analytics.setOperations.selectSet.entityType.placeholder')}
          className={styles.selectEntity}
          onChange={(value) => {
            setEntitySelected(value);
            setSetIdsSelected([]);
          }}
          value={entitySelected}
        >
          {entityOptions.map((option) => (
            <Select.Option
              className={cx(styles.labelOption, option.disabled && styles.disabledOption)}
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.disabled ? (
                <Tooltip
                  title={intl.get(
                    'screen.analytics.setOperations.selectSet.entityType.disabledTooltip',
                  )}
                >
                  <span className={cx(styles.iconOption, option.disabled && styles.disabledOption)}>
                    {option.icon}
                  </span>
                  {option.label}
                </Tooltip>
              ) : (
                <>
                  <span className={cx(styles.iconOption, option.disabled && styles.disabledOption)}>
                    {option.icon}
                  </span>
                  {option.label}
                </>
              )}
            </Select.Option>
          ))}
        </Select>
        {entitySelected && (
          <>
            <ProLabel
              className={styles.inputLabel}
              title={intl.get('screen.analytics.setOperations.selectSet.sets.label')}
            />
            <Select
              className={styles.selectSets}
              dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
              mode="multiple"
              allowClear
              onClear={() => setSetIdsSelected([])}
              placeholder={intl.get('screen.analytics.setOperations.selectSet.sets.placeholder')}
              maxTagCount="responsive"
              value={setIdsSelected}
              onSelect={(value: string) => {
                setSetIdsSelected([...setIdsSelected, value]);
              }}
              onDeselect={(value: string) => {
                const ids = setIdsSelected.filter((val) => val !== value);
                setSetIdsSelected(ids);
              }}
              tagRender={({ onClose, label }) => (
                <Tag className={styles.filterTag} closable onClose={onClose}>
                  <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                </Tag>
              )}
              open={openDropdown}
              onDropdownVisibleChange={(open) => setOpenDropdown(open)}
            >
              {setOptions.map((option) => {
                const isDisabled = getDisabledOption(option, setIdsSelected);
                return (
                  <Select.Option
                    key={option.id}
                    value={option.id}
                    className={cx(styles.option, isDisabled && styles.disabledOption)}
                    disabled={isDisabled}
                  >
                    {`${option.tag} (${option.size})`}
                  </Select.Option>
                );
              })}
            </Select>
          </>
        )}
        {setIdsSelected.length > 1 && (
          <div className={styles.compareWrapper}>
            {/* //TODO comment passer le sqon au handle compare */}
            <Button onClick={() => handleCompare(setIdsSelected)} type="primary">
              <AndOrIcon />
              {intl.get('screen.analytics.setOperations.selectSet.compare')}
            </Button>
          </div>
        )}
      </div>
    </Space>
  );
};

export default SelectSets;
