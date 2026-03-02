describe('Autoflex ERP - Production Flow', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should redirect to the Products screen by default', () => {
    cy.url().should('include', '/raw-materials');
    cy.contains('Raw Materials Catalog').should('be.visible');
  });

  it('Should open the New Raw Material modal', () => {
    cy.visit('/raw-materials');
    
    cy.contains('button', 'New Raw Material').click();
    

    cy.get('.MuiDialog-paper', { timeout: 6000 }).should('be.visible');
    cy.contains('h2', 'New Raw Material').should('be.visible');
    
    cy.contains('button', 'Cancel').click();
  });

  it('Should navigate to the Products and Formulas screen and verify the listing', () => {

    cy.get('.MuiDrawer-paper').contains('Products and Formulas').click();
    
    cy.url().should('include', '/products');
    cy.contains('Products and Formulas').should('be.visible');
    
    cy.contains('button', 'New Product').should('be.visible');
    
    cy.get('table').should('be.visible');
    cy.contains('th', 'Product').should('be.visible');
  });

  it('Should navigate to the Production Suggestion screen and recalculate the plan', () => {

    cy.get('.MuiDrawer-paper').contains('Production Suggestion').click();
    
    cy.url().should('include', '/production');
    cy.contains('Production Suggestion Plan').should('be.visible');
    
    cy.contains('button', 'Recalculate Plan').click();
    
    cy.contains('Estimated Gross Revenue').should('be.visible');
    
    cy.contains('Items for Manufacturing').should('be.visible');
  });
});