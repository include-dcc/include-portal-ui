/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

describe('Navigation', () => {

  beforeEach(() => {
    cy.login();
  });

  it('Boutons de la header', () => {
    cy.visitDashboard();
    cy.get('[class*="Dashboard_greeting"]').should('exist'); // data-cy="Title_Dashboard"

    cy.get('button[class*="HeaderLink_headerBtn"]').eq(1).clickAndWait(); // data-cy="HeaderLink_Studies"
    cy.get('[class*="PageContent_title"]').contains('Studies').should('exist'); // data-cy="Title_Studies"

    cy.get('button[class*="HeaderLink_headerBtn"]').eq(2).clickAndWait(); // data-cy="HeaderLink_Data Exploration"
    cy.get('[class*="DataExploration_title"]').should('exist'); // data-cy="Title_DataExploration"

    cy.get('button[class*="HeaderLink_headerBtn"]').eq(3).clickAndWait(); // data-cy="HeaderLink_Variants"
    cy.get('[class*="PageContent_pageHeaderTitle"]').contains('Variants Exploration').should('exist'); // data-cy="Title_Variants"

    cy.get('button[class*="HeaderLink_headerBtn"]').eq(4).clickAndWait(); // data-cy="HeaderLink_Community"
    cy.get('[class*="Community_title"]').should('exist'); // data-cy="Title_Community"

    cy.get('[class*="Header_userName"]').clickAndWait({force: true}); // data-cy="UserName"
    cy.get('[data-menu-id*="profile_settings"] [href]').clickAndWait({force: true});
    cy.get('[class*="ProfileSettings_profileSettingsHeader"]').should('exist'); // data-cy="Title_ProfileSettings"
  });

  it('Lien externe de la header - Website', () => {
    cy.visitDashboard();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[class*="Header_resources_"]').clickAndWait({force: true}); // data-cy="Menu_Website"
    cy.get('[data-menu-id*="website"] [href]').clickAndWait({force: true}); // data-cy="MenuLink_Website"
    cy.get("@windowOpen").should('be.calledWith', 'https://includedcc.org/');
  });

  it('Lien externe de la header - Help', () => {
    cy.visitDashboard();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[class*="Header_resources_"]').clickAndWait({force: true}); // data-cy="Menu_Help"
    cy.get('[data-menu-id*="help"] [href]').clickAndWait({force: true}); // data-cy="MenuLink_Help"
    cy.get("@windowOpen").should('be.calledWith', 'https://help.includedcc.org/docs/quick-start-guide');
  });

  it('Lien externe de la header - Forum', () => {
    cy.visitDashboard();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[class*="Header_resources_"]').clickAndWait({force: true}); // data-cy="Menu_Forum"
    cy.get('[data-menu-id*="forum"] [href]').clickAndWait({force: true}); // data-cy="MenuLink_Forum"
    cy.get("@windowOpen").should('be.calledWith', 'https://help.includedcc.org/discuss');
  });

  it('Lien externe de la header - Contact', () => {
    cy.visitDashboard();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[class*="Header_resources_"]').clickAndWait({force: true}); // data-cy="Menu_Contact"
    cy.get('[data-menu-id*="contact"] [href]').clickAndWait({force: true}); // data-cy="MenuLink_Contact"
    cy.get("@windowOpen").should('be.calledWith', 'https://app.smartsheet.com/b/form/514745159a004c2e987fff0aa16ceaac');
  });

  it('Redirections de la page Dashboard', () => {
    cy.visitDashboard();
    cy.get('[class*="LinkBox_dataExploBox"]').eq(0).clickAndWait({force: true}); // data-cy="GridCard_Studies"
    cy.get('[class*="PageContent_title"]').contains('Studies').should('exist'); // data-cy="Title_Studies"

    cy.visitDashboard();
    cy.get('[class*="LinkBox_dataExploBox"]').eq(1).clickAndWait({force: true}); // data-cy="GridCard_Participants"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"

    cy.visitDashboard();
    cy.get('[class*="LinkBox_dataExploBox"]').eq(2).clickAndWait({force: true}); // data-cy="GridCard_Biospecimens"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"

    cy.visitDashboard();
    cy.get('[class*="LinkBox_dataExploBox"]').eq(3).clickAndWait({force: true}); // data-cy="GridCard_DataFiles"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
  });

  it('Modals de la page Dashboard [SJIP-347]', () => {
    cy.visitDashboard();
    cy.get('[class*="ListItem_savedSetListItem"] svg[data-icon="edit"]').eq(0).clickAndWait({force: true}); // data-cy="SavedSets"
    cy.contains('Edit set').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[class*="ListItem_savedSetListItem"] svg[data-icon="delete"]').eq(0).clickAndWait({force: true}); // data-cy="SavedSets"
    cy.contains('Permanently delete this set?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').clickAndWait({force: true});

    cy.visitDashboard();
    cy.get('[class*="ListItemWithActions"] svg[data-icon="edit"]').eq(0).clickAndWait({force: true}); // data-cy="SavedFilters"
    cy.contains('Edit filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[class*="ListItemWithActions"] svg[data-icon="delete"]').eq(0).clickAndWait({force: true}); // data-cy="SavedFilters"
    cy.contains('Permanently delete this filter?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').clickAndWait({force: true});
  });

  it('Onglets de la page Data Exploration', () => {
    cy.visitDataExploration('participants');

    cy.get('[role="tablist"] [data-node-key="datafiles"]').clickAndWait({force: true}); // data-cy="Tab_DataFiles"
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    
    cy.get('[role="tablist"] [data-node-key="biospecimens"]').clickAndWait({force: true}); // data-cy="Tab_Biospecimens"
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"

    cy.get('[role="tablist"] [data-node-key="participants"]').clickAndWait({force: true}); // data-cy="Tab_Participants"
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"

    cy.get('[role="tablist"] [data-node-key="summary"]').click({force: true});
    cy.waitWhileSpin(3*oneMinute);
    cy.get('[aria-label="Demographics"]').should('exist');
  });

  it('Modals de la page Data Exploration', () => {
    cy.visitDataExploration('participants');

    // Facettes
    cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});

    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-header"]').contains('Participant').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Phenotype (HPO)').clickAndWait({force: true});
    cy.get('[class*="ant-modal-header"]').contains('Observed Phenotype (HPO) Browser').should('exist'); // data-cy="TreeFacet_Modal_hpoTree"
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Diagnosis (MONDO)').clickAndWait({force: true});
    cy.get('[class*="ant-modal-header"]').contains('Diagnosis (MONDO) Browser').should('exist'); // data-cy="TreeFacet_Modal_mondoTree"
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});

    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-header"]').contains('Sample').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Data File"]').clickAndWait({force: true});

    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-header"]').contains('File').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Query Builder
    cy.get('button[class*="Header_iconBtnAction"]').clickAndWait({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Manage my filters
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').clickAndWait({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').clickAndWait({force: true});
    cy.contains('Manage filters').should('exist');
    cy.contains('Close').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Onglet Data Files
    cy.visitDataExploration('datafiles');
    cy.get('[class*="ant-table-row"]').eq(0).find('input[type="checkbox"]').check({force: true});
  });
 
  it('Modals de la page des variants', () => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').clickAndWait({force: true});

    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-header"]').contains('gene').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('button[class*="Header_iconBtnAction"]').clickAndWait({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page d\'un fichier', () => {
    cy.visitFileEntity('HTP.1730dafb-464b-4aa6-b2dc-35f729cbdb2d.CGP.filtered.deNovo.vep.vcf.gz');

    cy.get('[data-icon="cloud-upload"]').clickAndWait({force: true});
    cy.contains(/(Connect to Cavatica|Analyze in Cavatica)/).should('exist');
    cy.get('button[class*="ant-btn-default"]').invoke('click');
  });
 
  it('Liens de la page Profile', () => {
    cy.visitProfileViewPage();
    cy.get('[class*="Member_bannerActions"] [href]').eq(1).clickAndWait({force: true}); // data-cy="EditProfileButton"
    cy.get('[class*="ProfileSettings_profileSettingsHeader"]').should('exist'); // data-cy="Title_ProfileSettings"

    cy.get('[class*="ProfileSettings_profileSettingsHeader"] button').clickAndWait({force: true}); // data-cy="ViewProfileButton"
    cy.get('[class*="Member_bannerActions"] [href]').eq(0).clickAndWait({force: true}); // data-cy="CommunityButton"
    cy.get('[class*="Community_title"]').should('exist'); // data-cy="Title_Community"
  });
 
  it('Liens de la page Community', () => {
    cy.visitCommunityPage();
    cy.get('[class*="MemberCard_memberLink"]').eq(0).clickAndWait({force: true}); // data-cy="MemberCard"
    cy.get('[class*="UserAvatar_userAvatarRound"]').should('exist'); // data-cy="AvatarHeader"
  });

});
