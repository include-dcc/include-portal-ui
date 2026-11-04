import { ICavaticaAccessPayload } from 'services/api/cavatica/models';

const toAccessIds = (payload?: ICavaticaAccessPayload): string[] =>
  (payload?.access_ids ?? [])
    .filter((id): id is string => typeof id === 'string')
    .map((id) => id.trim());

// phs002330.c1 -> phs002330, the form the ETL stores in study.external_ids
export const extractStudyAccessions = (payload?: ICavaticaAccessPayload): string[] => {
  const accessions = toAccessIds(payload)
    .map((id) => id.split('.')[0])
    .filter((accession) => accession.startsWith('phs'));

  return Array.from(new Set(accessions));
};

const OPEN_ACCESS_ACL = 'open_access';

// phsN[.middle parts].cX -> phsN.cX, the form the ETL stores in file acl. Other ids are ignored.
export const extractConsentCodes = (payload?: ICavaticaAccessPayload): string[] => {
  const codes = toAccessIds(payload).flatMap((id) => {
    const parts = id.split('.');
    const accession = parts[0];
    const consent = parts[parts.length - 1];
    if (accession.startsWith('phs') && consent.startsWith('c')) {
      return [`${accession}.${consent}`];
    }
    return [];
  });

  return Array.from(new Set(codes)).sort();
};

// A file is authorized when its acl holds one of the user's consent codes for the study,
// the study's own id, or open_access
export const buildAuthorizedAcl = (
  consentCodes: string[],
  studyAccessions: string[],
  studyId: string,
): string[] => [
  ...consentCodes.filter((code) => studyAccessions.includes(code.split('.')[0])),
  studyId,
  OPEN_ACCESS_ACL,
];
