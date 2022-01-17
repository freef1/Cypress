const { each } = require("async");
const { Certificate } = require("crypto");

describe("smoke_test_3", () => {
    it("Проверка добавления платежа, тип операции 'Перевод средств'", () => {
      cy.login_fabrique('https://finance.dev.fabrique.studio/accounts/login/');
      cy.wait(1000);
      cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();
      cy.get('div[class="checkbox__icon checkbox__icon--radio"]').click({ multiple: true }); 
      cy.contains('Перевод средств').click();     
      cy.get('div[class="input input--size-md input--state-default"]').each(($el, $index) => {
        if($index == 1){
          return false;
        }
        cy.wrap($el).click().type('Тест_3');        
      });
      cy.get('div[class="checkbox__icon checkbox__icon--checkbox"]').click({ multiple: true });
      cy.get('div[class="input input--is-short input--size-md input--state-default"]').each(($el, $index) => {        
        cy.wrap($el).click().type('33333');        
      });      
      cy.contains('Оплачен').click();
      cy.get('input[class="date__input"]').each(($el, $index) => {
        cy.wrap($el).click();
        cy.get('button[type="button"]').contains('21').click();
      });  
      cy.get('span[class="multiselect__placeholder"]').first().click();
      cy.contains('KZ11311311AK125555').click();   
      cy.get('span[class="multiselect__placeholder"]').eq(0).click();
      cy.contains('KZ55264AQ5561516').click({force: true});
      cy.get('span[class="multiselect__placeholder"]').last().click({force: true});
      cy.contains('раз').click();
      cy.get('#__nuxt').should('not.contain', 'Статья расходов')
      .and('not.contain', 'Статья расходов, уточнение').and('not.contain', 'Юридическое лицо').and('not.contain', '$Контрагент')
      .and('contain', 'Комиссия');
      cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();
    });
    it("Если появляется сообщение 'Платеж успешно сохранен'- тест пройден", () => {
      cy.get('div[class="notification__body"]').should('have.text', 'Платеж успешно сохранен'); 
    });
});



