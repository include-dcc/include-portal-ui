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
    cy.validateFacetFilter('Study Code', 'DS360-CHD', 'DS360-CHD', /^441,546$/);
    cy.validateFacetRank(0, 'Study Code');
  });

  it('Study Code - DS-PCGC', () => {
    cy.validateFacetFilter('Study Code', 'DS-PCGC', 'DS-PCGC', /^251,345$/);
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
    cy.validateFacetFilter('Variant Type', 'SNV', 'SNV', /^515,337$/);
    cy.validateFacetRank(0, 'Variant Type');
  });

  it('Variant Type - Indel', () => {
    cy.validateFacetFilter('Variant Type', 'Indel', 'indel', /^3,477$/);
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

  it('Variant External Reference - ClinVar [SJIP-601]', () => {
    cy.validateFacetFilter('Variant External Reference', 'ClinVar', 'ClinVar', /^2,871$/);
  });

  it('Chromosome - 1', () => {
    cy.validateFacetFilter('Chromosome', '1', '1', /^644,139$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  // Pas de données
  it.skip('Chromosome - 20', () => {
    cy.validateFacetFilter('Chromosome', '20', '20', /^500$/);
  });

  it('Position', () => {
    cy.validateFacetNumFilter('Position', '100000', '421');
    cy.validateFacetRank(4, 'Position');
  });

  it('Zygosity - Heterozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Heterozygote', 'HET', /^635,234$/);
    cy.validateFacetRank(5, 'Zygosity');
  });

  it('Zygosity - Homozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Homozygote', 'HOM', /^142,800$/);
  });

  it('Transmission - Autosomal Recessive', () => {
    cy.validateFacetFilter('Transmission', 'Autosomal Recessive', 'autosomal_recessive', /^74,072$/);
    cy.validateFacetRank(6, 'Transmission');
  });

  it('Transmission - Autosomal Dominant De Novo', () => {
    cy.validateFacetFilter('Transmission', 'Autosomal Dominant De Novo', 'autosomal_dominant_de_novo', /^48,472$/);
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
    cy.validateFacetFilter('Gene Type', 'Protein Coding', 'protein_coding', /^262,588$/);
    cy.validateFacetRank(0, 'Gene Type');
  });

  it('Gene Type - SnoRNA [SJIP-601]', () => {
    cy.validateFacetFilter('Gene Type', 'SnoRNA', 'snoRNA', /^371$/);
  });

  it('Gene External Reference - OMIM', () => {
    cy.validateFacetFilter('Gene External Reference', 'OMIM', 'OMIM', /^77,148$/);
    cy.validateFacetRank(1, 'Gene External Reference');
  });

  it('Gene External Reference - Orphanet', () => {
    cy.validateFacetFilter('Gene External Reference', 'Orphanet', 'Orphanet', /^77,699$/);
  });

  it('gnomAD pLI', () => {
    cy.validateFacetNumFilter('gnomAD pLI', '0.01', '123,907');
    cy.validateFacetRank(2, 'gnomAD pLI');
  });

  it('gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('gnomAD LOEUF', '0.05', '190');
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    cy.validateFacetRank(4, 'HPO');
    /* Fait planter Cypress
    cy.validateFacetFilter('HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^47,253$/);
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Infantile onset (HP:0003593)', () => {
    cy.validateFacetFilter('HPO', 'Infantile onset (HP:0003593)', 'Infantile onset (HP:0003593)', /^27.1K$/);
  });

  it('ORPHANET - Retinitis pigmentosa', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    cy.validateFacetRank(5, 'ORPHANET');
    /* Fait planter Cypress
    cy.validateFacetFilter('ORPHANET', 'Retinitis pigmentosa', 'Retinitis pigmentosa', /^2,816$/);
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Familial isolated dilated cardiomyopathy', () => {
    cy.validateFacetFilter('ORPHANET', 'Familial isolated dilated cardiomyopathy', 'Familial isolated dilated cardiomyopathy', /^1,976$/);
  });

  // Fait planter Cypress
  it('OMIM - Spinocerebellar ataxia 37', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    cy.validateFacetRank(6, 'OMIM');
    /* Fait planter Cypress
    cy.validateFacetFilter('OMIM', 'Spinocerebellar ataxia 37', 'Spinocerebellar ataxia 37', /^3,006$/);
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - 5-fluorouracil toxicity', () => {
    cy.validateFacetFilter('OMIM', '5-fluorouracil toxicity', '5-fluorouracil toxicity', /^1,617$/);
  });

  it('DDD - CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', () => {
    cy.validateFacetFilter('DDD', 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', /^2,330$/);
    cy.validateFacetRank(7, 'DDD');
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.validateFacetFilter('DDD', 'Macrocephaly with intellectual disability', 'Macrocephaly with intellectual disability', /^1,273$/);
  });

  it('COSMIC - Paraganglioma', () => {
    cy.validateFacetFilter('COSMIC', 'Paraganglioma', 'paraganglioma', /^267$/);
    cy.validateFacetRank(8, 'COSMIC');
  });

  it('COSMIC - Colorectal', () => {
    cy.validateFacetFilter('COSMIC', 'Colorectal', 'colorectal', /^54$/);
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
    cy.validateFacetFilter('ClinVar', 'Likely Benign', 'Likely_benign', /^872$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('ClinVar - Likely Pathogenic', () => {
    cy.validateFacetFilter('ClinVar', 'Likely Pathogenic', 'Likely_pathogenic', /^8$/);
  });

  it('VEP - MODIFIER', () => {
    cy.validateFacetFilter('VEP', 'MODIFIER', 'MODIFIER', /^563,410$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('VEP - HIGH', () => {
    cy.validateFacetFilter('VEP', 'HIGH', 'HIGH', /^441$/);
  });

  it('CADD', () => {
    cy.validateFacetNumFilter('CADD', '0.01', '679');
    cy.validateFacetRank(2, 'CADD');
  });

  it('CADD (Phred) [SJIP-601]', () => {
    cy.validateFacetNumFilter('CADD (Phred)', '0.01', '136');
    cy.validateFacetRank(3, 'CADD (Phred)');
  });

  it('DANN', () => {
    cy.validateFacetNumFilter('DANN', '0.1', '24');
    cy.validateFacetRank(4, 'DANN');
  });

  it('FATHMM - Tolerated', () => {
    cy.validateFacetFilter('FATHMM', 'Tolerated', 'T', /^3,193$/);
    cy.validateFacetRank(5, 'FATHMM');
  });

  it('FATHMM - Damaging', () => {
    cy.validateFacetFilter('FATHMM', 'Damaging', 'D', /^618$/);
  });

  it('LRT - Neutral', () => {
    cy.validateFacetFilter('LRT', 'Neutral', 'N', /^2,493$/);
    cy.validateFacetRank(6, 'LRT');
  });

  it('LRT - Deleterious', () => {
    cy.validateFacetFilter('LRT', 'Deleterious', 'D', /^802$/);
  });

  it('PolyPhen2 HVAR - Benign [SJIP-601]', () => {
    cy.validateFacetFilter('PolyPhen2 HVAR', 'Benign', 'B', /^2,778$/);
    cy.validateFacetRank(7, 'PolyPhen2 HVAR');
  });

  it('PolyPhen2 HVAR - Possibily Damaging [SJIP-601]', () => {
    cy.validateFacetFilter('PolyPhen2 HVAR', 'Possibily Damaging', 'P', /^443$/);
  });

  it('REVEL', () => {
    cy.validateFacetNumFilter('REVEL', '0.01', '110');
    cy.validateFacetRank(8, 'REVEL');
  });

  it('SpliceAI', () => {
    cy.validateFacetNumFilter('SpliceAI', '0.01', '158,902');
    cy.validateFacetRank(9, 'SpliceAI');
  });

  it('SIFT - Tolerated', () => {
    cy.validateFacetFilter('SIFT', 'Tolerated', 'T', /^2,786$/);
    cy.validateFacetRank(10, 'SIFT');
  });

  it('SIFT - Damaging', () => {
    cy.validateFacetFilter('SIFT', 'Damaging', 'D', /^1,265$/);
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
    cy.validateFacetNumFilter('INCLUDE Allele Frequency', '0.01', '508,593');
    cy.validateFacetRank(0, 'INCLUDE Allele Frequency');
  });

  it('gnomAD Genome 2.1.1', () => {
    cy.validateFacetNumFilter('gnomAD Genome 2.1.1', '0.01', '237,252');
    cy.validateFacetRank(1, 'gnomAD Genome 2.1.1');
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.validateFacetNumFilter('gnomAD Genome 3.1.2', '0.01', '332,929');
    cy.validateFacetRank(2, 'gnomAD Genome 3.1.2');
  });

  it('gnomAD Exome 2.1.1', () => {
    cy.validateFacetNumFilter('gnomAD Exome 2.1.1', '0.01', '7,524');
    cy.validateFacetRank(3, 'gnomAD Exome 2.1.1');
  });

  it('TopMed', () => {
    cy.validateFacetNumFilter('TopMed', '0.01', '314,723');
    cy.validateFacetRank(4, 'TopMed');
  });

  it('1000 Genomes', () => {
    cy.validateFacetNumFilter('1000 Genomes', '0.01', '1,241');
    cy.validateFacetRank(5, '1000 Genomes');
  });
});