import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';

import { RootState } from 'store/types';

export const passportSelector = (state: RootState) => state.passport;
export const passportCavaticaSelector = (state: RootState) => state.passport.cavatica;
export const passportCavaticaConnectedSelector = (state: RootState) =>
  state.passport.cavatica.authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected;
export const passportCavaticaConsentCodesSelector = (state: RootState) =>
  state.passport.cavatica.userAcls.consentCodes;
