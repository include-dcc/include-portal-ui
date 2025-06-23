import {
  IAuthor,
  IContact,
  IDataType,
  IExperimentalStrategy,
  IPublicationDetails,
  IStudyDataset,
} from 'graphql/studies/models';

export type PublicPublicationDetails = Omit<IPublicationDetails, 'authors'> & {
  authors: IAuthor[];
};

export type PublicStudyDataset = Omit<IStudyDataset, 'publications_details'> & {
  publications_details?: PublicPublicationDetails[];
};

export interface IPublicStudyEntity {
  acknowledgement?: string;
  attribution?: string;
  biobank_contact?: string;
  biobank_request_link?: string;
  biospecimen_count?: number;
  citation_statement?: string;
  contacts?: IContact[];
  controlled_access?: string[];
  data_category?: string[];
  data_sources?: string[];
  data_types?: IDataType[];
  datasets?: PublicStudyDataset[];
  description?: string;
  domains?: string[];
  expected_data_categories?: string[];
  experimental_strategies?: IExperimentalStrategy[];
  external_id?: string;
  external_ids?: string[];
  family_count?: number;
  family_data?: boolean;
  fhir_id?: string;
  file_count?: number;
  guid?: string;
  investigator_names?: string[];
  is_guid_mapped?: boolean;
  is_harmonized?: boolean;
  note?: string;
  part_lifespan_stages?: string[];
  participant_count?: number;
  program?: string;
  publications?: string[];
  publications_details?: PublicPublicationDetails[];
  release_id?: string;
  search_text?: string[];
  selection_criteria?: string[];
  status?: string;
  study_code?: string;
  study_designs?: string[];
  study_id?: string;
  study_meta_categories?: string[];
  study_name?: string;
  version?: string;
  website?: string;
}

export interface IGraphData {
  key: string;
  doc_count: number;
}

export interface IPublicStudyGraphs {
  biospecimens_centric: {
    data: {
      sample_type: IGraphData[];
      status: IGraphData[];
    };
    total: number;
  };
  participant_centric: {
    data: {
      down_syndrome_status: IGraphData[];
      ethnicity: IGraphData[];
      files_data_category: IGraphData[];
      files_data_type: IGraphData[];
      race: IGraphData[];
      sex: IGraphData[];
    };
    total: number;
  };
}
