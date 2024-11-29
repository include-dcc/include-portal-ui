// Reducers
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EnvVariables from 'helpers/EnvVariables';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';

import AnalyticsReducer from 'store/analytics';
import FencesReducer from 'store/fences';
import GlobalReducer from 'store/global';
import PassportReducer from 'store/passport';
import RemoteReducer from 'store/remote';
import ReportReducer from 'store/report';
import SavedFilterReducer from 'store/savedFilter';
import SavedSetReducer from 'store/savedSet';
import { RootState } from 'store/types';
import UpsetReducer from 'store/upset';
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
  fences: FencesReducer,
  passport: PassportReducer,
  savedFilter: SavedFilterReducer,
  savedSet: SavedSetReducer,
  remote: RemoteReducer,
  analytics: AnalyticsReducer,
  upset: UpsetReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: devMode,
  middleware: (getDefaultMiddleware) => {
    const defaultMid = getDefaultMiddleware({
      serializableCheck: false,
    });
    return defaultMid;
  },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default function getStoreConfig() {
  return { store, persistor };
}
