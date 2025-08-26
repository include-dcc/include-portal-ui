/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants');
  cy.showColumn('Race');
  cy.showColumn('Ethnicity');
  cy.showColumn('Age');
  cy.showColumn('External Participant ID');
  cy.showColumn('Family Unit');
  cy.showColumn('Condition (Source Text)');
  cy.showColumn('Intervention (MAxO)');
});

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Participant ID', () => {
    cy.sortTableAndWait('Participant ID');
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri DS Status [SJIP-1435]', () => {
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('-', 4, true);
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('T21', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Female', 5, true);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Unknown', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Race', () => {
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow('American Indian or Alaska Native', 6, true);
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Ethnicity', () => {
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri External Participant ID', () => {
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Unit', () => {
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('Trio+', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 15, true);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndWait('Files');
    cy.validateTableFirstRow(/\d{1}/, 16, true);
    cy.sortTableAndWait('Files');
    cy.validateTableFirstRow(/\d{1}/, 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.sortTableAndWait('Participant ID');
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
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
