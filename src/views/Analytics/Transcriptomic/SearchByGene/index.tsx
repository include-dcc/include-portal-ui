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

  const geneFilterFunction = (options: TTranscriptomicsDatum[], input: string) =>
    options.filter(
      (opt) =>
        opt.gene_symbol.toLowerCase().includes(input.toLowerCase()) ||
        opt.ensembl_gene_id.toLowerCase().includes(input.toLowerCase()),
    );

  return (
    <TranscriptomicSearch<TTranscriptomicsDatum>
      options={parsedOptions}
      selectedOptionsIds={selectedOptionsIds}
      onSelectOptions={onSelectOptions}
      title={intl.get('screen.analytics.transcriptomic.filter.genes.title')}
      tooltip={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
      placeholder={intl.get('screen.analytics.transcriptomic.filter.genes.placeholder')}
      emptyText={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
      optionLabelKey="gene_symbol"
      optionValueKey="ensembl_gene_id"
      filterFunction={geneFilterFunction}
    />
  );
};
export default TranscriptomicSearchByGene;
