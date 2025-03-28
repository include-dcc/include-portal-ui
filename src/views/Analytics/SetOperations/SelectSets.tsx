import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import AndOrIcon from '@ferlab/ui/core/components/Icons/AndOrIcon';
import { Button, Select, Space, Tag, Typography } from 'antd';

import logo from 'components/assets/analytics/newsletterWidget1.svg';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ISelectSetsProps {
  savedSets: IUserSetOutput[];
  setCompareSets: (value: boolean) => void;
}

const SelectSets = ({ savedSets, setCompareSets }: ISelectSetsProps) => {
  const [entitySelected, setEntitySelected] = useState<SetType | undefined>(undefined);
  const [setOptions, setSetOptions] = useState<IUserSetOutput[]>([]);
  const [setIdsSelected, setSetIdsSelected] = useState<string[]>([]);

  const participantSets = savedSets.filter((savedSet) => savedSet.setType === SetType.PARTICIPANT);
  const biospecimenSets = savedSets.filter((savedSet) => savedSet.setType === SetType.BIOSPECIMEN);
  const fileSets = savedSets.filter((savedSet) => savedSet.setType === SetType.FILE);
  const variantSets = savedSets.filter((savedSet) => savedSet.setType === SetType.VARIANT);

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
        <Typography className={styles.inputLabel}>
          {intl.get('screen.analytics.setOperations.selectSet.entityType.label')}
        </Typography>
        <Select
          placeholder={intl.get('screen.analytics.setOperations.selectSet.entityType.placeholder')}
          className={styles.selectEntity}
          onChange={(value) => {
            setEntitySelected(value);
            setSetIdsSelected([]);
          }}
          value={entitySelected}
        >
          {participantSets.length > 1 && (
            <Select.Option value={SetType.PARTICIPANT} className={styles.option}>
              <UserOutlined className={styles.iconOption} />
              {intl.get('screen.analytics.setOperations.selectSet.entityType.participants')}
            </Select.Option>
          )}
          {biospecimenSets.length > 1 && (
            <Select.Option value={SetType.BIOSPECIMEN} className={styles.option}>
              <ExperimentOutlined className={styles.iconOption} />
              {intl.get('screen.analytics.setOperations.selectSet.entityType.biospecimens')}
            </Select.Option>
          )}
          {fileSets.length > 1 && (
            <Select.Option value={SetType.FILE} className={styles.option}>
              <FileTextOutlined className={styles.iconOption} />
              {intl.get('screen.analytics.setOperations.selectSet.entityType.files')}
            </Select.Option>
          )}
          {variantSets.length > 1 && (
            <Select.Option value={SetType.VARIANT} className={styles.option}>
              <LineStyleIcon className={styles.iconOption} />
              {intl.get('screen.analytics.setOperations.selectSet.entityType.variants')}
            </Select.Option>
          )}
        </Select>
        {entitySelected && (
          <>
            <Typography className={styles.inputLabel}>
              {intl.get('screen.analytics.setOperations.selectSet.sets.label')}
            </Typography>
            <Select
              className={styles.selectSets}
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
                setSetIdsSelected((prev) => prev.filter((val) => val !== value));
              }}
              tagRender={({ onClose, label }) => (
                <Tag className={styles.filterTag} closable onClose={onClose}>
                  <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                </Tag>
              )}
            >
              {setOptions.map((option) => (
                <Select.Option
                  key={option.id}
                  value={option.id}
                  className={styles.option}
                  disabled={getDisabledOption(option, setIdsSelected)}
                >
                  {option.tag}
                </Select.Option>
              ))}
            </Select>
          </>
        )}
        {setIdsSelected.length > 1 && (
          <div className={styles.compareWrapper}>
            <Button onClick={() => setCompareSets(true)} type="primary">
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
