describe('login with session', () => {
  beforeEach(() => {
    // login once for all test cases and preserve its login session.
    cy.lineLoginWithSession(Cypress.env('email'), Cypress.env('password'));
    cy.visit(Cypress.config('baseUrl'));
  });

  it('render profileUrl', () => {
    cy.get('img[alt="profileUrl"]').should('be.visible');
  });

  it('render displayName', () => {
    cy.get('[data-testid="displayName"]').should('have.text', 'displayName: Nott');
  });

  it('render logout button', () => {
    cy.get('[data-testid="logout"]').should('be.visible');
  });
});
