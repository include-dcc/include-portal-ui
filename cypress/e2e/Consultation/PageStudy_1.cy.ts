/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntityMock();
  cy.intercept('POST', '**/graphql', {
    statusCode: 200,
    body: {},
  }).as('emptyGraphql');
});

describe('Page d\'une étude - Valider les redirections', () => {
  it('Participants', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(0).clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(1).clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Files', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(2).clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
});
