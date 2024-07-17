/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
});

describe('Page d\'un participant - Exporter le tableau Family en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('pt-0dxdyebh');
    cy.resetColumns('family');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(1).click({force:true});
    cy.wait(1000);
  });
  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-family-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauFamilyPageParticipant.json');
  });

  it('Valider le contenu du fichier [SJIP-916]', () => {
    cy.validateFileContent('ExportTableauFamilyPageParticipant.json');
  });
});

describe('Page d\'un participant - Exporter le tableau Diagnoses en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('pt-0dxdyebh');
    cy.resetColumns('diagnosis');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(2).click({force:true});
    cy.wait(1000);
  });
  
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

describe('Page d\'un participant - Exporter le tableau Phenotypes en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('pt-0dxdyebh');
    cy.resetColumns('phenotype');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(3).click({force:true});
    cy.wait(1000);
  });
  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-phenotypes-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauPhenotypesPageParticipant.json');
  });

  it('Valider le contenu du fichier [SJIP-584]', () => {
    cy.validateFileContent('ExportTableauPhenotypesPageParticipant.json');
  });
});

describe('Page d\'un participant - Exporter le tableau Biospecimens en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('pt-0dxdyebh');
    cy.resetColumns('biospecimen');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(5).click({force:true});
    cy.wait(1000);
  });
  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include-biospecimens-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauBiospecimensPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauBiospecimensPageParticipant.json');
  });
});