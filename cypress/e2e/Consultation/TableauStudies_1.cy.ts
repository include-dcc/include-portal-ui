/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Description');
  cy.showColumn('Participant Lifespan');
  cy.showColumn('Data Source');
  cy.showColumn('Design');
  cy.showColumn('Principal Investigator');
  cy.showColumn('Start');
  cy.showColumn('End');
});

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageContent_title"]').contains('Studies'); // data-cy="Title_Studies"
  });

  it('Tableau [SJIP-1207]', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(0).find('[class*="ant-tag-green"]').contains('H').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(1).contains('HTP').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(2).contains('The Human Trisome Project').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(3).contains('INCLUDE').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(4).contains('All Co-occurring Conditions').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(5).contains(/(phs002330|phs002981|-)/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(6).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(7).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(8).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(9).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(10).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(11).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(12).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(13).contains('-').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(14).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(15).contains('The Human Trisome Project (').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(16).contains('Pediatric').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(16).contains('Adult').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(17).contains('Investigator Assessment').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(17).contains('Medical Record').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(18).contains('longitudinal').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(19).contains('Joaquin M. Espinosa').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(20).contains('2016').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(21).contains('-').should('exist');
  });

  it('Summary', () => {
    cy.get('tfoot [class*="summaryTitle"]').eq(0).contains('Participants').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(0).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(1).contains('Families').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(2).contains('Biospecimens').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(2).contains(/\d{1}/).should('exist');
  });
});
