const { each } = require("async");
const { Certificate } = require("crypto");

describe("smoke_test_1", () => {
    it("Проверка добавления платежа, тип операции 'Доход/приход'", () => {
        cy.login_fabrique('https://finance.dev.fabrique.studio/accounts/login/');
        cy.wait(1000);

        cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();

        cy.get('div[class="checkbox__icon checkbox__icon--radio"]').click({ multiple: true }); 
        cy.contains('Доход/приход').click();

        cy.get('div[class="input input--size-md input--state-default"]').each(($el, $index) => {
            if($index == 1){
            return false;
            }
            cy.wrap($el).click().type('Тест_1');        
        });

        cy.get('div[class="checkbox__icon checkbox__icon--checkbox"]').click({ multiple: true });

        cy.get('div[class="input input--is-short input--size-md input--state-default"]').each(($el, $index) => {        
            cy.wrap($el).click().type('11111');        
        });
            
        cy.contains('Оплачен').click();

        cy.get('input[class="date__input"]').each(($el, $index) => {
            cy.wrap($el).click();
            cy.get('button[type="button"]').contains('19').click();
        });

        cy.get('span[class="multiselect__placeholder"]').first().click();
        cy.contains('test').click();

        cy.get('div[class="input input--size-md input--state-default"]').last().type('Тест_1');

        cy.get('span[class="multiselect__placeholder"]').each(($el, $index) => {
            if($index == 1){
            return false;
            }
            cy.wrap($el).click();
        });

        cy.contains('Счет выставлен').click();

        cy.get('span[class="multiselect__placeholder"]').eq(0).click();
        cy.contains('ААА "Тест"').click();

        cy.get('span[class="multiselect__placeholder"]').each(($el, $index) => {
            if($index == 1){
            return false;
            }
            cy.wrap($el).click();
        });
        
        cy.contains('тван').click();

        cy.get('span[class="multiselect__placeholder"]').eq(0).type('new{enter}');

        cy.get('.multiselect__placeholder').first().type('{downarrow}{enter}');

        cy.get('span[class="multiselect__placeholder"]').first().click();
        cy.contains('раз').click();

        cy.get('button[class="button button--size-sm button--is-centered button--state-filled"]').click();
        });
        
    it("Если появляется сообщение 'Платеж успешно сохранен'- тест пройден", () => {
        cy.get('div[class="notification__body"]').should('have.text', 'Платеж успешно сохранен'); 
    });
});



