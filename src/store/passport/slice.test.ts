import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';

import reducer, { passportState } from './slice';
import { disconnectCavaticaPassport, fetchCavaticaAuthorizedStudies } from './thunks';

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
