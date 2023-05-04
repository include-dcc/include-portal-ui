import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';
import cx from 'classnames';

import DataCategoryGraphCard from '../DataCategoryGraphCard';
import DataTypeGraphCard from '../DataTypeGraphCard';
import DemographicsGraphCard from '../DemographicGraphCard';
import SunburstGraphCard from '../SunburstGraphCard';

import styles from '../index.module.scss';

export const getDefaultLayouts = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.mondo.cardTitle'),
    id: 'mondo',
    component: (
      <SunburstGraphCard
        id="3"
        className={cx(styles.summaryGrapCard, styles.sunburstGraphCard)}
        field="mondo"
      />
    ),
    base: {
      h: 4,
      w: 8,
      x: 0,
      y: 0,
      minW: 5,
      minH: 4,
    },
    md: {
      h: 4,
      w: 6,
      x: 0,
    },
    sm: {
      h: 4,
      w: 5,
      x: 0,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.observed_phenotype.cardTitle'),
    id: 'observed_phenotype',
    component: (
      <SunburstGraphCard
        id="2"
        className={cx(styles.summaryGrapCard, styles.sunburstGraphCard)}
        field="observed_phenotype"
      />
    ),
    base: {
      h: 4,
      w: 8,
      x: 8,
      y: 0,
      minW: 5,
      minH: 4,
    },
    md: {
      h: 4,
      w: 6,
      x: 6,
    },
    sm: {
      h: 4,
      w: 5,
      x: 5,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 4,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: 'demographics-graph-card',
    component: <DemographicsGraphCard id="1" className={styles.summaryGrapCard} />,
    base: {
      h: 4,
      w: 4,
      x: 0,
      y: 4,
      minW: 4,
      minH: 4,
    },
    md: {
      h: 4,
      w: 4,
      x: 0,
      y: 4,
    },
    sm: {
      h: 4,
      w: 4,
      x: 0,
      y: 4,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: 'data-category-graph-card',
    component: (
      <DataCategoryGraphCard
        key="data-category-graph-card"
        id="4"
        className={styles.summaryGrapCard}
      />
    ),
    base: {
      h: 4,
      w: 5,
      x: 4,
      y: 4,
      minW: 4,
      minH: 4,
    },
    md: {
      h: 4,
      w: 8,
      x: 4,
      y: 4,
    },
    sm: {
      h: 4,
      w: 6,
      x: 4,
      y: 8,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 20,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    id: 'data-type-graph-card',
    component: <DataTypeGraphCard id="5" className={styles.summaryGrapCard} />,
    base: {
      h: 4,
      w: 7,
      x: 9,
      y: 4,
      minW: 4,
      minH: 4,
    },
    md: {
      h: 4,
      w: 12,
      x: 0,
      y: 8,
    },
    sm: {
      h: 4,
      w: 10,
      x: 0,
      y: 12,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 24,
    },
  },
];
