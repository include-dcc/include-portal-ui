/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Frequency"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('INCLUDE Allele Frequency', () => {
    cy.validateFacetNumFilter('Max', 'INCLUDE Allele Frequency', '0.01', /^508,593$/);
    cy.validateFacetRank(0, 'INCLUDE Allele Frequency');
  });

  it('gnomAD Genome 2.1.1', () => {
    cy.validateFacetNumFilter('Max', 'gnomAD Genome 2.1.1', '0.01', /^237,252$/);
    cy.validateFacetRank(1, 'gnomAD Genome 2.1.1');
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.validateFacetNumFilter('Max', 'gnomAD Genome 3.1.2', '0.01', /^332,929$/);
    cy.validateFacetRank(2, 'gnomAD Genome 3.1.2');
  });

  it('gnomAD Exome 2.1.1', () => {
    cy.validateFacetNumFilter('Max', 'gnomAD Exome 2.1.1', '0.01', /^7,524$/);
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('TopMed', () => {
    cy.validateFacetNumFilter('Max', 'TopMed', '0.01', /^314,723$/);
    cy.validateFacetRank(4, 'TopMed');
  });

  it('1000 Genomes', () => {
    cy.validateFacetNumFilter('Max', '1000 Genomes', '0.01', /^1,241$/);
    cy.validateFacetRank(5, '1000 Genomes');
  });
});
