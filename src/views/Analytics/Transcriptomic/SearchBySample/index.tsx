import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { AutoComplete, Input } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';
import { ITranscriptomicsSampleGeneExp } from 'services/api/transcriptomics/models';

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
  const [parsedOptions, setParsedOptions] = useState(() => options?.data || []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setParsedOptions(options?.data || []);
    const selectedOption = options?.data?.find((opt) => opt.sample_id === selectedOptionsIds[0]);
    setInputValue(selectedOption ? selectedOption.sample_id : '');
  }, [options, selectedOptionsIds]);

  const filterOptions = (value: string) =>
    parsedOptions.filter((opt) => opt.sample_id.toLowerCase().includes(value.toLowerCase()));

  const handleSelect = (_: string, { id }: Option) => {
    setInputValue(id);
    onSelectOptions([id]);
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
          onSearch={(value) => setParsedOptions(filterOptions(value))}
          onSelect={handleSelect}
          placeholder={intl.get('global.search.samples.placeholder')}
          className={styles.select}
          value={inputValue}
          onChange={setInputValue}
          options={parsedOptions.map((opt) => ({
            label: opt.sample_id,
            value: opt.sample_id,
            id: opt.sample_id,
          }))}
        >
          <Input />
        </AutoComplete>
      </div>
    </div>
  );
};

export default TranscriptomicSearchBySample;
