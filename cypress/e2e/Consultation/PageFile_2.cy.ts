/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntityMock();
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains(/^1$/); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^1$/); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/Participant$/); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/^1$/); // data-cy="SummaryHeader_Samples_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/Biospecimen$/); // data-cy="SummaryHeader_Samples_Button"
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('The Human Trisome Project (HTP)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Dataset').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('HTP Whole Blood RNAseq (2020)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Format').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('fastq').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(5).contains('Size').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('3.13 GB').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(6).contains('URL').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(6).contains('drs://data.kidsfirstdrc.org/ac7eec60-b1aa-4f10-ae32-bca5f5de23c9').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(7).contains('Hash').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(7).contains('-').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data-access"] [class="ant-descriptions-item-label"]').eq(0).contains('Access').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(0).contains('Registered').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-label"]').eq(1).contains('dbGaP Accession Number').should('exist');
    cy.get('[id="data-access"] [class="ant-descriptions-item-content"]').eq(1).contains('phs002981').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(0).contains('Transcriptomics').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(1).contains('Unaligned Reads').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-label"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.get('[id="data-type"] [class="ant-descriptions-item-content"]').eq(2).contains('RNA-Seq').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="participant-sample"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(0).contains('Participant ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(2).contains('Down Syndrome Status').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(3).contains('Sample ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(4).contains('Sample Type').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(5).contains('Collection ID').should('exist');
    cy.get('[id="participant-sample"] thead th[class="ant-table-cell"]').eq(6).contains('Collection Sample Type').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(0).contains('pt-as0aepqm').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(1).contains('HTP').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(2).contains('T21').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(3).contains('bs-03ynynfs').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(4).contains('RNA').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(5).contains('bs-m623h3mrgg').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(6).contains('Peripheral Whole Blood').should('exist');
  });
});
