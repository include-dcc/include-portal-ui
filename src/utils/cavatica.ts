import { ICavaticaAccessPayload } from 'services/api/cavatica/models';

const toAccessIds = (payload?: ICavaticaAccessPayload): string[] =>
  (payload?.access_ids ?? [])
    .filter((id): id is string => typeof id === 'string')
    .map((id) => id.trim());

export const OPEN_ACCESS_ACL = 'open_access';

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

  return [...new Set(codes)].sort();
};

// phs002330.c1 -> phs002330, the form the ETL stores in study.external_ids
const toAccession = (consentCode: string) => consentCode.split('.')[0];

export const toStudyAccessions = (consentCodes: string[]): string[] => [
  ...new Set(consentCodes.map(toAccession)),
];

// The study's own consent codes plus open_access: the widget lists them per study
export const buildAuthorizedAcl = (consentCodes: string[], studyAccessions: string[]): string[] => [
  ...consentCodes.filter((code) => studyAccessions.includes(toAccession(code))),
  OPEN_ACCESS_ACL,
];
