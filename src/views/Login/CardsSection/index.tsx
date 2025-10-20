import intl from 'react-intl-universal';
import CavaticaCard from '@ferlab/ui/core/pages/LandingPage/CavaticaCard';
import GenericCard from '@ferlab/ui/core/pages/LandingPage/GenericCard';
import VariantCard from '@ferlab/ui/core/pages/LandingPage/VariantCard';
import { useKeycloak } from '@react-keycloak/web';

import CavaticaLogo from '../../../components/assets/cavatica-logo.png';
import EMODS_logo from '../../../components/assets/EMODS_logo.svg';
import { useGlobals } from '../../../store/global';
import { STATIC_ROUTES } from '../../../utils/routes';

import BottomBanner from './InfoBanner';

import styles from './index.module.css';

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

        <GenericCard
          dictionary={{
            description: intl.get('screen.loginPage.cards.emods.description'),
            button: intl.get('screen.loginPage.cards.emods.buttonLabel'),
          }}
          logo={<img src={EMODS_logo} alt="EMODS Logo" className={styles.logo} />}
          buttonProps={{
            type: 'primary',
            href: 'https://experimentalmodels.includedcc.org',
            target: '_blank',
          }}
          containerClassName={styles.emodsCardContainer}
        />

        <BottomBanner />
      </div>
    </div>
  );
};

export default Cards;
