/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitParticipantEntity('pt-0dxdyebh');
  cy.resetColumns('diagnosis');
  cy.get('div[id="content"] svg[data-icon="download"]').eq(2).clickAndWait({force:true});
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un participant - Exporter le tableau Diagnoses en TSV', () => {  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-diagnoses-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauDiagnosesPageParticipant.json');
  });

  it('Valider le contenu du fichier [SJIP-584]', () => {
    cy.validateFileContent('ExportTableauDiagnosesPageParticipant.json');
  });
});
