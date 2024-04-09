import React from 'react';

import ChopLogo from 'components/assets/footer/chop-logo.svg';
import ChuSjLogo from 'components/assets/footer/chusj-logo.svg';
import LindaLogo from 'components/assets/footer/linda-logo.svg';
import VanderbiltLogo from 'components/assets/footer/vanderbilt-logo.svg';
import VelseraLogo from 'components/assets/footer/verlsera-logo.png';

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
