import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IParticipantResultTree {
  participant: ArrangerResultsTree<IParticipantEntity>;
}

export interface IParticipantDiagnosis {
  id: string;
  diagnosis_id: string;
  mondo_display_term: string;
  source_text: string;
  age_at_event_days: number;
}

export interface IParticipantPhenotype {
  id: string;
  age_at_event_days: number;
  source_text: string;
  fhir_id: string;
  hpo_phenotype_observed: string;
  hpo_phenotype_observed_text: string;
  hpo_phenotype_not_observed: string;
  hpo_phenotype_not_observed_text: string;
  observed: boolean;
}

export interface IParticipantBiospecimen {
  id: string;
  external_sample_id: string;
  age_at_biospecimen_collection: number;
  age_at_biospecimen_collection_years: number;
  age_at_biospecimen_collection_onset: string;
  external_parent_sample_id: string;
  external_collection_sample_id: string;
  external_container_id: string;
  sample_id: string;
  sample_type: string;
  parent_sample_id: string;
  parent_sample_type: string;
  collection_sample_id: string;
  collection_sample_type: string;
  container_id: string;
  volume: number;
  volume_unit: string;
  laboratory_procedure: string;
  biospecimen_storage: string;
  fhir_id: string;
  biospecimen_facet_ids: {
    biospecimen_fhir_id_1: string;
    biospecimen_fhir_id_2: string;
  };
  status: string;
}

export interface IParticipantMondo {
  id: any;
  name: string;
  is_tagged: boolean;
}

export interface IParticipantObservedPhenotype {
  id: any;
  name: string;
  is_tagged: boolean;
}

export interface IFamilyRelationToProband {
  id: string;
  role: string;
  participant_id: string;
}

export interface IParticipantFamily {
  family_id: string;
  relations_to_proband: ArrangerResultsTree<IFamilyRelationToProband>;
}

export interface IParticipantOutcomes {
  id: string;
  fhir_id: string;
  release_id: string;
  study_id: string;
  participant_fhir_id: string;
  vital_status: string;
  observation_id: string;
  age_at_event_days: {
    value: number;
    units: string;
  };
}

export interface IMeasurement {
  id: string;
  measurement_type?: string;
  quantity?: {
    unit?: string;
    value?: number;
  };
  code?: string;
  effective_date_time?: {
    value?: number;
    unit?: string;
  };
  display?: string;
  formatted_term?: string;
  code_text?: string;
  url?: string;
  fhir_id?: string;
}

export interface IMaxo {
  id: string;
  code: string;
  display: string;
}

export interface IParticipantEntity {
  id: string;
  score: number;
  fhir_id: string;
  age_at_data_collection: number;
  down_syndrome_diagnosis: string;
  ethnicity: string;
  family_type: FamilyType;
  is_proband: boolean;
  down_syndrome_status: string;
  participant_id: string;
  external_id: string;
  race: string;
  sex: Sex;
  study_external_id: string;
  study_id: string;
  nb_files: number;
  nb_biospecimens: number;
  mondo: ArrangerResultsTree<IParticipantMondo>;
  observed_phenotype: ArrangerResultsTree<IParticipantObservedPhenotype>;
  diagnosis: ArrangerResultsTree<IParticipantDiagnosis>;
  files: ArrangerResultsTree<IFileEntity>;
  phenotype: ArrangerResultsTree<IParticipantPhenotype>;
  outcomes: ArrangerResultsTree<IParticipantOutcomes>;
  study: IStudyEntity;
  family: IParticipantFamily;
  families_id: string;
  biospecimens: ArrangerResultsTree<IParticipantBiospecimen>;
  age_at_first_patient_engagement?: { value?: number; unit?: string };
  person?: { person_id: string };
  measurements?: ArrangerResultsTree<IMeasurement>;
  maxo?: ArrangerResultsTree<IMaxo>;
}

export type ITableParticipantEntity = IParticipantEntity & {
  key: string;
};

export enum Sex {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

export enum FamilyType {
  PROBAND = 'proband-only',
  DUO = 'duo',
  TRIO = 'trio',
  TRIO_PLUS = 'trio+',
  OTHER = 'other',
}

export interface IDataFile {
  data_category: { buckets: [{ key: string }] };
  exp_strategies: { buckets: [{ key: string }] };
}

export interface IDataFileResultTree {
  file: {
    aggregations: IDataFile;
  };
  loading: boolean;
}
