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

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(1).contains('bs-03ynynfs').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).contains('HTP').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).contains('RNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).contains('bs-3m4a3fy3zm').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('RNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('pt-as0aepqm').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).contains('bs-m623h3mrgg').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).contains('Peripheral Whole Blood').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(9).contains('bs-ag3azt3gmq').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('28').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('years').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('139').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('days').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(11).contains('HTP0577A_PAXgeneWholeBloodRNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(12).contains('0.08').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(13).contains('mL').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(14).contains('Yes').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(15).contains('Qiagen PAXgene Blood RNA Kit').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(16).contains('-80C Freezer').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(17).contains(/\d{1}/).should('exist');
  });
});
