import intl from 'react-intl-universal';

import {
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

type OwnProps = {
  options?: ITranscriptomicsSampleGeneExp;
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  onSelectOptions: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  disabled?: boolean;
};

const TranscriptomicSearchBySample = ({
  options,
  selectedSamples,
  onSelectOptions,
  disabled = false,
}: OwnProps) => {
  const parsedOptions = options?.data || [];

  return (
    <TranscriptomicSearch<TTranscriptomicsSwarmPlotData>
      options={parsedOptions}
      selectedOptionsIds={selectedSamples.map((sample) => sample.sample_id)}
      onSelectOptions={onSelectOptions}
      disabled={disabled}
      title={intl.get('screen.analytics.transcriptomic.filter.samples.title')}
      tooltip={intl.get('screen.analytics.transcriptomic.filter.samples.tooltip')}
      placeholder={intl.get('screen.analytics.transcriptomic.filter.samples.placeholder')}
      emptyText={intl.get('screen.analytics.transcriptomic.filter.samples.emptyText')}
      optionLabelKey="sample_id"
      optionValueKey="sample_id"
    />
  );
};

export default TranscriptomicSearchBySample;
