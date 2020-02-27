import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../styled/action-button';
import '../../components/date/date-input';

import './parts/author-selector';
import './parts/type-selector';
import './parts/sport-of';
import './parts/variety-details';

import {t} from '../../utils/translateUtils';

// ID
const CONTAINER = 'create-variety-page-container';
const CAPTION = 'create-variety-page-caption';
const NAME_CONTAINER = 'create-variety-page-name-container';
const NAME = 'create-variety-page-name';
const NAME_CAPTION = 'create-variety-page-name-caption';
const BUTTON_CONTAINER = 'create-variety-page-button-container';

// COMPONENTS
const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';

const DETAILS_COMPONENT = 'variety-details';
const AUTHOR_SELECTOR_COMPONENT = 'author-selector';
const TYPE_SELECTOR_COMPONENT = 'type-selector';
const SPORT_OF_COMPONENT = 'sport-of';
const DATE_COMPONENT = 'date-input';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--create-recipe-font-color);
        padding: 0 1.5rem;
    }
    
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        margin: 1.5rem 0;
        text-shadow: var(--text-shadow);
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
      <div id='${CAPTION}'>${t('varieties.edit_variety')}</div>
      <div id='${NAME_CONTAINER}'>
        <div id='${NAME_CAPTION}'>${t('varieties.variety_name')}</div>
        <input-text id='${NAME}'/>
      </div> 
      
      <${AUTHOR_SELECTOR_COMPONENT}></${AUTHOR_SELECTOR_COMPONENT}>
      <${TYPE_SELECTOR_COMPONENT}></${TYPE_SELECTOR_COMPONENT}>
      
      <div id='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      
      <div id='${NAME_CONTAINER}'>
        <div id='${NAME_CAPTION}'>${t('varieties.hybridisation_date')}</div>
        <${DATE_COMPONENT}></${DATE_COMPONENT}>
      </div> 
      
      <${SPORT_OF_COMPONENT}></${SPORT_OF_COMPONENT}>
     
      <${DETAILS_COMPONENT}></${DETAILS_COMPONENT}>
      
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

        if (!this.$variety.author || !this.$variety.author.id) {
            this.$variety.author = this.$authors.length
                ? this.$authors[0] : null;
        }

        if (!this.$variety.type) {
            this.$variety.type = this.$types.length
                ? this.$types[0] : null;
        }

        this.$variety.hybridisationDate = this.$(DATE_COMPONENT).value;

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
            this.$(DETAILS_COMPONENT).variety = this.$variety;
            this.$(DATE_COMPONENT).value = this.$variety.hybridisationDate || '';
        }
    }


}

customElements.define('create-variety-page', CreateVarietyPage);
