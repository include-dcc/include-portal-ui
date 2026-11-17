import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';

import reducer, { passportState } from './slice';
import {
  disconnectCavaticaPassport,
  fetchCavaticaAuthentificationStatus,
  fetchCavaticaAuthorizedStudies,
  fetchCavaticaUserAcls,
} from './thunks';

describe('passport slice: authorized studies', () => {
  const fetching = reducer(
    {
      ...passportState,
      cavatica: {
        ...passportState.cavatica,
        authentification: {
          ...passportState.cavatica.authentification,
          status: PASSPORT_AUTHENTIFICATION_STATUS.connected,
        },
      },
    },
    fetchCavaticaAuthorizedStudies.pending('requestId'),
  );
  const disconnected = reducer(fetching, disconnectCavaticaPassport.fulfilled(undefined, 'r2'));
  const study = {
    study_id: 'X01-deSmith',
    study_code: 'X01-deSmith',
    title: 'deSmith',
    user_acl_in_study: ['phs002982.c1'],
    total_authorized_files_count: 1308,
    authorized_controlled_files_count: 1308,
    total_files_count: 1308,
  };

  test('should store the studies when the fetch succeeds while connected', () => {
    const state = reducer(
      fetching,
      fetchCavaticaAuthorizedStudies.fulfilled({ studies: [study] }, 'requestId'),
    );

    expect(state.cavatica.authorizedStudies).toEqual({
      studies: [study],
      loading: false,
      error: false,
    });
  });

  test('should keep the reset state when the fetch succeeds after a disconnect', () => {
    const state = reducer(
      disconnected,
      fetchCavaticaAuthorizedStudies.fulfilled({ studies: [study] }, 'requestId'),
    );

    expect(state.cavatica.authorizedStudies).toEqual(passportState.cavatica.authorizedStudies);
  });

  test('should keep the reset state when the fetch fails after a disconnect', () => {
    const state = reducer(
      disconnected,
      fetchCavaticaAuthorizedStudies.rejected(null, 'requestId', undefined, 'Request failed'),
    );

    expect(state.cavatica.authorizedStudies).toEqual(passportState.cavatica.authorizedStudies);
  });
});

describe('passport slice: user acls', () => {
  const connected = {
    ...passportState,
    cavatica: {
      ...passportState.cavatica,
      authentification: {
        ...passportState.cavatica.authentification,
        status: PASSPORT_AUTHENTIFICATION_STATUS.connected,
      },
    },
  };
  const payload = { consentCodes: ['phs002330.c1'] };
  const fetching = reducer(connected, fetchCavaticaUserAcls.pending('requestId'));
  const loaded = reducer(fetching, fetchCavaticaUserAcls.fulfilled(payload, 'requestId'));

  test('should store the acls as loaded when the fetch succeeds', () => {
    expect(loaded.cavatica.userAcls).toEqual({
      ...payload,
      loading: false,
      loaded: true,
      error: false,
    });
  });

  test('should flag the error and stay unloaded when the fetch fails', () => {
    const state = reducer(
      fetching,
      fetchCavaticaUserAcls.rejected(null, 'requestId', undefined, 'Request failed'),
    );

    expect(state.cavatica.userAcls).toEqual({
      ...passportState.cavatica.userAcls,
      error: true,
    });
  });

  test('should reset the acls on disconnect', () => {
    const state = reducer(loaded, disconnectCavaticaPassport.fulfilled(undefined, 'r2'));

    expect(state.cavatica.userAcls).toEqual(passportState.cavatica.userAcls);
  });

  test('should keep the reset state when the fetch succeeds after a disconnect', () => {
    const disconnected = reducer(fetching, disconnectCavaticaPassport.fulfilled(undefined, 'r2'));
    const state = reducer(disconnected, fetchCavaticaUserAcls.fulfilled(payload, 'requestId'));

    expect(state.cavatica.userAcls).toEqual(passportState.cavatica.userAcls);
  });

  test('should reset the acls when the status check finds the connection gone', () => {
    const state = reducer(
      loaded,
      fetchCavaticaAuthentificationStatus.fulfilled(
        { status: PASSPORT_AUTHENTIFICATION_STATUS.disconnected },
        'r3',
      ),
    );

    expect(state.cavatica.userAcls).toEqual(passportState.cavatica.userAcls);
  });

  test('should keep the acls when the status check confirms the connection', () => {
    const state = reducer(
      loaded,
      fetchCavaticaAuthentificationStatus.fulfilled(
        { status: PASSPORT_AUTHENTIFICATION_STATUS.connected },
        'r3',
      ),
    );

    expect(state.cavatica.userAcls).toEqual(loaded.cavatica.userAcls);
  });
});
