/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens');
  cy.showColumn('External Sample ID');
  cy.showColumn('Volume');
  cy.showColumn('Volume Unit');
  cy.showColumn('Laboratory Procedure');
  cy.showColumn('Biospecimen Storage');
});

describe('Page Data Exploration (Biospecimens) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Sample ID', () => {
    cy.sortTableAndWait('Sample ID');
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
    cy.sortTableAndIntercept('Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Type', () => {
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.validateTableFirstRow('-', 3, true);
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Parent Sample ID', () => {
    cy.sortTableAndIntercept('Parent Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
    cy.sortTableAndIntercept('Parent Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Parent Sample Type', () => {
    cy.sortTableAndIntercept('Parent Sample Type', 1);
    cy.validateTableFirstRow('-', 5, true);
    cy.sortTableAndIntercept('Parent Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Participant ID', () => {
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Collection ID', () => {
    cy.sortTableAndIntercept('Collection ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
    cy.sortTableAndIntercept('Collection ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Collection Sample Type', () => {
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.validateTableFirstRow('-', 8, true);
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Availability', () => {
    cy.sortTableAndIntercept('Sample Availability', 1);
    cy.validateTableFirstRow('-', 14, true);
    cy.sortTableAndIntercept('Sample Availability', 1);
    cy.validateTableFirstRow('No', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 17, true);
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('button[type="button"]').contains('Prev.').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql3');
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
