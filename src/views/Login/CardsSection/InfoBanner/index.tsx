import React from 'react';
import intl from 'react-intl-universal';
import CloudArchitectureIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudArchitectureSpotIcon';
import InformationIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/InformationSpotIcon';
import BannerItem from '@ferlab/ui/core/pages/LandingPage/BannerItem';

import styles from './index.module.scss';

const InfoBanner = () => (
  <div className={styles.bottomBanner}>
    <div className={styles.content}>
      <BannerItem
        IconComponent={InformationIcon}
        color="dark"
        dictionary={{
          description: intl.get('screen.loginPage.documentation.description'),
          button: intl.get('screen.loginPage.documentation.button'),
          title: intl.get('screen.loginPage.documentation.title'),
        }}
        buttonProps={{
          type: 'primary',
          href: 'https://help.includedcc.org/docs/quick-start-guide',
          target: '_blank',
        }}
      />
      <BannerItem
        IconComponent={CloudArchitectureIcon}
        color="dark"
        dictionary={{
          description: intl.get('screen.loginPage.participation.description'),
          button: intl.get('screen.loginPage.participation.button'),
          title: intl.get('screen.loginPage.participation.title'),
        }}
        buttonProps={{
          type: 'primary',
          href: 'https://www.nih.gov/include-project',
          target: '_blank',
        }}
      />
    </div>
  </div>
);

export default InfoBanner;
