/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contracts'
describe('Testes da Funcionalidade Usuarios', () => {
  let token
  beforeEach(() => {
    cy.token('email45495@example.com', 'teste').then(tkn => { 
      token = tkn
     });
  });

  it('Deve validar contrato de usuários', () => {
    // Fazer uma requisição para obter o contrato de usuários
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body);
    })
      
  });

  it('Deve listar usuários cadastrados - GET', () => {
    // Fazer uma requisição para listar os usuários cadastrados
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.have.property('usuarios');
    })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    let Fulano = 'Fulano ' + Math.floor(Math.random() * 100000);
    let email = 'email' + Math.floor(Math.random() * 100000) + '@example.com';
    cy.cadastrarUsuario(token, Fulano, email, 'teste', 'true')
      .should((response) => {
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')

      })
  });


  it('Deve validar um usuário com email inválido - POST', () => {
    // Dados do usuário com email inválido
    let Fulano = `Fulano ${Math.floor(Math.random() * 100000)}`;

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": Fulano,
        "email": "emailinvalido",
        "password": "teste",
        "administrador": 'true'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.email).to.equal('email deve ser um email válido');
    });
  });


  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    // Dados do usuário atualizados
    let Fulano = 'Fulano editado' + Math.floor(Math.random() * 100000);
    let email = 'email' + Math.floor(Math.random() * 100000) + '@example.com';
    cy.cadastrarUsuario(token, Fulano, email, 'teste', 'true')
      .then((response) => {
       let id = response.body._id;
        // Realiza a solicitação PUT para editar o usuário
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`, // Certifique-se de usar o endpoint correto para editar usuários
          headers: { authorization: token },
          body: {
            nome: Fulano,
            email: email,
            password: "teste",
            administrador: 'true'
          },
        }).then((response) => {
          // Verifica se a solicitação foi bem-sucedida (status 200)
          expect(response.status).to.equal(200);
          // Verifica se a mensagem de sucesso é retornada
          expect(response.body.message).to.equal('Registro alterado com sucesso');
        })
      })
    });

    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
      // Fazer uma requisição para deletar um usuário
      cy.cadastrarUsuario(token, 'Fulanno a ser deletado','email@example.com','teste', true)
          .then((response) => {
              let id = response.body._id;
              cy.request({
                  method: 'DELETE',
                  url: `usuarios/${id}`,
                  headers: { authorization: token }
              }).should(resp => {
                  // Verifica se a solicitação foi bem-sucedida (status 200)
                  expect(resp.status).to.equal(200);
                  // Verifica se a mensagem de sucesso é retornada
                  expect(resp.body.message).to.equal('Registro excluído com sucesso');
              })
          })
  });





});

  

  




