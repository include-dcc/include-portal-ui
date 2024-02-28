import EnvironmentVariables from 'helpers/EnvVariables';

import { sendRequest } from '..';

import { IStudyFetchParams, IStudyPayload } from './model';

export const STUDY_API = EnvironmentVariables.configFor('STUDY_API');

const fetch = (params: IStudyFetchParams) =>
  sendRequest<IStudyPayload>({
    method: 'GET',
    url: `${STUDY_API}/study`,
    data: params,
  });

export const StudyApi = {
  fetch,
};
