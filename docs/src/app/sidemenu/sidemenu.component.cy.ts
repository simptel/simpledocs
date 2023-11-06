describe('should test sidemenu', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/#/getting-started');
  });

  it('should test side menu', () => {
    cy.visit('http://localhost:4200/#/getting-started');
    cy.viewport(610, 900);
    cy.get('#showSidemenu').click({force: true});
    cy.get('#toggleTheme').click({force: true});
    cy.get('#closeSidemenu').click({force: true});
  });
});