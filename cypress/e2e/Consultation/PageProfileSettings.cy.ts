/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitProfileSettingsPage();
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
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-primary"]').click({force: true});

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
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-primary"]').click({force: true});
  
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

describe('Page Profile Settings - Valider les liens disponibles', () => {
  it('Lien du bouton View profile', () => {
    cy.get('[class*="ProfileSettings_profileSettingsHeader"] button').click({force: true}); // data-cy="ViewProfileButton"
    cy.get('[class*="UserAvatar_userAvatarRound"]').should('exist'); // data-cy="AvatarHeader"
  });

  it('Bouton Discard changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="last_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="public_email"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="linkedin"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-text"]').click({force: true});
    
    cy.get('input[id="first_name"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="last_name"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="linkedin"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="public_email"]').should('not.have.attr', 'value', 'Discard');
  });

  it('Checkbox Other de la section Role & Affiliation', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').check({force: true}).should('be.checked');
  
    cy.get('label[for="other_role"]').should('exist');
    cy.get('input[id="other_role"]').should('exist');
  });

  it('Checkbox No Affiliation de la section Role & Affiliation', () => {
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');

    cy.get('input[id="affiliation"]').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="form_withCustomHelp"]').eq(1).contains('Provide institutional or organizational affiliation').should('exist');
  });

  it('Bouton Discard changes de la section Role & Affiliation', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="researcher"]').uncheck({force: true}).should('not.be.checked');
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');
    cy.get('textarea[id="research_area_description"]').clear({force: true}).type('Discard', {force: true}).contains('Discard').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-text"]').click({force: true});
    
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="researcher"]').should('be.checked');
    cy.get('input[id="no_affiliation"]').should('be.checked');
    cy.get('textarea[id="research_area_description"]').should('not.have.attr', 'placeholder').contains(/^$/).should('exist');
  });

  it('Checkbox Other de la section Research & Data Use', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').check({force: true}).should('be.checked');
  
    cy.get('label[title="Please specify your use"]').should('exist');
    cy.get('textarea[id="other_data_use"]').should('exist');
  });

  it('Bouton Discard changes de la section Research & Data Use', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').should('not.be.checked');
  });

  it('Lien Privacy Policy de la section Newsletter', () => {
    cy.get('[class*="Newsletter_allFieldRequiredNotice"] [href]').should('have.attr', 'href', 'https://includedcc.org/policies');
  });

  it('Checkbox Agree de la section Newsletter', () => {
    cy.get('input[id="newsletter_subscription_status"]').check({force: true}).should('be.checked');
    cy.get('label[title="Which email address should we use?"]').should('exist');
    cy.get('input[id="newsletter_email"]').should('exist');
  });

  it('Bouton Discard changes de la section Newsletter', () => {
    cy.get('input[id="newsletter_subscription_status"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-text"]').click({force: true});
    
    cy.get('input[id="newsletter_subscription_status"]').should('not.be.checked');
    cy.get('label[title="Which email address should we use?"]').should('not.exist');
    cy.get('input[id="newsletter_email"]').should('not.exist');
  });

  it('Bouton Delete my account de la section Delete Account', () => {
    cy.get('button[class*="ant-btn-dangerous"]').click({force: true});
    
    cy.get('[class="ant-modal-content"]').contains('Delete Account').should('exist');
    cy.get('[class="ant-modal-content"]').contains('Are you sure you want to permanently delete this account?').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-primary ant-btn-dangerous"]').contains('Delete').should('exist');

    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class="ant-modal-content"]').should('not.exist');
  });

  it('Bouton Save changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('FirstNameEdit', {force: true}).should('have.attr', 'value', 'FirstNameEdit');
    cy.get('input[id="last_name"]').clear({force: true}).type('LastNameEdit', {force: true}).should('have.attr', 'value', 'LastNameEdit');
    cy.get('input[id="public_email"]').clear({force: true}).type('email@edit.com', {force: true}).should('have.attr', 'value', 'email@edit.com');
    cy.get('input[id="linkedin"]').clear({force: true}).type('https://www.linkedin.com/in/edit/', {force: true}).should('have.attr', 'value', 'https://www.linkedin.com/in/edit/');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-primary"]').click({force: true});
    cy.visitProfileViewPage();
    
    cy.get('body').contains('FirstNameEdit').should('exist');
    cy.get('body').contains('LastNameEdit').should('exist');
    cy.get('[href="mailto:email@edit.com"]').should('exist');
    cy.get('[href="https://www.linkedin.com/in/edit/"]').should('exist');
  });

  it('Bouton Save changes de la section Role & Affiliation', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('input[id="other_role"]').clear({force: true}).type('OtherRoleEdit', {force: true}).should('have.attr', 'value', 'OtherRoleEdit');
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');
    cy.get('input[id="affiliation"]').clear({force: true}).type('AffiliationEdit', {force: true}).should('have.attr', 'value', 'AffiliationEdit');
    cy.get('textarea[id="research_area_description"]').clear({force: true}).type('ResearchAreaEdit', {force: true}).contains('ResearchAreaEdit').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-primary"]').click({force: true});
    cy.visitProfileViewPage();
    
    cy.get('body').contains('OtherRoleEdit').should('exist');
    cy.get('body').contains('AffiliationEdit').should('exist');
    cy.get('body').contains('ResearchAreaEdit').should('exist');
  });

  it('Bouton Save changes de la section Research & Data Use', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('textarea[id="other_data_use"]').clear({force: true}).type('ResearchDataEdit', {force: true}).contains('ResearchDataEdit').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-primary"]').click({force: true});
    cy.visitProfileViewPage();

    cy.get('body').contains('ResearchDataEdit').should('exist');
  });

  //Ne fonctionne pas, le checkbox se décoche au Save changes
  it.skip('Bouton Save changes de la section Newsletter', () => {
    cy.intercept('PUT', '**/subscribe', {
      statusCode: 200,
      body: { success: true, message: 'Subscription successful' },
    }).as('subscribeNewsletter');

    cy.get('input[id="newsletter_subscription_status"]').check({force: true}).should('be.checked');
    cy.get('input[id="newsletter_email"]').clear({force: true}).type('test@subscription.com', {force:true}).should('have.attr', 'value', 'test@subscription.com');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-primary"]').click();
    cy.wait('@subscribeNewsletter').its('response.statusCode').should('eq', 200);
    cy.visitProfileSettingsPage();

    cy.get('input[id="newsletter_subscription_status"]').should('be.checked');
    cy.get('input[id="newsletter_email"]').should('have.attr', 'value', 'test@subscription.com');
  });
});

