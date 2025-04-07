import ReactGA from 'react-ga4';
import { CavaticaAnalyticsAction } from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import EnvironmentVariables from 'helpers/EnvVariables';
import { capitalize } from 'lodash';
import { FilterActionType } from 'views/DataExploration/components/PageContent';
import { SetActionType } from 'views/DataExploration/components/SetsManagementDropdown';

import { SetType } from 'services/api/savedSet/models';

const measurementId = EnvironmentVariables.configFor('MEASUREMENT_ID');
const isDev = EnvironmentVariables.configFor('ENV') === 'development';
const isGaActive = measurementId && !isDev;

export const initGa = () => {
  if (isGaActive) {
    ReactGA.initialize(measurementId);
  }
};

export const trackAuthSuccess = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'login success',
    });
  }
};

export const trackAuthError = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'login failed',
    });
  }
};

export const trackLogout = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'logout',
    });
  }
};

export const trackFacetSearch = (page: string, field: string) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'FacetSearch',
      action: `${capitalize(page)} -- ${field}`,
    });
  }
};

export const trackReportDownload = (reportCategory: string) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Reports',
      action: `report download -- ${reportCategory}`,
    });
  }
};

export const trackRequestBiospecimen = (action: string) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Reports',
      action: `request biospecimen -- ${action}`,
    });
  }
};

export const trackCavaticaAction = (page: string, action: string) => {
  let message = '';
  switch (action) {
    case CavaticaAnalyticsAction.ANALYSE:
      message = 'Analyse';
      break;
    case CavaticaAnalyticsAction.PROJECT_CREATED:
      message = 'Project Created';
      break;
    default:
      message = 'Unknown Action';
      break;
  }

  if (isGaActive) {
    ReactGA.event({
      category: 'Cavatica',
      action: `${message} -- ${capitalize(page)}`,
    });
  }
};

export const trackSummarySunburstAction = (
  type: string,
  action: string,
  node: string = 'undefined',
) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Summary',
      action: `Sunburst -- ${capitalize(action)} - ${capitalize(type)}.${node}`,
    });
  }
};

export const trackSetActions = (action: string, setType: SetType) => {
  let message = '';
  switch (action) {
    case SetActionType.CREATE_SET:
      message = 'Creating new Set';
      break;
    case SetActionType.UPDATE_SET:
      message = 'Updating existing Set';
      break;
    case SetActionType.REMOVE_SET:
      message = 'Removing existing Set';
      break;
    case SetActionType.ADD_IDS:
      message = 'Adding file(s) to existing Set';
      break;
    case SetActionType.REMOVE_IDS:
      message = 'Removing file(s) from existing Set';
      break;
    default:
      message = 'Unknown Action';
      break;
  }
  if (isGaActive) {
    ReactGA.event({
      category: 'Sets',
      action: `${setType} - ${message}`,
    });
  }
};

export const trackFilterActions = (action: string, tabId: string) => {
  let message = '';
  switch (action) {
    case FilterActionType.CREATE_FILTER:
      message = 'Creating new Filter';
      break;
    case FilterActionType.UPDATE_FILTER:
      message = 'Updating existing Filter';
      break;
    case FilterActionType.REMOVE_FILTER:
      message = 'Removing existing Filter';
      break;
    case FilterActionType.FAVORITE_FILTER:
      message = 'Adding Filter to favorites';
      break;
    case FilterActionType.SHARE_FILTER:
      message = 'Sharing Filter';
      break;
    default:
      message = 'Unknown Action';
      break;
  }
  if (isGaActive) {
    ReactGA.event({
      category: 'Filters',
      action: `${tabId} - ${message}`,
    });
  }
};

export const trackVisitResources = (resource: string) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Resources',
      action: `Visit -- ${resource}`,
    });
  }
};

export const trackRegistrationStarted = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Registration',
      action: 'Registration started',
    });
  }
};

export const trackKFConnection = (connected: boolean) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'FencesConnections',
      action: `${connected ? 'Connected to' : 'Disconnected from'} Kids First Framework Services`,
    });
  }
};

export const trackViewAllStudies = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Landing page',
      action: 'Landing page - View all studies',
    });
  }
};

export const trackPublicStudies = (btnName: string) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Public page',
      action: `Public page - ${btnName}`,
    });
  }
};

export const trackCompareQueries = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Data Exploration',
      action: 'Data Exploration - Compare Queries',
    });
  }
};

export const trackVennViewInExploration = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Venn',
      action: 'Venn - View in Exploration ',
    });
  }
};

export const trackVennClickOnSections = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Venn',
      action: 'Venn - Click on sections',
    });
  }
};

export const trackVennViewSet = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Venn',
      action: 'Venn modal - View set',
    });
  }
};

export const trackVennCancel = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Venn',
      action: 'Venn modal - Cancel',
    });
  }
};

export const trackVennViewEntityCounts = (type: string, entityCount: number) => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Venn',
      action: `View ${entityCount} counts`,
    });
  }
};

export const trackLaunchSetOperations = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Analytics',
      action: 'Analytics - Set Operations Launch',
    });
  }
};
