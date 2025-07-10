/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles');
  cy.showColumn('File Name');
  cy.showColumn('Dataset');
  cy.showColumn('Access Url');
});

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri File ID', () => {
    cy.sortTableAndWait('File ID',);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
    cy.sortTableAndIntercept('File ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri File Name', () => {
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Dataset', () => {
    cy.sortTableAndIntercept('Dataset', 1);
    cy.validateTableFirstRow('-', 6, true);
    cy.sortTableAndIntercept('Dataset', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow(/(Genomics|-)/, 7, true);
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow('Transcriptomics', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('-', 8, true);
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('gVCF', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Experimental Strategy', () => {
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Access Url', () => {
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 10, true);
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('bam', 11, true);
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('vcf', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 12, true);
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 14, true);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow(/^(?!-).*$/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Prev.').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
