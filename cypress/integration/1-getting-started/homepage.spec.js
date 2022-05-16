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
    cy.get(".recommendation-tile").contains("#")
  })
  it('Clicking on a tile should show description', () => {
    cy.get(".search-tile").children(".tags").eq(0).click().get(".search-tile").eq(0).should("be.visible")
  })
  // it('Changes to the search bar should be reflected in the search results', () => {
  //   cy.get("input").type("javascript").wait(100).get(".search-submit").click()
  // })
})
