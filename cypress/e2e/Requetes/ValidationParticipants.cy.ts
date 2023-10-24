/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=779220be-ef0a-420c-8aa8-1ad83f489165');
  });

  it.skip('Validation Facette numérique ou No Data', () => {
    cy.validateTotalSelectedQuery('1,966');
    cy.validateTableResultsCount('1,966');
  });

  it('Validation Facette numérique OU Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('4,725');
    cy.validateTableResultsCount('4,725');
  });

  it.skip('Validation Facette numérique ou No Data ET Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,935');
    cy.validateTableResultsCount('1,935');
  });

  it('Validation Facette standard (Any of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('4,720');
    cy.validateTableResultsCount('4,720');
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,199');
    cy.validateTableResultsCount('1,199');
  });

  it('Validation Facette standard (None of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('202');
    cy.validateTableResultsCount('202');
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('31');
    cy.validateTableResultsCount('31');
  });
});
