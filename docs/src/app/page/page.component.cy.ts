describe('should test docs page', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/#/getting-started');
    cy.get('h1').should('contain', 'Getting Started');
    cy.request('https://raw.githubusercontent.com/simptel/docs.simptel.com/main/docs/Getting%20Started/pre-requisits.md');
  });
});