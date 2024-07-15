/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Rechercher des études', () => {
  it('Par study code', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'htp', 'POST', '**/graphql', 3);
    cy.waitWhileSpin(60*1000);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('HTP', 1);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').click({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par study name', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'SOME', 'POST', '**/graphql', 4);
    cy.waitWhileSpin(60*1000);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('HTP', 1);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').click({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par dbGaP', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'S002330', 'POST', '**/graphql', 7);
    cy.waitWhileSpin(60*1000);
    cy.validateTableResultsCount(/4 Results/);
    cy.validateTableFirstRow('phs002330', 5);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').click({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });
});
