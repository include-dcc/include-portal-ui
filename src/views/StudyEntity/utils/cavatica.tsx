import { IStudyDataset, IStudyEntity } from 'graphql/studies/models';
import { getEnvVarByKey } from 'helpers/EnvVariables';

export const hasCavaticaButton = ({
  study,
  dataset,
}: {
  study: IStudyEntity;
  dataset: IStudyDataset;
}): boolean => {
  const studyDatasetConfig = [
    {
      studyId: getEnvVarByKey('CAVATICA_DSC_STUDY_ID'),
      datasetIds: [getEnvVarByKey('CAVATICA_DSC_DATASET_ID')],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_AECOM_DS_STUDY_ID'),
      datasetIds: [getEnvVarByKey('CAVATICA_AECOM_DS_DATASET_ID')],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_DS_SLEEP_STUDY_ID'),
      datasetIds: [
        getEnvVarByKey('CAVATICA_DS_SLEEP_DATASET_ID_UH_CLINICAL'),
        getEnvVarByKey('CAVATICA_DS_SLEEP_DATASET_ID_UH_SLEEP'),
      ],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_X01_HAKONARSON_STUDY_ID'),
      datasetIds: [getEnvVarByKey('CAVATICA_X01_HAKONARSON_DATASET_ID')],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_X01_DESMITH_STUDY_ID'),
      datasetIds: [getEnvVarByKey('CAVATICA_X01_DESMITH_DATASET_ID')],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_DS_DETERMINED_STUDY_ID'),
      datasetIds: [
        getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_SDI'),
        getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_CDM'),
        getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_DSC'),
      ],
    },
    {
      studyId: getEnvVarByKey('CAVATICA_BRAINPOWER_STUDY_ID'),
      datasetIds: [
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_AGE_LATENCY'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_ANTHROPOMETRICS'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_COGNITIVE'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_IMAGING'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_PA_DAY'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_PA_PERSON'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_RANDOMIZATION'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_DEMOGRAPHICS'),
        getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_HEALTH_CONDITIONS'),
      ],
    },
  ];

  return studyDatasetConfig.some(
    (config) => study.study_id === config.studyId && config.datasetIds.includes(dataset.dataset_id),
  );
};
