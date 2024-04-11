import React from 'react';

import ChopLogo from '../../../components/assets/landing-page/footer/chop-logo.svg';
import ChuSjLogo from '../../../components/assets/landing-page/footer/chusj-logo.svg';
import LindaLogo from '../../../components/assets/landing-page/footer/linda-logo.svg';
import VanderbiltLogo from '../../../components/assets/landing-page/footer/vanderbilt-logo.svg';
import VelseraLogo from '../../../components/assets/landing-page/footer/verlsera-logo.png';

import styles from './index.module.scss';

const Footer = () => (
  <footer className={styles.footerContainer}>
    <img src={LindaLogo} alt="Linda Logo" className={styles.image} />
    <img src={ChopLogo} alt="Chop Logo" className={styles.image} />
    <img src={VanderbiltLogo} alt="Vanderbilt Logo" className={styles.image} />
    <img src={ChuSjLogo} alt="ChuSj Logo" className={styles.image} />
    <img src={VelseraLogo} alt="Velsera Logo" className={styles.image} />
  </footer>
);

export default Footer;
