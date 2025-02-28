/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('HTP.ce770763-b904-4c66-8b08-c54dd4e7c7b5.rsem.isoforms.results.gz');
  cy.get('button[aria-label="Analyze in Cavatica"]').clickAndWait({force: true});
});

describe('Page Dashboard - Bouton Analyze in Cavatica (déconnecté)', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-confirm-body"]').contains('Connect to Cavatica').should('exist');
    cy.get('[class="ant-modal-confirm-body"]').contains('In order to analyze your files you must first connect your Cavatica account. Once you are connected, you will be redirected back to this page.').should('exist');
    cy.get('[class="ant-modal-confirm-btns"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-confirm-btns"] button[class*="ant-btn-primary"]').contains('Connect').should('exist');
  });
});
