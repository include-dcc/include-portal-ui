/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=11165f81-edb0-4b99-9b71-690ba67aa812');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').click({force: true}); // data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist'); // data-cy="ExpandAll"
  });

  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery(/(4,732|4,751|4,756|4,927)/);
    cy.validateTableResultsCount(/(4,732|4,751|4,756|4,927)/);
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/(1,911|1,933|1,935|2,082)/);
    cy.validateTableResultsCount(/(1,911|1,933|1,935|2,082)/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').eq(0).click();
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
    cy.validateClearAllButton(false);
  });
});
