import React, { useEffect, useState } from 'react';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { AutoComplete, Input } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';

import styles from './index.module.css';

type TranscriptomicSearchProps<T> = {
  options: T[];
  selectedOptionsIds: string[];
  onSelectOptions: (selectedIds: string[]) => void;
  disabled?: boolean;
  title: string;
  tooltip: string;
  placeholder: string;
  emptyText: string;
  optionLabelKey: keyof T;
  optionValueKey: keyof T;
  filterFunction: (options: T[], input: string) => T[];
};

type Option = { label: string; value: string; id: string };

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
  filterFunction,
}: TranscriptomicSearchProps<T>) => {
  const [parsedOptions, setParsedOptions] = useState<T[]>(options);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setParsedOptions(options);
    const selectedOption = options.find((opt) => opt[optionValueKey] === selectedOptionsIds[0]);
    setInputValue(selectedOption ? `${selectedOption[optionLabelKey]}` : '');
  }, [options, selectedOptionsIds, optionLabelKey, optionValueKey]);

  const handleSelect = (_value: string, option: Option) => {
    setInputValue(option.id);
    onSelectOptions([option.id]);
  };

  const handleSearch = (value: string) => {
    setParsedOptions(filterFunction(options, value));
  };

  return (
    <div className={styles.transcriptomicSearch}>
      <div className={styles.searchContainer}>
        <SearchLabel title={title} tooltipText={tooltip} />
        <AutoComplete
          allowClear
          onClear={() => onSelectOptions([])}
          notFoundContent={<Empty size="mini" showImage={false} description={emptyText} />}
          disabled={disabled}
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder={placeholder}
          className={styles.select}
          value={inputValue}
          onChange={setInputValue}
          options={parsedOptions.map((opt) => ({
            label: `${opt[optionLabelKey]}`,
            value: `${opt[optionLabelKey]}`,
            id: `${opt[optionValueKey]}`,
          }))}
        >
          <Input />
        </AutoComplete>
      </div>
    </div>
  );
};

export default TranscriptomicSearch;
