import React from 'react';
import intl from 'react-intl-universal';
import { Carousel as AntCarousel } from 'antd';

import AbcdsLogo from 'components/assets/studies/abc-ds-logo.png';
import DsconnectLogo from 'components/assets/studies/ds-connect-logo.png';
import HtpLogo from 'components/assets/studies/htp-logo.png';
import UcsmLogo from 'components/assets/studies/ucsm-logo.png';
import UtahLogo from 'components/assets/studies/utah-logo.png';

import styles from './index.module.scss';

const studies = [
  { name: 'cartagene', logo: HtpLogo },
  { name: 'dee', logo: AbcdsLogo },
  { name: 'bacq', logo: UcsmLogo },
  { name: 'pragmatiq', logo: UtahLogo },
  { name: 'neurodev', logo: DsconnectLogo },
];

const Carousel = () => (
  <AntCarousel
    className={styles.carousel}
    autoplay
    autoplaySpeed={5000}
    dots={{ className: styles.dots }}
  >
    {studies.map((study) => (
      <div className={styles.contentStyle} key={study.name}>
        <div className={styles.title}>
          {study.logo ? (
            <img src={study.logo} alt="Study Logo" className={styles.logo} />
          ) : (
            intl.get(`screen.loginPage.studies.${study.name}.title`)
          )}
        </div>
        <div className={styles.subTitle}>
          {intl.get(`screen.loginPage.studies.${study.name}.subtitle`)}
        </div>
        <div className={styles.description}>
          {intl.getHTML(`screen.loginPage.studies.${study.name}.description`)}
        </div>
      </div>
    ))}
  </AntCarousel>
);

export default Carousel;
