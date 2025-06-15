import './commands';
import '../../src/index.css';
import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', (component: any) => {
  return mount(component);
});

// Объявление типов для пользовательских команд
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}