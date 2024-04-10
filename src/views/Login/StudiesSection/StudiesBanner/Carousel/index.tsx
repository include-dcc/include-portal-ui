import React from 'react';
import intl from 'react-intl-universal';
import FamilyIcon from '@ferlab/ui/core/components/Icons/Futuro/FamilyIcon';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Carousel as AntCarousel } from 'antd';

import DsnexusLogo from 'components/assets/studies/light/study-logo-DS-NEXUS.png';
import DssleepLogo from 'components/assets/studies/light/study-logo-DS-Sleep.png';
import HtpLogo from 'components/assets/studies/light/study-logo-HTP.png';
import AbcdsLogo from 'components/assets/studies/study-logo-ABC-DS.png';
import BriLogo from 'components/assets/studies/study-logo-BRI.png';
import DefaultLogo from 'components/assets/studies/study-logo-default.svg';
import DsconnectLogo from 'components/assets/studies/study-logo-DSC.png';
import KfLogo from 'components/assets/studies/study-logo-KF.svg';

import TextIcon from '../../../TextIcon';

import styles from './index.module.scss';

const studies = [
  { code: 'htp', logo: HtpLogo, participantsCount: 1062 },
  { code: 'dsc', logo: DsconnectLogo, participantsCount: 3634 },
  { code: 'ds360hd', logo: KfLogo, participantsCount: 1327 },
  { code: 'x01hakonarson', logo: DefaultLogo, participantsCount: 1152 },
  { code: 'dspcgc', logo: KfLogo, participantsCount: 369 },
  { code: 'bridsr', logo: BriLogo, participantsCount: 167 },
  { code: 'abcds', logo: AbcdsLogo, participantsCount: 417 },
  { code: 'dscogall', logo: KfLogo, participantsCount: 530 },
  { code: 'x01desmith', logo: DefaultLogo, participantsCount: 1152 },
  { code: 'dssleep', logo: DssleepLogo, participantsCount: 79 },
  { code: 'dsnexus', logo: DsnexusLogo, participantsCount: 41 },
];

const Carousel = () => (
  <AntCarousel className={styles.carousel} autoplaySpeed={5000} dots={{ className: styles.dots }}>
    {studies.map((study) => (
      <div className={styles.contentStyle} key={study.code}>
        <div className={styles.title}>
          {study.logo && <img src={study.logo} alt="Study Logo" className={styles.logo} />}
        </div>
        <div className={styles.subTitle}>
          {intl.get(`screen.loginPage.studies.${study.code}.name`)}
        </div>
        <div className={styles.description}>
          {intl.getHTML(`screen.loginPage.studies.${study.code}.description`)}
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
