import intl from 'react-intl-universal';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { readableDistanceByDays } from 'utils/dates';

import styles from './index.module.css';

interface OwnProps {
  ageInDays?: number;
}

const AgeCell = ({ ageInDays }: OwnProps) => {
  if (ageInDays == 0) {
    return <>{ageInDays}</>;
  }
  if (!ageInDays) {
    return <>{TABLE_EMPTY_PLACE_HOLDER}</>;
  }

  const { years, days } = readableDistanceByDays(ageInDays);
  return (
    <>
      {years != 0 && (
        <>
          {`${years} `}
          <span className={styles.timeUnitText}>{intl.get('date.years', { years })}</span>
        </>
      )}
      {` ${days} `}
      <span className={styles.timeUnitText}>{intl.get('date.days', { days })}</span>{' '}
    </>
  );
};

export default AgeCell;
