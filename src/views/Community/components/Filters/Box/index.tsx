import { Button, Input, Select, Space, Tag, Typography } from 'antd';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import styles from './index.module.scss';

interface OwnProps {
  onMatchFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onUsageFilterChange: (value: string) => void;
  hasFilters: boolean;
}

const roleOptions = [
  'Researcher at an academic or not-for-profit institution',
  'Representative from a For-Profit or Commercial Entity',
  'Tool or Algorithm Developer',
  'Clinician',
  'Community member',
  'Federal Employee',
];

const usageOptions = [
  'Learning more about Down syndrome and its health outcomes, management, and/or treatment',
  'Helping me design a new research study',
  'Identifying datasets that I want to analyze',
  'Commercial purposes',
];

const FiltersBox = ({
  onMatchFilterChange,
  onRoleFilterChange,
  onUsageFilterChange,
  hasFilters = false,
}: OwnProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);

  useEffect(() => onRoleFilterChange(roleFilter.join(',')), [roleFilter]);

  useEffect(() => onUsageFilterChange(usageFilter.join(',')), [usageFilter]);

  return (
    <Space direction="vertical" size={16} className={styles.filtersContainer}>
      <Space direction="vertical" className={styles.searchBarContainer}>
        <ProLabel title={intl.get('screen.community.search.barPlaceholder')} />
        <div className={styles.filterContentWrapper}>
          <Input
            onChange={(e) => onMatchFilterChange(e.currentTarget.value)}
            placeholder="Ex: Watson, Linda Crnic Institute"
          />
          <Button onClick={() => setFiltersVisible(!filtersVisible)}>
            {intl.get('screen.community.search.filters')}{' '}
            {filtersVisible ? <CaretUpFilled /> : <CaretDownFilled />}
          </Button>
        </div>
      </Space>
      {filtersVisible && (
        <Space className={styles.filterContentWrapper} size={16} align="end">
          <Space direction="vertical">
            <ProLabel title={intl.get('screen.community.search.role')} />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={roleFilter}
              onSelect={(value: string) => setRoleFilter([...roleFilter, value])}
              onDeselect={(value: string) =>
                setRoleFilter(roleFilter.filter((val) => val !== value))
              }
              options={roleOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              tagRender={({ onClose, value }) => (
                <Tag
                  className={styles.filterTag}
                  closable
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  <Typography.Text className={styles.filterTagText}>{value}</Typography.Text>
                </Tag>
              )}
            />
          </Space>
          <Space direction="vertical">
            <ProLabel title={intl.get('screen.community.search.dataUse')} />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={usageFilter}
              onSelect={(value: string) => setUsageFilter([...usageFilter, value])}
              onDeselect={(value: string) =>
                setUsageFilter(usageFilter.filter((val) => val !== value))
              }
              options={usageOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              tagRender={({ onClose, value }) => (
                <Tag
                  className={styles.filterTag}
                  closable
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  <Typography.Text className={styles.filterTagText}>{value}</Typography.Text>
                </Tag>
              )}
            />
          </Space>
          <Button
            disabled={!hasFilters}
            onClick={() => {
              setRoleFilter([]);
              setUsageFilter([]);
            }}
          >
            {intl.get('screen.community.search.clearFilters')}
          </Button>
        </Space>
      )}
    </Space>
  );
};

export default FiltersBox;
