/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntityMock();
  cy.intercept('POST', '**/graphql', {
    statusCode: 200,
    body: {},
  }).as('emptyGraphql');
});

describe('Page d\'une étude - Valider les liens disponibles', () => {
  it('Lien Clinical Trial du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href').and('match', /http:\/\/clinicaltrials.gov\/study\/NCT04048759/);
  });

  it('Lien \'See more\' de Description du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('See more').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: unset"]').contains('The Human Trisome Project (HTP)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('See less').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: 2"]').contains('The Human Trisome Project (HTP)').should('exist');
  });

  it('Lien Publication du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(10).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/38942750(|\/)/);
  });

  it('Lien \'See more\' de Publication du panneau Summary', () => {
    cy.get('[class*="PubModal_modalWrapper"]').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(10).contains('See more').clickAndWait({force: true});
    cy.get('[class*="PubModal_modalWrapper"]').should('exist');
  });

  it('Lien DOI Citation du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(11).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/doi.org\/10.71738\/p0a9-2v09/);
  });

  it('Lien \'See more\' de Citation Statement du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(14).contains('See more').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: unset"]').contains('This is the end of the Citation Statement text.').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(14).contains('See less').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: 2"]').contains('This is the end of the Citation Statement text.').should('exist');
  });

  it('Lien \'See more\' de Acknowledgement du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(15).contains('See more').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: unset"]').contains('This is the end of the Acknowledgement text.').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(15).contains('See less').clickAndWait({force: true});
    cy.get('[id="summary"] [class="ant-descriptions-item-content"] [style*="webkit-line-clamp: 2"]').contains('This is the end of the Acknowledgement text.').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000042');
  });

  it('Lien Study Website du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(3).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/www.trisome.org/);
  });

  it('Lien Virtual Biorepository Email du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'mailto:dsresearch@cuanschutz.edu');
  });

  it('Lien Virtual Biorepository URL du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'https://redcap.link/HTPVBRrequest');
  });

  it('Lien DataExploration du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[id="HTP-RNAseq-WholeBlood-2020"] [class="ant-collapse-extra"] button').eq(0).clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Dataset').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP Whole Blood RNAseq (2020)').should('exist');
  });

  it('Lien Publication du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[id="HTP-RNAseq-WholeBlood-2020"] [class="ant-descriptions-item-content"]').eq(8).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/37379383(|\/)/);
  });

  it('Lien DOI du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[id="HTP-RNAseq-WholeBlood-2020"] [class="ant-descriptions-item-content"]').eq(9).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/doi.org\/10.71738\/n9tr-ba81/);
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
