import WebElement from '../../../abstract/web-element';
import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';
import '../../../components/drop-down/drop-down';
import '../../../components/file-upload/photo-upload';
import '../../../components/date/date-input';
import '../../../styled/input-text';
import '../../../styled/text-area';
import '../../../styled/action-button';
import '../../../styled/check-box';

import {t} from '../../../utils/translateUtils';
import {NewHistoryItem} from "../../../model/newHistoryItem";
import routes from "../../../../constants/Routes";
import {noImage} from "../../../../constants/themes";
import {SEVERITY_TYPES} from "../../../common-notification";
import mNotification from "../../../model/notification";

// ID
const CONTAINER = 'new-event-container';
const NAME_CONTAINER = 'name-container';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'new-event-button-container';

// COMPONENTS
const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const DROP_DOWN = 'drop-down';
const UPLOAD_COMPONENT = 'photo-upload';
const DATE_COMPONENT = 'date-input';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--create-recipe-font-color);
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
      <div class='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      <div class="${NAME_CONTAINER}">
          <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
      </div>
      <div class='${NAME_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <${DATE_COMPONENT}></${DATE_COMPONENT}>
      </div> 
      <div class='${NAME_CONTAINER}'>
         <div class='${NAME_CAPTION}'>${t('exemplars.choose_event_type')}</div>
         <${DROP_DOWN}></${DROP_DOWN}>
      </div>
      <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
  </div>
`;

class NewEvent extends WebElement {

    set props({exemplarId, events, hi}) {
        this.$exemplarId = exemplarId;
        this.$events = events;
        this.$historyItem = hi;
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
        this.$historyItem.date = this.$(DATE_COMPONENT).value;
        this.$historyItem.eventType = this.$historyItem.eventType || this.$events[0];
        if (!this.$historyItem.date && this.$historyItem.eventType !== 'APPEARANCE') {
            mNotification.showMessage(t('exemplars.date_must_be_set'), SEVERITY_TYPES.INFO);
            return;
        }
        this.$historyItem.save(this.$exemplarId).then(() => {
                window.location.hash = '/exemplar/' + this.$exemplarId;
        });
    }

    _renderPage() {
        if (this.$exemplarId && this.$historyItem) {
            this.$(DESCRIPTION_COMPONENT).value = this.$historyItem.description || '';
            this.$(UPLOAD_COMPONENT).props = {
                uploadFileCallback: (path) => {
                    this.$historyItem.photo = path;
                },
                uploadUrl: routes.UPLOAD_FILE,
                src: this.$historyItem.photo,
                defaultSrc: noImage
            };
            this.$(DATE_COMPONENT).value = this.$historyItem.date || '';

        }
        if (this.$events) {
            this.$(DROP_DOWN).props = {
                chooseItemCallback: item => this.$historyItem.eventType = item,
                items: this.$events,
                renderItem: item => item,
                chosenItemIndex: this.$historyItem && this.$historyItem.eventType ? this.$events.indexOf(this.$historyItem.eventType) : 0
            }
        }
    }


}

customElements.define('new-event', NewEvent);
