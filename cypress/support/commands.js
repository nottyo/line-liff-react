// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('lineLoginWithoutSession', (email, password) => {
  // v1 without session cache
  const args = { email, password };
  cy.intercept({
    method: 'POST',
    url: 'https://api.line.me/oauth2/v2.1/token',
  }).as('createToken');
  cy.visit(Cypress.config('baseUrl'));
  cy.get('[data-testid="login"]').click();
  cy.origin('https://access.line.me', { args }, ({ email, password }) => {
    cy.get('input[type="text"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });
  // confirm that login is success!
  cy.wait('@createToken').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('lineLoginWithSession', (email, password) => {
  // v2 with session cache
  const args = { email, password };
  cy.intercept({
    method: 'POST',
    url: 'https://api.line.me/oauth2/v2.1/token',
  }).as('createToken');
  cy.session(
    // use email, password as a session cache key
    args,
    () => {
      cy.visit(Cypress.config('baseUrl'));
      cy.get('[data-testid="login"]').click();
      cy.origin('https://access.line.me', { args }, ({ email, password }) => {
        cy.get('input[type="text"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('button[type="submit"]').click();
      });
      // confirm that login is success!
      cy.wait('@createToken').its('response.statusCode').should('eq', 200);
    },
    {
      validate: () => {
        const accessTokenKey = `LIFF_STORE:${Cypress.env('LIFF_ID')}:accessToken`;
        expect(localStorage.getItem(accessTokenKey)).to.not.be.empty;
      },
    },
  );
});
