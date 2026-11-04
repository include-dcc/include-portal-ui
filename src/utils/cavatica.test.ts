import { buildAuthorizedAcl, extractConsentCodes, extractStudyAccessions } from './cavatica';

describe('extractStudyAccessions', () => {
  test('should keep the phs prefix of the Cavatica ids', () => {
    expect(
      extractStudyAccessions({
        access_ids: ['phs000892.c1', 'phs001287.c1', 'phs002517.c1', 'phs002790.c1'],
      }),
    ).toEqual(['phs000892', 'phs001287', 'phs002517', 'phs002790']);
  });

  test('should strip any middle parts', () => {
    expect(extractStudyAccessions({ access_ids: ['phs002330.v2.p1'] })).toEqual(['phs002330']);
  });

  test('should trim whitespace', () => {
    expect(extractStudyAccessions({ access_ids: [' phs002981.v1.p1 '] })).toEqual(['phs002981']);
  });

  test('should deduplicate versions of the same study', () => {
    expect(extractStudyAccessions({ access_ids: ['phs002330.v1.p1', 'phs002330.v2.p1'] })).toEqual([
      'phs002330',
    ]);
  });

  test('should accept an accession without a version', () => {
    expect(extractStudyAccessions({ access_ids: ['phs004098'] })).toEqual(['phs004098']);
  });

  test('should drop ids without the phs prefix', () => {
    expect(extractStudyAccessions({ access_ids: ['foo.c1', 'PHS000892.c1'] })).toEqual([]);
  });

  test('should drop empty and non-string values', () => {
    expect(
      extractStudyAccessions({ access_ids: ['', '  ', null as any, 'phs002983.v1.p1'] }),
    ).toEqual(['phs002983']);
  });

  test('should return an empty list for an empty or missing payload', () => {
    expect(extractStudyAccessions({ access_ids: [] })).toEqual([]);
    expect(extractStudyAccessions({})).toEqual([]);
    expect(extractStudyAccessions(undefined)).toEqual([]);
  });
});

describe('extractConsentCodes', () => {
  test('should keep the Cavatica ids as is', () => {
    expect(
      extractConsentCodes({
        access_ids: ['phs000892.c1', 'phs001287.c1', 'phs002517.c1', 'phs002790.c1'],
      }),
    ).toEqual(['phs000892.c1', 'phs001287.c1', 'phs002517.c1', 'phs002790.c1']);
  });

  test('should drop the middle parts', () => {
    expect(extractConsentCodes({ access_ids: [' phs000956.v4.c1', 'phs001024.v3.c999'] })).toEqual([
      'phs000956.c1',
      'phs001024.c999',
    ]);
  });

  test('should dedupe the same consent code across versions', () => {
    expect(extractConsentCodes({ access_ids: ['phs000956.v3.c1', 'phs000956.v4.c1'] })).toEqual([
      'phs000956.c1',
    ]);
  });

  test('should ignore ids without the phs prefix or a last consent code', () => {
    expect(
      extractConsentCodes({
        access_ids: ['phs000956.v4.p1', 'phs000956', 'phs000956.c1.v4', 'foo.c1', 'PHS000956.c1'],
      }),
    ).toEqual([]);
  });
});

describe('buildAuthorizedAcl', () => {
  test("should keep the study's consent codes plus its id and open_access", () => {
    expect(
      buildAuthorizedAcl(
        ['phs002330.c1', 'phs002981.c2', 'phs004098.c1'],
        ['phs002981', 'phs002330'],
        'HTP',
      ),
    ).toEqual(['phs002330.c1', 'phs002981.c2', 'HTP', 'open_access']);
  });

  test('should still authorize the study id and open_access without consent codes', () => {
    expect(buildAuthorizedAcl([], ['phs002330'], 'HTP')).toEqual(['HTP', 'open_access']);
  });
});
