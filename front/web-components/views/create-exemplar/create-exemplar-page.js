import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../styled/action-button';
import '../../styled/check-box';

import '../../components/file-upload/photo-upload';

import './parts/variety-selector';
import './parts/parent-selector';
import './parts/new-event';

import {t} from '../../utils/translateUtils';
import routes from '../../../constants/Routes';
import {noImage} from '../../../constants/themes';

const CONTAINER = 'page-container';

const NAME_CONTAINER = 'name-container';
const NAME = 'name';
const DATE = 'date';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';

const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const CHECKBOX_COMPONENT = 'check-box';

const UPLOAD_COMPONENT = 'photo-upload';
const VARIETY_SELECTOR_COMPONENT = 'variety-selector';
const PARENT_SELECTOR = 'parent-selector';
const NEW_EVENT_COMPONENT = 'new-event';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--create-recipe-font-color);
        padding: 0 1.5rem;
    }
    
    .${NAME_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
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
      <div class='${NAME_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_name')}</div>
        <input-text id='${NAME}'/>
      </div> 
      
      <${VARIETY_SELECTOR_COMPONENT}></${VARIETY_SELECTOR_COMPONENT}>
      
      <${PARENT_SELECTOR}></${PARENT_SELECTOR}>
            
      <div id='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      
      <div class="${NAME_CONTAINER}">
            <div class='${NAME_CAPTION}'>${t('exemplars.is_sport')}</div>
            <${CHECKBOX_COMPONENT}></${CHECKBOX_COMPONENT}>
      </div>
           
      <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
      
      <div class='${NAME_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <input-text id='${DATE}'/>
      </div> 
      
      <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
      
      <${NEW_EVENT_COMPONENT}></${NEW_EVENT_COMPONENT}>
      
  </div>
`;

class CreateExemplarPage extends WebElement {

    set exemplar(item) {
        this.$exemplar = item;
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
        this.$exemplar.date = this.$_id(DATE).value;
        this.$exemplar.isSport = this.$(CHECKBOX_COMPONENT).value;

        console.dir(this.$exemplar)

        if (this.$exemplar.date == 'Invalid Date') {
            alert('date or date format is not valid');
        } else {
            this.$exemplar.save().then(id => {
                window.location.hash = '/exemplar/' + id;
            });
        }
    }

    _renderPage() {
        if (this.$exemplar) {
            this.$_id(NAME).value = this.$exemplar.name || '';

            this.$(VARIETY_SELECTOR_COMPONENT).exemplar = this.$exemplar;
            this.$(PARENT_SELECTOR).exemplar = this.$exemplar;
            this.$(CHECKBOX_COMPONENT).value = this.$exemplar.isSport;

            if (this.$isCreate) {
                this.$(DESCRIPTION_COMPONENT).value = this.$exemplar.description || '';
                this.$(UPLOAD_COMPONENT).props = {
                    uploadFileCallback: (path) => {
                        this.$exemplar.photo = path;
                    },
                    uploadUrl: routes.UPLOAD_FILE,
                    src: this.$exemplar.photo,
                    defaultSrc: noImage
                };
                this.$_id(DATE).value = this.$exemplar.date || '';
            } else {
                this.$(DESCRIPTION_COMPONENT).style.display = 'none';
                this.$(UPLOAD_COMPONENT).style.display = 'none';
                this.$_id(DATE).style.display = 'none';
            }

            this.$(NEW_EVENT_COMPONENT).style.display = this.$isCreate ? 'none' : 'block';
            if (!this.$isCreate) {
                this.$(NEW_EVENT_COMPONENT).exemplar = this.$exemplar;
            }
        }
    }


}

customElements.define('create-exemplar-page', CreateExemplarPage);
