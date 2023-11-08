/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('GF_0A0S5FSA');
});

describe('Page d\'un fichier - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).click({force: true}); // data-cy="SummaryHeader_Studies_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });
  
  it('Participant', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(1).click({force: true}); // data-cy="SummaryHeader_Participants_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GF 0A0S5FSA').should('exist');
  });
  
  it('Sample', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(2).click({force: true}); // data-cy="SummaryHeader_Samples_Button"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GF 0A0S5FSA').should('exist');
  });
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('GF_0A0S5FSA');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains(/^1$/); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^3$/); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains('Participants'); // data-cy="SummaryHeader_Participants_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/^3$/); // data-cy="SummaryHeader_Samples_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('Biospecimens'); // data-cy="SummaryHeader_Samples_Button"
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('GF_0A0S5FSA').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('47df08f9-1ff7-41e1-ad72-de4acc9db9ef.CGP.filtered.deNovo.vep.vcf.gz').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('INCLUDE: (Sherman) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome (DS360-CHD)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Format').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains(/^vcf$/).should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Size').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('1.05 GB').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('URL').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('drs://data.kidsfirstdrc.org/aab35c81-391a-46d7-bdf7-a3a9e3c5e512').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(6).contains('Hash').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('54335abbd3fbe773d1ce73f88febdf79-4').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data-access"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Access').should('exist');
    cy.get('[id="data-access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Controlled').should('exist');
    cy.get('[id="data-access"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('dbGaP Accession Number').should('exist');
    cy.get('[id="data-access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('phs002330').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Genomics').should('exist');
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Variant Calls').should('exist');
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.get('[id="data-type"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Whole Genome Sequencing').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.get('[id="participant-sample"]').find('[class="ant-collapse-header"]').contains('(3)').should('exist');
    cy.get('[id="participant-sample"]').find('[class="ant-collapse-header"]').contains('View in data exploration').should('exist');
    cy.get('[id="participant-sample"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Participant ID').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Down Syndrome Status').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Sample ID').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Sample Type').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Collection ID').should('exist');
    cy.get('[id="participant-sample"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('Collection Sample Type').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(0).contains('PT_YHVEKQGN').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(1).contains('DS360-CHD').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(3).contains('BS_MQZGQQKE').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(4).contains('DNA').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(5).contains('BS_MQZGQQKE_Peripheral_Whole_Blood').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(6).contains('Peripheral Whole Blood').should('exist');
  });
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it('Lien dbGap du panneau Data Access', () => {
    cy.get('[id="data-access"]').find('[class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien DataExploration du panneau Participants-Samples', () => {
    cy.get('[id="participant-sample"] a[class*="EntityTableRedirectLink"]').click({force: true}); // data-cy="Participants_RedirectLink"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GF 0A0S5FSA').should('exist');
  });

  it('Lien Participant ID du panneau Participants-Samples', () => {
    cy.resetColumns('participant-sample');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT_YHVEKQGN');
  });
});

describe('Page d\'un fichier - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data-access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data-access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data-access"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data-access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data-access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data-type"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data-type"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data-type"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data-type"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data-type"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.get('[id="participant-sample"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="participant-sample"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="participant-sample"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="participant-sample"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="participant-sample"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
