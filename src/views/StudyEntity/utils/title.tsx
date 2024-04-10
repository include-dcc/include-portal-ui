import React from 'react';
import StudySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/StudySpotIcon';

import ABC_DS_logo from '../../../components/assets/studies/study-logo-ABC-DS.png';
import BRI_DSR_logo from '../../../components/assets/studies/study-logo-BRI.png';
import DS_NEXUS_logo from '../../../components/assets/studies/study-logo-DS-NEXUS.png';
import DS_Sleep_logo from '../../../components/assets/studies/study-logo-DS-Sleep.png';
import DSC_logo from '../../../components/assets/studies/study-logo-DSC.png';
import HTP_logo from '../../../components/assets/studies/study-logo-HTP.png';
import KF_logo from '../../../components/assets/studies/study-logo-KF.svg';

import style from '../index.module.scss';

export const getLogoByStudyCode = (studyCode?: string): React.ReactNode => {
  switch (studyCode) {
    case 'ABC-DS':
      return <img src={ABC_DS_logo} className={style.logo} />;
    case 'BRI-DSR':
      return <img src={BRI_DSR_logo} className={style.logo} />;
    case 'DS-COG-ALL':
      return <img src={KF_logo} className={style.logo} />;
    case 'DS-NEXUS':
      return <img src={DS_NEXUS_logo} className={style.logo} />;
    case 'DS-PCGC':
      return <img src={KF_logo} className={style.logo} />;
    case 'DS-Sleep':
      return <img src={DS_Sleep_logo} className={style.logo} />;
    case 'DS360-CHD':
      return <img src={KF_logo} className={style.logo} />;
    case 'DSC':
      return <img src={DSC_logo} className={style.logo} />;
    case 'HTP':
      return <img src={HTP_logo} className={style.logo} />;

    default:
      return (
        <StudySpotIcon
          className={style.titleIcon}
          height={54}
          spotClassName={style.spotIcon}
          width={54}
        />
      );
  }
};
