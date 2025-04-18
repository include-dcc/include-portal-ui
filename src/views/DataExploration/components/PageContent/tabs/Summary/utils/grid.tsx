import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';
import CoOccuringConditionsGraphCard from 'views/DataExploration/components/PageContent/tabs/Summary/CoOccuringConditions';

import DataCategoryGraphCard from '../DataCategoryGraphCard';
import DataTypeGraphCard from '../DataTypeGraphCard';
import DemographicsGraphCard from '../DemographicGraphCard';
import MostFrequentDiagnosisGraphCard from '../MostFrequentDiagnosisGraphCard';
import MostFrequentPhenotypesGraphCard from '../MostFrequentPhenotypesGraphCard';
import ParticipantsByAgeGraphCard from '../ParticipantsByAge';
import SampleTypeGraphCard from '../SampleType';
import StudiesGraphCard from '../StudiesGraphCard';

export const UID = 'summary';
export const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
export const CO_OCCURING_CONDITIONS_ID = 'co-occurring-conditions';
export const SAMPLE_TYPE = 'sample-type';
export const MONDO_ID = 'mondo';
export const MOST_FREQUENT_DIAGNOSES_ID = 'most_frequent_disagnoses';
export const MOST_FREQUENT_PHENOTYPES_ID = 'most_frequent_phenotypes';
export const DEMOGRAPHICS_GRAPH_CARD_ID = 'demographics-graph-card';
export const AGE_AT_DIAGNOSIS_GRAPH_CARD_ID = 'age-at-diagnosis-graph-card';
export const DATA_CATEGORY_GRAPH_CARD_ID = 'data-category-graph-card';
export const STUDIES_GRAPH_CARD_ID = 'studies-graph-card';
export const PARTCIPANTS_BY_AGE_CARD_ID = 'participants-by-age-card';
export const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';

