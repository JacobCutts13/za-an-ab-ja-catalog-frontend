/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('My First Test', () => {
  it('should visit the website', () => {
    cy.visit("https://creative-crumble-9b3f47.netlify.app/")
  })
  it('should have a title of recent recomendations', () => {
    cy.contains("Recent Recommendations")
  })
  it('Should load recommendation tiles with tags', () => {
    cy.wait(1000).get(".recommendation-tile").contains("#")
  })
  it('Clicking on a tile should show description', () => {
    cy.get(".search-tile").children(".tags").eq(0).click().get(".search-tile").eq(0).should("be.visible")
  })
  it('When searching a word, the word should appear in all search results', () => {
    cy.get("input").type("Neill").wait(100).get(".search-submit").click().get(".search-tile").contains("Neill")
  })
})
