import WebElement from '../../abstract/web-element';
import '../../components/image/image-with-text';
import '../../styled/action-button';
import '../../styled/input-text';
import '../../styled/text-area';

import {t} from '../../utils/translateUtils';
import {Hybridisator} from "../../model/hybridisator";

// ID
const CONTAINER = 'hybridisators-page-container';
const CONTENT = 'content';
const BUTTON_CONTAINER = 'button-container';
const NAME_CONTAINER = 'hybridisator-page-name-container';
const CAPTION = 'caption';

// TEMPLATE
const ITEM_TEMPLATE = 'item-template';
const ITEM = 'item';

// COMPONENTS
const DESCRIPTION_COMPONENT = 'text-area';
const NAME_COMPONENT = 'input-text';
const BUTTON_COMPONENT = 'action-button';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    .${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        padding-bottom: 1rem;
    }
    
    #${CONTENT} {
        margin-left: 1rem;
    }
    
    .${ITEM} {
        cursor: pointer;
    }
    
    ${DESCRIPTION_COMPONENT} {
        width: 100%;
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

  </style>
  
  <template id='${ITEM_TEMPLATE}'>
      <router-link>
         <div class='${ITEM}'>
         </div>
      </router-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div class='${CAPTION}'>${t('hybridisators.hybridisators')}</div>
    <div id='${CONTENT}'></div>
    
    <div class='${CAPTION}'>${t('hybridisators.create_hybridisator')}</div> 
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

class HybridisatorsPage extends WebElement {

    set props({authors}) {
        this.$authorModels = authors || [];
        this._renderPage();
    }

    constructor() {
        super(template, true);
        this.$newHybridisator = new Hybridisator();

        this._renderPage = this._renderPage.bind(this);
        this._save = this._save.bind(this);

        this.$(BUTTON_COMPONENT).addEventListener('click', this._save);
    }

    _save() {
        this.$newHybridisator.description = this.$(DESCRIPTION_COMPONENT).value;
        this.$newHybridisator.name = this.$(NAME_COMPONENT).value;


        this.$newHybridisator.save().then(id => {
            window.location.hash = '/hybridisators/' + id;
        });
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$authorModels.authors.length) {

            this.$authorModels.authors.forEach(item => {
                const template = this.getTemplateById(ITEM_TEMPLATE);
                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/hybridisators/${item.id}`
                }
                template.byClass(ITEM).innerHTML = item.name;
                this.$_id(CONTENT).appendChild(template);
            });

        } else {
            this.$_id(CONTENT).innerHTML = t('hybridisators.no_hybridisators_found');
        }

        // init creation form
        this.$(NAME_COMPONENT).value = this.$newHybridisator.name;
        this.$(DESCRIPTION_COMPONENT).value = this.$newHybridisator.description;
    }

}

customElements.define('hybridisators-page', HybridisatorsPage);
