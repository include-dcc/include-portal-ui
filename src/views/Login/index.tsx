import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchStats } from 'store/global/thunks';

import CardsSection from './CardsSection';
import Footer from './Footer';
import StudiesSection from './StudiesSection';
import TopBanner from './TopBanner';

import styles from './index.module.scss';

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
      <Footer />
    </div>
  );
};
export default Login;
