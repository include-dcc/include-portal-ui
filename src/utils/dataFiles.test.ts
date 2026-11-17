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

describe('isFileUnlocked', () => {
  const consentCodes = ['phs002330.c1', 'phs004098.c999'];
  const withAcl = (acl: string[], controlled_access: string = FileAccessType.CONTROLLED) => ({
    ...file,
    acl,
    controlled_access,
  });

  test('should lock every file when not connected to Cavatica', () => {
    expect(
      isFileUnlocked(withAcl(['open_access'], FileAccessType.REGISTERED), false, consentCodes),
    ).toBe(false);
    expect(isFileUnlocked(withAcl(['phs002330.c1']), false, consentCodes)).toBe(false);
  });

  test('should unlock an open_access file when connected, without any consent code', () => {
    expect(isFileUnlocked(withAcl(['open_access']), true, [])).toBe(true);
  });

  test('should unlock a Registered file when connected, whatever its acl', () => {
    expect(isFileUnlocked(withAcl([], FileAccessType.REGISTERED), true, [])).toBe(true);
    expect(isFileUnlocked(withAcl(['phs002330.c2'], FileAccessType.REGISTERED), true, [])).toBe(
      true,
    );
  });

  test("should unlock a Controlled file holding one of the user's consent codes", () => {
    expect(isFileUnlocked(withAcl(['phs002330.c1']), true, consentCodes)).toBe(true);
  });

  test('should unlock a file when any one of its acl values matches', () => {
    expect(isFileUnlocked(withAcl(['SD_65064P2Z', 'phs004098.c999']), true, consentCodes)).toBe(
      true,
    );
  });

  test('should lock a Controlled file of another consent group or study', () => {
    expect(isFileUnlocked(withAcl(['phs002330.c2']), true, consentCodes)).toBe(false);
    expect(isFileUnlocked(withAcl(['phs001138.c1']), true, consentCodes)).toBe(false);
  });

  test('should lock a file whose only acl value is the study id', () => {
    expect(isFileUnlocked(withAcl(['X01-Hakonarson']), true, consentCodes)).toBe(false);
  });

  test('should lock a file without acl values', () => {
    expect(isFileUnlocked(withAcl([]), true, consentCodes)).toBe(false);
    expect(isFileUnlocked(withAcl(undefined as any), true, consentCodes)).toBe(false);
  });
});
