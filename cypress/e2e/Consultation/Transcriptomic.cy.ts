/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitAndIntercept('/analytics/transcriptomic', 'POST', '**/graphql', 1);
});

describe('Page Transcriptomic - Vérifier les informations affichées', () => {
  it('Effect of Karyotype on all Genes"', () => {
    cy.get('[class*="Transcriptomic_content"]').contains('Effect of Karyotype on all Genes').should('exist');
  });
});
