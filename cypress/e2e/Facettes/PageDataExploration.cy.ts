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
  
  it('Search by Participant ID - pt-as0aepqm', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Participant ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by Participant ID or External Participant ID').should('exist');

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'pt-as0aepqm', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.wait(1000);
    cy.get('[class*="ant-select-dropdown"]').contains('pt-as0aepqm').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('pt-as0aepqm').should('exist'); //data-cy="Tag_pt-as0aepqm"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_pt-as0aepqm"
  });

  it('Study Code - DS360-CHD', () => {
    cy.validateFacetFilter('Study Code', 'DS360-CHD', 'DS360-CHD', /^1,073$/);
    cy.validateFacetRank(0, 'Study Code');
  });

  it('Down Syndrome Status - T21 [SJIP-553]', () => {
    cy.validateFacetFilter('Down Syndrome Status', 'T21', 'T21', /^6,702$/);
    cy.validateFacetRank(1, 'Down Syndrome Status');
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
    cy.validateFacetFilter('Family Unit', 'Proband-only', 'proband-only', /^2,703$/);
    cy.validateFacetRank(2, 'Family Unit');
  });

  it('Sex - Female', () => {
    cy.validateFacetFilter('Sex', 'Female', 'female', /^2,724$/);
    cy.validateFacetRank(3, 'Sex');
  });

  it('Race - White', () => {
    cy.validateFacetFilter('Race', 'White', 'White', /^4,173$/);
    cy.validateFacetRank(4, 'Race');
  });

  it('Ethnicity - Not Hispanic or Latino', () => {
    cy.validateFacetFilter('Ethnicity', 'Not Hispanic or Latino', 'Not Hispanic or Latino', /^4,180$/);
    cy.validateFacetRank(5, 'Ethnicity');
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

  it('Search by Sample ID - bs-03ynynfs', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Sample ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by Sample ID or External Sample ID').should('exist');

    cy.intercept('POST', '*/grapgql').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('bs-03ynynfs', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait(1000);
    cy.get('[class*="ant-select-dropdown"]').contains('bs-03ynynfs').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('bs-03ynynfs').should('exist'); //data-cy="Tag_bs-03ynynfs"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Bs-03ynynfs').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_bs-03ynynfs"
  });

  it('Search by Collection ID - bs-m623h3mrgg', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Collection ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.intercept('POST', '*/grapgql').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(1).find('input').type('bs-m623h3mrgg', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
    cy.wait(1000);
    cy.get('[class*="ant-select-dropdown"]').contains('bs-m623h3mrgg').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('bs-m623h3mrgg').should('exist'); //data-cy="Tag_bs-m623h3mrgg"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Collection ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Bs-m623h3mrgg').should('exist');
    cy.validateTableResultsCount(/^26$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_bs-m623h3mrgg"
  });

  it('Sample Type - DNA', () => {
    cy.validateFacetFilter('Sample Type', 'DNA', 'DNA', /^5,296$/);
    cy.validateFacetRank(0, 'Sample Type');
  });

  it('Parent Sample Type - Peripheral Whole Blood', () => {
    cy.validateFacetFilter('Parent Sample Type', 'Peripheral Whole Blood', 'Peripheral Whole Blood', /^31,913$/);
    cy.validateFacetRank(1, 'Parent Sample Type');
  });

  it('Collection Sample Type - Peripheral Whole Blood', () => {
    cy.validateFacetFilter('Collection Sample Type', 'Peripheral Whole Blood', 'Peripheral Whole Blood', /^42,457$/);
    cy.validateFacetRank(2, 'Collection Sample Type');
  });

  it('Age at Biospecimen Collection (days)', () => {
    cy.validateFacetNumFilter('Age at Biospecimen Collection (days)', '0.01', /^436$/);
    cy.validateFacetRank(3, 'Age at Biospecimen Collection (days)');
  });

  it('Availability - Available', () => {
    cy.validateFacetFilter('Availability', 'Available', 'available', /^28,657$/);
    cy.validateFacetRank(4, 'Availability');
  });

  it('Laboratory Procedure - Centrifugation', () => {
    cy.validateFacetFilter('Laboratory Procedure', 'Centrifugation', 'Centrifugation', /^21,009$/);
    cy.validateFacetRank(5, 'Laboratory Procedure');
  });

  it('Biospecimen Storage - -80C Freezer', () => {
    cy.validateFacetFilter('Biospecimen Storage', '-80C Freezer', '-80C Freezer', /^28,821$/);
    cy.validateFacetRank(6, 'Biospecimen Storage');
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

  it('Search by File ID - HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by File ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"]', 'HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.wait(1000);
    cy.get('[class*="ant-select-dropdown"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz').should('exist'); //data-cy="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 2.fq.gz').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_2.fq.gz"
  });

  it('Access - Controlled', () => {
    cy.validateFacetFilter('Access', 'Controlled', 'Controlled', /^14,844$/);
    cy.validateFacetRank(0, 'Access');
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /^14,088$/);
    cy.validateFacetRank(1, 'Data Category');
  });

  it('Data Type - GVCF', () => {
    cy.validateFacetFilter('Data Type', 'GVCF', 'gVCF', /^2,960$/);
    cy.validateFacetRank(2, 'Data Type');
  });

  it('Experimental Strategy - Whole Genome Sequencing', () => {
    cy.validateFacetFilter('Experimental Strategy', 'Whole Genome Sequencing', 'Whole Genome Sequencing', /^14,088$/);
    cy.validateFacetRank(3, 'Experimental Strategy');
  });

  it('File Format - gVCF [SJIP-553]', () => {
    cy.validateFacetFilter('File Format', 'GVCF', 'gvcf', /^1,390$/);
    cy.validateFacetRank(4, 'File Format');
  });
});
