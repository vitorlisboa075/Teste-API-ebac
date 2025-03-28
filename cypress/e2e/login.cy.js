/// <reference types="cypress" />

describe('Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "email45495@example.com",
                "password": "teste" 
            }
        }).then((response) => {
            cy.log(response.body.authorization)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.status).to.equal(200)

        })
    });

});
