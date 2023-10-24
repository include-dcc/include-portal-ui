/// <reference types="Cypress" />
import '../../support/commands';

describe('Page Login', () => {
  it('Vérifier les informations affichées', () => {
    cy.visit('/');

    cy.contains('INCLUDE Data Hub').should('exist');
    cy.contains('Available Data').should('exist');
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(0).contains(/\d{1}/).should('exist'); // data-cy="DataRelease_Study"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(0).contains('Studies').should('exist'); // data-cy="DataRelease_Study"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(1).contains(/\d{1}/).should('exist'); // data-cy="DataRelease_Participant"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(1).contains('Participants').should('exist'); // data-cy="DataRelease_Participant"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(2).contains(/\d{1}/).should('exist'); // data-cy="DataRelease_Biospecimen"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(2).contains('Biospecimens').should('exist'); // data-cy="DataRelease_Biospecimen"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(3).contains(/\d{1}TB/).should('exist'); // data-cy="DataRelease_File"
    cy.get('[class*="DataRelease_dataReleaseStatsLabel"]').eq(3).contains('Data Files').should('exist'); // data-cy="DataRelease_File"

    cy.contains('Uncover new insights into the biology of Down Syndrome and co-occurring conditions.').should('exist');
    cy.get('[class*="Login"] button[class*="primary"]').contains('Login').should('exist'); // data-cy="Login"
    cy.get('[class*="Login"] button[class*="default"]').contains('Sign up').should('exist'); // data-cy="Signup"
  });
});
