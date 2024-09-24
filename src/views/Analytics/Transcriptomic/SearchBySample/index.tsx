import intl from 'react-intl-universal';

import {
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

type OwnProps = {
  options?: ITranscriptomicsSampleGeneExp;
  selectedOptionsIds: string[];
  onSelectOptions: (selectedIds: string[]) => void;
  disabled?: boolean;
};

const TranscriptomicSearchBySample = ({
  options,
  selectedOptionsIds,
  onSelectOptions,
  disabled = false,
}: OwnProps) => {
  const parsedOptions = options?.data || [];

  const sampleFilterFunction = (options: TTranscriptomicsSwarmPlotData[], input: string) =>
    options.filter((opt) => opt.sample_id.toLowerCase().includes(input.toLowerCase()));

  return (
    <TranscriptomicSearch<TTranscriptomicsSwarmPlotData>
      options={parsedOptions}
      selectedOptionsIds={selectedOptionsIds}
      onSelectOptions={onSelectOptions}
      disabled={disabled}
      title={intl.get('screen.analytics.transcriptomic.filter.samples.title')}
      tooltip={intl.get('screen.analytics.transcriptomic.filter.samples.tooltip')}
      placeholder={intl.get('screen.analytics.transcriptomic.filter.samples.placeholder')}
      emptyText={intl.get('screen.analytics.transcriptomic.filter.samples.emptyText')}
      optionLabelKey="sample_id"
      optionValueKey="sample_id"
      filterFunction={sampleFilterFunction}
    />
  );
};

export default TranscriptomicSearchBySample;
