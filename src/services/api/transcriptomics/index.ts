import EnvironmentVariables from 'helpers/EnvVariables';

import { sendRequest } from 'services/api';

import { ITranscriptomicsFacets, ITranscriptomicsSampleGeneExp } from './models';

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

const fetchSampleGeneExp = () =>
  sendRequest<ITranscriptomicsSampleGeneExp>({
    method: 'POST',
    url: `${ARRANGER_API}/transcriptomics/sampleGeneExp`,
    headers: headers(),
  });

export const TranscriptomicsApi = {
  fetchFacets,
  fetchSampleGeneExp,
};
