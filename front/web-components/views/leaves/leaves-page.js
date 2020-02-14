import WebElement from '../../abstract/web-element';
import { noImage } from '../../../constants/themes';
import {t} from '../../utils/translateUtils';
import '../../components/page-list';

import '../../styled/text-area';
import '../../styled/action-button';
import '../../components/file-upload/photo-upload';

import '../create-exemplar/parts/variety-selector';
import '../create-exemplar/parts/parent-selector';

import {NewLeaf} from '../../model/newLeaf';
import routes from "../../../constants/Routes";

const CONTAINER = 'page-container';
const ITEM_TEMPLATE = 'item-template';
const ITEM = 'item';
const PHOTO = 'photo';
const CONTENT = 'content';

const NAME_CONTAINER = 'name-container';
const DATE_CONTAINER = 'date-container';
const NAME = 'name';
const DATE = 'date';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';

const PAGE_COMPONENT = 'page-list';

const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const UPLOAD_COMPONENT = 'photo-upload';
const VARIETY_SELECTOR_COMPONENT = 'variety-selector';
const PARENT_SELECTOR = 'parent-selector';

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
    
    .${NAME_CONTAINER}, .${DATE_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    .${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
    ${DESCRIPTION_COMPONENT} {
        --control-width: 100%;
        width: 100%;
        --textarea-height: 10rem;
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
    <${VARIETY_SELECTOR_COMPONENT}></${VARIETY_SELECTOR_COMPONENT}>  
    <${PARENT_SELECTOR}></${PARENT_SELECTOR}>
    <div id='${NAME_CONTAINER}'>
            <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
    </div>
    
    <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
      
    <div class='${DATE_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <input-text id='${DATE}'/>
    </div> 
      
    <div class='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
    </div>
    <${PAGE_COMPONENT}></${PAGE_COMPONENT}>
  </div>
`;

class LeavesPage extends WebElement {

    set props({itemsModel, searchModel}) {
        this.$exemplarsModel = itemsModel;
        this.$searchModel = searchModel;
        this._renderPage();
    }

    constructor() {
        super(template, true);
        this._renderPage = this._renderPage.bind(this);
        this._save = this._save.bind(this);
        this._newLeaf = new NewLeaf();
        this.$(BUTTON_COMPONENT).onClick = this._save;
    }

    _save() {
        this._newLeaf.description = this.$(DESCRIPTION_COMPONENT).value;
        this._newLeaf.date = this.$_id(DATE).value;

        if (this._newLeaf.date == 'Invalid Date') {
            alert('date or date format is not valid');
        } else {
            this._newLeaf.save().then(id => {
                window.location.hash = '/leaves/' + id;
            });
        }
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        this.$(VARIETY_SELECTOR_COMPONENT).exemplar = this._newLeaf;
        this.$(PARENT_SELECTOR).exemplar = this._newLeaf;
        this.$(DESCRIPTION_COMPONENT).value = this._newLeaf.description || '';
        this.$(UPLOAD_COMPONENT).props = {
            uploadFileCallback: (path) => {
                this._newLeaf.photo = path;
            },
            uploadUrl: routes.UPLOAD_FILE,
            src: this._newLeaf.photo,
            defaultSrc: noImage
        };
        this.$_id(DATE).value = this._newLeaf.date || '';

        if (this.$exemplarsModel.leaves && this.$exemplarsModel.leaves.length) {

            this.$exemplarsModel.leaves.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byClass(NAME).textContent = item.variety.name;

                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/leaf/${item.id}`
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

customElements.define('leaves-page', LeavesPage);
