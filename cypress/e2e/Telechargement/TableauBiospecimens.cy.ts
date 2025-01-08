/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('biospecimens', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.showColumn('External Sample ID');
  cy.showColumn('Volume');
  cy.showColumn('Volume Unit');
  cy.showColumn('Laboratory Procedure');
  cy.showColumn('Biospecimen Storage');

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, false/*beVisible*/, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Biospecimens) - Exporter les biospecimens en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-biospecimen-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauBiospecimens.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauBiospecimens.json');
  });
});
