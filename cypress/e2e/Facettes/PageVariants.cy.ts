/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="1"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Study Code - DS360-CHD', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Study Code').should('exist');
    cy.checkValueFacetAndApply(0, 'DS360-CHD');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^441,546$/).should('exist');
  });

  it('Study Code - DS-PCGC', () => {
    cy.checkValueFacetAndApply(0, 'DS-PCGC');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-PCGC').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^251,345$/).should('exist');
  });
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="2"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Variant Type - SNV', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Variant Type').should('exist');
    cy.checkValueFacetAndApply(0, 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^515,337$/).should('exist');
  });

  it('Variant Type - Indel', () => {
    cy.checkValueFacetAndApply(0, 'Indel');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Indel').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,477$/).should('exist');
  });

  it('Consequence - Intron', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Consequence').should('exist');
    cy.checkValueFacetAndApply(1, 'Intron');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intron').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^239,729$/).should('exist');
  });

  it('Consequence - Missense', () => {
    cy.checkValueFacetAndApply(1, 'Missense');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Missense').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4,455$/).should('exist');
  });

  it('Variant External Reference - DBSNP [SJIP-601]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Variant External Reference').should('exist');
    cy.checkValueFacetAndApply(2, 'DBSNP');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DBSNP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^463,991$/).should('exist');
  });

  it('Variant External Reference - ClinVar [SJIP-601]', () => {
    cy.checkValueFacetAndApply(2, 'ClinVar');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('ClinVar').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,871$/).should('exist');
  });

  it('Chromosome - 1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Chromosome').should('exist');
    cy.checkValueFacetAndApply(3, /^1$/);
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^1$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^644,139$/).should('exist');
  });

  // Pas de données
  it.skip('Chromosome - 20', () => {
    cy.checkValueFacetAndApply(3, '20');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('20').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Position', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('Position').should('exist');
    // TODO Filtrer
  });

  it('Zygosity - Heterozygote', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('Zygosity').should('exist');
    cy.checkValueFacetAndApply(5, 'Heterozygote');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Heterozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^635,234$/).should('exist');
  });

  it('Zygosity - Homozygote', () => {
    cy.checkValueFacetAndApply(5, 'Homozygote');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Homozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^142,800$/).should('exist');
  });

  it('Transmission - Autosomal Recessive', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('Transmission').should('exist');
    cy.checkValueFacetAndApply(6, 'Autosomal Recessive');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Recessive').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^74,072$/).should('exist');
  });

  it('Transmission - Autosomal Dominant De Novo', () => {
    cy.checkValueFacetAndApply(6, 'Autosomal Dominant De Novo');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Dominant De Novo').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^48,472$/).should('exist');
  });
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="3"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Gene Type - Protein Coding [SJIP-601]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Gene Type').should('exist');
    cy.checkValueFacetAndApply(0, 'Protein Coding');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Protein Coding').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^262,588$/).should('exist');
  });

  it('Gene Type - SnoRNA', () => {
    cy.checkValueFacetAndApply(0, 'SnoRNA');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SnoRNA').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^371$/).should('exist');
  });

  it('Gene External Reference - OMIM', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Gene External Reference').should('exist');
    cy.checkValueFacetAndApply(1, 'OMIM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('OMIM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^77,148$/).should('exist');
  });

  it('Gene External Reference - Orphanet', () => {
    cy.checkValueFacetAndApply(1, 'Orphanet');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Orphanet').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^77,699$/).should('exist');
  });

  it('gnomAD pLI', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('gnomAD pLI').should('exist');
    // TODO Filtrer
  });

  it('gnomAD LOEUF', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('gnomAD LOEUF').should('exist');
    // TODO Filtrer
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('HPO').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(4, 'Autosomal recessive inheritance (HP:0000007)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal recessive inheritance (HP:0000007)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^47,253$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Infantile onset (HP:0003593)', () => {
    cy.checkValueFacetAndApply(4, 'Infantile onset (HP:0003593)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Infantile onset (HP:0003593)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^27.1K$/).should('exist');
  });

  it('ORPHANET - Retinitis pigmentosa', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('ORPHANET').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(5, 'Retinitis pigmentosa');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Retinitis pigmentosa').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,816$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Familial isolated dilated cardiomyopathy', () => {
    cy.checkValueFacetAndApply(5, 'Familial isolated dilated cardiomyopathy');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Familial isolated dilated cardiomyopathy').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,976$/).should('exist');
  });

  // Fait planter Cypress
  it('OMIM - Spinocerebellar ataxia 37', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('OMIM').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(6, 'Spinocerebellar ataxia 37');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Spinocerebellar ataxia 37').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,006$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - 5-fluorouracil toxicity', () => {
    cy.checkValueFacetAndApply(6, '5-fluorouracil toxicity');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('5-fluorouracil toxicity').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,617$/).should('exist');
  });

  it('DDD - CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('DDD').should('exist');
    cy.checkValueFacetAndApply(7, 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,330$/).should('exist');
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.checkValueFacetAndApply(7, 'Macrocephaly with intellectual disability');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Macrocephaly with intellectual disability').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,273$/).should('exist');
  });

  it('COSMIC - Paraganglioma', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(8).contains('COSMIC').should('exist');
    cy.checkValueFacetAndApply(8, 'Paraganglioma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Paraganglioma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^267$/).should('exist');
  });

  it('COSMIC - Colorectal', () => {
    cy.checkValueFacetAndApply(8, 'Colorectal');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Colorectal').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^54$/).should('exist');
  });
});

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="4"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('ClinVar').should('exist');
    cy.checkValueFacetAndApply(0, 'Likely Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^872$/).should('exist');
  });

  it('ClinVar - Likely Pathogenic', () => {
    cy.checkValueFacetAndApply(0, 'Likely Pathogenic');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Pathogenic').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8$/).should('exist');
  });

  it('VEP - MODIFIER', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('VEP').should('exist');
    cy.checkValueFacetAndApply(1, 'MODIFIER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('MODIFIER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^563,410$/).should('exist');
  });

  it('VEP - HIGH', () => {
    cy.checkValueFacetAndApply(1, 'HIGH');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HIGH').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^441$/).should('exist');
  });

  it('CADD', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('CADD').should('exist');
    // TODO Filtrer
  });

  it('CADD (Phred)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('CADD (Phred)').should('exist');
    // TODO Filtrer
  });

  it('DANN', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('DANN').should('exist');
    // TODO Filtrer
  });

  it('FATHMM - Tolerated', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('FATHMM').should('exist');
    cy.checkValueFacetAndApply(5, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,193$/).should('exist');
  });

  it('FATHMM - Damaging', () => {
    cy.checkValueFacetAndApply(5, 'Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^618$/).should('exist');
  });

  it('LRT - Neutral', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('LRT').should('exist');
    cy.checkValueFacetAndApply(6, 'Neutral');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neutral').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,493$/).should('exist');
  });

  it('LRT - Deleterious', () => {
    cy.checkValueFacetAndApply(6, 'Deleterious');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^802$/).should('exist');
  });

  it('PolyPhen2 HVAR - Benign [SJIP-601]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('PolyPhen2 HVAR').should('exist');
    cy.checkValueFacetAndApply(7, 'Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,778$/).should('exist');
  });

  it('PolyPhen2 HVAR - Possibily Damaging [SJIP-601]', () => {
    cy.checkValueFacetAndApply(7, 'Possibily Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Possibily Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^443$/).should('exist');
  });

  it('REVEL', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(8).contains('REVEL').should('exist');
    // TODO Filtrer
  });

  it('SpliceAI', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(9).contains('SpliceAI').should('exist');
    // TODO Filtrer
  });

  it('SIFT - Tolerated', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(10).contains('SIFT').should('exist');
    cy.checkValueFacetAndApply(10, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,786$/).should('exist');
  });

  it('SIFT - Damaging', () => {
    cy.checkValueFacetAndApply(10, 'Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,265$/).should('exist');
  });
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="5"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('INCLUDE Allele Frequency', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('INCLUDE Allele Frequency').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 2.1.1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('gnomAD Genome 2.1.1').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('gnomAD Genome 3.1.2').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Exome 2.1.1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('gnomAD Exome 2.1.1').should('exist');
    // TODO Filtrer
  });

  it('TopMed', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('TopMed').should('exist');
    // TODO Filtrer
  });

  it('1000 Genomes', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('1000 Genomes').should('exist');
    // TODO Filtrer
  });
});