/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitFileEntityMock();
  cy.resetColumns('participant-sample');
  cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force:true});
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un fichier - Exporter le tableau Participants-Samples en TSV', () => {  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-participants-samples-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider le contenu du fichier', () => {
    cy.fixture('ExportTableauParticipantsPageFile.tsv').then((expectedContent) => {
      cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
        cy.readFile(result.stdout.trim()).then((actualContent) => {
          expect(actualContent.trim()).to.equal(expectedContent.trim());
        });
      });
    });
  });
});