/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('pt-0dxdyebh');
});

describe('Page d\'un participant - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).clickAndWait({force: true}); // data-cy="SummaryHeader_Studies_Button"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(1).clickAndWait({force: true}); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
  });
  
  it('Files', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(2).clickAndWait({force: true}); // data-cy="SummaryHeader_Files_Button"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
  });
});

describe('Page d\'un participant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('pt-0dxdyebh');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains(/\d{1}/); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/\d{1}/); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains(/^Biospecimens$/); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains(/\d{1}/); // data-cy="SummaryHeader_Files_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('Files'); // data-cy="SummaryHeader_Files_Button"
    cy.get('[id="summary"] [class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('pt-0dxdyebh').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Ext. Participant ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('HTP0026').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('The Human Trisome Project (HTP)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('dbGaP').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains(/(phs002330|phs002981|-)/).should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Family Unit').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('Trio+').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-cyan"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"] [class*="EntityDescriptions_title"]').contains('Profile').should('exist');
    cy.get('[id="profile"] [class="ant-collapse-header"]').contains('Profile').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(0).contains('Race').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(0).contains('White').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(1).contains('Ethnicity').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(1).contains('Not Hispanic or Latino').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(2).contains('Sex').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(2).contains('Female').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(2).find('[class*="ant-tag-magenta"]').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(3).contains('Down Syndrome Status').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(3).contains('D21').should('exist');
  });
  
  it('Panneau Family (sans famille)', () => {
    cy.visitParticipantEntity('PT_05Y917GY', 2);
    cy.get('[id="family"]').should('not.exist');
  });

  it('Panneau Family (avec famille)', () => {
    cy.resetColumns('family');
    cy.get('[id="family"] [class*="EntityTable_title"]').contains('Family').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains('Family ID').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains(' (').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains('F0013').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains(')').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(0).contains('Participant ID').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(1).contains('Family Relationship').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(2).contains('Down Syndrome Status').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(0).contains('pt-0dxdyebh').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(0).contains('pt-v66khv4x').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(0).contains('pt-cw432mnt').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(1).contains('Sibling').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-frtbsa8p"] td[class="ant-table-cell"]').eq(0).contains('pt-frtbsa8p').should('exist');
    cy.get('[data-row-key="pt-frtbsa8p"] td[class="ant-table-cell"]').eq(1).contains('Proband').should('exist');
    cy.get('[data-row-key="pt-frtbsa8p"] td[class="ant-table-cell"]').eq(2).contains('T21').should('exist');
  });
  
  it('Panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"] [class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains(/\d{1}/).should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(3).contains('MONDO Term').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(0).contains('Anxiety').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(0).contains('0011918').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(1).contains('Anxiety').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
  });
  
  it('Panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] [class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains(/\d{1}/).should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(0).contains('Phenotype (HPO)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(3).contains('HPO Term').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Anxiety').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('0000739').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Anxiety').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.showColumn(/^Volume$/);
    cy.showColumn('Volume Unit');
    cy.showColumn('Sample Availability');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
    cy.showColumn('Parent Sample ID');
    cy.showColumn('Parent Sample Type');
    cy.get('[id="biospecimen"] [class*="EntityTable_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains(/\d{1}/).should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(0).contains('Sample ID').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(1).contains('Collection ID').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(2).contains('Container ID').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(3).contains('Sample Type').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(4).contains('Collection Sample Type').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(5).contains('Age').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(6).contains('Volume').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(7).contains('Volume Unit').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(8).contains('Sample Availability').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(9).contains('Laboratory Procedure').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(10).contains('Biospecimen Storage').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(11).contains('Parent Sample ID').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(12).contains('Parent Sample Type').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(0).contains('bs-0nkygf7w').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(1).contains('bs-aezhntnkak').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(2).contains('bs-kakk7hjtrg').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(3).contains('RNA').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(4).contains('Peripheral Whole Blood').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(5).contains('55').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(5).contains('years').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(5).contains('205').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(5).contains('days').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(6).contains(/^0.01$/).should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(7).contains('mL').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(8).contains('Yes').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(9).contains('Qiagen PAXgene Blood RNA Kit').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(10).contains('-80C Freezer').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(11).contains('bs-qrx7ddppxr').should('exist');
    cy.get('[data-row-key="bs-kakk7hjtrg"] td[class="ant-table-cell"]').eq(12).contains('RNA').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="files"] [class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains('Data File').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="files"] [class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Category').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(0).contains('Data Category').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(2).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Genomics"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Genomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Transcriptomics"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Transcriptomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Proteomics"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Proteomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Metabolomics"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Metabolomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');

    cy.get('[id="files"] [class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(0).contains('Experimental Strategy').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(2).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Whole Genome Sequencing"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Whole Genome Sequencing"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="RNA-Seq"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="RNA-Seq"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Multiplex Immunoassay"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="Multiplex Immunoassay"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="LCMS Metabolomics"] td[class="ant-table-cell"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[id="files"] [data-row-key="LCMS Metabolomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
  });
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
    cy.get('[class*="EntityTitle"]').contains('pt-v66khv4x');
  });

  it('Lien Mondo du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href').and('match', /http:\/\/purl.obolibrary.org\/obo\/MONDO_(0005071|0004235|0005093|0100471|0005420|0100470|0007186|0005172|0004979|0011918|0002050)/);
  });

  it('Lien MONDO Term du panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[data-row-key="HTP0026.Anxiety.HP:0000739.MONDO:0011918.NA"] td[class="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Anxiety (MONDO:0011918)').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien HP du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0000739');
  });

  it('Lien HPO Term du panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Phenotype (HPO)').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Anxiety (HP:0000739)').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Biospecimens_RedirectLink"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
  });

  it('Lien Collection ID du panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"] [data-row-key="bs-e3g4mq8bcx"] [href]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Collection ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Bs-aezhntnkak').should('exist');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[id="files"] [class="ant-collapse-header"] button').clickAndWait({force: true}); // data-cy="Files_RedirectLink"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
  });

  it('Lien Files de Genomics du panneau Files', () => {
    cy.get('[id="files"] [data-row-key="Genomics"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Genomics').should('exist');
  });

  it('Lien Files de Whole Genome Sequencing du panneau Files', () => {
    cy.get('[id="files"] [data-row-key="Whole Genome Sequencing"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-0dxdyebh').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Whole Genome Sequencing').should('exist');
  });
});

describe('Page d\'un participant - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="profile"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="profile"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="profile"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="profile"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Family', () => {
    cy.get('[id="family"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="family"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="family"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="family"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="family"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Diagnoses', () => {
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="diagnosis"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="diagnosis"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Phenotypes', () => {
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="phenotype"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="phenotype"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="biospecimen"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="biospecimen"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="files"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="files"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="files"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="files"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="files"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
