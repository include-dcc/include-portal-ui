/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.login();
  cy.visitProfileSettingsPage();
  cy.waitWhileSpin(oneMinute);
});

describe('Page Profile Settings - Valider les liens disponibles', () => {
  it('Lien du bouton View profile', () => {
    cy.get('[class*="ProfileSettings_profileSettingsHeader"] button').clickAndWait({force: true}); // data-cy="ViewProfileButton"
    cy.get('[class*="UserAvatar_userAvatarRound"]').should('exist'); // data-cy="AvatarHeader"
  });

  it('Bouton Discard changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="last_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="public_email"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="linkedin"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-text"]').clickAndWait({force: true});
    
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
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-text"]').clickAndWait({force: true});

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
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-text"]').clickAndWait({force: true});
    
    cy.get('input[id="newsletter_subscription_status"]').should('not.be.checked');
    cy.get('label[title="Which email address should we use?"]').should('not.exist');
    cy.get('input[id="newsletter_email"]').should('not.exist');
  });

  it('Bouton Delete my account de la section Delete Account', () => {
    cy.get('button[class*="ant-btn-dangerous"]').clickAndWait({force: true});
    
    cy.get('[class="ant-modal-content"]').contains('Delete Account').should('exist');
    cy.get('[class="ant-modal-content"]').contains('Are you sure you want to permanently delete this account?').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-primary ant-btn-dangerous"]').contains('Delete').should('exist');

    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-content"]').should('not.exist');
  });

  it('Bouton Save changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('FirstNameEdit', {force: true}).should('have.attr', 'value', 'FirstNameEdit');
    cy.get('input[id="last_name"]').clear({force: true}).type('LastNameEdit', {force: true}).should('have.attr', 'value', 'LastNameEdit');
    cy.get('input[id="public_email"]').clear({force: true}).type('email@edit.com', {force: true}).should('have.attr', 'value', 'email@edit.com');
    cy.get('input[id="linkedin"]').clear({force: true}).type('https://www.linkedin.com/in/edit/', {force: true}).should('have.attr', 'value', 'https://www.linkedin.com/in/edit/');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
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
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
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

  it('Bouton Save changes de la section Newsletter', () => {
    cy.intercept('PUT', '**/subscribe', {
      statusCode: 200,
      body: { success: true, message: 'Subscription successful' },
    }).as('subscribeNewsletter');

    cy.get('input[id="newsletter_subscription_status"]').check({force: true}).should('be.checked');
    cy.get('input[id="newsletter_email"]').clear({force: true}).type('test@subscription.com', {force:true}).should('have.attr', 'value', 'test@subscription.com');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).find('button[class*="ant-btn-primary"]').clickAndWait();
    cy.wait('@subscribeNewsletter').its('response.statusCode').should('eq', 200);
  });
});
