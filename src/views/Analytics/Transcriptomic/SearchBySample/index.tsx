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

  return (
    <TranscriptomicSearch<TTranscriptomicsSwarmPlotData>
      options={parsedOptions}
      selectedOptionsIds={selectedOptionsIds}
      onSelectOptions={onSelectOptions}
      disabled={disabled}
      title={intl.get('global.search.samples.title')}
      tooltip={intl.get('global.search.samples.tooltip')}
      placeholder={intl.get('global.search.samples.placeholder')}
      emptyText={intl.get('global.search.samples.emptyText')}
      optionLabelKey="sample_id"
      optionValueKey="sample_id"
    />
  );
};

export default TranscriptomicSearchBySample;
