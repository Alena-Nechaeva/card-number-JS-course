/// <reference types="cypress" />

describe('Pair game app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/src/index.html');
  });

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', () => {
    cy.get('.card')
      .should('have.length', 16)
      .should('not.have.class', 'is-open');
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    cy.get('.card:last-child').click();
    cy.get('.card:last-child').should('have.class', 'is-open');
  });

  // we have to check if the click on 3rd card will NOT close the first and second cards if they match
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой при клике по другой карте.', () => {
    let counter = 1;
    function findMathes(cards) {
      cy.get(cards[counter]).click();
      cy.get(cards[0]).click();

      if (cards[0].firstChild.src === cards[counter].firstChild.src) {
        if (cards[counter + 1] !== undefined) {
          cy.get(cards[counter + 1]).click();
        } else cy.get(cards[counter - 1]).click();

        cy.get(cards[0]).should('have.class', 'success');
        cy.get(cards[0]).should('have.class', 'is-open');
        cy.get(cards[counter]).should('have.class', 'success');
        cy.get(cards[counter]).should('have.class', 'is-open');
        return;
      }
      counter++;
      findMathes(cards);
    }

    cy.get('.card').then(($cards) => {
      findMathes($cards);
    });
  });

  // we have to check if the click on 3rd card will close the first and second cards if they don't not match
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую (третью?) карточку обе становятся невидимыми.', () => {
    let counter = 1;
    function findMismatches(cards) {
      cy.get(cards[counter]).click();
      cy.get(cards[0]).click();

      if (cards[0].firstChild.src !== cards[counter].firstChild.src) {
        if (cards[counter + 1] !== undefined) {
          cy.get(cards[counter + 1]).click();
        } else cy.get(cards[counter - 1]).click();

        cy.get(cards[0]).should('not.have.class', 'success');
        cy.get(cards[0]).should('not.have.class', 'is-open');
        cy.get(cards[counter]).should('not.have.class', 'success');
        cy.get(cards[counter]).should('not.have.class', 'is-open');
        return;
      }
      counter++;
      findMismatches(cards);
    }

    cy.get('.card').then(($cards) => {
      findMismatches($cards);
    });
  });
});
