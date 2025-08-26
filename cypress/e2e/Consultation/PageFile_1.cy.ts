/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntityMock();
  cy.intercept('POST', '**/graphql', {
    statusCode: 200,
    body: {},
  }).as('emptyGraphql');
});

describe('Page d\'un fichier - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).clickAndWait({force: true}); // data-cy="SummaryHeader_Studies_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Participant', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(1).clickAndWait({force: true}); // data-cy="SummaryHeader_Participants_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
  });
  
  it('Sample', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(2).clickAndWait({force: true}); // data-cy="SummaryHeader_Samples_Button"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
  });
});
