import { LANG } from 'common/constants';

import intlEn from './en';
import intlEs from './es';
import intlFr from './fr';

const locales = {
  [LANG.FR]: intlFr,
  [LANG.EN]: intlEn,
  [LANG.ES]: intlEs,
};

export default locales;
