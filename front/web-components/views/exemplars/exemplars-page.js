import WebElement from '../../abstract/web-element';
import '../../components/page-list';
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
const PAGE_COMPONENT = 'page-list';
const IMAGE_COMPONENT = 'image-with-text';

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
            <${IMAGE_COMPONENT}></${IMAGE_COMPONENT}>
         </div>
      </router-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div id='${CAPTION}'>${t('exemplars.exemplars')}</div>
    <div id='${CONTENT}'></div>
    <${PAGE_COMPONENT}></${PAGE_COMPONENT}>
  </div>
`;

class ExemplarsPage extends WebElement {

    set props({itemsModel, searchModel}) {
        this.$exemplarsModel = itemsModel;
        this.$searchModel = searchModel;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$exemplarsModel.exemplars && this.$exemplarsModel.exemplars.length) {

            this.$exemplarsModel.exemplars.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byTag(IMAGE_COMPONENT).onConstruct = (comp) => {
                    comp.props = {
                        brokenImageSrc: noImage,
                        src: item.imgPath,
                        text: item.variety.name
                    }
                }

                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/exemplar/${item.id}`
                }

                this.$_id(CONTENT).appendChild(template);
            });

        } else {
            this.$_id(CONTENT).innerHTML = t('exemplars.no_exemplars_found');
        }

        this.$(PAGE_COMPONENT).props = {
            pages: {
                count: this.$exemplarsModel.totalPages,
                currentPage: this.$exemplarsModel.currentPage
            },
            onClickCallback: (newPage) => {
                this.$searchModel.newPage = newPage;
                this.$(PAGE_COMPONENT).currentPage = newPage;
            }
        }
    }

}

customElements.define('exemplars-page', ExemplarsPage);
