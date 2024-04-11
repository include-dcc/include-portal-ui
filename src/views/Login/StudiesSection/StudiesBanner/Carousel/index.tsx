import React from 'react';
import intl from 'react-intl-universal';
import ParticipantIcon from '@ferlab/ui/core/components/Icons/Futuro/ParticipantIcon';
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

import { useGlobals } from '../../../../../store/global';
import TextIcon from '../../../TextIcon';

import styles from './index.module.scss';

const studies = [
  { code: 'HTP', formattedCode: 'htp', logo: HtpLogo },
  { code: 'DSC', formattedCode: 'dsc', logo: DsconnectLogo },
  { code: 'DS360-CHD', formattedCode: 'ds360hd', logo: KfLogo },
  {
    code: 'X01-Hakonarson',
    formattedCode: 'x01hakonarson',
    logo: DefaultLogo,
  },
  { code: 'DS-PCGC', formattedCode: 'dspcgc', logo: KfLogo },
  { code: 'BRI-DSR', formattedCode: 'bridsr', logo: BriLogo },
  { code: 'ABC-DS', formattedCode: 'abcds', logo: AbcdsLogo },
  { code: 'DS-COG-ALL', formattedCode: 'dscogall', logo: KfLogo },
  { code: 'X01-deSmith', formattedCode: 'x01desmith', logo: DefaultLogo },
  { code: 'DS-Sleep', formattedCode: 'dssleep', logo: DssleepLogo },
  { code: 'DS-NEXUS', formattedCode: 'dsnexus', logo: DsnexusLogo },
];

const Carousel = () => {
  const { stats } = useGlobals();
  const { studiesParticipants = {} } = stats || {};

  return (
    <AntCarousel
      className={styles.carousel}
      autoplay
      autoplaySpeed={5000}
      dots={{ className: styles.dots }}
    >
      {studies.map((study) => (
        <div className={styles.contentStyle} key={study.code}>
          <img src={study.logo} alt="Study Logo" className={styles.logo} />
          <div className={styles.subTitle}>
            {intl.get(`screen.loginPage.studies.${study.formattedCode}.name`)}
          </div>
          <div className={styles.description}>
            {intl.getHTML(`screen.loginPage.studies.${study.formattedCode}.description`)}
          </div>
          <TextIcon
            IconComponent={ParticipantIcon}
            title={numberFormat(studiesParticipants[study.code])}
            subTitle={intl.get('entities.participant.participants')}
            color="dark"
          />
        </div>
      ))}
    </AntCarousel>
  );
};

export default Carousel;
