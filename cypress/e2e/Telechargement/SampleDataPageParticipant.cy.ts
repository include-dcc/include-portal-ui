/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitParticipantEntity('pt-as0aepqm');
  cy.clickAndIntercept('[id="biospecimen"] [class*="EntityTable_tableHeader"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un participant - Télécharger le sample data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_biospecimenData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier [SJIP-976]', () => {
    cy.validateXlsxFileContent('DownloadSampleDataParticipant.json');
  });
});
