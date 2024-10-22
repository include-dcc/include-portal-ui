import intl from 'react-intl-universal';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

type OwnProps = {
  options?: TTranscriptomicsDiffGeneExp[];
  selectedGenes: TTranscriptomicsDatum[];
  onSelectOptions: (genes: TTranscriptomicsDatum[]) => void;
};

const TranscriptomicSearchByGene = ({ options, selectedGenes, onSelectOptions }: OwnProps) => {
  const parsedOptions: TTranscriptomicsDatum[] = options?.flatMap((option) => option.data) || [];

  return (
    <TranscriptomicSearch<TTranscriptomicsDatum>
      options={parsedOptions}
      selectedOptionsIds={selectedGenes.map((gene) => gene.ensembl_gene_id)}
      onSelectOptions={onSelectOptions}
      title={intl.get('screen.analytics.transcriptomic.filter.genes.title')}
      tooltip={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
      placeholder={intl.get('screen.analytics.transcriptomic.filter.genes.placeholder')}
      emptyText={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
      optionLabelKey="gene_symbol"
      optionValueKey="ensembl_gene_id"
    />
  );
};
export default TranscriptomicSearchByGene;
