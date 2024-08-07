import { FileAccessType } from 'graphql/files/models';

import { userHasAccessToFile } from './dataFiles';

const file = {
  id: 'id',
  fhir_id: 'fhir_id',
  file_id: 'file_id',
  external_id: 'external_id',
  data_category: 'Genomics',
  data_type: 'Variant Calls',
  file_format: 'vcf',
  size: 1683539332,
  controlled_access: 'Controlled',
  access_urls: 'access_urls',
  acl: [],
  file_name: 'file_name.gz',
  nb_participants: 1,
  nb_biospecimens: 1,
  fhir_document_reference: 'fhir_document_reference.gz',
  score: 10,
  repository: '',
  biospecimens: {
    hits: {
      edges: [],
    },
  },
  index: {
    urls: 'index.urls',
    file_name: 'index.file_name',
  },
  study: {
    id: 'study.id',
    study_id: 'X01-Hakonarson',
    study_code: 'X01-Hakonarson',
    study_name:
      'Genetic underpinnings of the multifactorial phenotype of Trisomy 21 patients unveiled by multi-omics approaches',
    program: 'INCLUDE',
    fhir_id: 'study.fhir_id',
    domain: 'study.domain',
    external_id: 'study.external_id',
    experimental_strategy: [],
    family_count: 10,
    participant_count: 10,
    biospecimen_count: 10,
    data_category: [],
    family_data: false,
    controlled_access: [],
  },
  sequencing_experiment: {
    hits: {
      edges: [],
    },
  },
  hashes: {
    etag: 'hashes.etag',
  },
  participants: {
    hits: {
      edges: [],
    },
  },
  key: 'key',
};

describe('dataFiles', () => {
  test('userHasAccessToFile should managed file with empty acl', () => {
    expect(userHasAccessToFile(file, [], true, true)).toBeTruthy();
  });

  test('userHasAccessToFile should managed controlled file and gen3 connections', () => {
    // controlled and gen3
    expect(
      userHasAccessToFile(
        {
          ...file,
          controlled_access: FileAccessType.CONTROLLED,
          study: { ...file.study, study_code: 'ABC-DS' },
        },
        [],
        false,
        true,
      ),
    ).toBeTruthy();
    expect(
      userHasAccessToFile(
        {
          ...file,
          controlled_access: FileAccessType.CONTROLLED,
          study: { ...file.study, study_code: 'ABC-DS' },
        },
        [],
        false,
        false,
      ),
    ).toBeFalsy();
  });

  test('userHasAccessToFile should managed registered file and cavatica connections', () => {
    // registred and cavatica
    expect(
      userHasAccessToFile(
        {
          ...file,
          controlled_access: FileAccessType.REGISTERED,
          study: { ...file.study, study_code: 'ABC-DS' },
        },
        [],
        true,
        false,
      ),
    ).toBeTruthy();
    expect(
      userHasAccessToFile(
        {
          ...file,
          controlled_access: FileAccessType.REGISTERED,
          study: { ...file.study, study_code: 'ABC-DS' },
        },
        [],
        false,
        false,
      ),
    ).toBeFalsy();
  });

  test('userHasAccessToFile should managed file from X01 studies', () => {
    expect(
      userHasAccessToFile(
        { ...file, study: { ...file.study, study_code: 'X01-Hakonarson' } },
        [],
        true,
        true,
      ),
    ).toBeTruthy();
    expect(
      userHasAccessToFile(
        { ...file, study: { ...file.study, study_code: 'X01-Hakonarson' } },
        [],
        false,
        true,
      ),
    ).toBeFalsy();

    expect(
      userHasAccessToFile(
        { ...file, study: { ...file.study, study_code: 'X01-deSmith' } },
        [],
        true,
        true,
      ),
    ).toBeTruthy();
    expect(
      userHasAccessToFile(
        { ...file, study: { ...file.study, study_code: 'X01-deSmith' } },
        [],
        false,
        true,
      ),
    ).toBeFalsy();
  });
});
