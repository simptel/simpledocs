describe('should test sidemenu', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/#/getting-started');
    cy.get('#openMenu').click({force: true});
    cy.get('#toggleTheme').click({force: true});
    cy.get('#showSidemenu').click({force: true});
    cy.get('#closeSidemenu').click({force: true});
  });
});