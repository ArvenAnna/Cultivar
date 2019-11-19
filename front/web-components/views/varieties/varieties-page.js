import WebElement from '../../abstract/web-element';
import { noImage } from '../../../constants/themes';
import {t} from '../../utils/translateUtils';
import '../../components/page-list';
import mSearch from '../../model/search';
import mVarieties from '../../model/varieties';

const CONTAINER = 'page-container';
const ITEM_TEMPLATE = 'item-template';
const ITEM = 'item';
const NAME = 'name';
const PHOTO = 'photo';
const CONTENT = 'content';

const PAGE_COMPONENT = 'page-list';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    #${CONTENT} {
        display: flex;
        justify-content: center;
       /*display: grid;*/
       /*grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));*/
       /*justify-items: center;*/
       /*align-content: center;*/
       /*height: 100%;*/
    }
    
    .${ITEM} {
        display: flex;
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*justify-content: flex-start;*/
        /*max-width: 200px;*/
        /*min-width: 80%;*/
        /*cursor: pointer;*/
    }
    
    .${NAME} {
          /*text-align: center;*/
          padding: 5px;
          font-size: medium;
          font-weight: 600;
    }
    
    .${PHOTO} {
        width: 100%;
        height: 200px;
        object-fit: contain;
    }
    
  </style>
  
  <template id='${ITEM_TEMPLATE}'>
      <recipe-link>
         <div class='${ITEM}'>
            <img src='${noImage}' class='${PHOTO}'/>
            <div class='${NAME}'></div>
         </div>
      </recipe-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div id='${CONTENT}'></div>
    <${PAGE_COMPONENT}></${PAGE_COMPONENT}>
  </div>
`;

class VarietiesPage extends WebElement {

    set varieties(items) {
        this.$varieties = items;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);

        this._renderPage();
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$varieties && this.$varieties.length) {

            this.$varieties.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byClass(NAME).textContent = item.name;

                // if (recipe.imgPath) {
                //     template.byClass(RECIPE_PHOTO).src =  recipe.imgPath;
                // }

                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/variety/${item.id}`
                }

                this.$_id(CONTENT).appendChild(template);
            });

        } else {
            this.$_id(CONTENT).innerHTML = t('varieties.no_varieties_found');
        }

        this.$(PAGE_COMPONENT).props = {
            pages: {
                count: mVarieties.totalPages,
                currentPage: mVarieties.currentPage
            },
            onClickCallback: (newPage) => {
                mSearch.newPage = newPage;
                this.$(PAGE_COMPONENT).currentPage = newPage;
            }
        }
    }

}

customElements.define('varieties-page', VarietiesPage);
