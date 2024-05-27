import { IFileEntity } from 'graphql/files/models';
import { FamilyType, Sex } from 'graphql/participants/models';

import { extractMetadata } from './metadata';

describe(`${extractMetadata.name}()`, () => {
  test('should handle edge case', () => {
    expect(extractMetadata({} as IFileEntity)).toEqual({});
  });
  test('should return well-formed metadata', () => {
    const file: IFileEntity = {
      id: 'M8hthI0Bgzv7G1aX1IQR',
      external_id: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      fhir_id: '517253',
      file_id: 'GF_000G102V',
      data_category: 'my_category',
      data_type: 'Simple Nucleotide Variations',
      file_format: 'maf',
      size: 5262930,
      controlled_access: 'Registered',
      access_urls: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      acl: ['phs001436.c999', 'SD_DYPMEHHF'],
      file_name: '9b0afdf1-aad5-4e06-affa-d2e61111d318.strelka2_somatic.vep.maf',
      repository: 'gen3',
      nb_participants: 1,
      nb_biospecimens: 2,
      fhir_document_reference: 'http://localhost:8000/DocumentReference?identifier=GF_000G102V',
      participants: {
        hits: {
          edges: [
            {
              node: {
                participant_id: 'PT_EDKKJV31',
                external_id: 'GMKF-30-PARXDW03',
                is_proband: true,
                ethnicity: 'Not Hispanic or Latino',
                sex: Sex.FEMALE,
                race: 'White',
                families_id: 'FM_5ED41H3V',
                family_type: FamilyType.TRIO,
                id: 'participant_test_id',
                score: 0,
                fhir_id: 'participant_test_fihr_id',
                age_at_data_collection: 0,
                down_syndrome_diagnosis: 'down_syndrome_diagnosis',
                down_syndrome_status: 'down_syndrome_status',
                study_external_id: 'study_external_id',
                study_id: 'study_id',
                nb_files: 0,
                nb_biospecimens: 0,
                family: {
                  family_id: 'FM_5ED41H3V',
                  relations_to_proband: {
                    hits: {
                      edges: [
                        {
                          node: {
                            role: 'mother',
                            participant_id: 'id1',
                            id: 'id1',
                          },
                        },
                        {
                          node: {
                            role: 'father',
                            participant_id: 'id2',
                            id: 'id2',
                          },
                        },
                        {
                          node: {
                            role: 'proband',
                            participant_id: 'id1',
                            id: 'id1',
                          },
                        },
                      ],
                    },
                  },
                },
                diagnosis: {
                  hits: {
                    total: 1,
                    edges: [
                      {
                        node: {
                          mondo_display_term: 'neuroblastoma (MONDO:0005072)',
                          source_text: 'Neuroblastoma',
                          age_at_event_days: 174,
                          id: 'id1234',
                          diagnosis_id: 'diag1234',
                        },
                      },
                    ],
                  },
                },
                outcomes: {
                  hits: {
                    total: 1,
                    edges: [
                      {
                        node: {
                          vital_status: 'Alive',
                          age_at_event_days: {
                            value: 3137,
                            units: 'day',
                          },
                          id: 'outcomes_test_id',
                          fhir_id: 'outcomes_test_fhir_id',
                          release_id: 'outcomes_test_release_id',
                          study_id: 'outcomes_test_study_id',
                          participant_fhir_id: 'outcomes_test_participant_fihr_id',
                          observation_id: 'outcomes_test_observation_id',
                        },
                      },
                    ],
                  },
                },
                phenotype: {
                  hits: {
                    edges: [
                      {
                        node: {
                          id: 'phenotype1234',
                          age_at_event_days: 31231,
                          source_text: 'mySourceText',
                          fhir_id: 'fhir123',
                          hpo_phenotype_observed: 'hpo_phenotype_observed',
                          hpo_phenotype_observed_text: 'hpo_phenotype_observed_text',
                          hpo_phenotype_not_observed: 'hpo_phenotype_not_observed',
                          hpo_phenotype_not_observed_text: 'hpo_phenotype_not_observed_text',
                          observed: false,
                        },
                      },
                    ],
                  },
                },
                biospecimens: {
                  hits: {
                    edges: [
                      {
                        node: {
                          sample_id: '595495',
                          sample_type: 'DNA',
                          external_sample_id: '595495',
                          external_parent_sample_id: 'test',
                          external_collection_sample_id: 'test',
                          external_container_id: 'test',
                          collection_sample_type: 'Buccal Cells',
                          age_at_biospecimen_collection: 2345,
                          id: 'biospecimens_test_id',
                          age_at_biospecimen_collection_years: 4,
                          age_at_biospecimen_collection_onset: 'biospecimens_age_onset',
                          parent_sample_id: 'biospecimens_test_parent_id',
                          parent_sample_type: 'biospecimens_test_parent_type',
                          collection_sample_id: 'biospecimens_test_collection_id',
                          container_id: 'biospecimens_test_container_id',
                          volume: 20,
                          volume_unit: 'ml',
                          laboratory_procedure: 'laboratory_procedure',
                          biospecimen_storage: 'biospecimen_storage',
                          fhir_id: 'biospecimens_test_fhir_id',
                          biospecimen_facet_ids: {
                            biospecimen_fhir_id_1: 'biospecimen_fhir_id_1',
                            biospecimen_fhir_id_2: 'biospecimen_fhir_id_2',
                          },
                          status: 'valid',
                        },
                      },
                    ],
                  },
                },

                mondo: {
                  hits: {
                    total: 0,
                    edges: [],
                  },
                },
                observed_phenotype: {
                  hits: {
                    total: 0,
                    edges: [],
                  },
                },
                files: {
                  hits: {
                    total: 0,
                    edges: [],
                  },
                },
                study: {
                  id: '',
                  study_id: '',
                  study_code: '',
                  study_name: '',
                  program: '',
                  external_id: '',
                  family_count: 0,
                  participant_count: 0,
                  biospecimen_count: 0,
                  data_category: [],
                  website: '',
                },
              },
            },
          ],
        },
      },
      study: {
        study_id: 'SD_DYPMEHHF',
        study_name: 'Discovering the Genetic Basis of Human Neuroblastoma',
        study_code: 'KF-NBL',
        program: 'Include',
        domain: 'CANCER',
        experimental_strategy: [],
        family_count: 0,
        participant_count: 0,
        biospecimen_count: 0,
        data_category: [],
        family_data: false,
        controlled_access: [],
        id: 'study_test_id',
        fhir_id: 'study_test_fhir_id',
        external_id: 'study_test_external_id',
      },
      sequencing_experiment: {
        hits: {
          edges: [
            {
              node: {
                experiment_strategy: 'WGS',
                library_strand: 'Unstranded',
                platform: 'Illumina',
                instrument_model: 'HiSeq X',
                id: 'seqtest',
                sequencing_experiment_id: 'seq test',
                sequencing_center_id: 'seq test',
                center: 'seq test',
                library_name: 'seq test',
                library_prep: 'seq test',
                library_selection: 'seq test',
              },
            },
          ],
        },
      },
      biospecimens: {
        hits: {
          total: 0,
          edges: [],
        },
      },
      hashes: {
        etag: '',
      },
      score: 0,
    };

    const expectedMetaData = {
      fhir_document_reference: 'http://localhost:8000/DocumentReference?identifier=GF_000G102V',
      file_id: 'GF_000G102V',
      external_file_id: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      file_name: '9b0afdf1-aad5-4e06-affa-d2e61111d318.strelka2_somatic.vep.maf',
      data_category: 'my_category',
      data_type: 'Simple Nucleotide Variations',
      file_format: 'maf',
      repository: 'gen3',
      acl: 'phs001436.c999,SD_DYPMEHHF',
      access_url: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      // Removed temporarily due to bug
      // case_id: 'PT_EDKKJV31',
      external_participant_id: 'GMKF-30-PARXDW03',
      // Removed temporarily due to bug
      // ethnicity: 'Not Hispanic or Latino',
      // gender: 'female',
      // race: 'White',
      age_at_participant_diagnosis: '174',
      age_at_vital_status: '3137',
      diagnosis_mondo: 'neuroblastoma (MONDO:0005072)',
      family_id: 'FM_5ED41H3V',
      family_role: 'mother,father,proband',
      observed_phenotype_hpo: 'hpo_phenotype_observed',
      vital_status: 'Alive',
      sample_id: '595495',
      sample_type: 'DNA',
      external_sample_id: '595495',
      collection_sample_type: 'Buccal Cells',
      age_at_biospecimen_collection: '2345',
      experimental_strategy: 'WGS',
      investigation: 'KF-NBL',
      study_name: 'Discovering the Genetic Basis of Human Neuroblastoma',
      study_program: 'Include',
      volume: '20',
      volume_unit: 'ml',
      sample_availability: 'valid',
      parent_sample_id: 'biospecimens_test_parent_id',
      parent_sample_type: 'biospecimens_test_parent_type',
      external_collection_id: 'test',
      external_container_id: 'test',
      laboratory_procedure: 'laboratory_procedure',
      family_unit: 'trio',
      age_at_phenotype_assignment: '31231',
      biospecimen_storage: 'biospecimen_storage',
      collection_id: 'biospecimens_test_collection_id',
      condition_source_text: 'Neuroblastoma',
      container_id: 'biospecimens_test_container_id',
      down_syndrome_status: 'down_syndrome_status',
      external_parent_sample_id: 'test',
    };

    expect(extractMetadata(file)).toEqual(expectedMetaData);
  });
});
