describe('News PWA', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:62443/');
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

    // it('should render 20 articles if I write `México` in the search field', () => {
    //     const resultText = `Se encontraron 20 resultados de "México". `;
        
    //     cy.get('#search').should('exist');
    //     cy.get('#search').clear().type('México{enter}');

    //     // cy.get('#results').should('have.value', resultText)
    //     //cy.get('main').find('.article').should('have.length', 20)
    // })

    it('should render 10 articles when I use select', () => {
        const resultText = `Se encontraron 20 resultados de "México". `;
        
        cy.get('#sourceSelector').should('exist');
        cy.get('#sourceSelector').select('ANSA.it')
    })
});