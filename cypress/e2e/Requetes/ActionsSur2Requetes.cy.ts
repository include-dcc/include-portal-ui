/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=443bca8e-4f39-4743-995f-aea57497450c');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').click({force: true}); // data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button').contains('Collapse all').should('exist'); // data-cy="ExpandAll"
  });

  it('Sélectionner une requête', () => {
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTableResultsCount(/(1,965|1,989)/);
  });

  it('Afficher/Masquer les champs', () => {
    cy.get('button[role="switch"]').click({force: true});

    cy.validatePillSelectedQuery('', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,702|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,989)/);
    cy.validateTableResultsCount(/(1,965|1,989)/);
    cy.validateClearAllButton(true);

    cy.get('button[role="switch"]').click({force: true});

    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,989)/);
    cy.validateTableResultsCount(/(1,965|1,989)/);
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).click();
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,702|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Masquer/Afficher le panneau des requêtes', () => {
    cy.get('[id="query-builder-header-tools"]').find('span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[id="query-builder-header-tools"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);

    cy.get('[id="query-builder-header-tools"]').find('span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[id="query-builder-header-tools"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,702|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec ET', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('and').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/(1,911|1,935)/);
    cy.validateTableResultsCount(/(1,911|1,935)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec OU', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryTools"]').find('button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class="ant-dropdown-menu-title-content"]').contains('or').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery(/(4,732|4,756)/);
    cy.validateTableResultsCount(/(4,732|4,756)/);
    cy.validateClearAllButton(true);
  });

  it('Combiner deux requêtes avec Combiner', () => {
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(0).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('input[class="ant-checkbox-input"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryTools"]').find('button[class*="ant-btn-compact-first-item"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('', ['Q1']);
    cy.validatePillSelectedQuery('', ['Q2'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery(/(1,911|1,935)/);
    cy.validateTableResultsCount(/(1,911|1,935)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et annuler', () => {
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="delete"]').click({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.get('[class*="ant-popconfirm"]').find('button[class*="ant-btn-default"]').click({force:true});
    cy.get('[class*="ant-popconfirm"]').should('have.class', 'ant-popover-hidden', {timeout: 5000});
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,702|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer une requête avec le bouton et confirmer', () => {
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="delete"]').click({force: true});
    cy.get('[class*="ant-popconfirm"]').should('not.have.class', 'ant-popover-hidden');

    cy.clickAndIntercept('[class*="ant-popconfirm"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 1);
    cy.get('[class*="ant-popconfirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,989)/);
    cy.validateTableResultsCount(/(1,965|1,989)/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer l\'unique pilule d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 1);
    cy.validatePillSelectedQuery('Age at Biospecimen Collection (days)', ['20000']);
    cy.validateTotalSelectedQuery(/(1,965|1,989)/);
    cy.validateTableResultsCount(/(1,965|1,989)/);
    cy.validateClearAllButton(false);
  });

  it('Supprimer toutes les requêtes avec le bouton et annuler', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Clear all').click({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"]').find('button[class*="ant-btn-default"]').click({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Sample Type', ['DNA']);
    cy.validateTotalSelectedQuery(/(4,678|4,702|9,383)/);
    cy.validateTableResultsCount(/(4,678|4,702|9,383)/);
    cy.validateClearAllButton(true);
  });

  it('Supprimer toutes les requêtes avec le bouton et supprimer', () => {
    cy.get('[id="query-builder-header-tools"]').contains('Clear all').click({force: true});
    cy.get('[class*="ant-modal-confirm"]').should('exist');

    cy.get('[class*="ant-modal-confirm"]').find('button[class*="ant-btn-primary"]').click({force:true});
    cy.get('[class*="ant-modal-confirm"]').should('not.exist');
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery(/\d{1}/);
    cy.validateTableResultsCount(/\d{1}/);
    cy.validateClearAllButton(false);
  });
});
