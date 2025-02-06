import './commands';
//import 'cypress-mochawesome-reporter/register';
import 'cypress-plugin-api';
import 'cypress-plugin-steps';

const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

export type Locator = Cypress.Chainable<JQuery<HTMLElement>>;



  
  
  

