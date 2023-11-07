describe('should input repo url', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/#/getting-started');
    cy.viewport(610, 900);
    cy.get('#showSidemenu').click();
    cy.get('input[name="repo-url"]').clear();
    cy.get('input[name="repo-url"]').type('https://github.com/simptel/docs.simptel.com', {force: true});
    cy.get('button').click({force: true});
  });
});