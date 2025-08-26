/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntityMock();
  cy.intercept('POST', '**/graphql', {
    statusCode: 200,
    body: {},
  }).as('emptyGraphql');
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it('Lien dbGap du panneau Data Access', () => {
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=phs002981/);
      };
    });
  });

  it('Lien DataExploration du panneau Participants-Samples', () => {
    cy.get('[id="participant-sample"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Participants_RedirectLink"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
  });

  it('Lien Participant ID du panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('getParticipantEntity')) {
        req.alias = 'postGraphql';
      };
    });
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(0).find('[href]').clickAndWait({force: true});
    cy.wait('@postGraphql').then((interception) => {
      expect(interception.request.body).to.deep.include({"operationName": "getParticipantEntity",
                                                         "variables": {
                                                           "sqon": {
                                                             "content": [
                                                               {
                                                                 "content": {
                                                                   "field": "participant_id",
                                                                   "value": [
                                                                     "pt-as0aepqm"
                                                                   ],
                                                                   "index": "participant"
                                                                 },
                                                                 "op": "in"
                                                               }
                                                             ],
                                                             "op": "and"
                                                           }
                                                         }
      });
    });
  });
});
