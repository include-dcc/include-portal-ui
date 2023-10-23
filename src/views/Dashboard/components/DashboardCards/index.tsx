import { TSortableItems } from '@ferlab/ui/core/layout/SortableGrid/SortableItem';
import cx from 'classnames';

import AuthorizedStudies from './AuthorizedStudies';
import BiospecimenRequests from './BiospecimenRequests';
import Cavatica from './Cavatica';
import SavedFilters from './SavedFilters';
import SavedSets from './SavedSets';

import styles from './index.module.scss';

export interface DashboardCardProps {
  id: string;
  key?: string;
  className?: string;
}

// Important do not change the ID
// Its is used for user config
export const dashboardCards: TSortableItems[] = [
  {
    id: '1',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <AuthorizedStudies id="1" className={styles.dashboardCard} />,
  },
  {
    id: '2',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <Cavatica id="2" className={styles.dashboardCard} />,
  },
  {
    id: '3',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <SavedFilters id="3" className={styles.dashboardCard} />,
  },
  {
    id: '4',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <SavedSets id="4" className={styles.dashboardCard} />,
  },
  {
    id: '5',
    xs: 24,
    md: 12,
    xxl: 8,
    className: cx(styles.cardColxxl6, styles.cardColxxl5),
    component: <BiospecimenRequests id="5" className={styles.dashboardCard} />,
  },
];
