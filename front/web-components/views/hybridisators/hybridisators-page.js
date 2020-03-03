import WebElement from '../../abstract/web-element';
import '../../components/image/image-with-text';

import { noImage } from '../../../constants/themes';
import {t} from '../../utils/translateUtils';

// ID
const CONTAINER = 'exemplars-page-container';
const CAPTION = 'exemplars-page-caption';
const CONTENT = 'content';

// TEMPLATE
const ITEM_TEMPLATE = 'item-template';
const ITEM = 'item';

// COMPONENTS

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        padding-bottom: 1rem;
    }
    
    #${CONTENT} {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
    .${ITEM} {
        cursor: pointer;
    }

  </style>
  
  <template id='${ITEM_TEMPLATE}'>
      <router-link>
         <div class='${ITEM}'>
         </div>
      </router-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div id='${CAPTION}'>${t('hybridisators.hybridisators')}</div>
    <div id='${CONTENT}'></div>
  </div>
`;

class HybridisatorsPage extends WebElement {

    set props({authors}) {
        this.$authors = authors || [];
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$authors.length) {

            this.$exemplarsModel.exemplars.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/hybridisator/${item.id}`
                }

                template.byClass(ITEM).innerHTML = item.name;

                this.$_id(CONTENT).appendChild(template);
            });

        } else {
            this.$_id(CONTENT).innerHTML = t('hybridisators.no_hybridisators_found');
        }
    }

}

customElements.define('hybridisators-page', HybridisatorsPage);
