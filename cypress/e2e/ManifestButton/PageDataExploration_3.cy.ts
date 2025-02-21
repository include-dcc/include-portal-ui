/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
  cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Data Files) - Télécharger le manifest (checkbox)', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include_familyManifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadManifestFamily.json');
  });

  it('Valider le contenu du fichier [SJIP-967]', () => {
    cy.validateFileContent('DownloadManifestFamily.json');
  });
});
