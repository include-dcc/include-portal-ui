/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Description');
  cy.showColumn('Participant Lifespan');
  cy.showColumn('Data Source');
  cy.showColumn('Design');
  cy.showColumn('Principal Investigator');
  cy.showColumn('Start');
  cy.showColumn('End');
});

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="PageContent_title"]').contains('Studies'); // data-cy="Title_Studies"
  });

  it('Tableau [SJIP-1038]', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(0).find('[class*="ant-tag-green"]').contains('H').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(1).contains('HTP').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(2).contains('The Human Trisome Project').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(3).contains('INCLUDE').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(4).contains('All Co-occurring Conditions').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(5).contains(/(phs002330|phs002981|-)/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(6).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(7).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(8).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(9).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(10).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(11).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(12).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(13).contains('-').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(14).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(15).contains('The Human Trisome Project (').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(16).contains('Pediatric').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(16).contains('Adult').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(17).contains('Investigator Assessment').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(17).contains('Medical Record').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(18).contains('Case-control').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(18).contains('longitudinal').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(19).contains('Joaquin M. Espinosa').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(20).contains('2016').should('exist');
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(21).contains('-').should('exist');
  });
});

describe('Page des études - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="EntityTitle"]').contains('The Human Trisome Project').should('exist');
  });

  it('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(5).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(5).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
      };
    });
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(6).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(8).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class="ant-table-cell"]').eq(9).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien \'See more\' de Data Source du tableau [SJIP-1038]', () => {
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').clickAndWait({force: true});
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).contains('Participant or Caregiver Report').should('exist');
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See less').clickAndWait({force: true});
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).contains('Participant or Caregiver Report').should('not.exist');
  });
});


describe('Page des études - Consultation du tableau', () => {
  beforeEach(() => {
    cy.clickAndIntercept('input[type="radio"][value="true"]', 'POST', '**/graphql', 15, false/*beVisible*/, 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('ABC-DS', 1);
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow('X01-deSmith', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow(/^A/, 2);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow(/^(?!A)/, 2);
  });

  it('Valider les fonctionnalités du tableau - Tri dbGaP', () => {
    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow('-', 5);
    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 6);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Families', () => {
    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow('-', 7);
    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow(/\d{1}/, 7);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimen', 1);
    cy.validateTableFirstRow('-', 8);
    cy.sortTableAndIntercept('Biospecimen', 1);
    cy.validateTableFirstRow(/\d{1}/, 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/\d{1}/, 9);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Families', 1);
    cy.sortTableAndIntercept('Biospecimen', 1);
    cy.sortTableAndIntercept('Biospecimen', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1);
  });
});