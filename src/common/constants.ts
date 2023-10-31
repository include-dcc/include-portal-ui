import EnvironmentVariables from 'helpers/EnvVariables';

export enum LANG {
  EN = 'en',
  FR = 'fr',
}

export const REDIRECT_URI_KEY = 'redirect_path';

export const TABLE_EMPTY_PLACE_HOLDER = '-';

export const MAIN_SCROLL_WRAPPER_ID = 'main-scroll-wrapper';

export const FILTER_ID_QUERY_PARAM_KEY = 'filterId';
export const SHARED_FILTER_ID_QUERY_PARAM_KEY = 'sharedFilterId';

export const DEFAULT_GRAVATAR_PLACEHOLDER = `${EnvironmentVariables.configFor(
  'INCLUDE_WEB_ROOT',
)}/avatar-placeholder.png`;

export const MAX_ITEMS_QUERY = 10000;
