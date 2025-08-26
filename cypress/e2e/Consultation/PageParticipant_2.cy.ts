/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntityMock();
});

describe('Page d\'un participant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('pt-as0aepqm');
  });

  it('Panneau Summary', () => {
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('1'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(0).contains('Study'); // data-cy="SummaryHeader_Studies_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains('2'); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(1).contains('Biospecimens'); // data-cy="SummaryHeader_Biospecimens_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('4'); // data-cy="SummaryHeader_Files_Button"
    cy.get('a[class*="SummaryHeader_link"]').eq(2).contains('Files'); // data-cy="SummaryHeader_Files_Button"
    cy.get('[id="summary"] [class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('pt-as0aepqm').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Ext. Participant ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('HTP0577').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('The Human Trisome Project (HTP)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('dbGaP').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('phs002981').should('exist');
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
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(3).contains('T21').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(4).contains('Age at First Patient Engagement').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(4).contains('28').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(4).contains('years').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(4).contains('139').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(4).contains('days').should('exist');
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
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(0).contains('pt-as0aepqm').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(1).contains('Proband').should('exist');
    cy.get('[data-row-key="pt-as0aepqm"] td[class="ant-table-cell"]').eq(2).contains('T21').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(0).contains('pt-v66khv4x').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="pt-v66khv4x"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(0).contains('pt-0dxdyebh').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="pt-0dxdyebh"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(0).contains('pt-cw432mnt').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(1).contains('Sibling').should('exist');
    cy.get('[data-row-key="pt-cw432mnt"] td[class="ant-table-cell"]').eq(2).contains('D21').should('exist');
  });
  
  it('Panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"] [class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains('2').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(3).contains('MONDO Term').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(0).contains('Hypothyroidism').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(0).contains('0005420').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(1).contains('Hypothyroidism').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(2).contains('13').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(2).contains('years').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(2).contains('251').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(2).contains('days').should('exist');
    cy.get('[data-row-key="HTP0577.Hypothyroidism.HP:0000821.MONDO:0005420.NA"] td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(0).contains('Congenital heart disease').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(0).contains('0005453').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(1).contains('Congenital heart defect (CHD) - any').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(2).contains('16').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(2).contains('years').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(2).contains('156').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(2).contains('days').should('exist');
    cy.get('[data-row-key="HTP0577.Congenital heart defect (CHD) - any.HP:0001627.MONDO:0005453.NA"] td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
  });
  
  it('Panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] [class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains('2').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(0).contains('Phenotype (HPO)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(1).contains('Condition (Source Text)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(2).contains('Age').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(3).contains('HPO Term').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Atrial septal defect').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('0001631').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Atrial septal defect (ASD)').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('1').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('year').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('134').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('days').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('Abnormal heart morphology').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('0001627').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('Congenital heart defect (CHD) - any').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('1').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('year').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('234').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('days').should('exist');
    cy.get('[id="phenotype"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(3).contains(/\d{1}/).should('exist');
  });
  
  it('Panneau Measurements (sans measurement)', () => {
    cy.visitParticipantEntity('PT_05Y917GY', 2);
    cy.get('[id="measurement"]').should('not.exist');
  });
  
  it('Panneau Measurements (avec measurements)', () => {
    cy.resetColumns('measurement');
    cy.get('[id="measurement"] [class*="EntityTable_title"]').contains('Measurement').should('exist');
    cy.get('[id="measurement"] [class="ant-collapse-header"]').contains('Measurement').should('exist');
    cy.get('[id="measurement"] [class="ant-collapse-header"]').contains('2').should('exist');
    cy.get('[id="measurement"] [class="ant-collapse-header"]').contains('View in exploration').should('not.exist');
    cy.get('[id="measurement"] [class="ant-collapse-header"] svg[class="anticon"]').should('not.exist');
    cy.get('[id="measurement"] thead th[class="ant-table-cell"]').eq(0).contains('Type').should('exist');
    cy.get('[id="measurement"] thead th[class="ant-table-cell"]').eq(1).contains('LOINC').should('exist');
    cy.get('[id="measurement"] thead th[class="ant-table-cell"]').eq(2).contains('Value').should('exist');
    cy.get('[id="measurement"] thead th[class="ant-table-cell"]').eq(3).contains('Unit').should('exist');
    cy.get('[id="measurement"] thead th[class="ant-table-cell"]').eq(4).contains('Age').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Vital Signs').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Body height').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('LOINC').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('8302-2').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('57.52').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('inches').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('2').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('years').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('269').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('days').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('Vital Signs').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('Body mass index (BMI)').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('LOINC').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('39156-5').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('32.67').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(3).contains('kg/m2').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('5').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('years').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('173').should('exist');
    cy.get('[id="measurement"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('days').should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] [class*="BiospecimenTable_tabs"] [data-node-key="table"]').clickAndWait({force: true});
    cy.resetColumns('biospecimen');
    cy.showColumn(/^Volume$/);
    cy.showColumn('Volume Unit');
    cy.showColumn('Sample Availability');
    cy.showColumn('Laboratory Procedure');
    cy.showColumn('Biospecimen Storage');
    cy.showColumn('Parent Sample ID');
    cy.showColumn('Parent Sample Type');
    cy.get('[id="biospecimen"] [class*="EntityCustomContent_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('2').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(0).contains('Sample ID').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(1).contains('Collection ID').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(2).contains('Container ID').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(3).contains('Sample Type').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(4).contains('Collection Sample Type').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(5).contains('Age').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(6).contains('Volume').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(7).contains('Volume Unit').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(8).contains('Sample Availability').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(9).contains('Laboratory Procedure').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(10).contains('Biospecimen Storage').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(11).contains('Parent Sample ID').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] thead th').eq(12).contains('Parent Sample Type').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('bs-fjdditnwrr').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('bs-7zahnqfgir').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('bs-nqz2w826hr').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('RNA').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('Peripheral Whole Blood').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('years').should('not.exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('256').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('days').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(6).contains('42').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).contains('ml').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).contains('No').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(9).contains('Qiagen PAXgene Blood RNA Kit').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(10).contains('-80C Freezer').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(11).contains('bs-cxwczc3k88').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(12).contains('RNA').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('bs-cxwczc3k88').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('bs-7zahnqfgir').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('bs-9twfdnytke').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(3).contains('RNA').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(4).contains('Peripheral Whole Blood').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(5).contains('1').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(5).contains('year').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(5).contains('90').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(5).contains('days').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(6).contains('21').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(7).contains('ml').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(8).contains('Yes').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(9).contains('PAXgene Blood RNA Tube').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(10).contains('-80C Freezer').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(11).contains('bs-7zahnqfgir').should('exist');
    cy.get('[class*="BiospecimenTable_contentTable"] tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(12).contains('Peripheral Whole Blood').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="files"] [class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains('Data File').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains('4').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('[id="files"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="files"] [class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Category').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(0).contains('Data Category').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=4)').should('exist');
    cy.get('[id="files"] [data-row-key="Genomics"] td[class="ant-table-cell"]').eq(1).contains('0').should('exist');
    cy.get('[id="files"] [data-row-key="Genomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Transcriptomics"] td[class="ant-table-cell"]').eq(1).contains('2').should('exist');
    cy.get('[id="files"] [data-row-key="Transcriptomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');

    cy.get('[id="files"] [class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(0).contains('Experimental Strategy').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="files"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=4)').should('exist');
    cy.get('[id="files"] [data-row-key="Whole Genome Sequencing"] td[class="ant-table-cell"]').eq(1).contains('0').should('exist');
    cy.get('[id="files"] [data-row-key="Whole Genome Sequencing"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="RNA-Seq"] td[class="ant-table-cell"]').eq(1).contains('0').should('exist');
    cy.get('[id="files"] [data-row-key="RNA-Seq"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="BCRseq"] td[class="ant-table-cell"]').eq(1).contains('2').should('exist');
    cy.get('[id="files"] [data-row-key="BCRseq"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="TCRseq"] td[class="ant-table-cell"]').eq(1).contains('2').should('exist');
    cy.get('[id="files"] [data-row-key="TCRseq"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="Multiplex Immunoassay"] td[class="ant-table-cell"]').eq(1).contains('0').should('exist');
    cy.get('[id="files"] [data-row-key="Multiplex Immunoassay"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="files"] [data-row-key="LCMS Metabolomics"] td[class="ant-table-cell"]').eq(1).contains('0').should('exist');
    cy.get('[id="files"] [data-row-key="LCMS Metabolomics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
  });
});
