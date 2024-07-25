/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=b1f9898e-d050-492e-b1fd-7055ad8d9f8e');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').clickAndWait({force: true}); // data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist'); // data-cy="ExpandAll"
  });

  it('Construire une première requête', () => {
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);

    cy.checkValueFacetAndApply('Sample Type', 'DNA');

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,699|4,702|4,868|9,383)/);
    cy.validateClearAllButton(false);
  });
});
