/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntityMock();
});

describe('Dataset Unharmonized d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[id="HTP-SomaScan-2020"] [class="ant-collapse-header"]').contains('Manifest').should('not.exist');
  });
});
