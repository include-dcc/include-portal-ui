import intl from 'react-intl-universal';

export const queryId = 'include-study-repo-key';

export enum SectionId {
  SUMMARY = 'summary',
  STATISTIC = 'statistic',
  DATA_ACCESS = 'data_access',
  DATA_FILE = 'data_file',
  DATASET = 'dataset',
}

export const getStatisticsDictionary = (studyCode?: string) => ({
  download: {
    fileNameTemplate: 'include-%name-%extra-%type-%date',
    fileNameAdditionalInfo: studyCode,
  },
  phenotype: {
    headerTitle: intl.get('entities.study.statistic.phenotype'),
    legendAxisLeft: intl.get(
      'screen.dataExploration.tabs.summary.observed_phenotype.legendAxisLeft',
    ),
    legendAxisBottom: intl.get(
      'screen.dataExploration.tabs.summary.observed_phenotype.legendAxisBottom',
    ),
  },
  mondo: {
    headerTitle: intl.get('entities.study.statistic.mondo'),
    legendAxisLeft: intl.get('screen.dataExploration.tabs.summary.mondo.legendAxisLeft'),
    legendAxisBottom: intl.get('screen.dataExploration.tabs.summary.mondo.legendAxisBottom'),
  },
  demography: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    sexTitle: intl.get('screen.dataExploration.tabs.summary.demographic.sexTitle'),
    ethnicityTitle: intl.get('screen.dataExploration.tabs.summary.demographic.ethnicityTitle'),
    raceTitle: intl.get('screen.dataExploration.tabs.summary.demographic.raceTitle'),
  },
  downSyndromeStatus: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.downSyndromeStatus.cardTitle'),
  },
  sampleType: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.sampleType.cardTitle'),
  },
  sampleAvailability: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.sampleAvailability.cardTitle'),
  },
  dataCategory: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    legendAxisLeft: intl.get(
      'screen.dataExploration.tabs.summary.graphs.dataCategory.legendAxisLeft',
    ),
    legendAxisBottom: intl.get(
      'screen.dataExploration.tabs.summary.graphs.dataCategory.legendAxisBottom',
    ),
  },
  dataType: {
    headerTitle: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    legendAxisLeft: intl.get(
      'screen.dataExploration.tabs.summary.graphs.dataTypeGraph.legendAxisLeft',
    ),
    legendAxisBottom: intl.get(
      'screen.dataExploration.tabs.summary.graphs.dataTypeGraph.legendAxisBottom',
    ),
  },
});
