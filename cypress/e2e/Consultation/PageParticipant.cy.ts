/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT_QWWDKAXP');
});

describe('Page d\'un participant - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).click({force: true}); // data-cy="SummaryHeader_Studies_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(1).click({force: true}); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
  });
  
  it('Files', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(2).click({force: true}); // data-cy="SummaryHeader_Files_Button"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
  });
});

describe('Page d\'un participant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('PT_QWWDKAXP');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains(/^1$/); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^1$/); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^Biospecimen$/); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/^5$/); // data-cy="SummaryHeader_Files_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('Files'); // data-cy="SummaryHeader_Files_Button"
    cy.get('[id="summary"]').find('[class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('PT_QWWDKAXP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Ext. Participant ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SSHCC10038_00').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('INCLUDE: (Sherman) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome (DS360-CHD)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('dbGaP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('phs002330').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Family Unit').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Trio').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-cyan"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"]').find('[class*="EntityDescriptions_title"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-collapse-header"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Race').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('White').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Ethnicity').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Not Hispanic or Latino').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Sex').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Female').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="ant-tag-magenta"]').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Down Syndrome Status').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('T21').should('exist');
  });
  
  it('Panneau Family (sans famille)', () => {
    cy.visitParticipantEntity('PT_05Y917GY');
    cy.get('[id="family"]').should('not.exist');
  });

  it('Panneau Family (avec famille)', () => {
    cy.resetColumns('family');
    cy.get('[id="family"]').find('[class*="EntityTable_title"]').contains('Family').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains('Family ID').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains(' (').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains('FM_YZF4PRXH').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains(')').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Participant ID').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Family Relationship').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Down Syndrome Status').should('exist');
    cy.get('[data-row-key="PT_QWWDKAXP"]').find('td[class="ant-table-cell"]').eq(0).contains('PT_QWWDKAXP').should('exist');
    cy.get('[data-row-key="PT_QWWDKAXP"]').find('td[class="ant-table-cell"]').eq(1).contains('Proband').should('exist');
    cy.get('[data-row-key="PT_QWWDKAXP"]').find('td[class="ant-table-cell"]').eq(2).contains('T21').should('exist');
    cy.get('[data-row-key="PT_M12NVZYF"]').find('td[class="ant-table-cell"]').eq(0).contains('PT_M12NVZYF').should('exist');
    cy.get('[data-row-key="PT_M12NVZYF"]').find('td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="PT_M12NVZYF"]').find('td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(0).contains('PT_YHVEKQGN').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="PT_YHVEKQGN"]').find('td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
  });
  
  it('Panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"]').find('[class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('(4)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('MONDO Term').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(0).contains('Complete atrioventricular canal').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(0).contains('0015273').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(1).contains('complete atrioventricular canal').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(3).contains('307').should('exist');
  });
  
  it('Panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"]').find('[class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('(2)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Phenotype (HPO)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('HPO Term').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(0).contains('Complete atrioventricular canal defect').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(0).contains('0001674').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(1).contains('Complete atrioventricular canal defect').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(3).contains('273').should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.visitParticipantEntity('pt-as0aepqm');
    cy.resetColumns('biospecimen');
    cy.showColumn(/^Volume$/);
    cy.showColumn('Volume Unit');
    cy.showColumn('Sample Availability');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
    cy.showColumn('Parent Sample ID');
    cy.showColumn('Parent Sample Type');
    cy.get('[id="biospecimen"]').find('[class*="EntityTable_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('(26)').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('View in data exploration').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Sample ID').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Collection ID').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Container ID').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Sample Type').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Collection Sample Type').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Age').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('Volume').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(7).contains('Volume Unit').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(8).contains('Sample Availability').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(9).contains('Laboratory Procedure').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(10).contains('Biospecimen Storage').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(11).contains('Parent Sample ID').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(12).contains('Parent Sample Type').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(0).contains('bs-fdh469ii92').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(1).contains('bs-m623h3mrgg').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(2).contains('bs-g8n9je97fj').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(3).contains('Red Blood Cells').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(4).contains('Peripheral Whole Blood').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(5).contains('28').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(5).contains('years').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(5).contains('139').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(5).contains('days').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(6).contains(/^1$/).should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(7).contains('mL').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(8).contains('Yes').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(9).contains('Centrifugation').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(10).contains('-80C Freezer').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(11).contains('bs-mpqxjc6dft').should('exist');
    cy.get('[data-row-key="bs-g8n9je97fj"]').find('td[class="ant-table-cell"]').eq(12).contains('Peripheral Whole Blood').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="files"]').find('[class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="files"]').find('[class="ant-collapse-header"]').contains('Data File').should('exist');
    cy.get('[id="files"]').find('[class="ant-collapse-header"]').contains('(5)').should('exist');
    cy.get('[id="files"]').find('[class="ant-collapse-header"]').contains('View in data exploration').should('exist');
    cy.get('[id="files"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Category').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Data Category').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Genomics"]').find('td[class="ant-table-cell"]').eq(1).contains(/^5$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Genomics"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Transcriptomics"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Transcriptomics"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Proteomics"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Proteomics"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Metabolomics"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Metabolomics"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');

    cy.get('[id="files"]').find('[class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Experimental Strategy').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Whole Genome Sequencing"]').find('td[class="ant-table-cell"]').eq(1).contains(/^5$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Whole Genome Sequencing"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="RNA-Seq"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="RNA-Seq"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="Multiplex Immunoassay"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="Multiplex Immunoassay"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');
    cy.get('[id="files"]').find('[data-row-key="LCMS_Metabolomics"]').find('td[class="ant-table-cell"]').eq(1).contains(/^0$/).should('exist');
    cy.get('[id="files"]').find('[data-row-key="LCMS_Metabolomics"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 0%"]').should('exist');
  });
});

