import keycloak from 'auth/keycloak-api/keycloak';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiInstance = axios.create();

export interface ApiResponse<T> {
  data: T | undefined;
  response: AxiosResponse;
  error: AxiosError | undefined;
}

apiInstance.interceptors.request.use((config) => {
  // set Authorization headers on a per request basis
  // setting headers on axios get/put/post or common seems to be shared across all axios instances

  const token = keycloak?.token;
  if (token) {
    if (!config.headers) config.headers = {};
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export const sendRequest = async <T,>(config: AxiosRequestConfig) =>
  apiInstance
    .request<T>(config)
    .then(
      (response): ApiResponse<T> => ({
        response: response,
        data: response.data,
        error: undefined,
      }),
    )
    .catch(
      (err): ApiResponse<T> => ({
        response: err.response,
        data: undefined,
        error: err,
      }),
    );

export default apiInstance;
