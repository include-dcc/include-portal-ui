/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.showColumn('CADD');
  cy.showColumn('REVEL');
  cy.showColumn(/^ALT$/);
  cy.showColumn('Homo.');
});

describe('Page des variants - Consultation du tableau', () => {  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('-', 1, true);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr1:g.99999822dup', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('-', 2, true);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('SeqAlt', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('-', 9, true);
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('1.00e+0', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152,276', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^1/, 11, true);
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow('955', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^1$/, 15, true);
    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow('1,910', 15, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^0$/, 16, true);
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow('955', 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Type', 1);
    cy.sortTableAndIntercept('Type', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr1:g.99848070T>A', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Prev.').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
