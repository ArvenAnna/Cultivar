import WebElement from '../../../abstract/web-element';

import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';
import '../../../components/drop-down/drop-down';

import '../../../styled/input-text';
import '../../../styled/text-area';
import '../../../styled/action-button';
import '../../../styled/check-box';

import '../../../components/file-upload/photo-upload';

import {t} from '../../../utils/translateUtils';
import {NewHistoryItem} from "../../../model/newHistoryItem";
import routes from "../../../../constants/Routes";
import {noImage} from "../../../../constants/themes";

const CONTAINER = 'container';
const NAME_CONTAINER = 'name-container';
const DATE = 'date';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';

const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const DROP_DOWN = 'drop-down';

const UPLOAD_COMPONENT = 'photo-upload';

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
    
    .${NAME_CAPTION} {
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
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
      <div class='${NAME_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <input-text id='${DATE}'/>
      </div> 
      <${DROP_DOWN}></${DROP_DOWN}>
      <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
  </div>
`;

class NewEvent extends WebElement {

    // set exemplar(item) {
    //     this.$exemplar = item;
    //     this.$historyItem = new NewHistoryItem();
    //     this._renderPage();
    // }

    set props({exemplar, events}) {
        this.$exemplar = exemplar;
        this.$events = events;
        if(!this.$historyItem) {
            this.$historyItem = new NewHistoryItem();
        }
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._save = this._save.bind(this);

        this.$(BUTTON_COMPONENT).onClick = this._save;
    }

    _save() {
        this.$historyItem.description = this.$(DESCRIPTION_COMPONENT).value;
        this.$historyItem.date = this.$_id(DATE).value;
        this.$historyItem.eventType = this.$historyItem.eventType || this.$events[0];

        if (this.$historyItem.date == 'Invalid Date') {
            alert('date or date format is not valid');
        } else {
            this.$historyItem.save(this.$exemplar.id).then(() => {
                window.location.hash = '/exemplar/' + this.$exemplar.id;
            });
        }
    }

    _renderPage() {
        if (this.$exemplar) {
            this.$(DESCRIPTION_COMPONENT).value = this.$historyItem.description || '';
            this.$(UPLOAD_COMPONENT).props = {
                uploadFileCallback: (path) => {
                    this.$historyItem.photo = path;
                },
                uploadUrl: routes.UPLOAD_FILE,
                src: this.$historyItem.photo,
                defaultSrc: noImage
            };
            this.$_id(DATE).value = this.$historyItem.date || '';

        }
        if(this.$events) {
            this.$(DROP_DOWN).props = {
                chooseItemCallback: item => this.$historyItem.eventType = item,
                items: this.$events,
                renderItem: item => item,
            }
        }
    }


}

customElements.define('new-event', NewEvent);
