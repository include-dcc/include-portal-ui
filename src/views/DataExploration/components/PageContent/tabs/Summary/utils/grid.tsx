import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';
import {
  mondoDefaultGridConfig,
  observedPhenotypeDefaultGridConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout/utils';

import DataCategoryGraphCard from '../DataCategoryGraphCard';
import DataTypeGraphCard from '../DataTypeGraphCard';
import DemographicsGraphCard from '../DemographicGraphCard';
import StudiesGraphCard from '../StudiesGraphCard';
import SunburstGraphCard from '../SunburstGraphCard';

export const UID = 'summary';
export const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
export const MONDO_ID = 'mondo';
export const DEMOGRAPHICS_GRAPH_CARD_ID = 'demographics-graph-card';
export const AGE_AT_DIAGNOSIS_GRAPH_CARD_ID = 'age-at-diagnosis-graph-card';
export const DATA_CATEGORY_GRAPH_CARD_ID = 'data-category-graph-card';
export const STUDIES_GRAPH_CARD_ID = 'studies-graph-card';
export const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';

export const getDefaultLayouts = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.observed_phenotype.cardTitle'),
    id: OBSERVED_PHENOTYPE_ID,
    component: <SunburstGraphCard id={OBSERVED_PHENOTYPE_ID} field="observed_phenotype" />,
    ...observedPhenotypeDefaultGridConfig,
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.mondo.cardTitle'),
    id: MONDO_ID,
    component: <SunburstGraphCard id={MONDO_ID} field="mondo" />,
    ...mondoDefaultGridConfig,
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: DEMOGRAPHICS_GRAPH_CARD_ID,
    component: <DemographicsGraphCard />,
    base: {
      h: 2,
      minH: 2,
      minW: 4,
      w: 8,
      x: 0,
      y: 4,
      isDraggable: false,
    },
    lg: {
      h: 2,
      w: 8,
      x: 0,
      y: 4,
    },
    md: {
      h: 2,
      w: 6,
      x: 0,
      y: 4,
    },
    sm: {
      h: 2,
      w: 5,
      x: 0,
      y: 4,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 8,
    },
    xxs: {
      h: 2,
      w: 4,
      x: 0,
      y: 8,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: DATA_CATEGORY_GRAPH_CARD_ID,
    component: <DataCategoryGraphCard />,
    base: {
      h: 2,
      minH: 2,
      minW: 4,
      w: 8,
      x: 8,
      y: 4,
    },
    lg: {
      h: 2,
      w: 8,
      x: 8,
      y: 4,
    },
    md: {
      h: 2,
      w: 6,
      x: 6,
      y: 4,
    },
    sm: {
      h: 2,
      w: 5,
      x: 5,
      y: 4,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 12,
    },
    xxs: {
      h: 2,
      w: 4,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.studies.cardTitle'),
    id: STUDIES_GRAPH_CARD_ID,
    component: <StudiesGraphCard />,
    base: {
      minH: 2,
      minW: 2,
      h: 3,
      w: 3,
      x: 0,
      y: 6,
    },
    lg: {
      h: 3,
      w: 3,
      x: 0,
      y: 6,
    },
    md: {
      h: 3,
      w: 3,
      x: 0,
      y: 6,
    },
    sm: {
      h: 3,
      w: 3,
      x: 0,
      y: 6,
    },
    xs: {
      h: 3,
      w: 6,
      x: 0,
      y: 14,
    },
    xxs: {
      h: 3,
      w: 4,
      x: 0,
      y: 14,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    id: DATA_TYPE_GRAPH_CARD_ID,
    component: <DataTypeGraphCard />,
    base: {
      minH: 2,
      minW: 2,
      h: 3,
      w: 8,
      x: 3,
      y: 6,
    },
    lg: {
      h: 3,
      w: 8,
      x: 3,
      y: 6,
    },
    md: {
      h: 3,
      w: 6,
      x: 3,
      y: 4,
    },
    sm: {
      h: 3,
      w: 5,
      x: 3,
      y: 4,
    },
    xs: {
      h: 3,
      w: 6,
      x: 0,
      y: 10,
    },
    xxs: {
      h: 3,
      w: 6,
      x: 0,
      y: 10,
    },
  },
];