export const getDefaultLayouts = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.mostFrequentPhenotypes'),
    id: MOST_FREQUENT_PHENOTYPES_ID,
    component: <MostFrequentPhenotypesGraphCard />,
    base: {
      minH: 3,
      minW: 3,
      h: 4,
      w: 6,
      x: 0,
      y: 4,
    },
    lg: {
      h: 4,
      w: 8,
      x: 0,
      y: 4,
    },
    md: {
      h: 4,
      w: 6,
      x: 0,
      y: 4,
    },
    sm: {
      h: 4,
      w: 5,
      x: 0,
      y: 4,
    },
    xs: {
      h: 6,
      w: 6,
      x: 0,
      y: 12,
    },
    xxs: {
      h: 6,
      w: 4,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.mostFrequentDiagnoses'),
    id: MOST_FREQUENT_DIAGNOSES_ID,
    component: <MostFrequentDiagnosisGraphCard />,
    base: {
      minH: 3,
      minW: 3,
      h: 4,
      w: 6,
      x: 6,
      y: 0,
    },
    lg: {
      h: 4,
      w: 8,
      x: 8,
      y: 0,
    },
    md: {
      h: 4,
      w: 6,
      x: 6,
      y: 0,
    },
    sm: {
      h: 4,
      w: 5,
      x: 5,
      y: 0,
    },
    xs: {
      h: 6,
      w: 6,
      x: 0,
      y: 12,
    },
    xxs: {
      h: 6,
      w: 4,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.coOccuringConditions.title'),
    id: CO_OCCURING_CONDITIONS_ID,
    component: <CoOccuringConditionsGraphCard />,
    base: {
      minH: 4,
      minW: 6,
      h: 4,
      w: 6,
      x: 0,
      y: 4,
      isResizable: false,
    },
    lg: {
      h: 4,
      w: 10,
      x: 0,
      y: 4,
    },
    md: {
      h: 4,
      w: 7,
      x: 0,
      y: 4,
    },
    sm: {
      h: 4,
      w: 6,
      x: 0,
      y: 4,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 12,
    },
    xxs: {
      h: 3,
      w: 4,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.participantsByAge.cardTitle'),
    id: PARTCIPANTS_BY_AGE_CARD_ID,
    component: <ParticipantsByAgeGraphCard />,
    base: {
      minH: 2,
      minW: 2,
      h: 4,
      w: 4,
      x: 9,
      y: 4,
    },
    lg: {
      h: 4,
      w: 6,
      x: 10,
      y: 4,
    },
    md: {
      h: 4,
      w: 5,
      x: 7,
      y: 4,
    },
    sm: {
      h: 4,
      w: 4,
      x: 6,
      y: 4,
    },
    xs: {
      h: 3,
      w: 6,
      x: 0,
      y: 16,
    },
    xxs: {
      h: 3,
      w: 4,
      x: 0,
      y: 15,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: DEMOGRAPHICS_GRAPH_CARD_ID,
    component: <DemographicsGraphCard />,
    base: {
      minH: 2,
      minW: 4,
      h: 2,
      w: 4,
      x: 0,
      y: 8,
    },
    lg: {
      h: 2,
      w: 6,
      x: 0,
      y: 8,
    },
    md: {
      h: 2,
      w: 4,
      x: 0,
      y: 8,
    },
    sm: {
      h: 2,
      w: 3,
      x: 0,
      y: 8,
    },
    xs: {
      h: 2,
      w: 4,
      x: 0,
      y: 19,
    },
    xxs: {
      h: 2,
      w: 4,
      x: 0,
      y: 18,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.studies.cardTitle'),
    id: STUDIES_GRAPH_CARD_ID,
    component: <StudiesGraphCard />,
    base: {
      minH: 2,
      minW: 2,
      h: 2,
      w: 2,
      x: 6,
      y: 8,
    },
    lg: {
      h: 2,
      w: 2,
      x: 6,
      y: 8,
    },
    md: {
      h: 2,
      w: 2,
      x: 4,
      y: 8,
    },
    sm: {
      h: 2,
      w: 2,
      x: 3,
      y: 8,
    },
    xs: {
      h: 2,
      w: 2,
      x: 4,
      y: 18,
    },
    xxs: {
      h: 2,
      w: 4,
      x: 0,
      y: 20,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: DATA_CATEGORY_GRAPH_CARD_ID,
    component: <DataCategoryGraphCard />,
    base: {
      minH: 2,
      minW: 4,
      h: 2,
      w: 6,
      x: 6,
      y: 8,
    },
    lg: {
      h: 2,
      w: 8,
      x: 8,
      y: 8,
    },
    md: {
      h: 2,
      w: 6,
      x: 6,
      y: 8,
    },
    sm: {
      h: 2,
      w: 5,
      x: 5,
      y: 8,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 21,
    },
    xxs: {
      h: 2,
      w: 4,
      x: 0,
      y: 22,
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
      w: 6,
      x: 0,
      y: 10,
    },
    lg: {
      h: 3,
      w: 8,
      x: 0,
      y: 10,
    },
    md: {
      h: 3,
      w: 6,
      x: 0,
      y: 10,
    },
    sm: {
      h: 3,
      w: 5,
      x: 0,
      y: 10,
    },
    xs: {
      h: 3,
      w: 6,
      x: 0,
      y: 23,
    },
    xxs: {
      h: 3,
      w: 4,
      x: 0,
      y: 24,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.sampleTypeTitle'),
    id: SAMPLE_TYPE,
    component: <SampleTypeGraphCard />,
    base: {
      minH: 2,
      minW: 2,
      h: 3,
      w: 6,
      x: 6,
      y: 10,
    },
    lg: {
      h: 3,
      w: 8,
      x: 8,
      y: 10,
    },
    md: {
      h: 3,
      w: 6,
      x: 6,
      y: 10,
    },
    sm: {
      h: 3,
      w: 5,
      x: 5,
      y: 10,
    },
    xs: {
      h: 3,
      w: 6,
      x: 0,
      y: 26,
    },
    xxs: {
      h: 3,
      w: 4,
      x: 0,
      y: 27,
    },
  },
];
