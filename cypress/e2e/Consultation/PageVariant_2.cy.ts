/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('1-108192590-T-C', 1);
});

describe('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien Gene du panneau Summary', () => {
    // data-cy="Summary_Gene_ExternalLink"
    cy.get('a[class*="VariantEntity_symbolLink"]').eq(0).should('have.attr', 'href', 'https://omim.org/entry/608744');
  });

  it('Lien Ensembl du panneau Summary', () => {
    // data-cy="Summary_Ensembl_ExternalLink"
    cy.get('a[class*="VariantEntity_ensemblLink"]').eq(0).should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000370041');
  });

  it('Lien ClinVar du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"] [class="ant-space-item"]').eq(7).find('[class*="ant-tag-green"] a') // data-cy="Summary_ClinVar_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1267873');
  });

  it('Lien gnomAD du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"] [class="ant-space-item"]').eq(12).find('a') // data-cy="Summary_gnomAD_ExternalLink"
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-108192590-T-C?dataset=gnomad_r3');
  });

  it('Lien Ensembl Transcript du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] div[class*="ant-space-item"]').eq(0).find('a') // data-cy="Summary_Ensembl_Transcript_ExternalLink"
    .should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000370041');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] a').eq(1) // data-cy="Summary_sbSNP_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs79735952');
  });

  it('Lien OMIM du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_omim"] [class*="ant-descriptions-item-label"]').eq(0).find('a') // data-cy="Summary_Omim_ExternalLink"
    .should('have.attr', 'href', 'https://www.omim.org/entry/612289');
  });

  it('Ouvrir et refermer la nested table du panneau Transcripts', () => {
    cy.get('[id="consequence"] tbody td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').clickAndWait({force: true});
    cy.get('[id="consequence"] tr[class*="ant-table-expanded-row"]').eq(0).should('have.css', 'display', 'table-row');
    cy.get('[id="consequence"] tbody td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').clickAndWait({force: true});
    cy.get('[id="consequence"] tr[class*="ant-table-expanded-row"]').eq(0).should('have.css', 'display', 'none');
  });

  it('Lien du gène du panneau Transcripts', () => {
    cy.get('[id="consequence"] tbody td[class="ant-table-cell"]').eq(0).find('[href]').eq(0).should('have.attr', 'href', 'https://www.omim.org/entry/608744');
  });

  it('Lien \'See more\' de Predictions du panneau Transcripts', () => {
    cy.get('[id="consequence"] tbody td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(4).contains('CADD (Raw)').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(5).contains('0.790136').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(6).contains('CADD (Phred)').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(7).contains('9.294').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(8).contains('DANN').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(9).contains('0.9434897325387575').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(10).contains('REVEL').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(11).contains('0.068').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(12).contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(13).contains('Benign').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(13).contains('0.056').should('exist');
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See less').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(4).should('not.exist');
  });
  
  it('Lien du transcript du panneau Transcripts', () => {
    cy.get('[id="consequence"] tbody td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="VariantEntity_expandedTable"] tbody td[class*="ant-table-cell"]').eq(5).find('a').should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000370041');
  });

  it('Lien Studies du panneau INCLUDE Studies', () => {
    cy.get('[id="frequency"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('a').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });

  it('Lien Participants du panneau INCLUDE Studies', () => {
    cy.get('[id="frequency"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).find('a').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien TopMed du panneau Public Cohorts', () => {
    cy.get('[data-row-key="topmed"] td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-108192590-T-C');
  });

  it('Lien gnomAD Genome (v3.1.2) du panneau Public Cohorts', () => {
    cy.get('[data-row-key="gnomadGenomes3"] td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-108192590-T-C?dataset=gnomad_r3');
  });

  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[id="pathogenicity"] div[class="ant-collapse-header"] [href]') // data-cy="Pathogenicity_ClinVar_1267873_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1267873');
  });

  it('Lien de la condition Orphanet du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key="0-s-l-c-25-a-24"] td[class="ant-table-cell"]').eq(2).find('[href]')
    .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=3173');
  });

  it('Lien OMIM du gène du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="1-s-l-c-25-a-24-608744"] td[class="ant-table-cell"]').eq(1).find('[href]')
    .should('have.attr', 'href', 'https://www.omim.org/entry/608744');
  });

  it('Lien OMIM de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="1-s-l-c-25-a-24-608744"] td[class="ant-table-cell"]').eq(2).find('[href]').first()
    .should('have.attr', 'href', 'https://www.omim.org/entry/612289');
  });

  it('Lien HPO de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="2-s-l-c-25-a-24"] td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://hpo.jax.org/app/browse/term/HP:0007740');
  });

  it('Lien \'See more\' de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key="2-s-l-c-25-a-24"]').contains('See more').clickAndWait({force: true});
    cy.get('[data-row-key="2-s-l-c-25-a-24"]').contains('Abnormal Heart Morphology').should('exist');
    cy.get('[data-row-key="2-s-l-c-25-a-24"]').contains('See less').clickAndWait({force: true});
    cy.get('[data-row-key="2-s-l-c-25-a-24"]').contains('Abnormal Heart Morphology').should('not.exist');
  });
});
