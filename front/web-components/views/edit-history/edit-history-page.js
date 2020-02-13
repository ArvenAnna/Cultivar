import WebElement from '../../abstract/web-element';

import mModal from '../../model/modal';

import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";

import '../create-exemplar/parts/new-event';
import '../../styled/action-button';

const CONTAINER = 'page-container';

const CAPTION = 'recipe_page_caption';
const DESCRIPTION = 'recipe_page_description';

const BUTTON_CONTAINER = 'button-container';
const BUTTON_COMPONENT = 'action-button';

const EVENT_COMPONENT = 'new-event';

const template = `
  <style>
    #${CONTAINER} {
        display: grid;
        grid-template-columns: 1fr auto;
        position: relative;
    }
    
    #${CAPTION} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        text-align: center;
        font-size: var(--header-font-size);
        width: 100%;
        margin: 20px 0;
        text-shadow: var(--text-shadow);
    }
    
    #${DESCRIPTION} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 5;
        grid-row-end: 6;

        text-align: justify;
        margin: 1rem;
        white-space: pre-wrap;
    }
  
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'>aaaaaaa</div>   
      <${EVENT_COMPONENT}></${EVENT_COMPONENT}>  
      <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.delete')}'></${BUTTON_COMPONENT}>
      </div>
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
        // this._clearPage = this._clearPage.bind(this);
    }

    //
    // _clearPage() {
    //     this.$_id(CAPTION).textContent = '';
    //     this.$_id(DESCRIPTION).textContent = '';
    //     this.$_id(DETAILS).innerHTML = '';
    //     this.$_id(DETAILS).style.display = 'none';
    // }

    _renderPage() {
        // this._clearPage();

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
