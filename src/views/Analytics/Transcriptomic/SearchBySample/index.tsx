import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { AutoComplete, Input } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';
import {
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';

import styles from './index.module.css';

type OwnProps = {
  options?: ITranscriptomicsSampleGeneExp;
  selectedOptionsIds: string[];
  onSelectOptions: (selectedIds: string[]) => void;
  disabled?: boolean;
};

type Option = { label: string; value: string; id: string };

const TranscriptomicSearchBySample = ({
  options,
  selectedOptionsIds,
  onSelectOptions,
  disabled = false,
}: OwnProps) => {
  const [parsedOptions, setParsedOptions] = useState<TTranscriptomicsSwarmPlotData[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<TTranscriptomicsSwarmPlotData[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const data = options?.data || [];
    setParsedOptions(data);
    setFilteredOptions(data);

    const selectedOption = data.find((option) => option.sample_id === selectedOptionsIds[0]);
    if (selectedOption) {
      setInputValue(selectedOption.sample_id);
    } else {
      setInputValue('');
    }
  }, [options, selectedOptionsIds]);

  const filterOptions = (value: string) => {
    const filtered = value
      ? parsedOptions.filter((option) =>
          option.sample_id.toLowerCase().includes(value.toLowerCase()),
        )
      : parsedOptions;
    setFilteredOptions(filtered);
  };

  const handleSelect = (_value: string, option: Option) => {
    const selectedOption = parsedOptions.find((opt) => opt.sample_id === option.id);
    if (selectedOption) {
      setInputValue(selectedOption.sample_id);
    }
    onSelectOptions([option.id]);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
    filterOptions(value);
  };

  return (
    <div className={styles.transcriptomicSearchBySample}>
      <div className={styles.searchContainer}>
        <SearchLabel
          title={intl.get('global.search.samples.title')}
          tooltipText={intl.get('global.search.samples.tooltip')}
        />
        <AutoComplete
          allowClear
          notFoundContent={
            <Empty
              size="mini"
              showImage={false}
              description={intl.get('global.search.samples.emptyText')}
            />
          }
          disabled={disabled}
          onSearch={filterOptions}
          onSelect={handleSelect}
          placeholder={intl.get('global.search.samples.placeholder')}
          className={styles.select}
          value={inputValue}
          onChange={handleChange}
          options={filteredOptions.map((option) => ({
            label: option.sample_id,
            value: option.sample_id,
            id: option.sample_id,
          }))}
        >
          <Input />
        </AutoComplete>
      </div>
    </div>
  );
};

export default TranscriptomicSearchBySample;
