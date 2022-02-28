import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { initialState } from 'store/fenceConnection/types';
import { FENCE_CONNECTION_STATUSES, FENCE_NAMES } from 'common/fenceTypes';
import { checkFenceAuthStatus, connectToFence, disconnectFromFence } from './thunks';

export const FenceConnectionState: initialState = {
  connectionStatus: {
    [FENCE_NAMES.gen3]: FENCE_CONNECTION_STATUSES.unknown,
    [FENCE_NAMES.cavatica]: FENCE_CONNECTION_STATUSES.unknown,
  },
  fencesInfo: {
    [FENCE_NAMES.gen3]: undefined,
    [FENCE_NAMES.cavatica]: undefined,
  },
  loadingFences: [],
  fencesConnectError: [],
  fencesDisconnectError: [],
  connections: {},
};

const removeFenceFromList = (state: FENCE_NAMES[], fenceName: FENCE_NAMES) =>
  state.filter((name) => name !== fenceName);

const removeLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.filter((name) => name !== fenceName);

const addLoadingFences = (state: initialState, fenceName: FENCE_NAMES) =>
  state.loadingFences.includes(fenceName)
    ? state.loadingFences
    : [...state.loadingFences, fenceName];

const fenceConnectionSlice = createSlice({
  name: 'fence',
  initialState: FenceConnectionState,
  reducers: {},
  extraReducers: (builder) => {
    /** NEW */
    // CONNECT FENCE
    builder.addCase(connectToFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesConnectError = removeFenceFromList(state.fencesConnectError, action.meta.arg);
    });
    builder.addCase(connectToFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.connected;
      state.fencesInfo[action.meta.arg] = action.payload;
    });
    builder.addCase(connectToFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesConnectError = [...state.fencesConnectError, action.meta.arg];
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
      // TODO add connections
    });

    // DISCONNECT FENCE
    builder.addCase(disconnectFromFence.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
      state.fencesDisconnectError = removeFenceFromList(
        state.fencesDisconnectError,
        action.meta.arg,
      );
    });
    builder.addCase(disconnectFromFence.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
      state.connections = omit(state.connections, [action.meta.arg]);
    });
    builder.addCase(disconnectFromFence.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.fencesDisconnectError = [...state.fencesDisconnectError, action.meta.arg];
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
      state.connections = omit(state.connections, [action.meta.arg]);
    });

    // CHECK AUTH STATUS
    builder.addCase(checkFenceAuthStatus.pending, (state, action) => {
      state.loadingFences = addLoadingFences(state, action.meta.arg);
    });
    builder.addCase(checkFenceAuthStatus.fulfilled, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] =
        action.payload && action.payload.authenticated
          ? FENCE_CONNECTION_STATUSES.connected
          : FENCE_CONNECTION_STATUSES.disconnected;
    });
    builder.addCase(checkFenceAuthStatus.rejected, (state, action) => {
      state.loadingFences = removeLoadingFences(state, action.meta.arg);
      state.connectionStatus[action.meta.arg] = FENCE_CONNECTION_STATUSES.disconnected;
    });
  },
});

export default fenceConnectionSlice.reducer;
