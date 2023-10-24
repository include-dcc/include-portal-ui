/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
  cy.showColumn('File Name');
  cy.showColumn('Access Url');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1);
});

describe('Page Data Exploration (Data Files) - Exporter les fichiers en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-file-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [SJIP-600]', () => {
    cy.validateFileHeaders('ExportTableauFiles.json');
  });

  it('Valider le contenu du fichier [SJIP-600]', () => {
    cy.validateFileContent('ExportTableauFiles.json');
  });
});
