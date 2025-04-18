/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.deleteSetIfExists('participants', 'Cypress_New_P');
  cy.deleteSetIfExists('participants', 'Cypress_P');
  cy.visitDataExploration('participants');
  cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
  cy.createSetIfNotExists('Cypress_P', 0);
  cy.visitDataExploration('participants');
  cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
});

describe('Page Data Exploration (Participants) - Bouton Save set', () => {
  it('Vérifier les informations affichées - Titre de la dropdown', () => {
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[id="participant-set-dropdown-container"] button').clickAndWait({force: true});

    cy.get('[class="ant-dropdown-menu-title-content"]').contains('1 participant selected').should('exist');
  });

  it('Vérifier les informations affichées - Tooltip de la dropdown', () => {
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[id="participant-set-dropdown-container"] button').clickAndWait({force: true});
    cy.get('[class="ant-dropdown-menu-title-content"] [data-icon="info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class="ant-tooltip-inner"]').should('not.have.class', 'ant-tooltip-hidden');
    cy.get('[class="ant-tooltip-inner"]').contains('Max. 10,000 items at a time. The first 10,000 will be processed.').should('exist');
  });
  
  it('Valider les fonctionnalités du bouton - Save as new set', () => {
    cy.saveSetAs('Cypress_New_P', 0);

    cy.get('[class*="ant-notification"]').contains('Your set has been saved.').should('exist');
    cy.get('[class*="ant-notification"]').contains('You can add your sets to a query from the sidebar or the dashboard.').should('exist');
    
    cy.get('[class*="SetSearch_search"] input').type('Cypress_New_P', {force: true});
    cy.get('[class*="SetSearch_search"] [class*="ant-select-dropdown"]').contains('Cypress_New_P').should('exist');

    cy.visitDashboard();
    cy.get('[class*="SavedSets_setTabs"] [data-node-key="participants"]').clickAndWait({force: true});
    cy.get('[class*="SavedSets_setTabs"] [class*="ant-tabs-tabpane-active"]').contains('Cypress_New_P').parentsUntil('[class*="ListItem_savedSetListItem"]').parent().find('[class*="ListItem_count"]').contains(/^1$/).clickAndWait({force: true});
  });

  it('Valider les fonctionnalités du bouton - Add to existing set', () => {
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(1).find('[type="checkbox"]').check({force: true});
    cy.get('[id*="-set-dropdown-container"] button').clickAndWait({force: true});
    cy.get('[data-menu-id*="add_ids"]').clickAndWait({force: true});

    cy.get('[class*="ant-select-in-form-item"] input').focus().type('{enter}', {force: true});
    cy.get('[class*="ant-select-dropdown"]').contains('Cypress_P').parentsUntil('[class="ant-select-item-option-content"]').contains(/^1$/).should('exist');
    cy.get('[class*="ant-select-dropdown"]').contains('Cypress_P').clickAndWait({force: true});
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'PUT', '**/sets/**', 1);
    cy.get('form[id="add-remove-set"]').should('not.exist');

    cy.get('[class*="ant-notification"]').contains('Success').should('exist');
    cy.get('[class*="ant-notification"]').contains('Your set has been updated.').should('exist');

    cy.visitDashboard();
    cy.get('[class*="SavedSets_setTabs"] [data-node-key="participants"]').clickAndWait({force: true});
    cy.get('[class*="SavedSets_setTabs"] [class*="ant-tabs-tabpane-active"]').contains('Cypress_P').parentsUntil('[class*="ListItem_savedSetListItem"]').parent().find('[class*="ListItem_count"]').contains(/^2$/).clickAndWait({force: true});
    });
    
  it('Valider les fonctionnalités du bouton - Remove from existing set', () => {
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[id*="-set-dropdown-container"] button').clickAndWait({force: true});
    cy.get('[data-menu-id*="remove_ids"]').clickAndWait({force: true});

    cy.get('[class*="ant-select-in-form-item"] input').focus().type('{enter}', {force: true});
    cy.get('[class*="ant-select-dropdown"]').contains('Cypress_P').parentsUntil('[class="ant-select-item-option-content"]').contains(/^1$/).should('exist');
    cy.get('[class*="ant-select-dropdown"]').contains('Cypress_P').clickAndWait({force: true});
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'PUT', '**/sets/**', 1);
    cy.get('form[id="add-remove-set"]').should('not.exist');

    cy.get('[class*="ant-notification"]').contains('Success').should('exist');
    cy.get('[class*="ant-notification"]').contains('Your set has been updated.').should('exist');

    cy.visitDashboard();
    cy.get('[class*="SavedSets_setTabs"] [data-node-key="participants"]').clickAndWait({force: true});
    cy.get('[class*="SavedSets_setTabs"] [class*="ant-tabs-tabpane-active"]').contains('Cypress_P').parentsUntil('[class*="ListItem_savedSetListItem"]').parent().find('[class*="ListItem_count"]').contains(/^0$/).clickAndWait({force: true});
  });
});
