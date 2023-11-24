/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click();
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').click({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').its('length').should('eq', 2);

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
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,332$/).should('exist');
  });

  it('Study Code - DS-NEXUS', () => {
    cy.checkValueFacetAndApply('Study Code', 'DS-NEXUS');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-NEXUS').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^41$/).should('exist');
  });

  it('Down Syndrome Status - T21 [SJIP-553]', () => {
    cy.get('[data-cy="FilterContainer_Down Syndrome Status"]').should('exist');
    cy.checkValueFacetAndApply('Down Syndrome Status', 'T21');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Down Syndrome Status').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^T21$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,401$/).should('exist');
  });

  it('Down Syndrome Status - D21 [SJIP-553]', () => {
    cy.checkValueFacetAndApply('Down Syndrome Status', 'D21');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Down Syndrome Status').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^D21$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,521$/).should('exist');
  });

  it('Diagnosis (MONDO)', () => {
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    // TODO Filtrer
  });

  it('Phenotype (HPO)', () => {
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(1).contains('Phenotype (HPO)').should('exist');
    // TODO Filtrer
  });

  it('Family Unit - Proband-only', () => {
    cy.get('[data-cy="FilterContainer_Family Unit"]').should('exist');
    cy.checkValueFacetAndApply('Family Unit', 'proband-only');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Family Unit').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Proband-only').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,724$/).should('exist');
  });

  it('Family Unit - Trio+', () => {
    cy.checkValueFacetAndApply('Family Unit', 'trio+');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Family Unit').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Trio+').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^103$/).should('exist');
  });

  it('Sex - Female', () => {
    cy.get('[data-cy="FilterContainer_Sex"]').should('exist');
    cy.checkValueFacetAndApply('Sex', 'female');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sex').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Female').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,512$/).should('exist');
  });

  it('Sex - Male', () => {
    cy.checkValueFacetAndApply('Sex', 'male');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sex').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^Male$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,406$/).should('exist');
  });

  it('Race - White', () => {
    cy.get('[data-cy="FilterContainer_Race"]').should('exist');
    cy.checkValueFacetAndApply('Race', 'White');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Race').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('White').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,778$/).should('exist');
  });

  it('Race - American Indian or Alaska Native', () => {
    cy.checkValueFacetAndApply('Race', 'American Indian or Alaska Native');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Race').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('American Indian or Alaska Native').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^18$/).should('exist');
  });

  it('Ethnicity - Not Hispanic or Latino', () => {
    cy.get('[data-cy="FilterContainer_Ethnicity"]').should('exist');
    cy.checkValueFacetAndApply('Ethnicity', 'Not Hispanic or Latino');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Ethnicity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Not Hispanic or Latino').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,771$/).should('exist');
  });

  it('Ethnicity - Hispanic or Latino', () => {
    cy.checkValueFacetAndApply('Ethnicity', 'Hispanic or Latino');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Ethnicity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^Hispanic or Latino$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^578$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click();
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

  it('Sample Type - DNA', () => {
    cy.get('[data-cy="FilterContainer_Sample Type"]').should('exist');
    cy.checkValueFacetAndApply('Sample Type', 'DNA');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DNA').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6,647$/).should('exist');
  });

  it('Sample Type - PBMCs', () => {
    cy.checkValueFacetAndApply('Sample Type', 'PBMCs');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PBMCs').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1,279$/).should('exist');
  });

  it('Collection Sample Type - Peripheral Whole Blood', () => {
    cy.get('[data-cy="FilterContainer_Collection Sample Type"]').should('exist');
    cy.checkValueFacetAndApply('Collection Sample Type', 'Peripheral Whole Blood');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Collection Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Peripheral Whole Blood').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^43,612$/).should('exist');
  });

  it('Collection Sample Type - Buffy Coat', () => {
    cy.checkValueFacetAndApply('Collection Sample Type', 'Buffy Coat');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Collection Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Buffy Coat').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('Age At Biospecimen Collection', () => {
    cy.get('[data-cy="FilterContainer_Age At Biospecimen Collection"]').should('exist');
    // TODO Filtrer
  });

  it('Availability - Available', () => {
    cy.get('[data-cy="FilterContainer_Availability"]').should('exist');
    cy.checkValueFacetAndApply('Availability', 'available');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Availability').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Available').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^28,657$/).should('exist');
  });

  it('Availability - Unavailable', () => {
    cy.checkValueFacetAndApply('Availability', 'unavailable');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Availability').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Unavailable').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^15,712$/).should('exist');
  });

  it('Laboratory Procedure - Centrifugation', () => {
    cy.get('[data-cy="FilterContainer_Laboratory Procedure"]').should('exist');
    cy.checkValueFacetAndApply('Laboratory Procedure', 'Centrifugation');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Laboratory Procedure').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Centrifugation').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^21,009$/).should('exist');
  });

  it('Laboratory Procedure - Ficoll', () => {
    cy.checkValueFacetAndApply('Laboratory Procedure', 'FICOLL gradient');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Laboratory Procedure').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FICOLL gradient').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^895$/).should('exist');
  });

  it('Biospecimen Storage - -80C Freezer', () => {
    cy.get('[data-cy="FilterContainer_Biospecimen Storage"]').should('exist');
    cy.checkValueFacetAndApply('Biospecimen Storage', '-80C Freezer');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Biospecimen Storage').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('-80C Freezer').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^28,821$/).should('exist');
  });

  it('Biospecimen Storage - Other', () => {
    cy.checkValueFacetAndApply('Biospecimen Storage', 'Other');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Biospecimen Storage').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Other').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^7,567$/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.get('[data-cy="SidebarMenuItem_Data File"]').click();
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

  it('Access - Controlled', () => {
    cy.get('[data-cy="FilterContainer_Access"]').should('exist');
    cy.checkValueFacetAndApply('Access', 'Controlled');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Controlled').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^13,248$/).should('exist');
  });

  it('Access - Registered', () => {
    cy.checkValueFacetAndApply('Access', 'Registered');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Registered').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^7,387$/).should('exist');
  });

  it('Data Category - Genomics', () => {
    cy.get('[data-cy="FilterContainer_Data Category"]').should('exist');
    cy.checkValueFacetAndApply('Data Category', 'Genomics');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genomics').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^13,975$/).should('exist');
  });

  it('Data Category - Transcriptomics', () => {
    cy.checkValueFacetAndApply('Data Category', 'Transcriptomics');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Transcriptomics').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^5,765$/).should('exist');
  });

  it('Data Type - GVCF', () => {
    cy.get('[data-cy="FilterContainer_Data Type"]').should('exist');
    cy.checkValueFacetAndApply('Data Type', 'gVCF');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GVCF').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,870$/).should('exist');
  });

  it('Data Type - Somatic Copy Number Variations', () => {
    cy.checkValueFacetAndApply('Data Type', 'Somatic Copy Number Variations');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Somatic Copy Number Variations').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^783$/).should('exist');
  });

  it('Experimental Strategy - Whole Genome Sequencing', () => {
    cy.get('[data-cy="FilterContainer_Experimental Strategy"]').should('exist');
    cy.checkValueFacetAndApply('Experimental Strategy', 'Whole Genome Sequencing');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Whole Genome Sequencing').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^13,975$/).should('exist');
  });

  it('Experimental Strategy - RNA-Seq', () => {
    cy.checkValueFacetAndApply('Experimental Strategy', 'RNA-Seq');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RNA-Seq').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^5,765$/).should('exist');
  });

  it('File Format - gVCF [SJIP-553]', () => {
    cy.get('[data-cy="FilterContainer_File Format"]').should('exist');
    cy.checkValueFacetAndApply('File Format', 'gvcf');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GVCF').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3,874$/).should('exist');
  });

  it('File Format - png [SJIP-553]', () => {
    cy.checkValueFacetAndApply('File Format', 'png');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('png').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^207$/).should('exist');
  });
});
