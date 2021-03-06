describe('simple login', () => {
  beforeEach(() => {
    // do login before each test case so number of login = number of test cases
    cy.lineLoginWithoutSession(Cypress.env('email'), Cypress.env('password'));
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
