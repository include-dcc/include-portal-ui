/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitParticipantEntity('pt-as0aepqm');
  cy.get('[id="biospecimen"] [data-node-key="table"]').clickAndWait({force: true});
  cy.clickAndIntercept('[id="biospecimen"] [class*="BiospecimenTable"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1, false/*beVisible*/, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un participant - Télécharger le sample data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_biospecimenData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    cy.validateXlsxFileContent('DownloadSampleDataParticipant.json');
  });
});
