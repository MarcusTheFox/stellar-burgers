/// <reference types="cypress" />

declare module 'cypress' {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<void>;
      drag(subject: string, options?: any): Chainable<Element>;
      dismiss(subject: string, options?: any): Chainable<Element>;
      visit(originalFn: any, url: string, options: any): Chainable<Element>;
    }
  }
}