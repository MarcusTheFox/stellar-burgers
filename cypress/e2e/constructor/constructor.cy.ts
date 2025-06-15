import { CONSTRUCTOR_ITEM_SELECTOR, INGREDIENT_SELECTOR, MODAL_CLOSE_BUTTON_SELECTOR, MODAL_SELECTOR } from '../../constants/constants';

describe('Burger Builder Integration Test', () => {
  beforeEach(() => {
    // Настройка моков перед загрузкой страницы
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    
    // Загрузка приложения
    cy.visit('');
    
    // Установка токенов
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken12345');
    });
    cy.setCookie('accessToken', 'mockAccessToken12345');
  });

  it('should allow adding ingredients, placing an order, and resetting the constructor', () => {
    // Проверяем, что ингредиенты отображаются на странице
    cy.get(INGREDIENT_SELECTOR).should('have.length.at.least', 1);

    // Добавляем булку в конструктор
    cy.get(INGREDIENT_SELECTOR)
      .contains('Краторная булка')
      .parent()
      .as('bun');
    cy.get('@bun').find('button').click();

    // Проверяем, что булка отображается в конструкторе
    cy.get(CONSTRUCTOR_ITEM_SELECTOR).should('contain.text', 'верх');
    cy.get(CONSTRUCTOR_ITEM_SELECTOR).should('contain.text', 'низ');

    // Добавляем ингредиент (мясо)
    cy.get(INGREDIENT_SELECTOR)
      .contains('Мясо бессмертных моллюсков')
      .parent()
      .as('ingredient');
    cy.get('@ingredient').find('button').click();

    // Проверяем, что ингредиент отображается в конструкторе
    cy.get(CONSTRUCTOR_ITEM_SELECTOR).should('have.length.at.least', 3);

    // Проверяем отображение цены
    cy.get('[data-test-id="total-price"]').then(($price) => {
      const price = parseInt($price.text(), 10);
      expect(price).greaterThan(0);
    });

    // Настраиваем интерцепт для создания заказа
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('placeOrder');

    // Проверяем, что кнопка оформления заказа активна и кликаем по ней
    cy.get('[data-test-id="place-order-button"]').click();

    // Проверяем, что модальное окно открылось
    cy.get(MODAL_SELECTOR).should('be.visible');

    // Проверяем, что номер заказа корректен
    cy.get('[data-test-id="order-number"]').should('contain.text', '12345');

    // Закрываем модальное окно
    cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();

    // Проверяем, что модальное окно закрыто
    cy.get(MODAL_SELECTOR).should('not.exist');

    // Проверяем, что отображается сообщение о необходимости выбора булок
    cy.get('[data-test-id="constructor-empty"]').should('contain.text', 'Выберите булки');
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
});
