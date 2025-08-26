/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExplorationBiospecimenMock();
  cy.showColumn('External Sample ID');
  cy.showColumn('Volume');
  cy.showColumn('Volume Unit');
  cy.showColumn('Laboratory Procedure');
  cy.showColumn('Biospecimen Storage');
  cy.wait(1000);

  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, false/*beVisible*/, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Biospecimens) - Exporter les biospecimens en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-biospecimen-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [SJIP-1428]', () => {
    cy.validateFileHeaders('ExportTableauBiospecimens.json');
  });

  it('Valider le contenu du fichier [SJIP-1428]', () => {
    cy.validateFileContent('ExportTableauBiospecimens.json');
  });
});
