import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import AuthorizedStudiesWidget, {
  FENCE_AUTHENTIFICATION_STATUS,
  IFenceService,
} from '@ferlab/ui/core/components/Widgets/AuthorizedStudies';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { FENCE_NAMES } from 'common/fenceTypes';
import IncludeIcon from 'components/Icons/IncludeIcon';
import { trackKFConnection } from 'services/analytics';
import { useFenceAuthentification, useFencesAuthorizedStudies } from 'store/fences';
import {
  fenceDisconnection,
  fenceOpenAuhentificationTab,
  fetchAuthorizedStudies,
} from 'store/fences/thunks';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import { DashboardCardProps } from '..';

const AuthorizedStudies = ({ id, className = '' }: DashboardCardProps) => {
  const dispatch = useDispatch();
  const gen3 = useFenceAuthentification(FENCE_NAMES.gen3);
  const fences = [gen3];
  const authorizedStudies = useFencesAuthorizedStudies();
  const services: IFenceService[] = [
    {
      fence: FENCE_NAMES.gen3,
      name: 'Inludes Framework Services',
      icon: <IncludeIcon width={45} height={45} />,
      onConnectToFence: () => {
        trackKFConnection(true);
        dispatch(fenceOpenAuhentificationTab(FENCE_NAMES.gen3));
      },
      onDisconnectFromFence: () => {
        trackKFConnection(false);
        dispatch(fenceDisconnection(FENCE_NAMES.gen3));
      },
    },
  ];

  useEffect(() => {
    if (!fences.some(({ status }) => status === FENCE_AUTHENTIFICATION_STATUS.connected)) {
      return;
    }

    dispatch(fetchAuthorizedStudies(fences));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gen3.status]);

  return (
    <AuthorizedStudiesWidget
      id={id}
      fences={fences}
      queryProps={{
        to: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        participantIndex: INDEXES.PARTICIPANT,
        fileIndex: INDEXES.FILE,
      }}
      authorizedStudies={authorizedStudies}
      className={className}
      services={services}
      dictionary={{
        title: intl.get('screen.dashboard.cards.authorizedStudies.title', {
          count: authorizedStudies.studies.length,
        }),
        connectedNotice: intl.get('screen.dashboard.cards.authorizedStudies.connectedNotice'),
        manageConnections: intl.get('screen.dashboard.cards.authorizedStudies.manageConnections'),
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
          subtitle: intl.get('screen.dashboard.cards.error.subtitle'),
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
