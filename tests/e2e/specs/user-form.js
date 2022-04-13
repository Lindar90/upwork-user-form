// https://docs.cypress.io/api/table-of-contents

describe('Save user form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has elements.', () => {
    cy.contains('User name');
    cy.contains('Country');
    cy.contains('Tax identifier');
    cy.contains('Save');
  });

  it('has validation.', () => {
    cy.get('[data-test="save-btn"]').click();

    cy.contains('Username must not be empty.');
    cy.contains('Country must be selected from the list.');
    cy.contains('Tax identifier must not be empty.');

    // TODO check min validation for username + tax validation
  });

  it('saves data.', () => {
    cy.get('[data-test="username"]').type('Denis');
    cy.get('[data-test="country"]').type('Belarus');
    cy.get('div').contains('Belarus').click();
    cy.get('[data-test="tax"]').type('12345');

    cy.get('[data-test="save-btn"]').click();

    cy.contains('Sending...');
    cy.contains('Successfully sent!!!');
  });
});
