/* eslint-disable complexity */
/* eslint-disable max-len */
import intl from 'react-intl-universal';
import {
  CAVATICA_TYPE,
  ICavaticaTreeNode,
} from '@ferlab/ui/core/components/Widgets/Cavatica/CavaticaAnalyzeModal';
import EnvironmentVariables, { getEnvVarByKey } from 'helpers/EnvVariables';

import { ICavaticaDRSImportItem } from 'services/api/cavatica/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';

export const cavaticaCreateProjectDictionary = {
  title: intl.get('screen.dashboard.cards.cavatica.newProject'),
  requiredField: intl.get('global.forms.errors.requiredField'),
  projectName: {
    label: 'Project name',
    placeholder: 'e.g. KF-NBL Neuroblastoma Aligned Reads',
  },
  billingGroup: {
    label: intl.get('screen.dashboard.cards.cavatica.billingGroups.label'),
    empty: intl.get('screen.dashboard.cards.cavatica.billingGroups.empty'),
  },
  okText: intl.get('screen.dashboard.cards.cavatica.createProject'),
  cancelText: intl.get('screen.dashboard.cards.cavatica.cancelText'),
  error: {
    billingGroups: {
      title: intl.get('screen.dashboard.cards.error.title'),
      subtitle: intl.get('api.cavatica.error.billingGroups.fetch'),
    },
    create: {
      title: intl.get('screen.dashboard.cards.cavatica.error.create.title'),
      subtitle: intl.get('screen.dashboard.cards.cavatica.error.create.subtitle'),
    },
    email: SUPPORT_EMAIL,
    contactSupport: intl.get('screen.dashboard.cards.error.contactSupport'),
  },
};

export const getGuidDrsItem = (value: ICavaticaTreeNode): ICavaticaDRSImportItem => {
  const accessUrl = EnvironmentVariables.configFor('CAVATICA_GUID_ACCESS_URL');
  const type = value.type === CAVATICA_TYPE.PROJECT ? 'project' : 'parent';
  return {
    drs_uri: accessUrl,
    name: 'include_guid_mapping_file_2024-08-30.csv',
    [type]: value.id,
    metadata: {
      dbgap_consent_code: 'phs002276.c1',
      name: 'include_guid_mapping_file_2024-08-30.csv',
      file_format: 'csv',
      study_name: 'INCLUDE Data Hub: NDA GUIDs for Down Syndrome Research',
    },
  };
};

export const getDRSItems = (
  value: ICavaticaTreeNode,
  studyId?: string,
  cavaticaDatasetId?: string,
) => {
  if (!studyId) return [];
  const type = value.type === CAVATICA_TYPE.PROJECT ? 'project' : 'parent';
  switch (studyId) {
    case getEnvVarByKey('CAVATICA_DSC_STUDY_ID'):
      return getDSConnectDrsItems(value, type);
    case getEnvVarByKey('CAVATICA_AECOM_DS_STUDY_ID'):
      return getAecomDsDrsItems(value, type);
    case getEnvVarByKey('CAVATICA_DS_SLEEP_STUDY_ID'):
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_DS_SLEEP_DATASET_ID_UH_CLINICAL')) {
        return getDsSleepClinicalDrsItems(value, type);
      }
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_DS_SLEEP_DATASET_ID_UH_SLEEP')) {
        return getDsSleepDrsItems(value, type);
      }
      return [];
    case getEnvVarByKey('CAVATICA_X01_HAKONARSON_STUDY_ID'):
      return getX01HakonarsonDrsItems(value, type);
    case getEnvVarByKey('CAVATICA_X01_DESMITH_STUDY_ID'):
      return getX01DeSmithDrsItems(value, type);
    case getEnvVarByKey('CAVATICA_DS_DETERMINED_STUDY_ID'):
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_SDI')) {
        return getDsDeterminedSdiDrsItems(value, type);
      }
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_CDM')) {
        return getDsDeterminedCdmDrsItems(value, type);
      }
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_DS_DETERMINED_DATASET_ID_DSC')) {
        return getDsDeterminedDscDrsItems(value, type);
      }
      return [];
    case getEnvVarByKey('CAVATICA_BRAINPOWER_STUDY_ID'):
      if (cavaticaDatasetId === getEnvVarByKey('CAVATICA_BRAINPOWER_DATASET_ID_AGE_LATENCY')) {
        return getBrainPowerAgeLatencyDrsItems(value, type);
      }
      if (
        cavaticaDatasetId ===
        getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_ANTHROPOMETRICS')
      ) {
        return getBrainPowerAnthropometricsDrsItems(value, type);
      }
      if (
        cavaticaDatasetId === getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_COGNITIVE')
      ) {
        return getBrainPowerCognitiveDrsItems(value, type);
      }
      if (
        cavaticaDatasetId === getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_IMAGING')
      ) {
        return getBrainPowerImagingDrsItems(value, type);
      }
      if (cavaticaDatasetId === getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_PA_DAY')) {
        return getBrainPowerPaDayDrsItems(value, type);
      }
      if (
        cavaticaDatasetId === getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_PA_PERSON')
      ) {
        return getBrainPowerPaPersonDrsItems(value, type);
      }
      if (
        cavaticaDatasetId ===
        getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_RANDOMIZATION')
      ) {
        return getBrainPowerRandomizationDrsItems(value, type);
      }
      if (
        cavaticaDatasetId ===
        getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_DEMOGRAPHICS')
      ) {
        return getBrainPowerDemographicsDrsItems(value, type);
      }
      if (
        cavaticaDatasetId ===
        getEnvVarByKey('REACT_APP_CAVATICA_BRAINPOWER_DATASET_ID_HEALTH_CONDITIONS')
      ) {
        return getBrainPowerHealthConditionsDrsItems(value, type);
      }
      return [];
    default:
      return [];
  }
};

