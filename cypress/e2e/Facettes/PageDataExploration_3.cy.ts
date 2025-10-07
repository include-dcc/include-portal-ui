/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles');
  cy.get('[data-cy="SidebarMenuItem_Data File"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by File ID - HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by File ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'htp.htp0577a_frrb192320222-1a_HWHKMDSXX_L1_2.fq.gz', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz').should('exist'); //data-cy="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 2.fq.gz').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz"
  });

  it('Access - Controlled', () => {
    cy.validateFacetFilter('Access', 'Controlled', 'Controlled', /\d{1}/);
    cy.validateFacetRank(0, 'Access');
  });

  it('Dataset - HTP Whole Blood RNAseq (2020)', () => {
    cy.validateFacetFilter('Dataset', 'HTP Whole Blood RNAseq (2020)', 'HTP Whole Blood RNAseq (2020)', /\d{1}/);
    cy.validateFacetRank(1, 'Dataset');
  });

  it('Data Category - Genomics [SJIP-1450]', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /\d{1}/);
    cy.validateFacetRank(2, 'Data Category');
  });

  it('Data Type - GVCF', () => {
    cy.validateFacetFilter('Data Type', 'GVCF', 'gVCF', /\d{1}/);
    cy.validateFacetRank(3, 'Data Type');
  });

  it('Experimental Strategy - Whole Genome Sequencing', () => {
    cy.validateFacetFilter('Experimental Strategy', 'Whole Genome Sequencing', 'Whole Genome Sequencing', /\d{1}/);
    cy.validateFacetRank(4, 'Experimental Strategy');
  });

  it('File Format - gVCF [SJIP-553]', () => {
    cy.validateFacetFilter('File Format', 'GVCF', 'gvcf', /\d{1}/);
    cy.validateFacetRank(5, 'File Format');
  });

  it('ACL - Open Access', () => {
    cy.validateFacetFilter('ACL', 'Open Access', 'open_access', /\d{1}/);
    cy.validateFacetRank(6, 'ACL');
  });
});
