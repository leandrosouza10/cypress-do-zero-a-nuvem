describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')
  })

  it('Valida o titulo', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longTet = Cypress._.repeat('ABCDEFGIJKLMOPQRSTUVWYZ', 20)
    cy.get('[name="firstName"]').type('NOVO')
    cy.get('[id="lastName"]').type('TESTE')
    cy.get('[id="email"]').type('TESTE@GMAIL.COM')
    cy.get('[name="open-text-area"]').type(longTet, { delay: 0 })
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.contains('Mensagem enviada com sucesso.').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longTet = Cypress._.repeat('ABCDEFGIJKLMOPQRSTUVWYZ', 20)
    cy.get('[name="firstName"]').type('NOVO')
    cy.get('[id="lastName"]').type('TESTE')
    cy.get('[id="email"]').type('TESTE@GMAIL;COM')
    cy.get('#phone').type('123456789')
    cy.get('[name="open-text-area"]').type(longTet, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longTet = Cypress._.repeat('ABCDEFGIJKLMOPQRSTUVWYZ', 20)
    cy.get('[name="firstName"]').type('NOVO')
    cy.get('[id="lastName"]').type('TESTE')
    cy.get('[id="email"]').type('TESTE@GMAIL.COM')
    cy.get('[id="phone-checkbox"]').check()
    cy.get('[name="open-text-area"]').type(longTet, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[name="firstName"]')
      .type('NOVO')
      .clear().should('have.value', '')
    cy.get('[id="lastName"]')
      .type('TESTE')
      .clear().should('have.value', '')
    cy.get('[id="email"]')
      .type('TESTE@GMAIL.COM')
      .clear().should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')

  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    const data = {
      firstName: 'AUTOMAÇÃO',
      lastName: 'AUTOMAÇÃO',
      email: 'teste@gmail.com',
      text: 'Testando customização'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('[name="atendimento-tat"]')
      .check('feedback')
      .should('be.checked')

  })

  it('marca cada tipo de atendimento', () => {
    cy.get('[name="atendimento-tat"]')
      .each(typeofService => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.get('[id="privacy"]').contains('Política de Privacidade')
     .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
     .invoke('removeAttr', 'target')
     .click()

     cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  







  
})