const getDSConnectDrsItems = (value: ICavaticaTreeNode, type: string): ICavaticaDRSImportItem[] => {
  const demographicAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DSC_DEMOGRAPHIC_ACCESS_URL',
  );
  const ihqAccessUrl = EnvironmentVariables.configFor('CAVATICA_DSC_IHQ_ACCESS_URL');
  const dictionaryAccessUrl = EnvironmentVariables.configFor('CAVATICA_DSC_DICTIONARY_ACCESS_URL');

  return [
    {
      drs_uri: demographicAccessUrl,
      name: 'dsc_demographic_unharmonized_2025-03-17.csv',
      [type]: value.id,
      metadata: {
        name: 'dsc_demographic_unharmonized_2025-03-17.csv',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
    {
      drs_uri: ihqAccessUrl,
      name: 'dsc_ihq_unharmonized_2025-03-17.csv',
      [type]: value.id,
      metadata: {
        name: 'dsc_ihq_unharmonized_2025-03-17.csv',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'dsconnect_unharmonized_data_dictionary_20240424.xlsx',
      [type]: value.id,
      metadata: {
        name: 'dsconnect_unharmonized_data_dictionary_20240424.xlsx',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
  ];
};

const getAecomDsDrsItems = (value: ICavaticaTreeNode, type: string): ICavaticaDRSImportItem[] => {
  const uhClinicalMriAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_AECOM_DS_UH_CLINICAL_MRI_ACCESS_URL',
  );

  return [
    {
      drs_uri: uhClinicalMriAccessUrl,
      name: 'AECOM-DS-UH-Clinical-MRI_unharmonized_data_2025-06-09.xlsx',
      [type]: value.id,
      metadata: {
        name: 'AECOM-DS-UH-Clinical-MRI_unharmonized_data_2025-06-09.xlsx',
        study_name:
          'Upper Airway Structure and Function and Risk for OSA in Children with Down Syndrome',
        file_format: 'xlsx',
      },
    },
  ];
};

const getDsSleepClinicalDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const uhClinicalDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_CLINICAL_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_CLINICAL_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: uhClinicalDataAccessUrl,
      name: 'DS-Sleep_Participant_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_Participant_data.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'DS-Sleep_Participant_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_Participant_dictionary.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
  ];
};

const getDsSleepDrsItems = (value: ICavaticaTreeNode, type: string): ICavaticaDRSImportItem[] => {
  const cshqDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_CSHQ_DATA_ACCESS_URL',
  );
  const cshqDictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_CSHQ_DICTIONARY_ACCESS_URL',
  );
  const essDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_ESS_DATA_ACCESS_URL',
  );
  const essDictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_ESS_DICTIONARY_ACCESS_URL',
  );
  const intakeDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_INTAKE_DATA_ACCESS_URL',
  );
  const intakeDictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_INTAKE_DICTIONARY_ACCESS_URL',
  );
  const sdsDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_SDS_DATA_ACCESS_URL',
  );
  const sdsDictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_SLEEP_UH_SLEEP_SDS_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: cshqDataAccessUrl,
      name: 'DS-Sleep_CSHQ_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_CSHQ_data.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: cshqDictionaryAccessUrl,
      name: 'DS-Sleep_CSHQ_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_CSHQ_dictionary.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: essDataAccessUrl,
      name: 'DS-Sleep_ESS_data.csv',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_ESS_data.csv',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'csv',
      },
    },
    {
      drs_uri: essDictionaryAccessUrl,
      name: 'DS-Sleep_ESS_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_ESS_dictionary.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: intakeDataAccessUrl,
      name: 'DS-Sleep_Intake_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_Intake_data.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: intakeDictionaryAccessUrl,
      name: 'DS-Sleep_Intake_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_Intake_dictionary.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: sdsDataAccessUrl,
      name: 'DS-Sleep_SDS-25_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_SDS-25_data.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: sdsDictionaryAccessUrl,
      name: 'DS-Sleep_SDS-25_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'DS-Sleep_SDS-25_dictionary.xlsx',
        study_name:
          'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
        file_format: 'xlsx',
      },
    },
  ];
};

