/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=486a60b5-d2f7-4c76-a19b-463aaa65b9cb');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').click({force: true}); // data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist'); // data-cy="ExpandAll"
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkValueFacetAndApply('Sample Type', 'RNA');

    cy.validatePillSelectedQuery('Sample Type', ['DNA','RNA']);
    cy.validateTotalSelectedQuery('3,411');
    cy.validateTableResultsCount('3,411');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('DNA').click({force:true});
    cy.get('[class*="filtersDropdown"] input[id="input-RNA"]').check({force: true});
    cy.clickAndIntercept('[class*="filtersDropdown"] [data-cy="Apply_Sample Type"]', 'POST', '**/graphql', 16);

    cy.validatePillSelectedQuery('Sample Type', ['DNA','RNA']);
    cy.validateTotalSelectedQuery('3,411');
    cy.validateTableResultsCount('3,411');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkValueFacetAndApply('Collection Sample Type', 'Saliva');

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validatePillSelectedQuery('Collection Sample Type', ['Saliva'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('225');
    cy.validateTableResultsCount('225');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('New query').click({force:true});
    for (let i = 0; i < 16; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('5,326');
    cy.validateTableResultsCount('5,326');
    cy.validateClearAllButton(false);

    cy.checkValueFacetAndApply('Collection Sample Type', 'Saliva');

    cy.validatePillSelectedQuery('Collection Sample Type', ['Saliva']);
    cy.validateTotalSelectedQuery('225');
    cy.validateTableResultsCount('225');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="copy"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery('3,362');
    cy.validateTableResultsCount('3,362');
    cy.validateClearAllButton(true);
  });
});
