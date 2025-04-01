import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@ferlab/ui/core/pages/LandingPage/Footer';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { AlterTypes } from 'common/types';
import ChopLogo from 'components/assets/landing-page/footer/chop-logo.svg';
import ChuSjLogo from 'components/assets/landing-page/footer/chusj-logo.svg';
import LindaLogo from 'components/assets/landing-page/footer/linda-logo.svg';
import VanderbiltLogo from 'components/assets/landing-page/footer/vanderbilt-logo.svg';
import VelseraLogo from 'components/assets/landing-page/footer/verlsera-logo.png';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import { fetchStats } from 'store/global/thunks';

import CardsSection from './CardsSection';
import StudiesSection from './StudiesSection';
import TopBanner from './TopBanner';

import styles from './index.module.css';
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';
const BANNER_PERSISTENT_KEY = FT_FLAG_KEY + '_PERSISTENT';

const footerLogos = [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo];

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <>
      <NotificationBanner
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable={getFTEnvVarByKey(BANNER_PERSISTENT_KEY) === 'false'}
      />
      <div className={styles.mainLayout}>
        <TopBanner />
        <StudiesSection />
        <CardsSection />
        <Footer logos={footerLogos} />
      </div>
    </>
  );
};
export default Login;
