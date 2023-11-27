/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Study Code - DS360-CHD', () => {
    cy.get('[data-cy="FilterContainer_Study Code"]').should('exist');
    cy.checkValueFacetAndApply('Study Code', 'DS360-CHD');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^441,546$/).should('exist');
  });

  it('Study Code - DS-PCGC', () => {
    cy.checkValueFacetAndApply('Study Code', 'DS-PCGC');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-PCGC').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^251,345$/).should('exist');
  });
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Variant Type - SNV', () => {
    cy.get('[data-cy="FilterContainer_Variant Type"]').should('exist');
    cy.checkValueFacetAndApply('Variant Type', 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^515,337$/).should('exist');
  });

  it('Variant Type - Indel', () => {
    cy.checkValueFacetAndApply('Variant Type', 'indel');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Indel').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,477$/).should('exist');
  });

  it('Consequence - Intron', () => {
    cy.get('[data-cy="FilterContainer_Consequence"]').should('exist');
    cy.checkValueFacetAndApply('Consequence', 'intron');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intron').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^239,729$/).should('exist');
  });

  it('Consequence - Missense', () => {
    cy.checkValueFacetAndApply('Consequence', 'missense');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Missense').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4,455$/).should('exist');
  });

  it('Variant External Reference - DBSNP [SJIP-601]', () => {
    cy.get('[data-cy="FilterContainer_Variant External Reference"]').should('exist');
    cy.checkValueFacetAndApply('Variant External Reference', 'DBSNP');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DBSNP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^463,991$/).should('exist');
  });

  it('Variant External Reference - ClinVar [SJIP-601]', () => {
    cy.checkValueFacetAndApply('Variant External Reference', 'Clinvar');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('ClinVar').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,871$/).should('exist');
  });

  it('Chromosome - 1', () => {
    cy.get('[data-cy="FilterContainer_Chromosome"]').should('exist');
    cy.checkValueFacetAndApply('Chromosome', '1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^1$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^644,139$/).should('exist');
  });

  // Pas de données
  it.skip('Chromosome - 20', () => {
    cy.checkValueFacetAndApply('Chromosome', '20');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('20').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Position', () => {
    cy.get('[data-cy="FilterContainer_Position"]').should('exist');
    // TODO Filtrer
  });

  it('Zygosity - Heterozygote', () => {
    cy.get('[data-cy="FilterContainer_Zygosity"]').should('exist');
    cy.checkValueFacetAndApply('Zygosity', 'HET');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Heterozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^635,234$/).should('exist');
  });

  it('Zygosity - Homozygote', () => {
    cy.checkValueFacetAndApply('Zygosity', 'HOM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Homozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^142,800$/).should('exist');
  });

  it('Transmission - Autosomal Recessive', () => {
    cy.get('[data-cy="FilterContainer_Transmission"]').should('exist');
    cy.checkValueFacetAndApply('Transmission', 'autosomal_recessive');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Recessive').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^74,072$/).should('exist');
  });

  it('Transmission - Autosomal Dominant De Novo', () => {
    cy.checkValueFacetAndApply('Transmission', 'autosomal_dominant_de_novo');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Dominant De Novo').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^48,472$/).should('exist');
  });
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Gene Type - Protein Coding [SJIP-601]', () => {
    cy.get('[data-cy="FilterContainer_Gene Type"]').should('exist');
    cy.checkValueFacetAndApply('Gene Type', 'protein_coding');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Protein Coding').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^262,588$/).should('exist');
  });

  it('Gene Type - SnoRNA [SJIP-601]', () => {
    cy.checkValueFacetAndApply('Gene Type', 'snoRNA');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SnoRNA').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^371$/).should('exist');
  });

  it('Gene External Reference - OMIM', () => {
    cy.get('[data-cy="FilterContainer_Gene External Reference"]').should('exist');
    cy.checkValueFacetAndApply('Gene External Reference', 'OMIM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('OMIM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^77,148$/).should('exist');
  });

  it('Gene External Reference - Orphanet', () => {
    cy.checkValueFacetAndApply('Gene External Reference', 'Orphanet');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Orphanet').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^77,699$/).should('exist');
  });

  it('gnomAD pLI', () => {
    cy.get('[data-cy="FilterContainer_gnomAD pLI"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD LOEUF', () => {
    cy.get('[data-cy="FilterContainer_gnomAD LOEUF"]').should('exist');
    // TODO Filtrer
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('HPO, 'Autosomal recessive inheritance (HP:0000007)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal recessive inheritance (HP:0000007)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^47,253$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Infantile onset (HP:0003593)', () => {
    cy.checkValueFacetAndApply('HPO', 'Infantile onset (HP:0003593)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Infantile onset (HP:0003593)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^27.1K$/).should('exist');
  });

  it('ORPHANET - Retinitis pigmentosa', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('ORPHANET, 'Retinitis pigmentosa');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Retinitis pigmentosa').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,816$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Familial isolated dilated cardiomyopathy', () => {
    cy.checkValueFacetAndApply('ORPHANET', 'Familial isolated dilated cardiomyopathy');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Familial isolated dilated cardiomyopathy').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,976$/).should('exist');
  });

  // Fait planter Cypress
  it('OMIM - Spinocerebellar ataxia 37', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('OMIM, 'Spinocerebellar ataxia 37');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Spinocerebellar ataxia 37').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,006$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - 5-fluorouracil toxicity', () => {
    cy.checkValueFacetAndApply('OMIM', '5-fluorouracil toxicity');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('5-fluorouracil toxicity').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,617$/).should('exist');
  });

  it('DDD - CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', () => {
    cy.get('[data-cy="FilterContainer_DDD"]').should('exist');
    cy.checkValueFacetAndApply('DDD', 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,330$/).should('exist');
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.checkValueFacetAndApply('DDD', 'Macrocephaly with intellectual disability');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Macrocephaly with intellectual disability').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,273$/).should('exist');
  });

  it('COSMIC - Paraganglioma', () => {
    cy.get('[data-cy="FilterContainer_COSMIC"]').should('exist');
    cy.checkValueFacetAndApply('COSMIC', 'paraganglioma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Paraganglioma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^267$/).should('exist');
  });

  it('COSMIC - Colorectal', () => {
    cy.checkValueFacetAndApply('COSMIC', 'colorectal');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Colorectal').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^54$/).should('exist');
  });
});

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Pathogenicity"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.get('[data-cy="FilterContainer_ClinVar"]').should('exist');
    cy.checkValueFacetAndApply('ClinVar', 'Likely_benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^872$/).should('exist');
  });

  it('ClinVar - Likely Pathogenic', () => {
    cy.checkValueFacetAndApply('ClinVar', 'Likely_pathogenic');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Pathogenic').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8$/).should('exist');
  });

  it('VEP - MODIFIER', () => {
    cy.get('[data-cy="FilterContainer_VEP"]').should('exist');
    cy.checkValueFacetAndApply('VEP', 'MODIFIER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('MODIFIER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^563,410$/).should('exist');
  });

  it('VEP - HIGH', () => {
    cy.checkValueFacetAndApply('VEP', 'HIGH');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HIGH').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^441$/).should('exist');
  });

  it('CADD', () => {
    cy.get('[data-cy="FilterContainer_CADD"]').should('exist');
    // TODO Filtrer
  });

  it('CADD (Phred)', () => {
    cy.get('[data-cy="FilterContainer_CADD (Phred)"]').should('exist');
    // TODO Filtrer
  });

  it('DANN', () => {
    cy.get('[data-cy="FilterContainer_DANN"]').should('exist');
    // TODO Filtrer
  });

  it('FATHMM - Tolerated', () => {
    cy.get('[data-cy="FilterContainer_FATHMM"]').should('exist');
    cy.checkValueFacetAndApply('FATHMM', 'T');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,193$/).should('exist');
  });

  it('FATHMM - Damaging', () => {
    cy.checkValueFacetAndApply('FATHMM', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^618$/).should('exist');
  });

  it('LRT - Neutral', () => {
    cy.get('[data-cy="FilterContainer_LRT"]').should('exist');
    cy.checkValueFacetAndApply('LRT', 'N');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neutral').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,493$/).should('exist');
  });

  it('LRT - Deleterious', () => {
    cy.checkValueFacetAndApply('LRT', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^802$/).should('exist');
  });

  it('PolyPhen2 HVAR - Benign [SJIP-601]', () => {
    cy.get('[data-cy="FilterContainer_PolyPhen2 HVAR"]').should('exist');
    cy.checkValueFacetAndApply('PolyPhen2 HVAR', 'B');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,778$/).should('exist');
  });

  it('PolyPhen2 HVAR - Possibily Damaging [SJIP-601]', () => {
    cy.checkValueFacetAndApply('PolyPhen2 HVAR', 'P');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Possibily Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^443$/).should('exist');
  });

  it('REVEL', () => {
    cy.get('[data-cy="FilterContainer_REVEL"]').should('exist');
    // TODO Filtrer
  });

  it('SpliceAI', () => {
    cy.get('[data-cy="FilterContainer_SpliceAI"]').should('exist');
    // TODO Filtrer
  });

  it('SIFT - Tolerated', () => {
    cy.get('[data-cy="FilterContainer_SIFT"]').should('exist');
    cy.checkValueFacetAndApply('SIFT', 'T');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,786$/).should('exist');
  });

  it('SIFT - Damaging', () => {
    cy.checkValueFacetAndApply('SIFT', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,265$/).should('exist');
  });
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Frequency"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('INCLUDE Allele Frequency', () => {
    cy.get('[data-cy="FilterContainer_INCLUDE Allele Frequency"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 2.1.1', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Genome 2.1.1"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Genome 3.1.2"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Exome 2.1.1', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Exome 2.1.1"]').should('exist');
    // TODO Filtrer
  });

  it('TopMed', () => {
    cy.get('[data-cy="FilterContainer_TopMed"]').should('exist');
    // TODO Filtrer
  });

  it('1000 Genomes', () => {
    cy.get('[data-cy="FilterContainer_1000 Genomes"]').should('exist');
    // TODO Filtrer
  });
});