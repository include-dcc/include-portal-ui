import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useState } from 'react';

export const SortItems = [
  {
    label: 'Newest first',
    sort: 'creation_date:asc',
  },
  {
    label: 'Oldest first',
    sort: 'creation_date:desc',
  },
  {
    label: 'Alphabetical (last name)',
    sort: 'last_name:asc',
  },
];

interface OwnProps {
  onSorterChange: (value: string) => void;
}

const Sorter = ({ onSorterChange }: OwnProps) => {
  const [selectedSortIndex, setSelectedSortIndex] = useState(0);

  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[selectedSortIndex.toString()]}
          items={SortItems.map((item, index) => ({
            label: item.label,
            key: index,
            onClick: () => {
              setSelectedSortIndex(index);
              onSorterChange(item.sort);
            },
          }))}
        />
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {SortItems[selectedSortIndex].label}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Sorter;
