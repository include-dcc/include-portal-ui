/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens');
  cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
  cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Collapse all').should('exist'); //data-cy="ExpandAll"
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').clickAndWait({force: true}); //data-cy="ExpandAll"
    cy.get('[class*="Filters_filterExpandBtnWrapper"] button[class*="ant-btn-link"]').contains('Expand all').should('exist'); //data-cy="ExpandAll"
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by Sample ID - bs-03ynynfs', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Sample ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by Sample ID or External Sample ID').should('exist');

    cy.intercept('POST', '*/grapgql').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('BS-03YNYNFS', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.waitWhileSpin(oneMinute);
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait(2000);
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('bs-03ynynfs').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('bs-03ynynfs').should('exist'); //data-cy="Tag_bs-03ynynfs"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Bs-03ynynfs').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_bs-03ynynfs"
  });

  it('Search by external Sample ID - HTP0561A_PAXgeneWholeBloodRNA', () => {
    cy.intercept('POST', '*/grapgql').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(0).find('input').type('htp0561a_paxgenewholebloodrna', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.waitWhileSpin(oneMinute);
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait(2000);
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('bs-03ynynfs').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('exist'); //data-cy="Tag_bs-03ynynfs"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_bs-03ynynfs"
  });

  it('Search by Collection ID - bs-m623h3mrgg', () => {
    cy.get('[class*="SearchLabel_title"]').contains('Search by Collection ID').should('exist'); //data-cy="SearchLabel_Title"

    cy.intercept('POST', '*/grapgql').as('getRouteMatcher');
    cy.get('[class*="SearchAutocomplete_search"]').eq(1).find('input').type('BS-M623H3MRGG', {force: true}); //data-cy="SearchAutocomplete_Select"
    cy.waitWhileSpin(oneMinute);
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait('@getRouteMatcher');
    cy.wait(2000);
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').contains('bs-m623h3mrgg').should('exist'); //data-cy="Search_Dropdown"
    cy.get('[class*="ant-select-dropdown"] [class*="ant-select-item"]').eq(0).click({force: true}); //data-cy="Search_Dropdown"

    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').contains('bs-m623h3mrgg').should('exist'); //data-cy="Tag_bs-m623h3mrgg"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Collection ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Bs-m623h3mrgg').should('exist');
    cy.validateTableResultsCount(/\d{1}/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[class*="SearchAutocomplete_search"] [class*="ant-tag"]').should('not.exist'); //data-cy="Tag_bs-m623h3mrgg"
  });

  it('Sample Type - DNA', () => {
    cy.validateFacetFilter('Sample Type', 'DNA', 'DNA', /\d{1}/);
    cy.validateFacetRank(0, 'Sample Type');
  });

  it('Parent Sample Type - Peripheral Whole Blood', () => {
    cy.validateFacetFilter('Parent Sample Type', 'Peripheral Whole Blood', 'Peripheral Whole Blood', /\d{1}/);
    cy.validateFacetRank(1, 'Parent Sample Type');
  });

  it('Collection Sample Type - Peripheral Whole Blood', () => {
    cy.validateFacetFilter('Collection Sample Type', 'Peripheral Whole Blood', 'Peripheral Whole Blood', /\d{1}/);
    cy.validateFacetRank(2, 'Collection Sample Type');
  });

  it('Age at Biospecimen Collection (days)', () => {
    cy.validateFacetNumFilter('Max', 'Age at Biospecimen Collection (days)', '0.01', /\d{1}/);
    cy.validateFacetRank(3, 'Age at Biospecimen Collection (days)');
  });

  it('Availability - Available', () => {
    cy.validateFacetFilter('Availability', 'Available', 'available', /\d{1}/);
    cy.validateFacetRank(4, 'Availability');
  });

  it('Laboratory Procedure - Centrifugation', () => {
    cy.validateFacetFilter('Laboratory Procedure', 'Centrifugation', 'Centrifugation', /\d{1}/);
    cy.validateFacetRank(5, 'Laboratory Procedure');
  });

  it('Biospecimen Storage - -80C Freezer', () => {
    cy.validateFacetFilter('Biospecimen Storage', '-80C Freezer', '-80C Freezer', /\d{1}/);
    cy.validateFacetRank(6, 'Biospecimen Storage');
  });
});
