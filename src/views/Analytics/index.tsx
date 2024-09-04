import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import AnalyticsPage from '@ferlab/ui/core/pages/AnalyticsPage';

import { STATIC_ROUTES } from '../../utils/routes';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <AnalyticsPage
      dictionary={{
        title: intl.get('screen.analytics.title'),
        subtitle: intl.get('screen.analytics.subtitle'),
        widget: {
          demo: intl.get('screen.analytics.widget.demo'),
          launch: intl.get('screen.analytics.widget.launch'),
        },
      }}
      widgets={[
        {
          title: intl.get('screen.analytics.transcriptomic.title'),
          handleLaunch: () => {
            navigate(STATIC_ROUTES.ANALYTICS_TRANSCRIPTOMIC);
          },
        },
      ]}
    />
  );
};

export default Analytics;
