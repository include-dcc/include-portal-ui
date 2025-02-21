/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz');
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it('Lien dbGap du panneau Data Access', () => {
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
      };
    });
  });

  it('Lien DataExploration du panneau Participants-Samples', () => {
    cy.get('[id="participant-sample"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Participants_RedirectLink"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz').should('exist');
  });

  it('Lien Participant ID du panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(0).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('pt-0dxdyebh');
  });
});
