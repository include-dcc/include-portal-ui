// Reducers
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EnvVariables from 'helpers/EnvVariables';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';

import FenceCavaticaReducer from 'store/fenceCavatica';
import FenceConnectionReducer from 'store/fenceConnection';
import FenceStudiesReducer from 'store/fenceStudies';
import GlobalReducer from 'store/global';
import ReportReducer from 'store/report';
import SavedFilterReducer from 'store/savedFilter';
import SavedSetReducer from 'store/savedSet';
import { RootState } from 'store/types';
import UserReducer from 'store/user';

const devMode = EnvVariables.configFor('ENV') === 'development';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'],
  transforms: [createFilter('global', ['lang'])],
};

const rootReducer = combineReducers<RootState>({
  global: GlobalReducer,
  user: UserReducer,
  report: ReportReducer,
  fenceConnection: FenceConnectionReducer,
  fenceStudies: FenceStudiesReducer,
  savedFilter: SavedFilterReducer,
  savedSet: SavedSetReducer,
  fenceCavatica: FenceCavaticaReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: devMode,
  middleware: (getDefaultMiddleware) => {
    const defaultMid = getDefaultMiddleware({
      serializableCheck: false,
    });
    return devMode ? defaultMid.concat(logger) : defaultMid;
  },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default function getStoreConfig() {
  return { store, persistor };
}
