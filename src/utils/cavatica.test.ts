import { buildAuthorizedAcl, extractConsentCodes, toStudyAccessions } from './cavatica';

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

describe('toStudyAccessions', () => {
  test('should keep the unique phs prefixes of the consent codes', () => {
    expect(toStudyAccessions(['phs002330.c1', 'phs002330.c2', 'phs004098.c999'])).toEqual([
      'phs002330',
      'phs004098',
    ]);
  });
});

describe('buildAuthorizedAcl', () => {
  test("should keep only the study's consent codes plus open_access", () => {
    expect(
      buildAuthorizedAcl(
        ['phs002330.c1', 'phs002981.c2', 'phs004098.c1'],
        ['phs002981', 'phs002330'],
      ),
    ).toEqual(['phs002330.c1', 'phs002981.c2', 'open_access']);
  });
});
