import { Button, Input, Select, Space, Tag } from 'antd';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { useState } from 'react';

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

  return (
    <Space direction="vertical" size={16} className={styles.filtersContainer}>
      <Space direction="vertical" className={styles.searchBarContainer}>
        <ProLabel title="Search by member name or affiliation" />
        <div className={styles.filterContentWrapper}>
          <Input
            onChange={(e) => onMatchFilterChange(e.currentTarget.value)}
            placeholder="Ex: Watson, Linda Crnic Institute"
          />
          <Button onClick={() => setFiltersVisible(!filtersVisible)}>
            Filters {filtersVisible ? <CaretUpFilled /> : <CaretDownFilled />}
          </Button>
        </div>
      </Space>
      {filtersVisible && (
        <Space className={styles.filterContentWrapper} size={16} align="end">
          <Space direction="vertical">
            <ProLabel title="Role" />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder="Select"
              maxTagCount={1}
              onSelect={onRoleFilterChange}
              onDeselect={onRoleFilterChange}
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
                  {value}
                </Tag>
              )}
            />
          </Space>
          <Space direction="vertical">
            <ProLabel title="Data use" />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder="Select"
              maxTagCount={1}
              onSelect={onUsageFilterChange}
              onDeselect={onUsageFilterChange}
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
                  {value}
                </Tag>
              )}
            />
          </Space>
          <Button disabled={!hasFilters}>Clear filters</Button>
        </Space>
      )}
    </Space>
  );
};

export default FiltersBox;
