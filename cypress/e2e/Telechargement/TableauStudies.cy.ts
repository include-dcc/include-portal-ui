/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Description');
  cy.showColumn('Participant Lifespan');
  cy.showColumn('Data Source');
  cy.showColumn('Design');
  cy.showColumn('Principal Investigator');
  cy.showColumn('Start');
  cy.showColumn('End');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1);
  cy.wait(10 * 1000);
});

describe('Page Studies - Exporter les participants en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-study-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauStudies.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauStudies.json');
  });
});
