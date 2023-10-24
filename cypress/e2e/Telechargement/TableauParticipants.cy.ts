/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
  cy.showColumn('Race');
  cy.showColumn('Ethnicity');
  cy.showColumn('External Participant ID');
  cy.showColumn('Family Unit');
  cy.showColumn('Condition (Source Text)');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 1);
});

describe('Page Data Exploration (Participants) - Exporter les participants en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-participant-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [SJIP-600]', () => {
    cy.validateFileHeaders('ExportTableauParticipants.json');
  });

  it('Valider le contenu du fichier [SJIP-600]', () => {
    cy.validateFileContent('ExportTableauParticipants.json');
  });
});
