import { FileAccessType } from 'graphql/files/models';

import { isFileUnlocked } from './dataFiles';

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
  const controlled = {
    ...file,
    controlled_access: FileAccessType.CONTROLLED,
    study: { ...file.study, study_code: 'ABC-DS' },
  };
  const registered = { ...controlled, controlled_access: FileAccessType.REGISTERED };

  test('isFileUnlocked should deny everything when not connected to Cavatica', () => {
    expect(isFileUnlocked(registered, false)).toBeFalsy();
    expect(isFileUnlocked(file, false)).toBeFalsy();
  });

  test('isFileUnlocked should never authorize a Controlled file', () => {
    expect(isFileUnlocked(controlled, true)).toBeFalsy();
  });

  test('isFileUnlocked should lock a file without an access type', () => {
    expect(
      isFileUnlocked({ ...registered, controlled_access: undefined as any }, true),
    ).toBeFalsy();
  });

  test('isFileUnlocked should authorize a Registered file when connected to Cavatica', () => {
    expect(isFileUnlocked(registered, true)).toBeTruthy();
  });

  test('isFileUnlocked should treat Controlled files on the Cavatica/CRDC DRS hosts as Registered', () => {
    expect(
      isFileUnlocked({ ...controlled, access_urls: 'drs://nci-crdc.datacommons.io/abc' }, true),
    ).toBeTruthy();
    expect(
      isFileUnlocked(
        { ...controlled, access_urls: 'drs://cavatica-ga4gh-api.sbgenomics.com/abc' },
        true,
      ),
    ).toBeTruthy();
  });

  test('isFileUnlocked should treat Controlled files from X01 studies as Registered', () => {
    expect(
      isFileUnlocked({ ...file, study: { ...file.study, study_code: 'X01-Hakonarson' } }, true),
    ).toBeTruthy();
    expect(
      isFileUnlocked({ ...file, study: { ...file.study, study_code: 'X01-deSmith' } }, true),
    ).toBeTruthy();
  });
});
