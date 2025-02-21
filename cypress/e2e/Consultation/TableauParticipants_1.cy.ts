/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.showColumn('Race');
  cy.showColumn('Ethnicity');
  cy.showColumn('Age');
  cy.showColumn('External Participant ID');
  cy.showColumn('Family Unit');
  cy.showColumn('Condition (Source Text)');
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(1).contains('pt-as0aepqm').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(2).contains('HTP').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(3).contains(/(phs002330|phs002981|-)/).should('exist');
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
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains(/(Hypothyroidism|Atrial septal defect \(ASD\)|Congenital heart defect \(CHD\) - any|Hidradenitis suppurativa|Psoriasis|Complete trisomy 21)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains(/(Hypothyroidism|Atrial septal defect|Congenital heart disease|Hidradenitis suppurativa|Psoriasis|Complete trisomy 21)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains(/(0005420|0006664|0005453|0006559|0005083|0700030)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains(/(Abnormal heart morphology|Acne inversa|Atrial septal defect|Hypothyroidism|Psoriasiform dermatitis)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('HP:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains(/(0001627|0040154|0001631|0000821|0003765)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(15).contains(/\d{1}/).should('exist');
  });
});
