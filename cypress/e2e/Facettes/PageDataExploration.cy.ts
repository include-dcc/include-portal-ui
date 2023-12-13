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
    cy.validateFacetFilter('Study Code', 'DS360-CHD', 'DS360-CHD', /^1,332$/);
    cy.validateFacetRank(0, 'Study Code');
  });

  it('Study Code - DS-NEXUS', () => {
    cy.validateFacetFilter('Study Code', 'DS-NEXUS', 'DS-NEXUS', /^41$/);
  });

  it('Down Syndrome Status - T21 [SJIP-553]', () => {
    cy.validateFacetFilter('Down Syndrome Status', 'T21', 'T21', /^3,401$/);
    cy.validateFacetRank(1, 'Down Syndrome Status');
  });

  it('Down Syndrome Status - D21 [SJIP-553]', () => {
    cy.validateFacetFilter('Down Syndrome Status', 'D21', 'D21', /^1,521$/);
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
    cy.validateFacetFilter('Family Unit', 'Proband-only', 'proband-only', /^2,724$/);
    cy.validateFacetRank(2, 'Family Unit');
  });

  it('Family Unit - Trio+', () => {
    cy.validateFacetFilter('Family Unit', 'Trio+', 'trio+', /^103$/);
  });

  it('Sex - Female', () => {
    cy.validateFacetFilter('Sex', 'Female', 'female', /^2,512$/);
    cy.validateFacetRank(3, 'Sex');
  });

  it('Sex - Male', () => {
    cy.validateFacetFilter('Sex', 'Male', 'male', /^2,406$/);
  });

  it('Race - White', () => {
    cy.validateFacetFilter('Race', 'White', 'White', /^3,778$/);
    cy.validateFacetRank(4, 'Race');
  });

  it('Race - American Indian or Alaska Native', () => {
    cy.validateFacetFilter('Race', 'American Indian or Alaska Native', 'American Indian or Alaska Native', /^18$/);
  });

  it('Ethnicity - Not Hispanic or Latino', () => {
    cy.validateFacetFilter('Ethnicity', 'Not Hispanic or Latino', 'Not Hispanic or Latino', /^3,771$/);
    cy.validateFacetRank(5, 'Ethnicity');
  });

  it('Ethnicity - Hispanic or Latino', () => {
    cy.validateFacetFilter('Ethnicity', 'Hispanic or Latino', 'Hispanic or Latino', /^578$/);
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
    cy.validateFacetFilter('Sample Type', 'DNA', 'DNA', /^6,647$/);
    cy.validateFacetRank(0, 'Sample Type');
  });

  it('Sample Type - PBMCs', () => {
    cy.validateFacetFilter('Sample Type', 'PBMCs', 'PBMCs', /^1,279$/);
  });

  it('Collection Sample Type - Peripheral Whole Blood', () => {
    cy.validateFacetFilter('Collection Sample Type', 'Peripheral Whole Blood', 'Peripheral Whole Blood', /^43,612$/);
    cy.validateFacetRank(1, 'Collection Sample Type');
  });

  it('Collection Sample Type - Buffy Coat', () => {
    cy.validateFacetFilter('Collection Sample Type', 'Buffy Coat', 'Buffy Coat', /^4$/);
  });

  it('Age At Biospecimen Collection [SJIP-601]', () => {
    cy.validateFacetNumFilter('Age At Biospecimen Collection', '0.01', '436');
    cy.validateFacetRank(2, 'Age At Biospecimen Collection');
  });

  it('Availability - Available', () => {
    cy.validateFacetFilter('Availability', 'Available', 'available', /^28,657$/);
    cy.validateFacetRank(3, 'Availability');
  });

  it('Availability - Unavailable', () => {
    cy.validateFacetFilter('Availability', 'Unavailable', 'unavailable', /^15,712$/);
  });

  it('Laboratory Procedure - Centrifugation', () => {
    cy.validateFacetFilter('Laboratory Procedure', 'Centrifugation', 'Centrifugation', /^21,009$/);
    cy.validateFacetRank(4, 'Laboratory Procedure');
  });

  it('Laboratory Procedure - Ficoll', () => {
    cy.validateFacetFilter('Laboratory Procedure', 'FICOLL gradient', 'FICOLL gradient', /^895$/);
  });

  it('Biospecimen Storage - -80C Freezer', () => {
    cy.validateFacetFilter('Biospecimen Storage', '-80C Freezer', '-80C Freezer', /^28,821$/);
    cy.validateFacetRank(5, 'Biospecimen Storage');
  });

  it('Biospecimen Storage - Other', () => {
    cy.validateFacetFilter('Biospecimen Storage', 'Other', 'Other', /^7,567$/);
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
    cy.validateFacetFilter('Access', 'Controlled', 'Controlled', /^13,248$/);
    cy.validateFacetRank(0, 'Access');
  });

  it('Access - Registered', () => {
    cy.validateFacetFilter('Access', 'Registered', 'Registered', /^7,387$/);
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /^13,975$/);
    cy.validateFacetRank(1, 'Data Category');
  });

  it('Data Category - Transcriptomics', () => {
    cy.validateFacetFilter('Data Category', 'Transcriptomics', 'Transcriptomics', /^5,765$/);
  });

  it('Data Type - GVCF', () => {
    cy.validateFacetFilter('Data Type', 'GVCF', 'gVCF', /^3,870$/);
    cy.validateFacetRank(2, 'Data Type');
  });

  it('Data Type - Somatic Copy Number Variations', () => {
    cy.validateFacetFilter('Data Type', 'Somatic Copy Number Variations', 'Somatic Copy Number Variations', /^783$/);
  });

  it('Experimental Strategy - Whole Genome Sequencing', () => {
    cy.validateFacetFilter('Experimental Strategy', 'Whole Genome Sequencing', 'Whole Genome Sequencing', /^13,975$/);
    cy.validateFacetRank(3, 'Experimental Strategy');
  });

  it('Experimental Strategy - RNA-Seq', () => {
    cy.validateFacetFilter('Experimental Strategy', 'RNA-Seq', 'RNA-Seq', /^5,765$/);
  });

  it('File Format - gVCF [SJIP-553]', () => {
    cy.validateFacetFilter('File Format', 'GVCF', 'gvcf', /^3,874$/);
    cy.validateFacetRank(4, 'File Format');
  });

  it('File Format - png [SJIP-553]', () => {
    cy.validateFacetFilter('File Format', 'png', 'png', /^207$/);
  });
});
