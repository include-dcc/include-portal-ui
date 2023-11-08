/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=821e14bc-acf4-4566-a89f-5456ffef2032');
  });

  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(1).contains('chr1:g.108192590T>C').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(2).contains('SNV').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(3).contains('rs79735952').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(4).find('[class*="moderateImpact"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains('Missense').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains('SLC25A24').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains('p.Tyr11Cys').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('Benign').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(6).contains('1.57e-2').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(7).contains(/^2$/).should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(8).contains(/^12$/).should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(9).contains('6.81e-3').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(10).contains(/^13$/).should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(11).contains(/^1$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key]').eq(0).contains('chr1:g.108192590T>C').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('chr1:g.108192590T>C');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(3).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs79735952');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(4).find('a[href]')
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=SLC25A24');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(5).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1267873');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(7).find('a[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-COG-ALL').should('exist');
  });
 
  it('Valider les liens disponibles Lien Part.', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(8).find('a[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT').should('exist');
  });
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('-', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr1:g.99999822dup', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [SJIP-553]', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('-', 2);
    cy.sortTableAndIntercept('Type', 1);
    cy.validateTableFirstRow('Sequence Alteration', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri dbSNP', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('-', 3);
    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('rs999995686', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD', 1);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('gnomAD', 1);
    cy.validateTableFirstRow('1.00e+0', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^1$/, 8);
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow('955', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Freq.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('5.24e-4', 9);
    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('1.00e+0', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('ALT', 1);
    cy.validateTableFirstRow(/^1$/, 10);
    cy.sortTableAndIntercept('ALT', 1);
    cy.validateTableFirstRow('1910', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^0$/, 11);
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow('955', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Type', 1);
    cy.sortTableAndIntercept('Type', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.sortTableAndIntercept('Variant', 1);
    cy.validateTableFirstRow('chr1:g.99848070T>A', 1);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Prev.').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  