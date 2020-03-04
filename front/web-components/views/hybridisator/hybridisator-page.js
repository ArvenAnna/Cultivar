import WebElement from '../../abstract/web-element';
import '../../styled/action-button';
import '../../styled/input-text';
import '../../styled/text-area';

import '../../components/file-upload/photo-upload';
import '../../components/drop-down/drop-down';

import {t} from "../../utils/translateUtils";
import {SEVERITY_TYPES} from "../../common-notification";
import mNotification from "../../model/notification";

// ID
const CONTAINER = 'hybridisator-page-container';
const CAPTION = 'hybridisator-page-caption';
const BUTTON_CONTAINER = 'button-container';
const NAME_CONTAINER = 'hybridisator-page-name-container';

// COMPONENTS
const DESCRIPTION_COMPONENT = 'text-area';
const NAME_COMPONENT = 'input-text';
const BUTTON_COMPONENT = 'action-button';

const template = `
  <style>
    #${CONTAINER} {
        position: relative;
    }
    
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        width: 100%;
        margin: 20px 0;
        text-shadow: var(--text-shadow);
    }
    
    #${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
    .${NAME_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    ${DESCRIPTION_COMPONENT} {
        width: 100%;
    }
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'>${t('hybridisators.hybridisator')}</div> 
      <div class='${NAME_CONTAINER}'>  
        <${NAME_COMPONENT}></${NAME_COMPONENT}>
      </div>
      <div class='${NAME_CONTAINER}'>  
        <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
      </div>
      <div id='${BUTTON_CONTAINER}'>
        <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
      </div>
  </div>
`;

class HybridisatorPage extends WebElement {

    set hybridisator(item) {
        this._hybridisator = item;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);

        this._save = this._save.bind(this);

        this.$(BUTTON_COMPONENT).addEventListener('click', this._save);
    }

    _clearPage() {
        this.$(NAME_COMPONENT).value = '';
        this.$(DESCRIPTION_COMPONENT).value = '';
    }

    _save() {
        this._hybridisator.description = this.$(DESCRIPTION_COMPONENT).value;
        this._hybridisator.name = this.$(NAME_COMPONENT).value;


        this._hybridisator.save().then(() => {
            mNotification.showMessage(t('common.successfully_saved'), SEVERITY_TYPES.SUCCESS);
        });
    }

    _renderPage() {
        this._clearPage();

        if (this._hybridisator) {

            this.$(NAME_COMPONENT).value = this._hybridisator.name;
            this.$(DESCRIPTION_COMPONENT).value = this._hybridisator.description;

        }
    }

}

customElements.define('hybridisator-page', HybridisatorPage);
