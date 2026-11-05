import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch, useSelector } from 'react-redux';
import AuthorizedStudiesWidget, {
  FENCE_AUTHENTIFICATION_STATUS,
  IFence,
  IFenceService,
} from '@ferlab/ui/core/components/Widgets/AuthorizedStudies';
import { PASSPORT } from '@ferlab/ui/core/components/Widgets/Cavatica';
import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import CavaticaIcon from 'components/Icons/CavaticaIcon';
import { trackCavaticaConnection } from 'services/analytics';
import { passportCavaticaSelector } from 'store/passport/selector';
import {
  connectCavaticaPassport,
  disconnectCavaticaPassport,
  fetchCavaticaAuthorizedStudies,
} from 'store/passport/thunks';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import { DashboardCardProps } from '..';

const AuthorizedStudies = ({ id, className = '' }: DashboardCardProps) => {
  const dispatch = useDispatch();
  // Read only: the Cavatica card (useCavaticaPassport) fetches the connection status.
  const { authentification, authorizedStudies } = useSelector(passportCavaticaSelector);
  const isConnected = authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected;

  // The widget takes "fences": the Cavatica connection is the only one
  const fences: IFence[] = [
    {
      id: PASSPORT.cavatica,
      status: authentification.status as unknown as FENCE_AUTHENTIFICATION_STATUS,
      loading: authentification.loading,
      acl: [],
      error: authentification.error,
    },
  ];
  const services: IFenceService[] = [
    {
      fence: PASSPORT.cavatica,
      name: 'Cavatica',
      icon: <CavaticaIcon />,
      onConnectToFence: () => {
        trackCavaticaConnection(true);
        dispatch(connectCavaticaPassport());
      },
      onDisconnectFromFence: () => {
        trackCavaticaConnection(false);
        dispatch(disconnectCavaticaPassport());
      },
    },
  ];

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchCavaticaAuthorizedStudies());
    }
  }, [dispatch, isConnected]);

  return (
    <AuthorizedStudiesWidget
      id={id}
      fences={fences}
      queryProps={{
        to: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        // The study filter must be on the file index, like the counts
        participantIndex: INDEXES.FILE,
        fileIndex: INDEXES.FILE,
      }}
      authorizedStudies={authorizedStudies}
      className={className}
      services={services}
      dictionary={{
        title: intl.get('screen.dashboard.cards.authorizedStudies.title', {
          count: isConnected ? authorizedStudies.studies.length : 0,
        }),
        disconnect: intl.get('screen.dashboard.cards.authorizedStudies.disconnect'),
        connectedNotice: intl.get('screen.dashboard.cards.authorizedStudies.connectedNotice'),
        manageConnections: intl.get('screen.dashboard.cards.authorizedStudies.disconnect'),
        noAvailableStudies: intl.get('screen.dashboard.cards.authorizedStudies.noAvailableStudies'),
        authentification: {
          description: intl.get('screen.dashboard.cards.authorizedStudies.disconnectedNotice'),
          action: intl.get('global.connect'),
        },
        list: {
          authorization: intl.get('screen.dashboard.cards.authorizedStudies.authorization'),
          of: intl.get('screen.dashboard.cards.authorizedStudies.of'),
          dataGroups: intl.get('screen.dashboard.cards.authorizedStudies.dataGroups'),
          files: intl.get('screen.dashboard.cards.authorizedStudies.files'),
        },
        error: {
          title: intl.get('screen.dashboard.cards.error.title'),
          disconnect: {
            start: intl.get('screen.dashboard.cards.error.disconnect.start'),
            end: intl.get('screen.dashboard.cards.error.disconnect.end'),
          },
          email: SUPPORT_EMAIL,
          contactSupport: intl.get('screen.dashboard.cards.error.contactSupport'),
        },
        popover: {
          title: intl.get('screen.dashboard.cards.authorizedStudies.infoPopover.title'),
          applyingForDataAccess: intl.get(
            'screen.dashboard.cards.authorizedStudies.infoPopover.applyingForDataAccess',
          ),
          content: intl.get('screen.dashboard.cards.authorizedStudies.infoPopover.content'),
        },
      }}
    />
  );
};

export default AuthorizedStudies;
