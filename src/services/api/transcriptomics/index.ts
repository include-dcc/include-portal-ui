import EnvironmentVariables from 'helpers/EnvVariables';

import { sendRequest } from 'services/api';

import {
  ITranscriptomicsFacets,
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsDiffGeneExp,
} from './models';

const ARRANGER_API = `${EnvironmentVariables.configFor('ARRANGER_API')}`;

const headers = () => ({
  'Content-Type': 'application/json',
});

const fetchFacets = () =>
  sendRequest<ITranscriptomicsFacets>({
    method: 'POST',
    url: `${ARRANGER_API}/transcriptomics/facets`,
    headers: headers(),
  });

const fetchDiffGeneExp = () =>
  sendRequest<TTranscriptomicsDiffGeneExp[]>({
    method: 'POST',
    url: `${ARRANGER_API}/transcriptomics/diffGeneExp`,
    headers: headers(),
  });

const fetchSampleGeneExp = (id: string) =>
  sendRequest<ITranscriptomicsSampleGeneExp>({
    method: 'POST',
    url: `${ARRANGER_API}/transcriptomics/sampleGeneExp`,
    headers: headers(),
    data: {
      ensembl_gene_id: id,
    },
  });

export const TranscriptomicsApi = {
  fetchFacets,
  fetchSampleGeneExp,
  fetchDiffGeneExp,
};
