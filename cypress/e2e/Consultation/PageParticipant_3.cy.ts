/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntityMock();
});

describe('Page d\'un participant - Valider les liens disponibles', () => {
  it('Lien dbGaP du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
      };
    });
  });

  it('Lien Family du panneau Family', () => {
    cy.resetColumns('family');
    cy.get('[id="family"] [class="ant-collapse-header"] [href]').clickAndWait({force: true}); // data-cy="FamilyLink"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Family ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('F0013').should('exist');
  });

  it('Lien Participant du panneau Family', () => {
    cy.resetColumns('family');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(0).find('[href]').clickAndWait({force: true});
    cy.intercept('POST', '**/graphql', (req) => {
      req.continue();
    });
    cy.get('[class*="EntityTitle"]').contains('pt-v66khv4x');
  });

  it('Lien Mondo du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href').and('match', /http:\/\/purl.obolibrary.org\/obo\/MONDO_0005420/);
  });

  it('Lien MONDO Term du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Hypothyroidism (MONDO:0005420)').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien HP du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0001631');
  });

  it('Lien HPO Term du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Phenotype (HPO)').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Atrial septal defect (HP:0001631)').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Biospecimens_RedirectLink"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
  });

  it('Lien Collection ID du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] [class*="BiospecimenTable_tabs"] [data-node-key="table"]').clickAndWait({force: true});
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"] tr:contains("bs-7zahnqfgir") [href]').first().clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Collection ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Bs-7zahnqfgir').should('exist');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[id="files"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Files_RedirectLink"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
  });

  it('Lien Files de BCRseq du panneau Files', () => {
    cy.get('[id="files"] [data-row-key="BCRseq"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('BCRseq').should('exist');
  });
});
