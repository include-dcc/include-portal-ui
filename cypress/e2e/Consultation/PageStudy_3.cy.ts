/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('HTP', 1);
});

describe('Page d\'une étude - Valider les liens disponibles', () => {
  it('Lien dbGaP du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
      };
    });
  });

  it('Lien Study Website du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(12).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/www.trisome.org/);
  });

  it('Lien Publication du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/38942750(|\/)/);
  });

  it('Lien \'See more\' de Publication du panneau Summary', () => {
    cy.get('[class*="PubModal_modalWrapper"]').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).contains('See more').clickAndWait({force: true});
    cy.get('[class*="PubModal_modalWrapper"]').should('exist');
  });

  it('Lien Virtual Biorepository Email du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(16).find('[href]')
      .should('have.attr', 'href', 'mailto:dsresearch@cuanschutz.edu');
  });

  it('Lien Virtual Biorepository URL du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(17).find('[href]')
      .should('have.attr', 'href', 'https://redcap.link/HTPVBRrequest');
  });

  it('Lien DataExploration du panneau Summary Statistics', () => {
    cy.get('[id="statistic"] [class="ant-collapse-header"] button').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000042');
  });

  it('Lien DataExploration du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[id="HTP-RNAseq-WholeBlood-2020"] [class="ant-collapse-header"] button').eq(0).clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Dataset').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP Whole Blood RNAseq (2020)').should('exist');
  });

  it('Lien Publication du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[id="HTP-RNAseq-WholeBlood-2020"] [class="ant-descriptions-item-content"]').eq(8).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/37379383(|\/)/);
  });

  it('Lien Files de Gene Expression Quantifications du panneau Files', () => {
    cy.get('[id="data_file"] [data-row-key="1"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Gene Expression Quantifications').should('exist');
  });

  it('Lien Files de RNA-Seq du panneau Files', () => {
    cy.get('[id="data_file"] tr:contains("RNA-Seq") td').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('RNA-Seq').should('exist');
  });
});
