describe('404 Page Test', () => {
    it('should display 404 page for non-existent routes', () => {
        // Visit a random non-existent URL
        cy.visit('/non-existent-page-12345');

        // Check for 404 text
        cy.contains('404').should('be.visible');
        cy.contains('Page Not Found').should('be.visible');

        // Check for "Go to Homepage" button and click it
        cy.contains('Go to Homepage').click();

        // Verify we are back on the homepage
        // The default route is / or /user/home depending on implementation, checking for "New This week" which is on Home
        cy.location('pathname').should('eq', '/');
        cy.contains('New This week').should('be.visible');
    });
});
