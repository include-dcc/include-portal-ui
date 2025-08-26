/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntityMock();
});

describe('Page d\'un fichier - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data-access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data-access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data-access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data-access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data-access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data-type"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data-type"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data-type"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data-type"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data-type"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.get('[id="participant-sample"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="participant-sample"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="participant-sample"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="participant-sample"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="participant-sample"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
