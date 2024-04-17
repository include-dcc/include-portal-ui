import React from 'react';
import intl from 'react-intl-universal';
import CavaticaCard from '@ferlab/ui/core/pages/LandingPage/CavaticaCard';
import VariantCard from '@ferlab/ui/core/pages/LandingPage/VariantCard';
import { useKeycloak } from '@react-keycloak/web';

import CavaticaLogo from '../../../components/assets/cavatica-logo.png';
import { useGlobals } from '../../../store/global';
import { STATIC_ROUTES } from '../../../utils/routes';

import BottomBanner from './InfoBanner';

import styles from './index.module.scss';

const Cards = () => {
  const { keycloak } = useKeycloak();
  const { stats } = useGlobals();
  const { variants = 0 } = stats || {};
  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${STATIC_ROUTES.VARIANTS}`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid}>
        <VariantCard
          variantsCount={variants}
          buttonProps={{
            type: 'primary',
            onClick: handleSignin,
          }}
          dictionary={{
            title: intl.get('screen.loginPage.cards.variants.title'),
            description: intl.get('screen.loginPage.cards.variants.description'),
            button: intl.get('screen.loginPage.cards.variants.explore'),
          }}
        />

        <CavaticaCard
          dictionary={{
            description: intl.get('screen.loginPage.cards.cavatica.description'),
            learnMore: intl.get('screen.loginPage.cards.cavatica.learnMore'),
            login: intl.get('screen.loginPage.login'),
          }}
          logo={<img src={CavaticaLogo} alt="Cavatica Logo" className={styles.logo} />}
        />
        <BottomBanner />
      </div>
    </div>
  );
};

export default Cards;
