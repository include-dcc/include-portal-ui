import { IArrangerResultsTree } from '@ferlab/ui/core/graphql/types';
import { ArrangerResultsTree } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';

import { IBiospecimenEntity } from '../biospecimens/models';

export interface IFileResultTree {
  file: ArrangerResultsTree<IFileEntity>;
}

export interface ISequencingExperiment {
  id: string;
  sequencing_experiment_id: string;
  experiment_strategy: string;
  experiment_date?: string;
  center: string;
  library_name: string;
  library_prep: string;
  library_selection: string;
  library_strand: string;
  platform: string;
  instrument_model: string;
  external_id?: string;
  sequencing_center_id: string;
}

export interface IFileStudyEntity {
  id: string;
  study_id: string;
  fhir_id: string;
  study_code: string;
  study_name: string;
  program: string;
  domain: string;
  external_id: string;
  experimental_strategy: string[];
  family_count: number;
  participant_count: number;
  biospecimen_count: number;
  data_category: string[];
  family_data: boolean;
  controlled_access: string[];
}

export interface IFileEntity {
  key?: string;
  id: string;
  external_id: string;
  fhir_id: string;
  score: number;
  acl: string[];
  controlled_access: string;
  access_urls: string;
  data_category: string;
  data_type: string;
  file_format: string;
  file_id: string;
  size: number;
  file_name: string;
  hashes: {
    etag: string;
  };
  repository: string;
  study: IFileStudyEntity;
  nb_participants: number;
  nb_biospecimens: number;
  fhir_document_reference: string;
  index?: {
    urls: string;
    file_name: string;
  };
  sequencing_experiment: IArrangerResultsTree<ISequencingExperiment>;
  participants: ArrangerResultsTree<IParticipantEntity>;
  biospecimens: ArrangerResultsTree<IBiospecimenEntity>;
}

export enum FileAccessType {
  CONTROLLED = 'Controlled',
  REGISTERED = 'Registered',
}

export type ITableFileEntity = IFileEntity & {
  key: string;
};
