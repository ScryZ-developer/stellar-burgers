/// <reference types="cypress" />

describe('Constructor page', () => {
  const bunName = 'Тестовая булка';
  const mainName = 'Тестовая начинка';

  const orderNumber = 123456;

  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => win.localStorage.clear());
  });

  it('adds ingredients from list into constructor', () => {
    cy.visit('/');

    cy.wait('@getIngredients');

    // Для добавления в конструктор используем кнопку "Добавить".
    cy.contains('li', bunName).within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.contains('li', mainName).within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.contains(`${bunName} (верх)`).should('be.visible');
    cy.contains(`${bunName} (низ)`).should('be.visible');
    cy.contains(mainName).should('be.visible');
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('opens and closes ingredient modal by X', () => {
    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('a').contains(bunName).click();

    cy.contains('h3.text_type_main-large', 'Детали ингредиента').should(
      'be.visible'
    );
    cy.contains('h3.text_type_main-medium', bunName).should('be.visible');

    // Кнопка закрытия находится в header и является sibling к заголовку.
    cy.contains('h3.text_type_main-large', 'Детали ингредиента')
      .parent()
      .find('button')
      .click();

    cy.contains('h3.text_type_main-large', 'Детали ингредиента').should(
      'not.exist'
    );
  });

  it('opens and closes ingredient modal by overlay', () => {
    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('a').contains(mainName).click();

    cy.contains('h3.text_type_main-large', 'Детали ингредиента').should(
      'be.visible'
    );
    cy.contains('h3.text_type_main-medium', mainName).should('be.visible');

    // Оверлей покрывает весь экран, поэтому можно кликнуть по не занятой модалкой области.
    cy.get('body').click(5, 5);

    cy.contains('h3.text_type_main-large', 'Детали ингредиента').should(
      'not.exist'
    );
  });

  it('creates an order and clears constructor', () => {
    cy.setCookie('accessToken', 'fake-access-token');

    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', {
      fixture: 'createOrderResponse.json'
    }).as('createOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'fake-refresh-token');
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');

    const addBun = () => {
      cy.contains('li', bunName).within(() => {
        cy.contains('button', 'Добавить').click();
      });
    };

    const addMain = () => {
      cy.contains('li', mainName).within(() => {
        cy.contains('button', 'Добавить').click();
      });
    };

    addBun();
    addMain();

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('h2.text_type_digits-large').should('have.text', `${orderNumber}`);

    cy.contains('h2.text_type_digits-large', `${orderNumber}`)
      .closest('div')
      .parent()
      .find('button')
      .click();

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
    cy.get('h2.text_type_digits-large').should('not.exist');
  });
});

