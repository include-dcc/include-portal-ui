import { useEffect, useState } from 'react';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { Select } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';

import styles from './index.module.css';

type TranscriptomicSearchProps<T> = {
  options: T[];
  selectedOptionsIds: string[];
  onSelectOptions: (option: T[]) => void;
  disabled?: boolean;
  title: string;
  tooltip: string;
  placeholder: string;
  emptyText: string;
  optionLabelKey: keyof T;
  optionValueKey: keyof T;
};

const TranscriptomicSearch = <T,>({
  options,
  selectedOptionsIds,
  onSelectOptions,
  disabled = false,
  title,
  tooltip,
  placeholder,
  emptyText,
  optionLabelKey,
  optionValueKey,
}: TranscriptomicSearchProps<T>) => {
  const [parsedOptions, setParsedOptions] = useState<T[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setParsedOptions(options);
  }, [options]);

  useEffect(() => {
    const result = options.filter((opt) =>
      selectedOptionsIds.includes(opt[optionValueKey] as string),
    );
    setSelectedOptions(result.map((r) => r[optionValueKey]) as string[]);
  }, [selectedOptionsIds, optionLabelKey, optionValueKey, options]);

  const handleChange = (values: string[]) => {
    const result = options.filter((option) => values.includes(option[optionValueKey] as string));
    setSelectedOptions(values);
    onSelectOptions(result);
  };

  const handleClear = () => {
    setSelectedOptions([]);
    onSelectOptions([]);
  };

  return (
    <div className={styles.transcriptomicSearch}>
      <div className={styles.searchContainer}>
        <SearchLabel title={title} tooltipText={tooltip} />
        <Select
          allowClear
          autoClearSearchValue
          maxTagCount="responsive"
          mode="multiple"
          onClear={handleClear}
          notFoundContent={<Empty size="mini" showImage={false} description={emptyText} />}
          disabled={disabled}
          placeholder={placeholder}
          className={styles.select}
          value={selectedOptions}
          onChange={handleChange}
          options={parsedOptions.map((opt) => ({
            label: `${opt[optionLabelKey]}`,
            value: `${opt[optionValueKey]}`,
            id: `${opt[optionValueKey]}`,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
            (option?.value ?? '').toLowerCase().includes(input.toLowerCase()) ||
            (option?.id ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    </div>
  );
};

export default TranscriptomicSearch;
