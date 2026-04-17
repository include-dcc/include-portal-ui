/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=779220be-ef0a-420c-8aa8-1ad83f489165');
});

describe('Page Data Exploration - Requêtes', () => {
  it('Validation Facette numérique OU Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('5,038');
    cy.validateTableResultsCount('5,038');
  });

  it('Validation Facette standard (Any of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('5,025');
    cy.validateTableResultsCount('5,025');
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('1,597');
    cy.validateTableResultsCount('1,597');
  });

  it('Validation Facette standard (None of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('10.8K');
    cy.validateTableResultsCount('10,751');
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('61');
    cy.validateTableResultsCount('61');
  });
});
