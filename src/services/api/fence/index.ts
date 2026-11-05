import { PASSPORT } from '@ferlab/ui/core/components/Widgets/Cavatica';
import EnvironmentVariables from 'helpers/EnvVariables';

import { sendRequest } from '..';

import { IFenceAclsPayload, IFenceAuthPayload, IFenceInfo } from './models';

const FENCE_API_URL = EnvironmentVariables.configFor('FENCE_API_URL');

type TApiFence = PASSPORT;

const isAuthenticated = (fence: TApiFence) =>
  sendRequest<IFenceAuthPayload>({
    url: `${FENCE_API_URL}/${fence}/authenticated`,
    method: 'GET',
  });

const fetchAcls = (fence: TApiFence) =>
  sendRequest<IFenceAclsPayload>({
    url: `${FENCE_API_URL}/${fence}/acl`,
    method: 'GET',
  });

const fetchInfo = (fence: TApiFence) =>
  sendRequest<IFenceInfo>({
    url: `${FENCE_API_URL}/${fence}/info`,
    method: 'GET',
  });

const exchangeCode = (fence: TApiFence, code: string) =>
  sendRequest({
    url: `${FENCE_API_URL}/${fence}/exchange`,
    method: 'GET',
    params: {
      code,
    },
  });

const disconnect = (fence: TApiFence) =>
  sendRequest({
    url: `${FENCE_API_URL}/${fence}/token`,
    method: 'DELETE',
  });

export const FenceApi = {
  isAuthenticated,
  fetchInfo,
  exchangeCode,
  disconnect,
  fetchAcls,
};
