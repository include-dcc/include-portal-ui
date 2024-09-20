import React from 'react';
import intl from 'react-intl-universal';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

type OwnProps = {
  options?: TTranscriptomicsDiffGeneExp[];
  selectedOptionsIds: string[];
  onSelectOptions: (selectedIds: string[]) => void;
};

const TranscriptomicSearchByGene = ({ options, selectedOptionsIds, onSelectOptions }: OwnProps) => {
  const parsedOptions: TTranscriptomicsDatum[] = options?.flatMap((option) => option.data) || [];

  return (
    <TranscriptomicSearch<TTranscriptomicsDatum>
      options={parsedOptions}
      selectedOptionsIds={selectedOptionsIds}
      onSelectOptions={onSelectOptions}
      title={intl.get('global.search.genes.title')}
      tooltip={intl.get('global.search.genes.tooltip')}
      placeholder={intl.get('global.search.genes.placeholder')}
      emptyText={intl.get('global.search.genes.emptyText')}
      optionLabelKey="gene_symbol"
      optionValueKey="ensembl_gene_id"
    />
  );
};

export default TranscriptomicSearchByGene;
