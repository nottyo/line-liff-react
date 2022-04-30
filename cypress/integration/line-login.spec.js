describe('Line Login', () => {
  it('do line login', () => {
    // given
    cy.visit(Cypress.config('baseUrl'));
    // when
    cy.get('[data-testid="login"]').click();
    cy.origin('https://access.line.me', () => {
      cy.log('in secondary origin');
      cy.get('input[type="text"]').type('melodythqaios@gmail.com');
      cy.get('input[type="password"]').type('thqaat1234!');
      cy.get('button[type="submit"]').click();
    });
  });
});
