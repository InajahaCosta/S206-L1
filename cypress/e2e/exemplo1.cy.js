// Linha para que a ide entenda o cypress
/// <reference types="cypress"/>

describe('Criando cenário de teste para o site globalsqa', () => {

  it.skip('Caso de teste: Registrando um usuário no site com sucesso', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click() // função para clicar no botão register
    cy.get('#firstName').type('Inatel') //entrando com os dados em cada campo
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('.btn-primary').click() // clicando no botão register
    cy.get('.ng-binding').should('contain.text', 'Registration successful') // contain.text -> conter este texto e algo mais
  })

  it.skip('Caso de teste: Registrando um usuário com falha (faltando senha)', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('Inatel')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required') // have.text -> texto especifico
    cy.get('.btn-primary').should('be.disabled') // verficixando se o botão esta desabilidado
  })

  it('Caso de teste: Realizando login com sucesso', () => {
    let info = criarUsuario()

    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })
})

function criarUsuario() {
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let user = horas + minutos + seg + 'Id'
  let senha = horas + minutos + seg + 'senha'
  let userInfo = {user, senha}

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click() 
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(user)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful') 

  return userInfo

}