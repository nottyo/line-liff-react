describe('Simple Line Login', () => {
  it('login without optimization', () => {
    const args = { email: Cypress.env('email'), password: Cypress.env('password') };
    cy.visit(Cypress.config('baseUrl'));
    cy.get('[data-testid="login"]').click();
    cy.origin('https://access.line.me', { args }, ({ email, password }) => {
      cy.get('input[type="text"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="displayName"]').should('have.text', 'displayName: Nott');
  });
});
