import intl from 'react-intl-universal';
import { Navigate, Route, Routes } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import { PASSPORT } from '@ferlab/ui/core/components/Widgets/Cavatica';
import MaintenancePage from '@ferlab/ui/core/pages/MaintenancePage';
import { setLocale } from '@ferlab/ui/core/utils/localeUtils';
import loadable from '@loadable/component';
import { useKeycloak } from '@react-keycloak/web';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import frFR from 'antd/lib/locale/fr_FR';
import { getEnvVarByKey } from 'helpers/EnvVariables';
import AuthMiddleware from 'middleware/AuthMiddleware';
import ProtectedRoute from 'ProtectedRoute';
import ApolloProvider from 'provider/ApolloProvider';
import ContextProvider from 'provider/ContextProvider';
import { GraphqlBackend } from 'provider/types';
import ErrorPage from 'views/Error';
import FenceRedirect from 'views/FenceRedirect';
import Login from 'views/Login';

import { LANG } from 'common/constants';
import { FENCE_NAMES } from 'common/fenceTypes';
import ErrorBoundary from 'components/ErrorBoundary';
import Spinner from 'components/uiKit/Spinner';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import { initGa } from 'services/analytics';
import { useLang } from 'store/global';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

const loadableProps = { fallback: <Spinner size="large" /> };
const Dashboard = loadable(() => import('views/Dashboard'), loadableProps);
const Community = loadable(() => import('views/Community'), loadableProps);
const CommunityMember = loadable(() => import('views/Community/Member'), loadableProps);
const Studies = loadable(() => import('views/Studies'), loadableProps);
const StudyEntity = loadable(() => import('views/StudyEntity'), loadableProps);
const DataExploration = loadable(() => import('views/DataExploration'), loadableProps);
const Variants = loadable(() => import('views/Variants'), loadableProps);
const VariantEntity = loadable(() => import('views/VariantEntity'), loadableProps);
const FileEntity = loadable(() => import('views/FileEntity'), loadableProps);
const ParticipantEntity = loadable(() => import('views/ParticipantEntity'), loadableProps);
const ProfileSettings = loadable(() => import('views/ProfileSettings'), loadableProps);

initGa();

const App = () => {
  const lang = useLang();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  setLocale(lang);

  if (getEnvVarByKey('MAINTENANCE_MODE') === 'true') {
    return (
      <MaintenancePage
        title={intl.get('maintenance.title')}
        subtitle={intl.get('maintenance.subtitle')}
      />
    );
  }

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" />}
    >
      <ApolloProvider backend={GraphqlBackend.ARRANGER}>
        <div className="App" id="appContainer">
          {keycloakIsReady ? (
            <AuthMiddleware>
              <>
                <Routes>
                  <Route
                    path={STATIC_ROUTES.GEN3_FENCE_REDIRECT}
                    element={<FenceRedirect fence={FENCE_NAMES.gen3} />}
                  />
                  <Route
                    path={STATIC_ROUTES.CAVATICA_FENCE_REDIRECT}
                    element={<FenceRedirect fence={PASSPORT.cavatica} />}
                  />
                  <Route path={STATIC_ROUTES.LOGIN} element={<Login />} />
                  <Route path={DYNAMIC_ROUTES.ERROR} element={<ErrorPage />} />
                  <Route
                    path={STATIC_ROUTES.DASHBOARD}
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.COMMUNITY}
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.COMMUNITY_MEMBER}
                    element={
                      <ProtectedRoute>
                        <CommunityMember />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.PROFILE_SETTINGS}
                    element={
                      <ProtectedRoute>
                        <ProfileSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.STUDIES}
                    element={
                      <ProtectedRoute>
                        <Studies />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.STUDY_ENTITY}
                    element={
                      <ProtectedRoute>
                        <StudyEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.DATA_EXPLORATION}
                    element={
                      <ProtectedRoute>
                        <DataExploration />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.VARIANTS}
                    element={
                      <ProtectedRoute>
                        <Variants />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.VARIANT_ENTITY}
                    element={
                      <ProtectedRoute>
                        <VariantEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.FILE_ENTITY}
                    element={
                      <ProtectedRoute>
                        <FileEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.PARTICIPANT_ENTITY}
                    element={
                      <ProtectedRoute>
                        <ParticipantEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to={STATIC_ROUTES.DASHBOARD} />} />
                </Routes>
                <NotificationContextHolder />
              </>
            </AuthMiddleware>
          ) : (
            <Spinner size={'large'} />
          )}
        </div>
      </ApolloProvider>
    </ConfigProvider>
  );
};

const EnhanceApp = () => (
  <ErrorBoundary>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ErrorBoundary>
);

export default EnhanceApp;
