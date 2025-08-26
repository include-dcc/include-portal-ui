/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesMock();
  cy.showColumn('Description');
  cy.showColumn('Participant Lifespan');
  cy.showColumn('Data Source');
  cy.showColumn('Design');
  cy.showColumn('Principal Investigator');
  cy.showColumn('Start');
  cy.showColumn('End');
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
        .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002981');
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

  it('Lien \'See more\' de Data Source du tableau', () => {
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').clickAndWait({force: true});
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).contains('Participant or Caregiver Report').should('exist');
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See less').clickAndWait({force: true});
    cy.get('tr[data-row-key="HTP"] [class*="ant-table-cell"]').eq(17).contains('Participant or Caregiver Report').should('not.exist');
  });
});
