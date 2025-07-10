/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz');
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains(/^1$/); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^3$/); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains('Participants'); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/^7$/); // data-cy="SummaryHeader_Samples_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('Biospecimens'); // data-cy="SummaryHeader_Samples_Button"
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('The Human Trisome Project (HTP)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Dataset').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('HTP WGS (2018 X01)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Format').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains(/^vcf$/).should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(5).contains('Size').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('1.04 GB').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(6).contains('URL').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(6).contains('drs://data.kidsfirstdrc.org/ed48ab77-ac23-41a9-bd3f-74bef40b11b5').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(7).contains('Hash').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(7).contains('-').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data-access"] [class="ant-descriptions-item-label"]').eq(0).contains('Access').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(0).contains('Controlled').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-label"]').eq(1).contains('dbGaP Accession Number').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).contains(/(phs002330|phs002981|-)/).should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(1).contains('Variant Calls').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(2).contains('Whole Genome Sequencing').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"]').contains('(7)').should('exist');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(0).contains('Participant ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(2).contains('Down Syndrome Status').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(3).contains('Sample ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(4).contains('Sample Type').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(5).contains('Collection ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(6).contains('Collection Sample Type').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(0).contains('pt-0dxdyebh').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(1).contains('HTP').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(3).contains('bs-4fvnakv6').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(4).contains('DNA').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(5).contains('bs-aezhntnkak').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(6).contains('Peripheral Whole Blood').should('exist');
  });
});
