/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=443bca8e-4f39-4743-995f-aea57497450c');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').clickAndWait({force: true}); // data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist'); // data-cy="ExpandAll"
  });

  it('Sélectionner une requête', () => {
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
  });

  it('Afficher/Masquer les champs', () => {
    cy.get('button[role="switch"]').clickAndWait({force: true});

    cy.validatePillSelectedQuery('', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
    cy.validateClearAllButton(true);

    cy.get('button[role="switch"]').clickAndWait({force: true});

    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).clickAndWait();
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Masquer/Afficher le panneau des requêtes', () => {
    cy.get('[id="query-builder-header-tools"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('[id="query-builder-header-tools"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);

    cy.get('[id="query-builder-header-tools"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('[id="query-builder-header-tools"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec ET', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('and').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/(1,911|1,933|1,935|2,082)/);
    cy.validateTableResultsCount(/(1,911|1,933|1,935|2,082)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec OU', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"] button[class*="ant-dropdown-trigger"]').clickAndWait({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('or').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery(/(4,732|4,738|4,751|4,756|4,927)/);
    cy.validateTableResultsCount(/(4,732|4,738|4,751|4,756|4,927)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec Combiner', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryTools"] button[class*="ant-btn-compact-first-item"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/(1,911|1,933|1,935|2,082)/);
    cy.validateTableResultsCount(/(1,911|1,933|1,935|2,082)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et annuler', () => {
    cy.get('[class*="QueryBar_selected"] [data-icon="delete"]').clickAndWait({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.get('[class*="ant-popconfirm"] button[class*="ant-btn-default"]').clickAndWait({force:true});
    cy.get('[class*="ant-popconfirm"]').should('have.class', 'ant-popover-hidden');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et confirmer', () => {
    cy.get('[class*="QueryBar_selected"] [data-icon="delete"]').clickAndWait({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.clickAndIntercept('[class*="ant-popconfirm"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 1);
    cy.get('[class*="ant-popconfirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer l\'unique pilule d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,985|1,989|2,141)/);
    cy.validateTableResultsCount(/(1,965|1,985|1,989|2,141)/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer toutes les requêtes avec le bouton et annuler', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Clear all').clickAndWait({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"] button[class*="ant-btn-default"]').clickAndWait({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,686|4,699|4,702|4,868|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer toutes les requêtes avec le bouton et supprimer', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Clear all').clickAndWait({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"] button[class*="ant-btn-primary"]').clickAndWait({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);
    cy.validateClearAllButton(false);
  });
});
