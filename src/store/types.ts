import { FenceConnectionInitialState } from 'store/fenceConnection';
import { GlobalInitialState } from 'store/global';
import { UserInitialState } from 'store/user';

import { FenceCavaticaInitialState } from './fenceCavatica';
import { fenceStudiesInitialState } from './fenceStudies';
import { RemoteInitialState } from './remote';
import { ReportInitialState } from './report';
import { SavedFilterInitialState } from './savedFilter';
import { SavedSetInitialState } from './savedSet';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  fenceConnection: FenceConnectionInitialState;
  fenceStudies: fenceStudiesInitialState;
  savedFilter: SavedFilterInitialState;
  savedSet: SavedSetInitialState;
  fenceCavatica: FenceCavaticaInitialState;
  remote: RemoteInitialState;
};
