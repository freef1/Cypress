const { each } = require("async");
const { Certificate } = require("crypto");

describe("smoke_test_2", () => {
    it("Проверка добавления платежа, тип операции 'Расход', статья 'Уменьшенный план'", () => {
        cy.login_fabrique('https://finance.dev.fabrique.studio/accounts/login/');
        cy.wait(1000);

        cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();

        cy.get('div[class="checkbox__icon checkbox__icon--radio"]').click({ multiple: true }); 
        cy.contains('Расход').click();

        cy.get('div[class="input input--size-md input--state-default"]').first().click().type('Тест_2');

        cy.get('div[class="checkbox__icon checkbox__icon--checkbox"]').click({ multiple: true });

        cy.get('span[class="multiselect__placeholder"]').each(($el, $index) => {
            if($index == 1){
                return false;
            }
            cy.wrap($el).click();
        });
        
        cy.contains('умен пл').click();

        cy.get('div[class="input input--is-short input--size-md input--state-default"]').click().type('22222');

        cy.contains('Оплачен').click();

        cy.get('div[class="input input--size-md input--state-default"]').last().click().type('Тест_2');

        cy.get('span[class="multiselect__placeholder"]').first().click();
        cy.contains('ААА "Тест"').click();
        
        cy.get('span[class="multiselect__placeholder"]').each(($el, $index) => {
            if($index == 1){
                return false;
            }
            cy.wrap($el).click();
        });

        cy.contains('тван').click();

        cy.get('span[class="multiselect__placeholder"]').first().type('новый тег{enter}');      

        cy.get('#__nuxt').should('not.contain', 'Сумма факт')
            .and('not.contain', 'Дата план')
            .and('not.contain', 'Дата факт')
            .and('not.contain', 'Счет отправителя')
            .and('not.contain', 'Счет получателя')
            .and('contain', 'Связанные платежи'); 
        cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();
      });

    it("Если появляется сообщение 'Платеж успешно сохранен'- тест пройден", () => {
        cy.get('div[class="notification__body"]').should('have.text', 'Платеж успешно сохранен'); 
    });
});



