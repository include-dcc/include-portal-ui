import React from 'react';

import Carousel from './Carousel';
import Summary from './Summary';

import styles from './index.module.scss';

const StudiesBanner = () => (
  <div className={styles.container}>
    <Summary />
    <Carousel />
  </div>
);
export default StudiesBanner;
