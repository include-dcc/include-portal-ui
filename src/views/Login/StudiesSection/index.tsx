import Stats from './Stats';
import StudiesBanner from './StudiesBanner';

import styles from './index.module.scss';

const StudiesSection = () => (
  <div className={styles.container}>
    <StudiesBanner />
    <Stats />
  </div>
);
export default StudiesSection;
