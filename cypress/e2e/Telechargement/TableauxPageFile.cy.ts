/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
});

describe('Page d\'un fichier - Exporter le tableau Participants-Samples en TSV', () => {
  beforeEach(() => {
    cy.visitFileEntity('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz');
    cy.resetColumns('participant-sample');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force:true});
    cy.waitUntilFile(oneMinute);
  });
  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-participants-samples-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauParticipantsPageFile.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauParticipantsPageFile.json');
  });
});