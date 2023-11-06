import { environment } from "src/environments/environment";

describe('should test app', () => {
  it('passes', () => {
    let title = 'SimpleDocs';
    cy.visit('http://localhost:4200/#/getting-started');
    expect(title).to.equal(environment.title);
  });
});