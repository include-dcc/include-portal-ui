import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { AutoComplete, Input } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';
import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import styles from './index.module.css';

type OwnProps = {
  options?: TTranscriptomicsDiffGeneExp[];
  selectedOptionsIds: string[];
  onSelectOptions: (selectedIds: string[]) => void;
};

type Option = { label: string; value: string; id: string };

const parseOptions = (options?: TTranscriptomicsDiffGeneExp[]): TTranscriptomicsDatum[] =>
  options?.flatMap((option) => option.data) || [];

const TranscriptomicSearchByGene = ({ options, selectedOptionsIds, onSelectOptions }: OwnProps) => {
  const [parsedOptions, setParsedOptions] = useState<TTranscriptomicsDatum[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<TTranscriptomicsDatum[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const parsed = parseOptions(options);
    setParsedOptions(parsed);
    setFilteredOptions(parsed);

    const selectedOption = parsed.find(
      (option) => option.ensembl_gene_id === selectedOptionsIds[0],
    );
    if (selectedOption) {
      setInputValue(selectedOption.gene_symbol);
    } else {
      setInputValue('');
    }
  }, [options, selectedOptionsIds]);

  const filterOptions = (value: string) => {
    const filtered = value
      ? parsedOptions.filter((option) =>
          option.gene_symbol.toLowerCase().includes(value.toLowerCase()),
        )
      : parsedOptions;
    setFilteredOptions(filtered);
  };

  const handleSelect = (_value: string, option: Option) => {
    const selectedOption = parsedOptions.find((opt) => opt.ensembl_gene_id === option.id);
    if (selectedOption) {
      setInputValue(selectedOption.gene_symbol);
    }
    onSelectOptions([option.id]);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
    filterOptions(value);
  };

  return (
    <div className={styles.transcriptomicSearchByGene}>
      <div className={styles.searchContainer}>
        <SearchLabel
          title={intl.get('global.search.genes.title')}
          tooltipText={intl.get('global.search.genes.tooltip')}
        />
        <AutoComplete
          allowClear
          onSearch={filterOptions}
          onSelect={handleSelect}
          placeholder={intl.get('global.search.genes.placeholder')}
          className={styles.select}
          value={inputValue}
          onChange={handleChange}
          options={filteredOptions.map((option) => ({
            label: option.gene_symbol,
            value: option.gene_symbol,
            id: option.ensembl_gene_id,
          }))}
        >
          <Input />
        </AutoComplete>
      </div>
    </div>
  );
};

export default TranscriptomicSearchByGene;
