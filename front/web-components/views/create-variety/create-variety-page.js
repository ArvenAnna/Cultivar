import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../styled/action-button';

import './parts/author-selector';
import './parts/type-selector';
import './parts/sport-of';

import {t} from '../../utils/translateUtils';

const CONTAINER = 'page-container';

const NAME_CONTAINER = 'name-container';
const NAME = 'name';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';

const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';

const AUTHOR_SELECTOR_COMPONENT = 'author-selector';
const TYPE_SELECTOR_COMPONENT = 'type-selector';
const SPORT_OF_COMPONENT = 'sport-of';


const template = `
  <style>
    #${CONTAINER} {
        color: var(--create-recipe-font-color);
        padding: 0 1.5rem;
    }
    
    #${NAME_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    #${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
    #${NAME_CAPTION} {
        margin-right: 0.5rem;
    }
    
    ${DESCRIPTION_COMPONENT} {
        --control-width: 100%;
        width: 100%;
        --textarea-height: 10rem;
    }
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${NAME_CONTAINER}'>
        <div id='${NAME_CAPTION}'>${t('varieties.variety_name')}</div>
        <input-text id='${NAME}'/>
      </div> 
      
      <${AUTHOR_SELECTOR_COMPONENT}></${AUTHOR_SELECTOR_COMPONENT}>
      <${TYPE_SELECTOR_COMPONENT}></${TYPE_SELECTOR_COMPONENT}>
      
      <div id='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      
      <${SPORT_OF_COMPONENT}></${SPORT_OF_COMPONENT}>
     
      
      <div id='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
  </div>
`;

class CreateVarietyPage extends WebElement {

    set variety(item) {
        this.$variety = item;
        this._renderPage();
    }

    set authors(newAuthors) {
        this.$authors = newAuthors;
        this._renderPage();
    }

    set types(items) {
        this.$types = items;
        this._renderPage();
    }

    set props({item, authors, types}) {
        this.$variety = item;
        this.$authors = authors;
        this.$types = types;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._save = this._save.bind(this);

        this.$(BUTTON_COMPONENT).onClick = this._save;
        this.$_id(NAME).validationErrorsOnBlur = [{
            pattern: /.+/,
            errorText: t('varieties.error_empty_variety')
        }];
    }

    _save() {
        this.$variety.name = this.$_id(NAME).value;
        this.$variety.description = this.$(DESCRIPTION_COMPONENT).value;

        if (!this.$variety.author) {
            this.$variety.author = this.$authors.length
                ? this.$authors[0] : null;
        }

        if (!this.$variety.type) {
            this.$variety.type = this.$types.length
                ? this.$types[0] : null;
        }

        this.$variety.save().then(id => {
            window.location.hash = '/variety/' + id;
        });
    }

    _renderPage() {
        if (this.$variety) {
            this.$_id(NAME).value = this.$variety.name || '';
            this.$(DESCRIPTION_COMPONENT).value = this.$variety.description || '';
            this.$(AUTHOR_SELECTOR_COMPONENT).variety = this.$variety;
            this.$(AUTHOR_SELECTOR_COMPONENT).authors = this.$authors;
            this.$(TYPE_SELECTOR_COMPONENT).variety = this.$variety;
            this.$(TYPE_SELECTOR_COMPONENT).types = this.$types;
            this.$(SPORT_OF_COMPONENT).variety = this.$variety;
        }

        // this.$(RECIPE_DEPARTMENT_COMPONENT).recipe = this.$recipe;
        // this.$(RECIPE_DEPARTMENT_COMPONENT).departments = this.$departments;
        // this.$(RECIPE_REFS_COMPONENT).recipe = this.$recipe;
        // this.$(RECIPE_PROPORTIONS_COMPONENT).recipe = this.$recipe;
        // this.$(RECIPE_MAIN_PHOTO_COMPONENT).recipe = this.$recipe;
        // this.$(RECIPE_DETAILS_COMPONENT).recipe = this.$recipe;
    }


}

customElements.define('create-variety-page', CreateVarietyPage);
