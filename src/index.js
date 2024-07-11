/* eslint-disable simple-import-sort/imports */
// Impor.css before everything to make sure it is applied correctly

import '@ferlab/ui/themes/default/theme.template.css';

import 'style/themes/include/dist/antd.css';
import 'style/themes/include/dist/colors.css';
import 'style/themes/include/main.css';
import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initUserSnap } from 'services/initUsersnap';

import App from './App';
import reportWebVitals from './reportWebVitals';

initUserSnap();

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
