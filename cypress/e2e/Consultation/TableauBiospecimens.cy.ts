/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
    cy.showColumn('External Sample ID');
    cy.showColumn('Volume');
    cy.showColumn('Volume Unit');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
  });

  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(1).contains('bs-03ynynfs').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(2).contains('HTP').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(3).contains('RNA').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(4).contains('bs-3m4a3fy3zm').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(5).contains('RNA').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(6).contains('pt-as0aepqm').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(7).contains('bs-m623h3mrgg').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(8).contains('Peripheral Whole Blood').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(9).contains('bs-ag3azt3gmq').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(10).contains('28').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(10).contains('years').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(10).contains('139').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(10).contains('days').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(11).contains('HTP0577A_PAXgeneWholeBloodRNA').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(12).contains('0.08').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(13).contains('mL').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(14).contains('Yes').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(15).contains('Qiagen PAXgene Blood RNA Kit').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(16).contains('-80C Freezer').should('exist');
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(17).contains(/\d{1}/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
    cy.showColumn('External Sample ID');
    cy.showColumn('Volume');
    cy.showColumn('Volume Unit');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
  });

  it('Lien Participant ID du tableau', () => {
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(6).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('pt-as0aepqm');
  });

  it('Lien Collection ID du tableau', () => {
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(7).find('[type="link"]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.validatePillSelectedQuery('Collection ID', ['Bs-m623h3mrgg'], 1);
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[class*="ant-table-row"]').find('[class*="ant-table-cell"]').eq(17).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Bs-03ynynfs').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
    cy.showColumn('External Sample ID');
    cy.showColumn('Volume');
    cy.showColumn('Volume Unit');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
  });

  it('Valider les fonctionnalités du tableau - Tri Sample ID', () => {
    cy.sortTableAndWait('Sample ID');
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
    cy.sortTableAndIntercept('Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Type', () => {
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.validateTableFirstRow('-', 3, true);
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Parent Sample ID', () => {
    cy.sortTableAndIntercept('Parent Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
    cy.sortTableAndIntercept('Parent Sample ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Parent Sample Type', () => {
    cy.sortTableAndIntercept('Parent Sample Type', 1);
    cy.validateTableFirstRow('-', 5, true);
    cy.sortTableAndIntercept('Parent Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Participant ID', () => {
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Collection ID', () => {
    cy.sortTableAndIntercept('Collection ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
    cy.sortTableAndIntercept('Collection ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Collection Sample Type', () => {
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.validateTableFirstRow('-', 8, true);
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Availability', () => {
    cy.sortTableAndIntercept('Sample Availability', 1);
    cy.validateTableFirstRow('-', 14, true);
    cy.sortTableAndIntercept('Sample Availability', 1);
    cy.validateTableFirstRow('No', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 17, true);
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 17, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Collection Sample Type', 1);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('body').find('button[type="button"]').contains('Prev.').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
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
  