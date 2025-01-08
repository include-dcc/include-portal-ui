/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Study Code - DS360-CHD', () => {
    cy.validateFacetFilter('Study Code', 'DS360-CHD', 'DS360-CHD', /^441,546$/);
    cy.validateFacetRank(0, 'Study Code');
  });
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });
  
  it('Search by variant locus - 1-108192590-T-C [SJIP-705]', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by variant').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, ClinVar ID, Ensembl ID, refseq ID').should('exist');

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', '1-108192590-t-c', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-108192590-T-C').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('1-108192590-T-C').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-108192590-T-C').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by gene symbol - PRDX1 [SJIP-705]', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'prdx1', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by gene alias - NKEFA [SJIP-844]', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'nkefa', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by gene AA change - p.Tyr11Cys [SJIP-845]', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'p.tyr11cys', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-108192590-T-C').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('1-108192590-T-C').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-108192590-T-C').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by dbSNP ID - rs79735952 [SJIP-845]', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'RS79735952', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-108192590-T-C').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('1-108192590-T-C').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-108192590-T-C').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by ClinVar ID - 1267873 [SJIP-845]', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', '1267873', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-108192590-T-C').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('1-108192590-T-C').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-108192590-T-C').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });
  
  it('Search by Ensembl ID - ENST00000370041', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'enst00000370041', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Search by refseq ID - NM_013386', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'nm_013386', 'POST', '* /grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('exist'); //data-cy="Tag_1-108192590-T-C"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_1-108192590-T-C"
  });

  it('Variant Type - SNV', () => {
    cy.validateFacetFilter('Variant Type', 'SNV', 'SNV', /^515,337$/);
    cy.validateFacetRank(0, 'Variant Type');
  });

  it('Consequence - Intron', () => {
    cy.validateFacetFilter('Consequence', 'Intron', 'intron', /^239,729$/);
    cy.validateFacetRank(1, 'Consequence');
  });

  it('Consequence - Missense', () => {
    cy.validateFacetFilter('Consequence', 'Missense', 'missense', /^4,455$/);
  });

  it('Variant External Reference - DBSNP [SJIP-601]', () => {
    cy.validateFacetFilter('Variant External Reference', 'DBSNP', 'DBSNP', /^463,991$/);
    cy.validateFacetRank(2, 'Variant External Reference');
  });

  it('Chromosome - 1', () => {
    cy.validateFacetFilter('Chromosome', '1', '1', /^644,139$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Position', () => {
    cy.validateFacetNumFilter('MinMax', 'Position', '108192590', /^1$/);
    cy.validateFacetRank(4, 'Position');
  });

  it('Zygosity - Heterozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Heterozygote', 'HET', /^635,234$/);
    cy.validateFacetRank(5, 'Zygosity');
  });

  it('Transmission - Autosomal Recessive', () => {
    cy.validateFacetFilter('Transmission', 'Autosomal Recessive', 'autosomal_recessive', /^74,072$/);
    cy.validateFacetRank(6, 'Transmission');
  });
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

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

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'prdx1', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
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
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'nkefa', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
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
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'ensg00000117450', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
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

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Pathogenicity"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.validateFacetFilter('ClinVar', 'Likely Benign', 'Likely_benign', /^872$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('VEP - MODIFIER', () => {
    cy.validateFacetFilter('VEP', 'MODIFIER', 'MODIFIER', /^563,410$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('CADD (Raw)', () => {
    cy.validateFacetNumFilter('Min', 'CADD (Raw)', '0.01', /^3,763$/);
    cy.validateFacetRank(2, 'CADD (Raw)');
  });

  it('CADD (Phred)', () => {
    cy.validateFacetNumFilter('Min', 'CADD (Phred)', '0.01', /^4,303$/);
    cy.validateFacetRank(3, 'CADD (Phred)');
  });

  it('DANN', () => {
    cy.validateFacetNumFilter('Min', 'DANN', '0.1', /^4,269$/);
    cy.validateFacetRank(4, 'DANN');
  });

  it('FATHMM - Tolerated', () => {
    cy.validateFacetFilter('FATHMM', 'Tolerated', 'T', /^3,193$/);
    cy.validateFacetRank(5, 'FATHMM');
  });

  it('LRT - Neutral', () => {
    cy.validateFacetFilter('LRT', 'Neutral', 'N', /^2,493$/);
    cy.validateFacetRank(6, 'LRT');
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.validateFacetFilter('PolyPhen-2 HVAR', 'Benign', 'B', /^2,778$/);
    cy.validateFacetRank(7, 'PolyPhen-2 HVAR');
  });

  it('REVEL', () => {
    cy.validateFacetNumFilter('Min', 'REVEL', '0.01', /^3,755$/);
    cy.validateFacetRank(8, 'REVEL');
  });

  it('SpliceAI', () => {
    cy.validateFacetNumFilter('Min', 'SpliceAI', '0.01', /^12,708$/);
    cy.validateFacetRank(9, 'SpliceAI');
  });

  it('SIFT - Tolerated', () => {
    cy.validateFacetFilter('SIFT', 'Tolerated', 'T', /^2,786$/);
    cy.validateFacetRank(10, 'SIFT');
  });
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Frequency"]').clickAndWait({force: true});
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

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