describe('Page d\'un participant - Valider les liens disponibles', () => {
  it('Lien dbGaP du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien Family du panneau Family', () => {
    cy.resetColumns('family');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').find('[href]').click({force: true}); // data-cy="FamilyLink"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Family ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FM YZF4PRXH').should('exist');
  });

  it('Lien Mother du panneau Family', () => {
    cy.resetColumns('family');
    cy.get('[data-row-key="PT_M12NVZYF"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('PT_M12NVZYF');
  });

  it('Lien Mondo du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0015273');
  });

  it('Lien MONDO Term du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[data-row-key="DG_66KZM17J"]').find('td[class="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Complete atrioventricular canal (MONDO:0015273)').should('exist');
    cy.validateTableResultsCount(/^307$/);
  });

  it('Lien HP du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0001674');
  });

  it('Lien HPO Term du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[data-row-key="1030540"]').find('td[class="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype (HPO)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Complete atrioventricular canal defect (HP:0001674)').should('exist');
    cy.validateTableResultsCount(/^273$/);
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"] a[class*="EntityTableRedirectLink"]').click({force: true}); // data-cy="Biospecimens_RedirectLink"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
  });

  it('Lien Collection ID du panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Collection ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('BS AFRQAF6C Peripheral Whole Blood').should('exist');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[id="files"] a[class*="EntityTableRedirectLink"]').click({force: true}); // data-cy="Files_RedirectLink"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
  });

  it('Lien Files de Genomics du panneau Files', () => {
    cy.get('[id="files"]').find('[data-row-key="Genomics"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genomics').should('exist');
  });

  it('Lien Files de Whole Genome Sequencing du panneau Files', () => {
    cy.get('[id="files"]').find('[data-row-key="Whole Genome Sequencing"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Whole Genome Sequencing').should('exist');
  });
});

describe('Page d\'un participant - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="profile"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="profile"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Family', () => {
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="family"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="family"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="diagnosis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="diagnosis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Phenotypes', () => {
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="phenotype"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="phenotype"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="biospecimen"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="biospecimen"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="files"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="files"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="files"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="files"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="files"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});