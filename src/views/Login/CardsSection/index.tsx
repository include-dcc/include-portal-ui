import Cavatica from './Cavatica';
import BottomBanner from './InfoBanner';
import Variants from './Variants';

import styles from './index.module.scss';

const Cards = () => (
  <div className={styles.cardsContainer}>
    <div className={styles.cardsGrid}>
      <Variants />
      <Cavatica />
      <BottomBanner />
    </div>
  </div>
);

export default Cards;
