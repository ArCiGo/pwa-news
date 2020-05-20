describe('News PWA', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render a `"<header>"` element', () => {
        cy.get('header').should('exist');
    });

    it('should render a `"<h1>"`, `"<input>"` and a `"<select>"` elements', () => {
        cy.get('h1').should('exist');
        cy.get('#search').should('exist');
        cy.get('#sourceSelector').should('exist');
    });

    it('should render 10 articles inside of a `"<div>"` element', () => {
        cy.get('main').find('.article').should('have.length', 10)
    });

    it('should render 10 articles when I interact with <select> tag', () => {        
        cy.get('#sourceSelector').should('exist');
        cy.get('#sourceSelector').select('ANSA.it')
        cy.get('main').find('.article').should('have.length', 10)
    });

    it('should render results', () => {
        const search = "México";
        const resultsText = "Se encontraron 20 resultados de \"" + search + "\".";

        cy.get('#search').should('exist');
        cy.get('#search').clear().type(search+'{enter}')
          .trigger('search');

        cy.get('#results').should('exist');
        cy.get('#results').contains(resultsText);
        cy.get('main').find('.article').should('have.length', 20);
      });
});