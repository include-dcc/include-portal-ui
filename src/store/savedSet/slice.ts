import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserSetOutput } from 'services/api/savedSet/models';
import { initialState } from 'store/savedSet/types';

import {
  clearCompareSets,
  createSavedSet,
  deleteSavedSet,
  fetchSavedSet,
  fetchSharedBiospecimenRequest,
  saveCompareSets,
  updateSavedSet,
} from './thunks';

export const SavedSetState: initialState = {
  savedSets: [],
  sharedBiospecimenRequest: undefined,
  isLoading: true,
  isUpdating: false,
  selectedId: undefined,
};

const sortByUpdateDate = (sets: IUserSetOutput[]) =>
  sets.sort((a, b) => (new Date(a.updated_date) < new Date(b.updated_date) ? 0 : -1));

const savedSetSlice = createSlice({
  name: 'user',
  initialState: SavedSetState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      selectedId: action.payload,
    }),
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchSavedSet.pending, (state) => {
      state.isLoading = true;
      state.fetchingError = undefined;
    });
    builder.addCase(fetchSavedSet.fulfilled, (state, action) => ({
      ...state,
      savedSets: sortByUpdateDate(action.payload),
      isLoading: false,
    }));
    builder.addCase(fetchSavedSet.rejected, (state, action) => ({
      ...state,
      fetchingError: action.payload,
      isLoading: false,
    }));
    // Fetch Shared
    builder.addCase(fetchSharedBiospecimenRequest.pending, (state) => {
      state.isLoading = true;
      state.fetchingError = undefined;
    });
    builder.addCase(fetchSharedBiospecimenRequest.fulfilled, (state, action) => ({
      ...state,
      sharedBiospecimenRequest: action.payload,
      isLoading: false,
    }));
    builder.addCase(fetchSharedBiospecimenRequest.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
    // Create
    builder.addCase(createSavedSet.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(createSavedSet.fulfilled, (state, action) => ({
      ...state,
      savedSets: sortByUpdateDate([...state.savedSets, action.payload]),
      isLoading: false,
    }));
    builder.addCase(createSavedSet.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    // Update
    builder.addCase(updateSavedSet.pending, (state) => {
      state.isUpdating = true;
      state.error = undefined;
    });
    builder.addCase(updateSavedSet.fulfilled, (state, action) => {
      const sets = [...state.savedSets.filter(({ id }) => action.payload.id !== id)];

      return {
        ...state,
        savedSets: sortByUpdateDate([...sets, action.payload]),
        isUpdating: false,
      };
    });
    builder.addCase(updateSavedSet.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isUpdating: false,
    }));
    // Delete
    builder.addCase(deleteSavedSet.fulfilled, (state, action) => ({
      ...state,
      savedSets: state.savedSets.filter(({ id }) => id !== action.payload),
    }));
    builder.addCase(deleteSavedSet.rejected, (state, action) => ({
      ...state,
      error: action.payload,
    }));
    // Compare set save
    builder.addCase(saveCompareSets.fulfilled, (state, action) => ({
      ...state,
      dashboardCompareSets: action.payload,
    }));
    builder.addCase(saveCompareSets.rejected, (state) => ({
      ...state,
      dashboardCompareSets: { entityType: undefined, ids: [] },
    }));
    // Compare set clear
    builder.addCase(clearCompareSets.fulfilled, (state) => ({
      ...state,
      dashboardCompareSets: { entityType: undefined, ids: [] },
    }));
    builder.addCase(clearCompareSets.rejected, (state) => ({
      ...state,
      dashboardCompareSets: { entityType: undefined, ids: [] },
    }));
  },
});

export const savedSetActions = savedSetSlice.actions;
export default savedSetSlice.reducer;
