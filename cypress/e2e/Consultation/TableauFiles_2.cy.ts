/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExplorationFileMock();
  cy.showColumn('File Name');
  cy.showColumn('Dataset');
  cy.showColumn('Access Url');
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  it('Lien File ID du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(13).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(14).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });
});
