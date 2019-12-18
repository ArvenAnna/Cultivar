import WebElement from '../../abstract/web-element';

import mModal from '../../model/modal';
import mHeader from '../../model/header';
import mNotification from '../../model/notification';

import '../../components/lists/tags-list';
import '../../styled/action-button';
import { noImage } from '../../../constants/themes';
import { goTo } from '../../router/utils';
import {t} from "../../utils/translateUtils";
import {SEVERITY_TYPES} from "../../common-notification";

const CONTAINER = 'page-container';
const DETAIL_TEMPLATE = 'detail_template';
const RECIPE_DETAIL_PHOTO_TEMPLATE = 'recipe-detail-photo-template';

const CAPTION = 'recipe_page_caption';
const MAIN_PHOTO = 'recipe_page_main_photo';
const DESCRIPTION = 'recipe_page_description';
const DETAILS = 'recipe_page_details';

const DETAIL = 'detail';
const DETAILS_PHOTO = 'recipe_page_details_photo';
const DETAILS_PHOTO_FULL = 'recipe_page_details_photo_full';
const DETAILS_DESCRIPTION = 'recipe_page_details_description';
const PROPORTIONS = 'recipe-proportions';
const REFERENCES = 'recipe-references';
const ADD_MENU = 'add-to-menu';

const LIST_COMPONENT = 'tags-list';
const BUTTON_COMPONENT = 'action-button';

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
    
    #${PROPORTIONS} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        padding: 0 1rem;
    }
    
    #${REFERENCES} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4;
        padding: 0 1rem;
    }
    
    #${MAIN_PHOTO} {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 4;
        grid-row-end: 5;
        width: 100%;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
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
    
    #${DETAILS} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 6;
        grid-row-end: 7;

        display: grid;
        background-color: var(--dark-background);
        border-radius: var(--theme-border-radius);
        grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
        justify-items: center;
        margin: 1rem;
        padding: 1rem;
    }
    
    #${ADD_MENU} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 7;
        grid-row-end: 8;
        display: flex;
        justify-content: center;
        padding-bottom: 1rem;
    }
    
    .${DETAIL} {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: flex-start;
       width: var(--card-width); 
       padding-bottom: 1rem;
    }
    
    .${DETAILS_DESCRIPTION} {
        padding: 0.2rem 0;
        color: var(--light-background);
        white-space: pre-wrap;
     }
    
    .${DETAILS_PHOTO} {
        width: 100%;
        
        object-fit: contain;
        border-radius: var(--theme-border-radius);
    }
    
    .${DETAILS_PHOTO_FULL} {
        width: 100%;
        position: fixed;
    }
    
  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
        <img src='${noImage}' class='${DETAILS_PHOTO}'/>
        <div class='${DETAILS_DESCRIPTION}'></div>
    </div>
  </template>
  
  <template id='${RECIPE_DETAIL_PHOTO_TEMPLATE}'>
        <img src='${noImage}' class='${DETAILS_PHOTO_FULL}'/>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>     
      <!--<img src='${noImage}' id='${MAIN_PHOTO}'/>-->
      <div id='${DESCRIPTION}'></div>  
      <div id='${DETAILS}'></div>
  </div>
`;

class ExemplarPage extends WebElement {

    set exemplar(item) {
        this.$exemplar = item;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);
        this._openFullPhoto = this._openFullPhoto.bind(this);

        this._renderPage();
    }

    _openFullPhoto(imgPath) {
        const photoTemplate = this.getTemplateById(RECIPE_DETAIL_PHOTO_TEMPLATE);
        photoTemplate.byTag('img').src = imgPath;
        mModal.open(photoTemplate);
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        // this.$_id(MAIN_PHOTO).src = noImage;
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(DETAILS).innerHTML = '';
        this.$_id(DETAILS).style.display = 'none';
    }

    _renderPage() {
        this._clearPage();

        if (this.$exemplar) {

            this.$_id(CAPTION).textContent = this.$exemplar.name  + "  " + this.$exemplar.variety.name || '';
            // this.$_id(MAIN_PHOTO).src =  this.$variety.imgPathFull || noImage;
            let text = this.$exemplar.isSport ? t('exemplars.it_is_sport') : ' ';
            text += this.$exemplar.parent ? t('exemplars.parent_ref') + this.$exemplar.parent : ''
            this.$_id(DESCRIPTION).textContent = text;

            if (this.$exemplar.history && this.$exemplar.history.length) {
                this.$_id(DETAILS).style.display = 'grid';
                this.$exemplar.history.forEach(detail => {
                    const detailTemplate = this.getTemplateById(DETAIL_TEMPLATE);
                    if (detail.photo) {
                        detailTemplate.byClass(DETAILS_PHOTO).src = detail.photo;
                        detailTemplate.byClass(DETAILS_PHOTO).addEventListener('click', this._openFullPhoto.bind(this, detail.photoFull));
                    }
                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    // TODO: render eventType, eventNumber, date
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('exemplar-page', ExemplarPage);
