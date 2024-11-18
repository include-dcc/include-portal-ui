/* eslint-disable simple-import-sort/imports */
// Impor.css before everything to make sure it is applied correctly

import '@ferlab/ui/themes/default/theme.template.css';

import 'style/themes/include/dist/antd.css';
import 'style/themes/include/dist/colors.css';
import 'style/themes/include/main.css';
import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { ContextLines } from '@sentry/integrations';
import LocalStorageIntegrations from 'services/sentry/localStorageIntegrations';
import EnvironmentVariables from 'helpers/EnvVariables';

import { initUserSnap } from 'services/initUsersnap';

import App from './App';
import reportWebVitals from './reportWebVitals';

initUserSnap();

const reactAppWebRoot = EnvironmentVariables.configFor('REACT_APP_WEB_ROOT');
const SentryDSN = EnvironmentVariables.configFor('SENTRY_API');

Sentry.init({
  dsn: SentryDSN,
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', reactAppWebRoot],
  integrations: [
    new ContextLines(),
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    new LocalStorageIntegrations('LocalStorage'),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
