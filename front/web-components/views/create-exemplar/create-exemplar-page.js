import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../styled/action-button';
import '../../styled/check-box';
import '../../components/file-upload/photo-upload';
import '../../components/date/date-input';

import './parts/variety-selector';
import './parts/parent-selector';
import './parts/new-event';

import {t} from '../../utils/translateUtils';
import routes from '../../../constants/Routes';
import {noImage} from '../../../constants/themes';

// ID
const CONTAINER = 'create-exemplar-page-container';
const CAPTION = 'caption';
const EVENT_CAPTION = 'event-caption';
const NAME_CONTAINER = 'create-exemplar-page-name-container';
const DATE_CONTAINER = 'date-container';
const NAME = 'name';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';
const NEW_EVENT_CONTAINER = 'new-event-container';

// COMPONENTS
const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const CHECKBOX_COMPONENT = 'check-box';
const UPLOAD_COMPONENT = 'photo-upload';
const VARIETY_SELECTOR_COMPONENT = 'variety-selector';
const PARENT_SELECTOR = 'parent-selector';
const NEW_EVENT_COMPONENT = 'new-event';
const DATE_COMPONENT = 'date-input';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--create-recipe-font-color);
        padding: 0 1.5rem;
    }
    
    #${CAPTION}, #${EVENT_CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        margin: 1.5rem 0;
        text-shadow: var(--text-shadow);
    }
    
    .${NAME_CONTAINER}, .${DATE_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    .${NAME_CAPTION} {
        margin-right: 0.5rem;
    }
    
    .${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
    ${DESCRIPTION_COMPONENT} {
        --control-width: 100%;
        width: 100%;
        --textarea-height: 10rem;
    }
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
      <div class='${NAME_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_name')}</div>
        <input-text id='${NAME}'/>
      </div> 
      
      <${VARIETY_SELECTOR_COMPONENT}></${VARIETY_SELECTOR_COMPONENT}>
      
      <${PARENT_SELECTOR}></${PARENT_SELECTOR}>
            
      <div class='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      
      <div class="${NAME_CONTAINER}">
            <div class='${NAME_CAPTION}'>${t('exemplars.is_sport')}</div>
            <${CHECKBOX_COMPONENT}></${CHECKBOX_COMPONENT}>
      </div>
           
      <div class="${NAME_CONTAINER}">
            <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
      </div>
      
      <div class='${DATE_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <${DATE_COMPONENT}></${DATE_COMPONENT}>
      </div> 
      
      <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
      
      <div class='${NEW_EVENT_CONTAINER}'>
        <div id="${EVENT_CAPTION}">${t('exemplars.add_event')}</div>
        <${NEW_EVENT_COMPONENT}></${NEW_EVENT_COMPONENT}>
      </div>
  </div>
`;

class CreateExemplarPage extends WebElement {

    set exemplar(item) {
        this.$exemplar = item;
        this._renderPage();
    }

    set events(events) {
        this.$events = events;
        this._renderPage();
    }

    set props({exemplar, isCreate}) {
        this.$exemplar = exemplar;
        this.$isCreate = isCreate;
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
        this.$exemplar.name = this.$_id(NAME).value;
        this.$exemplar.description = this.$(DESCRIPTION_COMPONENT).value;
        this.$exemplar.date = this.$(DATE_COMPONENT).value;
        this.$exemplar.isSport = this.$(CHECKBOX_COMPONENT).value;
        this.$exemplar.save().then(id => {
            window.location.hash = '/exemplar/' + id;
        });
    }

    _renderPage() {
        if (this.$exemplar) {
            this.$_id(NAME).value = this.$exemplar.name || '';

            this.$(VARIETY_SELECTOR_COMPONENT).exemplar = this.$exemplar;
            this.$(PARENT_SELECTOR).exemplar = this.$exemplar;
            this.$(CHECKBOX_COMPONENT).value = this.$exemplar.isSport;

            if (this.$isCreate) {
                this.$_id(CAPTION).innerHTML = t('exemplars.new_exemplar');
                this.$(DESCRIPTION_COMPONENT).value = this.$exemplar.description || '';
                this.$(UPLOAD_COMPONENT).props = {
                    uploadFileCallback: (path) => {
                        this.$exemplar.photo = path;
                    },
                    uploadUrl: routes.UPLOAD_FILE,
                    src: this.$exemplar.photo,
                    defaultSrc: noImage
                };
                this.$(DATE_COMPONENT).value = this.$exemplar.date || '';
            } else {
                this.$_id(CAPTION).innerHTML = t('exemplars.edit_exemplar');
                this.$(DESCRIPTION_COMPONENT).style.display = 'none';
                this.$(UPLOAD_COMPONENT).style.display = 'none';
                this.$(`.${DATE_CONTAINER}`).style.display = 'none';
            }

            this.$(`.${NEW_EVENT_CONTAINER}`).style.display = this.$isCreate ? 'none' : 'block';
            if (!this.$isCreate) {
                this.$(NEW_EVENT_COMPONENT).props = {
                    exemplarId: this.$exemplar.id,
                    events: this.$events
                }
            }
        }
    }

}

customElements.define('create-exemplar-page', CreateExemplarPage);
