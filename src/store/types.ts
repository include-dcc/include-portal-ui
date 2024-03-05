import { GlobalInitialState } from 'store/global';
import { UserInitialState } from 'store/user';

import { FencesInitialState } from './fences';
import { PassportInitialState } from './passport';
import { RemoteInitialState } from './remote';
import { ReportInitialState } from './report';
import { SavedFilterInitialState } from './savedFilter';
import { SavedSetInitialState } from './savedSet';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  savedFilter: SavedFilterInitialState;
  savedSet: SavedSetInitialState;
  fences: FencesInitialState;
  remote: RemoteInitialState;
  passport: PassportInitialState;
};
