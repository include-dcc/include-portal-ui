import React from 'react';
import intl from 'react-intl-universal';
import FamilyIcon from '@ferlab/ui/core/components/Icons/Futuro/FamilyIcon';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Carousel as AntCarousel } from 'antd';

import AbcdsLogo from 'components/assets/studies/abc-ds-logo.png';
import DsconnectLogo from 'components/assets/studies/ds-connect-logo.png';
import HtpLogo from 'components/assets/studies/htp-logo.png';
import UcsmLogo from 'components/assets/studies/ucsm-logo.png';
import UtahLogo from 'components/assets/studies/utah-logo.png';

import TextIcon from '../../../TextIcon';

import styles from './index.module.scss';

const studies = [
  { name: 'cartagene', logo: HtpLogo, participantsCount: 4500 },
  { name: 'dee', logo: AbcdsLogo, participantsCount: 3772 },
  { name: 'bacq', logo: UcsmLogo, participantsCount: 673 },
  { name: 'pragmatiq', logo: UtahLogo, participantsCount: 9876 },
  { name: 'neurodev', logo: DsconnectLogo, participantsCount: 1224 },
];

const Carousel = () => (
  <AntCarousel className={styles.carousel} autoplaySpeed={5000} dots={{ className: styles.dots }}>
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
        <TextIcon
          IconComponent={FamilyIcon}
          title={numberFormat(study.participantsCount)}
          subTitle={intl.get('entities.participant.participants')}
          color="dark"
        />
      </div>
    ))}
  </AntCarousel>
);

export default Carousel;
