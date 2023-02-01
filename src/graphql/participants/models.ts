import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';
import { IStudyEntity } from 'graphql/studies/models';

export interface IParticipantResultTree {
  participant: ArrangerResultsTree<IParticipantEntity>;
}

export interface IParticipantDiagnosis {
  id: string;
  diagnosis_id: string;
  mondo_id_diagnosis: string;
  source_text: string;
  age_at_event_days: number;
}

export interface IParticipantPhenotype {
  id: string;
  age_at_event_days: number;
  fhir_id: string;
  hpo_phenotype_observed: string;
  hpo_phenotype_observed_text: string;
  hpo_phenotype_not_observed: string;
  hpo_phenotype_not_observed_text: string;
  observed: boolean;
}

export interface IParticipantBiospecimen {
  id: string;
  age_at_biospecimen_collection: number;
  age_at_biospecimen_collection_years: number;
  age_at_biospecimen_collection_onset: string;
  sample_id: string;
  sample_type: string;
  parent_sample_id: string;
  parent_sample_type: string;
  collection_sample_id: string;
  collection_sample_type: string;
  container_id: string;
  volume_ul: number;
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

export interface IFamilyRelation {
  id: string;
  related_participant_id: string;
  relation: string;
}

export interface IParticipantFamily {
  family_id: string;
  family_relations: ArrangerResultsTree<IFamilyRelation>;
}

export interface IParticipantEntity {
  id: string;
  score: number;
  fhir_id: string;
  age_at_data_collection: number;
  down_syndrome_diagnosis: string;
  ethnicity: string;
  family_type: string;
  is_proband: boolean;
  down_syndrome_status: string;
  participant_id: string;
  external_id: string;
  race: string;
  sex: string;
  study_external_id: string;
  study_id: string;
  nb_files: number;
  nb_biospecimens: number;
  mondo: ArrangerResultsTree<IParticipantMondo>;
  observed_phenotype: ArrangerResultsTree<IParticipantObservedPhenotype>;
  diagnosis: ArrangerResultsTree<IParticipantDiagnosis>;
  files: ArrangerResultsTree<IFileEntity>;
  phenotype: ArrangerResultsTree<IParticipantPhenotype>;
  study: IStudyEntity;
  family: IParticipantFamily;
}

export type ITableParticipantEntity = IParticipantEntity & {
  key: string;
};
