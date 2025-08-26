/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Gene"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });
  
  it('Search by gene symbol - PRDX1 [SJIP-707]', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by gene').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter a Gene Symbol, Gene Alias or Ensemble ID').should('exist');

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'prdx1', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Genes Symbol').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^61$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_PRDX1"
  });
  
  it('Search by gene alias - NKEFA', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'nkefa', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Genes Symbol').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^61$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_PRDX1"
  });
  
  it('Search by Ensembl ID - ENSG00000117450', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'ensg00000117450', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('PRDX1').should('exist'); //data-cy="Tag_PRDX1"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Genes Symbol').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^61$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_PRDX1"
  });

  it('Gene Type - Protein Coding', () => {
    cy.validateFacetFilter('Gene Type', 'Protein Coding', 'protein_coding', /^262,588$/);
    cy.validateFacetRank(0, 'Gene Type');
  });

  it('Gene External Reference - OMIM', () => {
    cy.validateFacetFilter('Gene External Reference', 'OMIM', 'OMIM', /^77,148$/);
    cy.validateFacetRank(1, 'Gene External Reference');
  });

  it('gnomAD pLI', () => {
    cy.validateFacetNumFilter('Min', 'gnomAD pLI', '0.01', /^129,754$/);
    cy.validateFacetRank(2, 'gnomAD pLI');
  });

  it('gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('Max', 'gnomAD LOEUF', '0.05', /^190$/);
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    cy.validateFacetRank(4, 'HPO');
    /* Fait planter Cypress
    cy.validateFacetFilter('HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^47,253$/);
    */
  });

  it('ORPHANET - Retinitis pigmentosa', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    cy.validateFacetRank(5, 'ORPHANET');
    /* Fait planter Cypress
    cy.validateFacetFilter('ORPHANET', 'Retinitis pigmentosa', 'Retinitis pigmentosa', /^2,816$/);
    */
  });

  it('OMIM - Spinocerebellar ataxia 37', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    cy.validateFacetRank(6, 'OMIM');
    /* Fait planter Cypress
    cy.validateFacetFilter('OMIM', 'Spinocerebellar ataxia 37', 'Spinocerebellar ataxia 37', /^3,006$/);
    */
  });

  it('DDD - CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', () => {
    cy.validateFacetFilter('DDD', 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', /^2,330$/);
    cy.validateFacetRank(7, 'DDD');
  });

  it('COSMIC - Paraganglioma', () => {
    cy.validateFacetFilter('COSMIC', 'Paraganglioma', 'paraganglioma', /^267$/);
    cy.validateFacetRank(8, 'COSMIC');
  });
});
