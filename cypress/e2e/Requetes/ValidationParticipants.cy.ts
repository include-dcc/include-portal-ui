/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=779220be-ef0a-420c-8aa8-1ad83f489165');
  });

  it.skip('Validation Facette numérique ou No Data', () => {
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
  });

  it('Validation Facette numérique OU Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(4,732|4,751|4,756|4,927)/);
    cy.validateTableResultsCount(/(4,732|4,751|4,756|4,927)/);
  });

  it.skip('Validation Facette numérique ou No Data ET Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(1,911|1,933|1,935|2,082)/);
    cy.validateTableResultsCount(/(1,911|1,933|1,935|2,082)/);
  });

  it('Validation Facette standard (Any of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(4,727|4,746|4,751|4,919)/);
    cy.validateTableResultsCount(/(4,727|4,746|4,751|4,919)/);
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(1,196|1,199|1,361)/);
    cy.validateTableResultsCount(/(1,196|1,199|1,361)/);
  });

  it('Validation Facette standard (None of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(4,629|4,656|4,675|4,680|4,715|8,632)/);
    cy.validateTableResultsCount(/(4,629|4,656|4,675|4,680|4,715|8,632)/);
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery(/(52|54|59)/);
    cy.validateTableResultsCount(/(52|54|59)/);
  });
});
