import WebElement from '../../abstract/web-element';

import {t} from "../../utils/translateUtils";

import '../create-exemplar/parts/new-event';
import '../../styled/action-button';

// ID
const CONTAINER = 'edit-history-page-container';
const CAPTION = 'edit-history-page-caption';
const NAME_CONTAINER = 'edit-history-page-name-container';
const NAME_CAPTION = 'name-caption';

// COMPONENTS
const BUTTON_COMPONENT = 'action-button';
const EVENT_COMPONENT = 'new-event';

const template = `
  <style>
    #${CONTAINER} {
    }
    
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        margin: 20px 0;
        text-shadow: var(--text-shadow);
    }
    
    .${NAME_CONTAINER} {
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    .${NAME_CAPTION} {
        margin-right: 0.5rem;
    }
  
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'>${t('exemplars.edit_exemplar_history')}</div>   
      <div class='${NAME_CONTAINER}'>
            <div class='${NAME_CAPTION}'>${t('exemplars.delete_history')}</div>
            <${BUTTON_COMPONENT} text='${t('common.delete')}'></${BUTTON_COMPONENT}>
      </div>
      <${EVENT_COMPONENT}></${EVENT_COMPONENT}>
  </div>
`;

class EditHistoryPage extends WebElement {

    set events(events) {
        this.$events = events;
        this._renderPage();
    }

    set props({exemplarId, hi, events}) {
        this.$exemplarId = exemplarId;
        this.$events = events;
        this.$hi = hi;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);

        this.$(BUTTON_COMPONENT).onClick = () => {
            this.$hi.delete(this.$exemplarId).then(() => {
                window.location.hash = '/exemplar/' + this.$exemplarId;
            });
        }
    }

    _renderPage() {
        if (this.$exemplarId) {
            this.$(EVENT_COMPONENT).props = {
                exemplarId: this.$exemplarId,
                events: this.$events,
                hi: this.$hi
            }
        }
    }

}

customElements.define('edit-history-page', EditHistoryPage);
