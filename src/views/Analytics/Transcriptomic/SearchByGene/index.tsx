import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty/index';
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
  const [parsedOptions, setParsedOptions] = useState(() => parseOptions(options));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const parsed = parseOptions(options);
    setParsedOptions(parsed);
    const selectedOption = parsed.find((opt) => opt.ensembl_gene_id === selectedOptionsIds[0]);
    setInputValue(selectedOption ? selectedOption.gene_symbol : '');
  }, [options, selectedOptionsIds]);

  const filterOptions = (value: string) =>
    parsedOptions.filter((opt) => opt.gene_symbol.toLowerCase().includes(value.toLowerCase()));

  const handleSelect = (_: string, { id }: Option) => {
    setInputValue(id);
    onSelectOptions([id]);
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
          notFoundContent={
            <Empty
              size="mini"
              showImage={false}
              description={intl.get('global.search.genes.emptyText')}
            />
          }
          onSearch={(value) => setParsedOptions(filterOptions(value))}
          onSelect={handleSelect}
          placeholder={intl.get('global.search.genes.placeholder')}
          className={styles.select}
          value={inputValue}
          onChange={setInputValue}
          options={parsedOptions.map((opt) => ({
            label: opt.gene_symbol,
            value: opt.gene_symbol,
            id: opt.ensembl_gene_id,
          }))}
        >
          <Input />
        </AutoComplete>
      </div>
    </div>
  );
};

export default TranscriptomicSearchByGene;
