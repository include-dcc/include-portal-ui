import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@ferlab/ui/core/pages/LandingPage/Footer';

import ChopLogo from 'components/assets/landing-page/footer/chop-logo.svg';
import ChuSjLogo from 'components/assets/landing-page/footer/chusj-logo.svg';
import LindaLogo from 'components/assets/landing-page/footer/linda-logo.svg';
import VanderbiltLogo from 'components/assets/landing-page/footer/vanderbilt-logo.svg';
import VelseraLogo from 'components/assets/landing-page/footer/verlsera-logo.png';
import { fetchStats } from 'store/global/thunks';

import CardsSection from './CardsSection';
import StudiesSection from './StudiesSection';
import TopBanner from './TopBanner';

import styles from './index.module.scss';

const footerLogos = [LindaLogo, ChopLogo, VanderbiltLogo, ChuSjLogo, VelseraLogo];

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className={styles.mainLayout}>
      <TopBanner />
      <StudiesSection />
      <CardsSection />
      <Footer logos={footerLogos} />
    </div>
  );
};
export default Login;
