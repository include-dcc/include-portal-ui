/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des études - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitStudiesPage();
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Program - INCLUDE', () => {
    cy.validateFacetFilter('Program', 'INCLUDE', 'INCLUDE', /\d{1} Result/, false);
    cy.validateFacetRank(0, 'Program');
  });

  it('Domain - Hematologic Diseases', () => {
    cy.validateFacetFilter('Domain', 'Hematologic Diseases', 'Hematologic Diseases', /\d{1} Result/, false);
    cy.validateFacetRank(1, 'Domain');
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /\d{1} Result/, false);
    cy.validateFacetRank(2, 'Data Category');
  });

  it('Participant Lifespan Stage - Pediatric', () => {
    cy.validateFacetFilter('Participant Lifespan Stage', 'Pediatric', 'Pediatric', /\d{1} Result/, false);
    cy.validateFacetRank(3, 'Participant Lifespan Stage');
  });

  it('Family Data - False', () => {
    cy.get('[aria-expanded="true"] [data-cy="FilterContainer_Family Data"]').should('exist');
    cy.wait(1000);
    cy.clickAndIntercept('input[type="radio"][value="false"]', 'POST', '**/graphql', 15, 0);
    cy.validateTableResultsCount(/\d{1} Result/);
    cy.validateFacetRank(4, 'Family Data');
  });

  it('Data Source - Medical Record', () => {
    cy.validateFacetFilter('Data Source', 'Medical Record', 'Medical Record', /\d{1} Result/, false);
    cy.validateFacetRank(5, 'Data Source');
  });

  it('Design - Longitudinal [SJIP-849]', () => {
    cy.validateFacetFilter('Design', 'Longitudinal', 'Longitudinal', /\d{1} Result/, false);
    cy.validateFacetRank(6, 'Design');
  });

  it('Harmonized Data - True', () => {
    cy.get('[aria-expanded="true"] [data-cy="FilterContainer_Harmonized Data"]').should('exist');
    cy.wait(1000);
    cy.clickAndIntercept('input[type="radio"][value="true"]', 'POST', '**/graphql', 15, 1);
    cy.validateTableResultsCount(/\d{1} Result/);
    cy.validateFacetRank(7, 'Harmonized Data');
  });

  it('Access - Registered', () => {
    cy.validateFacetFilter('Access', 'Registered', 'Registered', /\d{1} Result/, false);
    cy.validateFacetRank(8, 'Access');
  });
});
