import {
  CAVATICA_ANALYSE_STATUS,
  PASSPORT_AUTHENTIFICATION_STATUS,
} from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { FileAccessType, IFileEntity } from 'graphql/files/models';
import { FamilyType, Sex } from 'graphql/participants/models';

import { ArrangerApi } from 'services/api/arranger';
import { CavaticaApi } from 'services/api/cavatica';

import { extractMetadata } from './metadata';
import { beginCavaticaAnalyse, fetchCavaticaAuthorizedStudies } from './thunks';

jest.mock('services/api/cavatica');
jest.mock('services/api/arranger');

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
                          is_observed: false,
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
                  guid: '',
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
      access_url: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      acl: 'phs001436.c999,SD_DYPMEHHF',
      age_at_biospecimen_collection: '2345',
      age_at_participant_diagnosis: '174',
      age_at_phenotype_assignment: '31231',
      age_at_vital_status: '3137',
      biospecimen_storage: 'biospecimen_storage',
      collection_id: 'biospecimens_test_collection_id',
      collection_sample_type: 'Buccal Cells',
      container_id: 'biospecimens_test_container_id',
      data_category: 'my_category',
      data_type: 'Simple Nucleotide Variations',
      down_syndrome_status: 'down_syndrome_status',
      experimental_strategies: 'WGS',
      external_collection_id: 'test',
      external_container_id: 'test',
      external_file_id: 'drs://data.include.org/acb15d28-e1bc-40c6-9a32-e897e0bbb841',
      external_parent_sample_id: 'test',
      external_participant_id: 'GMKF-30-PARXDW03',
      external_sample_id: '595495',
      family_id: 'FM_5ED41H3V',
      family_role: 'mother,father,proband',
      family_unit: 'trio',
      fhir_document_reference: 'http://localhost:8000/DocumentReference?identifier=GF_000G102V',
      file_format: 'maf',
      file_id: 'GF_000G102V',
      file_name: '9b0afdf1-aad5-4e06-affa-d2e61111d318.strelka2_somatic.vep.maf',
      investigation: 'KF-NBL',
      laboratory_procedure: 'laboratory_procedure',
      library_strands: 'Unstranded',
      parent_sample_id: 'biospecimens_test_parent_id',
      parent_sample_type: 'biospecimens_test_parent_type',
      participant_id: 'PT_EDKKJV31',
      platforms: 'Illumina',
      repository: 'gen3',
      sample_availability: 'valid',
      sample_types: 'DNA',
      samples_id: '595495',
      study_name: 'Discovering the Genetic Basis of Human Neuroblastoma',
      study_program: 'Include',
      vital_status: 'Alive',
      volume: '20',
      volume_unit: 'ml',
    };

    expect(extractMetadata(file)).toEqual(expectedMetaData);
  });
});

