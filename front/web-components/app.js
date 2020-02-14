import WebElement from './abstract/web-element';

import './router/app-route';
import './common-notification';
import './views/modal-window';
import './views/app-spinner';

import './views/variety/variety-page-renderer';
import './views/varieties/varieties-page-renderer';
import './views/create-variety/create-variety-page-renderer';
import './views/create-variety/edit-variety-page-renderer';

import './views/exemplars/exemplars-page-renderer';
import './views/exemplar/exemplar-page-renderer';
import './views/create-exemplar/create-exemplar-page-renderer';
import './views/create-exemplar/edit-exemplar-page-renderer';

import './views/edit-history/edit-history-page-renderer';

import './views/leaves/leaves-page-renderer';
import './views/leaf/leaf-page-renderer';

import './app-header';
// import './app-sidebar';
// import './recipe-search';

const CONTAINER = 'app_container';
const BODY = 'app_body';
const CONTENT = 'app_body_content';
const SIDE = 'side_menu';
const GLOBAL_COMPONENTS_CONTAINER = 'global_components_container';

const template = `
  <style>   
    #${CONTAINER} {
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
    }
    
    app-header {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        
        margin: 2rem 0;
    }
    
    app-spinner {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    
    #${BODY} {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        
        display: grid;
        grid-template-columns: 3fr 1fr;
    }
    
    #${CONTENT} {
        grid-column-start: 1;
        grid-column-end: 2;
        background-color: var(--main-background);
    }
    
    #${SIDE} {
        grid-column-start: 2;
        grid-column-end: 3;
    }
    
  </style>
  <div id='${GLOBAL_COMPONENTS_CONTAINER}'>
    <common-notification></common-notification>
    <modal-window></modal-window>
    <app-spinner></app-spinner>
  </div>
  <div id="${CONTAINER}">
    <app-header></app-header>
    <div id="${BODY}"> 
        <div id="${CONTENT}">
            <app-route path="/varieties" component="varieties-page-renderer"></app-route>
            <app-route path="/variety/:id" component="variety-page-renderer"></app-route> 
            <app-route path="/variety/:id/edit" component="edit-variety-page-renderer"></app-route>
            <app-route path="/variety" component="create-variety-page-renderer"></app-route>
            
            <app-route path="/exemplars" component="exemplars-page-renderer"></app-route>
            <app-route path="/exemplar/:id" component="exemplar-page-renderer"></app-route>
            <app-route path="/exemplar/:id/edit" component="edit-exemplar-page-renderer"></app-route>
            <app-route path="/exemplar" component="create-exemplar-page-renderer"></app-route>
            
            <app-route path="/exemplar/:id/hi/:hiId/edit" component="edit-history-page-renderer"></app-route>
            
            <app-route path="/leaves" component="leaves-page-renderer"></app-route>
            <app-route path="/leaves/:id" component="leaf-page-renderer"></app-route>
            
        </div>
        <div id="${SIDE}">
            <!--<app-sidebar></app-sidebar>-->
            <!--<recipe-search></recipe-search>-->
        </div>
    </div>
  </div>
  
`;

export default class App extends WebElement {
    constructor() {
        super(template);

    }
}

customElements.define('main-app', App);
