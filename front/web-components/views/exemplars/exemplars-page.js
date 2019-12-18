import WebElement from '../../abstract/web-element';
import { noImage } from '../../../constants/themes';
import {t} from '../../utils/translateUtils';
import '../../components/page-list';

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
      <router-link>
         <div class='${ITEM}'>
            <img src='${noImage}' class='${PHOTO}'/>
            <div class='${NAME}'></div>
         </div>
      </router-link>    
  </template>
  
  <div id='${CONTAINER}'>
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

    // set exemplars(items) {
    //     this.$exemplars = items;
    //     this._renderPage();
    // }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);

        this._renderPage();
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$exemplarsModel.exemplars && this.$exemplarsModel.exemplars.length) {

            this.$exemplarsModel.exemplars.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byClass(NAME).textContent = item.variety.name;

                // if (recipe.imgPath) {
                //     template.byClass(RECIPE_PHOTO).src =  recipe.imgPath;
                // }

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
