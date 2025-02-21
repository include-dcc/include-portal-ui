/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=11165f81-edb0-4b99-9b71-690ba67aa812');

  cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist');
});

describe('Page Data Exploration - Requêtes', () => {
  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql1');
    };

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"] [class*="Combiner_operator"]').clickAndWait({force: true});
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql2');
    };

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').eq(0).clickAndWait();
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql');
    };

    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);
    cy.validateClearAllButton(false);
  });
});
