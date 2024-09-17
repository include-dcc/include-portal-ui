import {
  ITranscriptomicsFacets,
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsDiffGeneExp,
} from '../../services/api/transcriptomics/models';

export type initialState = {
  transcriptomics: {
    facets: {
      loading: boolean;
      data?: ITranscriptomicsFacets;
      error?: boolean;
    };
    diffGeneExp: {
      loading: boolean;
      data?: TTranscriptomicsDiffGeneExp[];
      error?: boolean;
    };
    sampleGeneExp: {
      loading: boolean;
      data?: ITranscriptomicsSampleGeneExp;
      error?: boolean;
    };
  };
};
