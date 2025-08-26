/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExplorationParticipantMock();
  cy.showColumn('Race');
  cy.showColumn('Ethnicity');
  cy.showColumn('Age');
  cy.showColumn('External Participant ID');
  cy.showColumn('Family Unit');
  cy.showColumn('Condition (Source Text)');
  cy.showColumn('Intervention (MAxO)');
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(1).contains('pt-as0aepqm').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(2).contains('HTP').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(3).contains('phs002981').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(4).contains('T21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(5).contains('Female').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(5).find('[class*="ant-tag-magenta"]').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(6).contains('White').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(7).contains('Not Hispanic or Latino').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(8).contains('28').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(8).contains('years').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(8).contains('139').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(8).contains('days').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(9).contains('HTP0577').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(10).contains('Proband-only').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('Atrial septal defect (ASD)').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('Eye examination').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('MAxO:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('0001155').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('Hypothyroidism').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('0005420').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).contains('Abnormal heart morphology').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).contains('HP:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).contains('0001627').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(15).contains('27').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(16).contains('13').should('exist');
  });
});