describe(`${fetchCavaticaAuthorizedStudies.typePrefix}`, () => {
  const fetchAccessIds = CavaticaApi.fetchAccessIds as jest.Mock;
  const graphqlRequest = ArrangerApi.graphqlRequest as jest.Mock;

  const run = () => fetchCavaticaAuthorizedStudies()(jest.fn(), jest.fn(), undefined);

  const studiesResponse = (nodes: object[]) => ({
    data: { data: { study: { hits: { edges: nodes.map((node) => ({ node })) } } } },
  });
  // Totals in alias order: [study0 total, study0 authorized, study1 total, ...]
  const countsResponse = (...totals: number[]) => ({
    data: {
      data: Object.fromEntries(totals.map((total, index) => [`s${index}`, { hits: { total } }])),
    },
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return no study without querying arranger when Cavatica returns no access', async () => {
    fetchAccessIds.mockResolvedValue({ data: { access_ids: [] } });

    const action = await run();

    expect(action.payload).toEqual({ studies: [] });
    expect(graphqlRequest).not.toHaveBeenCalled();
  });

  test('should count all and authorized files of a study matched by two accessions', async () => {
    fetchAccessIds.mockResolvedValue({
      data: { access_ids: [' phs002330.c1', 'phs002981.v1.p1', 'phs999999.c1'] },
    });
    graphqlRequest
      .mockResolvedValueOnce(
        studiesResponse([
          {
            study_id: 'HTP',
            study_code: 'HTP',
            study_name: 'The Human Trisome Project',
            external_ids: ['phs002981', 'phs002330'],
          },
        ]),
      )
      .mockResolvedValueOnce(countsResponse(22409, 15105));

    const action = await run();

    expect(action.payload).toEqual({
      studies: [
        {
          study_id: 'HTP',
          study_code: 'HTP',
          title: 'The Human Trisome Project',
          user_acl_in_study: ['phs002330.c1', 'HTP', 'open_access'],
          total_files_count: 22409,
          total_authorized_files_count: 15105,
          authorized_controlled_files_count: 15105,
        },
      ],
    });
    expect(graphqlRequest.mock.calls[0][0].variables.sqon.content[0].content).toEqual({
      field: 'external_ids',
      value: ['phs002330', 'phs002981', 'phs999999'],
    });
    const { variables } = graphqlRequest.mock.calls[1][0];
    expect(variables.f0.content).toHaveLength(1);
    expect(variables.f0.content[0].content).toEqual({ field: 'study.study_code', value: ['HTP'] });
    expect(variables.f1.content[1].content).toEqual({
      field: 'acl',
      value: ['phs002330.c1', 'HTP', 'open_access'],
    });
  });

  test('should fetch every count in one call, two aliases per study in study order', async () => {
    fetchAccessIds.mockResolvedValue({
      data: { access_ids: ['phs002982.c1', 'phs004098.c999'] },
    });
    graphqlRequest
      .mockResolvedValueOnce(
        studiesResponse([
          {
            study_id: 'X01-deSmith',
            study_code: 'X01-deSmith',
            study_name: 'deSmith',
            external_ids: ['phs002982'],
          },
          {
            study_id: 'DS-HPBM',
            study_code: 'DS-HPBM',
            study_name: 'HPBM',
            external_ids: ['phs004098'],
          },
        ]),
      )
      .mockResolvedValueOnce(countsResponse(1308, 0, 5480, 5480));

    const action = await run();

    expect(graphqlRequest).toHaveBeenCalledTimes(2);
    const { query, variables } = graphqlRequest.mock.calls[1][0];
    expect(query).toContain('s3: file');
    expect(variables.f2.content[0].content.value).toEqual(['DS-HPBM']);
    expect(variables.f3.content[1].content.value).toEqual([
      'phs004098.c999',
      'DS-HPBM',
      'open_access',
    ]);
    expect(
      (
        action.payload as {
          studies: {
            study_code: string;
            total_authorized_files_count: number;
            total_files_count: number;
          }[];
        }
      ).studies.map((study) => [
        study.study_code,
        study.total_authorized_files_count,
        study.total_files_count,
      ]),
    ).toEqual([
      ['X01-deSmith', 0, 1308],
      ['DS-HPBM', 5480, 5480],
    ]);
  });

  test('should skip the file counts call when no study matches', async () => {
    fetchAccessIds.mockResolvedValue({ data: { access_ids: ['phs999999.c1'] } });
    graphqlRequest.mockResolvedValueOnce(studiesResponse([]));

    const action = await run();

    expect(action.payload).toEqual({ studies: [] });
    expect(graphqlRequest).toHaveBeenCalledTimes(1);
  });

  test('should reject when Cavatica fails', async () => {
    fetchAccessIds.mockResolvedValue({ error: { message: 'Request failed with status code 401' } });

    const action = await run();

    expect(action.type).toBe(fetchCavaticaAuthorizedStudies.rejected.type);
    expect(graphqlRequest).not.toHaveBeenCalled();
  });

  test('should reject when arranger answers with GraphQL errors', async () => {
    fetchAccessIds.mockResolvedValue({ data: { access_ids: ['phs002982.c1'] } });
    graphqlRequest.mockResolvedValueOnce({ data: { errors: [{ message: 'boom' }] } });

    const action = await run();

    expect(action.type).toBe(fetchCavaticaAuthorizedStudies.rejected.type);
  });

  test('should reject when a file count query fails', async () => {
    fetchAccessIds.mockResolvedValue({ data: { access_ids: ['phs002982.c1'] } });
    graphqlRequest
      .mockResolvedValueOnce(
        studiesResponse([
          {
            study_id: 'X01-deSmith',
            study_code: 'X01-deSmith',
            study_name: 'deSmith',
            external_ids: ['phs002982'],
          },
        ]),
      )
      .mockResolvedValueOnce({ error: { message: 'Network Error' } });

    const action = await run();

    expect(action.type).toBe(fetchCavaticaAuthorizedStudies.rejected.type);
  });
});

describe(`${beginCavaticaAnalyse.typePrefix}`, () => {
  const graphqlRequest = ArrangerApi.graphqlRequest as jest.Mock;

  const file = (file_id: string, access_urls: string) => ({
    file_id,
    access_urls,
    acl: ['phs002330.c1'],
    controlled_access: FileAccessType.CONTROLLED,
    study: { study_code: 'HTP' },
  });
  const getState = () => ({
    passport: {
      cavatica: { authentification: { status: PASSPORT_AUTHENTIFICATION_STATUS.connected } },
    },
  });
  const run = () =>
    beginCavaticaAnalyse({
      sqon: { op: BooleanOperators.and, content: [] },
      sort: [],
      fileIds: [],
    })(jest.fn(), getState as any, undefined);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should authorize Controlled files on the Cavatica DRS host without DCF', async () => {
    graphqlRequest.mockResolvedValue({
      data: {
        data: {
          file: {
            hits: {
              edges: [
                { node: file('cavatica', 'drs://cavatica-ga4gh-api.sbgenomics.com/abc') },
                { node: file('other', 'drs://other-host.org/abc') },
              ],
            },
          },
        },
      },
    });

    const action = await run();

    expect(
      (action.payload as { authorizedFiles: IFileEntity[] }).authorizedFiles.map(
        ({ file_id }) => file_id,
      ),
    ).toEqual(['cavatica']);
  });

  test('should reject a Controlled file on another host even with DCF connected', async () => {
    graphqlRequest.mockResolvedValue({
      data: {
        data: { file: { hits: { edges: [{ node: file('other', 'drs://other-host.org/abc') }] } } },
      },
    });

    const action = await run();

    expect(action.payload).toBe(CAVATICA_ANALYSE_STATUS.unauthorize);
  });
});
