describe('should test sidemenu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#/getting-started');
    cy.viewport(610, 900);
    cy.get('#showSidemenu').click({force: true});
  });

  it('should test toggle theme', () => {
    cy.get('#toggleTheme').click({force: true});
    cy.wait(1000);
    cy.get('#toggleTheme').click({force: true});
    cy.get('#closeSidemenu').click({force: true});
  });

  it('should test navigation menu', () => {
    cy.get('input[name="repo-url"]').clear();
    cy.get('input[name="repo-url"]').type('https://github.com/simptel/docs.simptel.com', {force: true});
    cy.get('button').click({force: true});
    cy.get('#openMenu').click({force: true});
    cy.wait(1000);
    cy.get('#closeSidemenu').click({force: true});
  })
});