const getX01HakonarsonDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const uhClinicalAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_X01_HAKONARSON_UH_CLINICAL_ACCESS_URL',
  );

  return [
    {
      drs_uri: uhClinicalAccessUrl,
      name: 'X01-Hakonarson-UH-Clinical_unharmonized_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'X01-Hakonarson-UH-Clinical_unharmonized_data.xlsx',
        study_name:
          'Genetic underpinnings of the multifactorial phenotype of Trisomy 21 patients unveiled by multi-omics approaches',
        file_format: 'xlsx',
      },
    },
  ];
};

const getX01DeSmithDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const clinicalDataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_X01_DESMITH_CLINICAL_DATA_ACCESS_URL',
  );
  const clinicalDictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_X01_DESMITH_CLINICAL_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: clinicalDataAccessUrl,
      name: 'X01-deSmith_unharmonized_clinical_data.xlsx',
      [type]: value.id,
      metadata: {
        name: 'X01-deSmith_unharmonized_clinical_data.xlsx',
        study_name: 'The epidemiology of transient leukemia in newborns with Down syndrome',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: clinicalDictionaryAccessUrl,
      name: 'X01-deSmith_unharmonized_clinical_data_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'X01-deSmith_unharmonized_clinical_data_dictionary.xlsx',
        study_name: 'The epidemiology of transient leukemia in newborns with Down syndrome',
        file_format: 'xlsx',
      },
    },
  ];
};

const getDsDeterminedSdiDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_SDI_DICTIONARY_ACCESS_URL',
  );
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_SDI_DATA_ACCESS_URL',
  );

  return [
    {
      drs_uri: dictionaryAccessUrl,
      name: 'SDI_data_dictionary_Amended.xlsx',
      [type]: value.id,
      metadata: {
        name: 'SDI_data_dictionary_Amended.xlsx',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: dataAccessUrl,
      name: 'SDI_data.csv',
      [type]: value.id,
      metadata: {
        name: 'SDI_data.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
  ];
};

const getDsDeterminedCdmDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const conditionAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_CONDITION_ACCESS_URL',
  );
  const deathAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_DEATH_ACCESS_URL',
  );
  const demographicAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_DEMOGRAPHIC_ACCESS_URL',
  );
  const diagnosisAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_DIAGNOSIS_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_DICTIONARY_ACCESS_URL',
  );
  const encounterAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_ENCOUNTER_ACCESS_URL',
  );
  const immunizationAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_IMMUNIZATION_ACCESS_URL',
  );
  const labResultAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_LAB_RESULT_ACCESS_URL',
  );
  const medAdminAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_MED_ADMIN_ACCESS_URL',
  );
  const prescribingAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_PRESCRIBING_ACCESS_URL',
  );
  const proCmAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_PRO_CM_ACCESS_URL',
  );
  const proceduresAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_PROCEDURES_ACCESS_URL',
  );
  const vitalAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_CDM_VITAL_ACCESS_URL',
  );

  return [
    {
      drs_uri: conditionAccessUrl,
      name: 'condition.csv',
      [type]: value.id,
      metadata: {
        name: 'condition.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: deathAccessUrl,
      name: 'death.csv',
      [type]: value.id,
      metadata: {
        name: 'death.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: demographicAccessUrl,
      name: 'demographic.csv',
      [type]: value.id,
      metadata: {
        name: 'demographic.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: diagnosisAccessUrl,
      name: 'diagnosis.csv',
      [type]: value.id,
      metadata: {
        name: 'diagnosis.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'dictionary_extra_age_columns.xlsx',
      [type]: value.id,
      metadata: {
        name: 'dictionary_extra_age_columns.xlsx',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: encounterAccessUrl,
      name: 'encounter.csv',
      [type]: value.id,
      metadata: {
        name: 'encounter.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: immunizationAccessUrl,
      name: 'immunization.csv',
      [type]: value.id,
      metadata: {
        name: 'immunization.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: labResultAccessUrl,
      name: 'lab_result_cm.csv',
      [type]: value.id,
      metadata: {
        name: 'lab_result_cm.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: medAdminAccessUrl,
      name: 'med_admin.csv',
      [type]: value.id,
      metadata: {
        name: 'med_admin.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: prescribingAccessUrl,
      name: 'prescribing.csv',
      [type]: value.id,
      metadata: {
        name: 'prescribing.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: proCmAccessUrl,
      name: 'pro_cm.csv',
      [type]: value.id,
      metadata: {
        name: 'pro_cm.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: proceduresAccessUrl,
      name: 'procedures.csv',
      [type]: value.id,
      metadata: {
        name: 'procedures.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: vitalAccessUrl,
      name: 'vital.csv',
      [type]: value.id,
      metadata: {
        name: 'vital.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
  ];
};

const getDsDeterminedDscDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_DSC_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_DSC_DICTIONARY_ACCESS_URL',
  );
  const mappingAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DS_DETERMINED_DSC_MAPPING_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'ds-connect_data.csv',
      [type]: value.id,
      metadata: {
        name: 'ds-connect_data.csv',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'ds-connect_dictionary.xlsx',
      [type]: value.id,
      metadata: {
        name: 'ds-connect_dictionary.xlsx',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'xlsx',
      },
    },
    {
      drs_uri: mappingAccessUrl,
      name: 'id_mapping.xlsx',
      [type]: value.id,
      metadata: {
        name: 'id_mapping.xlsx',
        study_name:
          'Using PCORnet to Expand the DS-CONNECT Cohort Through Healthcare System Recruitment, Incorporating Electronic Health Records, and Assessing Self-Determination',
        file_format: 'xlsx',
      },
    },
  ];
};

const getBrainPowerAgeLatencyDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor('CAVATICA_BRAIN_POWER_AGE_DATA_ACCESS_URL');
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_AGE_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Age_Event_Latency.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Age_Event_Latency.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Age_Event_Latency_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Age_Event_Latency_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerAnthropometricsDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_ANTHROPOMETRICS_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_ANTHROPOMETRICS_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Anthropometrics.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Anthropometrics.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Anthropometrics_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Anthropometrics_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerCognitiveDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_COGNITIVE_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_COGNITIVE_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Cognitive_Function.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Cognitive_Function.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Cognitive_Function_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Cognitive_Function_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerImagingDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_IMAGING_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_IMAGING_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Imaging.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Imaging.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Imaging_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Imaging_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerPaDayDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_PA_DAY_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_PA_DAY_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Physical_Activity_Day.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Physical_Activity_Day.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Physical_Activity_Day_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Physical_Activity_Day_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerPaPersonDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_PA_PERSON_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_PA_PERSON_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Physical_Activity_Person.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Physical_Activity_Person.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Physical_Activity_Person_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Physical_Activity_Person_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerRandomizationDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_RANDOMIZATION_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_RANDOMIZATION_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Randomization.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Randomization.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Randomization_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Randomization_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerDemographicsDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_DEMOGRAPHICS_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_DEMOGRAPHICS_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Demographics.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Demographics.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Demographics_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Demographics_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};

const getBrainPowerHealthConditionsDrsItems = (
  value: ICavaticaTreeNode,
  type: string,
): ICavaticaDRSImportItem[] => {
  const dataAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_HEALTH_DATA_ACCESS_URL',
  );
  const dictionaryAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_BRAIN_POWER_HEALTH_DICTIONARY_ACCESS_URL',
  );

  return [
    {
      drs_uri: dataAccessUrl,
      name: 'BP_Health_Conditions.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Health_Conditions.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'BP_Health_Conditions_Dictionary.csv',
      [type]: value.id,
      metadata: {
        name: 'BP_Health_Conditions_Dictionary.csv',
        study_name:
          'The Promotion of Physical Activity for the Prevention of Alzheimerï¿½s Disease in Adults with Down Syndrome',
        file_format: 'csv',
      },
    },
  ];
};
