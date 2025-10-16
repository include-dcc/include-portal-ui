/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.login();
  cy.visitProfileSettingsPage();
  cy.waitWhileSpin(oneMinute);
});

describe('Page Profile Settings - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="Settings_profileSettingsHeader"]').contains('Profile Settings');
  });

  it('Section Identification - Bannière', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('[class*="ant-alert-info"]').contains('You are authenticated with using . This email is never shown to the public and cannot be changed.').should('exist');
  });

  it('Section Identification - Champs', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('Cypress', {force: true});
    cy.get('input[id="last_name"]').clear({force: true}).type('Test', {force: true});
    cy.get('input[id="public_email"]').clear({force: true});
    cy.get('input[id="linkedin"]').clear({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-primary"]').click({force: true});
  
    cy.get('label[for="first_name"]').contains('First Name').should('exist');
    cy.get('input[id="first_name"]').should('have.attr', 'value', 'Cypress').should('have.attr', 'placeholder', 'Your First Name');

    cy.get('label[for="last_name"]').contains('Last Name').should('exist');
    cy.get('input[id="last_name"]').should('have.attr', 'value', 'Test').should('have.attr', 'placeholder', 'Your Last Name');

    cy.get('label[for="public_email"]').contains('Public Email').should('exist');
    cy.get('label[for="public_email"]').contains('(optional)').should('exist');
    cy.get('input[id="public_email"]').should('have.attr', 'value', '').should('have.attr', 'placeholder', 'email@domain.com');

    cy.get('label[for="public_email"] [class*="anticon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[class="ant-popover-inner"]').contains('This email will be displayed on your profile page and accessible to all logged-in users of the portal.').should('exist');

    cy.get('label[for="linkedin"]').contains('LinkedIn').should('exist');
    cy.get('label[for="linkedin"]').contains('(optional)').should('exist');
    cy.get('input[id="linkedin"]').should('have.attr', 'value', '').should('have.attr', 'placeholder', 'https://www.linkedin.com/in/username/');

    cy.get('button[class*="Identification_removeImageButton"]').should('not.exist');
  });

  it('Section Role & Affiliation - Champs', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="researcher"]').check({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').uncheck({force: true});
    cy.get('input[id="no_affiliation"]').check({force: true});
    cy.get('textarea[id="research_area_description"]').clear({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-primary"]').click({force: true});

    cy.get('label[for="roles"]').contains('I am a').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-group"]').contains('Check all that apply').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(0).contains('Researcher at an Academic or not-for-profit Institution').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(1).contains('Representative from a for-profit or Commercial Entity').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(2).contains('Tool or Algorithm Developer').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(3).contains('Clinician').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(4).contains('Community Member').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(5).contains('Federal Employee').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(6).contains('Other').should('exist');

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="researcher"]').should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="representative"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="developer"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="clinician"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="community_member"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="federal_employee"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').should('not.be.checked');
  
    cy.get('label[for="other_role"]').should('not.exist');
    cy.get('input[id="other_role"]').should('not.exist');

    cy.get('label[title="I am affiliated with"]').contains('I am affiliated with').should('exist');
    cy.get('input[id="affiliation"]').should('not.exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="form_withCustomHelp"]').eq(1).contains('I do not have an institutional affiliation').should('exist');
    cy.get('input[id="no_affiliation"]').should('be.checked');

    cy.get('label[title="My research area or area of interest may best be described as"]').contains('My research area or area of interest may best be described as').should('exist');
    cy.get('label[title="My research area or area of interest may best be described as"]').contains('(optional)').should('exist');
    cy.get('[class*="form_researchAreaField"]').contains('Provide a brief description and a link to your professional biography or organization website, if available').should('exist');
    cy.get('textarea[id="research_area_description"]').should('not.have.attr', 'placeholder').contains(/^$/).should('exist');
  });

  it('Section Research & Data Use - Champs', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="learn_more_about_down_syndrome"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').uncheck({force: true}).should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});

    cy.get('label[for="data_use"]').contains('I intend to use the INCLUDE Portal data for:').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-group"]').contains('Check all that apply').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(0).contains('Learning more about Down syndrome and its health outcomes, management, and/or treatment').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(1).contains('Helping me design a new research study').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(2).contains('Identifying datasets that I want to analyze').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(3).contains('Commercial purposes').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(4).contains('Other').should('exist');

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="learn_more_about_down_syndrome"]').should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="help_design_new_research_study"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="identifying_dataset"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="commercial_purpose"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').should('not.be.checked');
  
    cy.get('label[title="Please specify your use"]').should('not.exist');
    cy.get('textarea[id="other_data_use"]').should('not.exist');
  });

  it('Section Newsletter - Champs', () => {
    cy.get('input[id="newsletter_subscription_status"]').uncheck({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
  
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).contains('By subscribing to our newsletter, you agree to be added to our email list, through which you will receive periodic portal updates, important announcements, promotions, and relevant information. You can unsubscribe anytime by clicking the \'unsubscribe\' link in our emails. You can review our INCLUDE DCC privacy policy.').should('exist');

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('label[class*="ant-checkbox-wrapper"]').contains('I agree to receive the INCLUDE Data Hub quarterly newsletter to get the latest news.').should('exist');
    cy.get('input[id="newsletter_subscription_status"]').should('not.be.checked');
    cy.get('label[title="Which email address should we use?"]').should('not.exist');
    cy.get('input[id="newsletter_email"]').should('not.exist');
  });

  it('Section Delete Account - Champs', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(4).contains('You will no longer be able to sign into the INCLUDE data portal. All of your saved sets and queries will be lost. You can create a new account at any time.').should('exist');
    cy.get('button[class*="ant-btn-dangerous"]').contains('Delete my account').should('exist');
  });
});
