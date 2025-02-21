/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.showColumn('External Sample ID');
  cy.showColumn('Volume');
  cy.showColumn('Volume Unit');
  cy.showColumn('Laboratory Procedure');
  cy.showColumn('Biospecimen Storage');
});

describe('Page Data Exploration (Biospecimens) - Valider les liens disponibles', () => {
  it('Lien Participant ID du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('pt-as0aepqm');
  });

  it('Lien Collection ID du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).find('[type="link"]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.validatePillSelectedQuery('Collection ID', ['Bs-m623h3mrgg'], 1);
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(17).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Bs-03ynynfs').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });
});
