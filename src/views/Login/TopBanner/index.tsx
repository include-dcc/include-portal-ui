import React from 'react';

import LoginForm from './LoginForm';
import MondoChart from './MondoChart';

import styles from './index.module.css';

const TopBanner = () => (
  <div className={styles.topBanner}>
    <div className={styles.contentContainer}>
      <LoginForm />
      <MondoChart />
    </div>
  </div>
);

export default TopBanner;
