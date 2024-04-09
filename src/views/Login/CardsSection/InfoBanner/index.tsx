import React from 'react';
import intl from 'react-intl-universal';
import CloudArchitectureIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudArchitectureSpotIcon';
import InformationIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/InformationSpotIcon';

import BannerItem from './BannerItem';

import styles from './index.module.scss';

const InfoBanner = () => (
  <div className={styles.bottomBanner}>
    <div className={styles.content}>
      <BannerItem
        IconComponent={InformationIcon}
        title={intl.get('screen.loginPage.documentation.title')}
        description={intl.get('screen.loginPage.documentation.description')}
        buttonText={intl.get('screen.loginPage.documentation.button')}
        buttonUrl="https://help.includedcc.org/docs/quick-start-guide"
      />
      <BannerItem
        IconComponent={CloudArchitectureIcon}
        title={intl.get('screen.loginPage.participation.title')}
        description={intl.get('screen.loginPage.participation.description')}
        buttonText={intl.get('screen.loginPage.participation.button')}
        buttonUrl="https://www.nih.gov/include-project"
      />
    </div>
  </div>
);

export default InfoBanner;
