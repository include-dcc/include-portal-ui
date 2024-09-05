import {
  ITranscriptomicsFacets,
  ITranscriptomicsSampleGeneExp,
} from '../../services/api/transcriptomics/models';

export type initialState = {
  transcriptomics: {
    facets: {
      loading: boolean;
      data?: ITranscriptomicsFacets;
      error?: boolean;
    };
    sampleGeneExp: {
      loading: boolean;
      data?: ITranscriptomicsSampleGeneExp;
      error?: boolean;
    };
  };
};
