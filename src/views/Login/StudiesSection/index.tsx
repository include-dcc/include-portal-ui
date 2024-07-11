import intl from 'react-intl-universal';
import Studies from '@ferlab/ui/core/pages/LandingPage/Studies';

import DsnexusLogo from 'components/assets/studies/light/study-logo-DS-NEXUS.png';
import DssleepLogo from 'components/assets/studies/light/study-logo-DS-Sleep.png';
import HtpLogo from 'components/assets/studies/light/study-logo-HTP.png';
import AbcdsLogo from 'components/assets/studies/study-logo-ABC-DS.png';
import BriLogo from 'components/assets/studies/study-logo-BRI.png';
import DefaultLogo from 'components/assets/studies/study-logo-default.svg';
import DsconnectLogo from 'components/assets/studies/study-logo-DSC.png';
import KfLogo from 'components/assets/studies/study-logo-KF.svg';

import { useGlobals } from '../../../store/global';

import DemographicGraphsCard from './DemographicGraphsCard';
import Stats from './Stats';

import styles from './index.module.css';

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

const formatStudies = (studiesParticipants: Record<string, number>) =>
  studies.map((study) => ({
    code: study.code,
    title: <img src={study.logo} alt="Study Logo" className={styles.logo} />,
    subtitle: intl.get(`screen.loginPage.studies.${study.formattedCode}.name`),
    description: intl.getHTML(`screen.loginPage.studies.${study.formattedCode}.description`),
    participantCount: studiesParticipants[study.code],
  }));

const StudiesSection = () => {
  const { stats } = useGlobals();
  const { studiesParticipants = {}, studies: studiesCount = 0 } = stats || {};
  const formattedStudies = formatStudies(studiesParticipants);
  return (
    <div className={styles.container}>
      <Studies
        studiesCount={studiesCount}
        studies={formattedStudies}
        dictionary={{
          title: intl.get('screen.loginPage.studies.title'),
          summary: intl.get('screen.loginPage.studies.summary'),
        }}
      />
      <div className={styles.graphStatsContainer}>
        <div className={styles.graphStatsGrid}>
          <DemographicGraphsCard />
          <Stats />
        </div>
      </div>
    </div>
  );
};
export default StudiesSection;
