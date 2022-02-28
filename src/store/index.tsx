import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import EnvVariables from 'helpers/EnvVariables';
import { RootState } from 'store/types';
// Reducers
import GlobalReducer from 'store/global';
import UserReducer from 'store/user';
import FenceConnectionReducer from 'store/fenceConnection';
import RiffReducer from 'store/riff';
import ReportReducer from 'store/report';
import SavedFilterReducer from 'store/savedFilter';
import FenceCavaticaReducer from 'store/fenceCavatica';
import FenceStudiesReducer from 'store/fenceStudies';

const devMode = EnvVariables.configFor('ENV') === 'development';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'],
};

const rootReducer = combineReducers<RootState>({
  global: GlobalReducer,
  user: UserReducer,
  report: ReportReducer,
  fenceConnection: FenceConnectionReducer,
  fenceStudies: FenceStudiesReducer,
  riff: RiffReducer,
  savedFilter: SavedFilterReducer,
  fenceCavatica: FenceCavaticaReducer,
});

const store: any = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: devMode,
  middleware: (getDefaultMiddleware) => {
    let defaultMid = getDefaultMiddleware({
      serializableCheck: false,
    });
    return devMode ? defaultMid.concat(logger) : defaultMid;
  },
});

const persistor = persistStore(store);

export default function getStoreConfig() {
  return { store, persistor };
}
