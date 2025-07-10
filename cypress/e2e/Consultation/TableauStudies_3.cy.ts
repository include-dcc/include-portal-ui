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
  cy.clickAndIntercept('input[type="radio"][value="true"]', 'POST', '**/graphql', 15, false/*beVisible*/, 1);
});

describe('Page des études - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow(/^A/, 1);
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow(/^X/, 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow(/^A/, 2);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow(/^(?!A)/, 2);
  });

  it('Valider les fonctionnalités du tableau - Tri dbGaP', () => {
    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow('-', 5);
    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 6);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Families', () => {
    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow('-', 7);
    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow(/\d{1}/, 7);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow('-', 8);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 9);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Families', 1);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1);
  });
});
