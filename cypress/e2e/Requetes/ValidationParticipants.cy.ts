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
    cy.validateTotalSelectedQuery('1,989');
    cy.validateTableResultsCount('1,989');
  });

  it('Validation Facette numérique OU Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('4,756');
    cy.validateTableResultsCount('4,756');
  });

  it.skip('Validation Facette numérique ou No Data ET Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,935');
    cy.validateTableResultsCount('1,935');
  });

  it('Validation Facette standard (Any of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('4,751');
    cy.validateTableResultsCount('4,751');
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('1,199');
    cy.validateTableResultsCount('1,199');
  });

  it('Validation Facette standard (None of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery(/(4,629|8,632)/);
    cy.validateTableResultsCount(/(4,629|8,632)/);
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('54');
    cy.validateTableResultsCount('54');
  });
});
