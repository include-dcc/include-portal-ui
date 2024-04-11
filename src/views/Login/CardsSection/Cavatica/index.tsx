import React from 'react';
import intl from 'react-intl-universal';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { Button } from 'antd';

import CavaticaLogo from '../../../../components/assets/cavatica-logo.png';

import styles from './index.module.scss';

const Cavatica = () => (
  <div className={styles.container}>
    <img src={CavaticaLogo} alt="Cavatica Logo" className={styles.logo} />
    <div className={styles.description}>
      {intl.get('screen.loginPage.cards.cavatica.description')}
    </div>
    <div className={styles.buttonContainer}>
      <Button
        type="primary"
        size="large"
        href="https://www.cavatica.org/"
        target="_blank"
        className={styles.learnMoreButton}
      >
        {intl.get('screen.loginPage.cards.cavatica.learnMore')}
        <ExternalLinkIcon />
      </Button>
      <Button ghost size="large" href="https://cavatica.sbgenomics.com/" target="_blank">
        {intl.get('screen.loginPage.login')}
        <ExternalLinkIcon />
      </Button>
    </div>
  </div>
);

export default Cavatica;
