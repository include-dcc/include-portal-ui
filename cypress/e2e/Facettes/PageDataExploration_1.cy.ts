/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants');
  cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
});

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').its('length').should('eq', 2);

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });
  
  it('Search by Participant ID - pt-as0aepqm', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Participant ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by Participant ID or External Participant ID').should('exist');

    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'PT-AS0AEPQM', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('pt-as0aepqm').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('pt-as0aepqm').should('exist'); //data-cy="Tag_pt-as0aepqm"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_pt-as0aepqm"
  });

  it('Search by external Participant ID - HTP0577', () => {
    cy.typeAndIntercept('[class*="SearchAutocomplete_search"] input', 'htp0577', 'POST', '*/grapgql', 3); //data-cy="SearchAutocomplete_Select"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('pt-as0aepqm').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('pt-as0aepqm').should('exist'); //data-cy="Tag_pt-as0aepqm"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_pt-as0aepqm"
  });

  it('Study Code - DS360-CHD', () => {
    cy.validateFacetFilter('Study Code', 'DS360-CHD', 'DS360-CHD', /\d{1}/);
    cy.validateFacetRank(0, 'Study Code');
  });

  it('Down Syndrome Status - T21', () => {
    cy.validateFacetFilter('Down Syndrome Status', /(T21|Trisomy 21)/, 'T21', /\d{1}/);
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

  it('Condition (Source Text) - Complete trisomy 21', () => {
    cy.validateFacetFilter('Condition (Source Text)', 'Complete trisomy 21', 'Complete trisomy 21', /\d{1}/);
    cy.validateFacetRank(2, 'Condition (Source Text)');
  });

  it('Intervention (MAxO) - Hearing examination (MAxO:0000873)', () => {
    cy.validateFacetFilter('Intervention (MAxO)', 'Hearing examination (MAxO:0000873)', 'hearing examination (MAxO:0000873)', /\d{1}/);
    cy.validateFacetRank(3, 'Intervention (MAxO)');
  });

  it('Age at Diagnosis (days)', () => {
    cy.validateFacetNumFilter('Max', 'Age at Diagnosis (days)', '10000', /\d{1}/);
    cy.validateFacetRank(4, 'Age at Diagnosis (days)');
  });

  it('Age at Vital Status (days)', () => {
    cy.validateFacetNumFilter('Max', 'Age at Vital Status (days)', '10000', /\d{1}/);
    cy.validateFacetRank(5, 'Age at Vital Status (days)');
  });

  it('Age at Observed Phenotype (days)', () => {
    cy.validateFacetNumFilter('Max', 'Age at Observed Phenotype (days)', '10000', /\d{1}/);
    cy.validateFacetRank(6, 'Age at Observed Phenotype (days)');
  });

  it('Age at First Patient Engagement (days)', () => {
    cy.validateFacetNumFilter('Max', 'Age at First Patient Engagement (days)', '10000', /\d{1}/);
    cy.validateFacetRank(7, 'Age at First Patient Engagement (days)');
  });

  it('Family Unit - Proband-only', () => {
    cy.validateFacetFilter('Family Unit', 'Proband-only', 'proband-only', /\d{1}/);
    cy.validateFacetRank(8, 'Family Unit');
  });

  it('Sex - Female', () => {
    cy.validateFacetFilter('Sex', 'Female', 'female', /\d{1}/);
    cy.validateFacetRank(9, 'Sex');
  });

  it('Race - White', () => {
    cy.validateFacetFilter('Race', 'White', 'White', /\d{1}/);
    cy.validateFacetRank(10, 'Race');
  });

  it('Ethnicity - Not Hispanic or Latino', () => {
    cy.validateFacetFilter('Ethnicity', 'Not Hispanic or Latino', 'Not Hispanic or Latino', /\d{1}/);
    cy.validateFacetRank(11, 'Ethnicity');
  });

  it('Vital Status - Alive', () => {
    cy.validateFacetFilter('Vital Status', 'Alive', 'Alive', /\d{1}/);
    cy.validateFacetRank(12, 'Vital Status');
  });
});
