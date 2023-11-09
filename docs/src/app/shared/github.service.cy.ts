describe('should test github service', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/#/getting-started');

    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs').as('docs');
    cy.get('@docs').should((response) => { });

    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs/Getting Started').as('getting-started');
    cy.get('@getting-started').should((response) => { });
  });
});