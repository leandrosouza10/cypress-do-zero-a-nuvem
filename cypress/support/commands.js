Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
        cy.get('[name="firstName"]').type(data.firstName)
        cy.get('[id="lastName"]').type(data.lastName)     
        cy.get('[id="email"]').type(data.email)         
        cy.get('[name="open-text-area"]').type(data.text) 
        cy.get('button[type="submit"]').click()
})