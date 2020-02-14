import WebElement from '../../abstract/web-element';

import mModal from '../../model/modal';

import '../../styled/action-button';

import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";

const CONTAINER = 'page-container';
const DETAIL_TEMPLATE = 'detail_template';
const RECIPE_DETAIL_PHOTO_TEMPLATE = 'recipe-detail-photo-template';

const CAPTION = 'recipe_page_caption';
const DESCRIPTION = 'recipe_page_description';
const DETAILS = 'recipe_page_details';

const DETAIL = 'detail';
const DETAILS_PHOTO = 'recipe_page_details_photo';
const DETAILS_PHOTO_FULL = 'recipe_page_details_photo_full';
const DETAILS_DESCRIPTION = 'recipe_page_details_description';
const DETAILS_DATE = 'details-date';
const DETAILS_EVENT = 'details-event';

const BUTTON_CONTAINER = 'button-container';
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
    
    #${DESCRIPTION} {
        text-align: justify;
        margin: 1rem;
        white-space: pre-wrap;
    }

    .${DETAILS_DESCRIPTION} {
        padding: 0.2rem 0;
        color: var(--light-background);
        white-space: pre-wrap;
     }
    
    .${DETAILS_PHOTO} {
        width: 10rem;
        
        object-fit: contain;
        border-radius: var(--theme-border-radius);
    }
    
    table {
        margin: 1rem;
        width: 100%;
        text-align: center;
    }
    
    table th, table caption {
        font-weight: 700;
    }
    
    table caption {
        font-size: var(--big-font-size);
        padding-bottom: 1rem;
    }
    
    .${DETAILS_PHOTO_FULL} {
        width: 100%;
        position: fixed;
    }
    
    .${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
    
  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <tr>
        <td><img src='${noImage}' class='${DETAILS_PHOTO}'/></td>
        <td><div class='${DETAILS_DESCRIPTION}'></div></td>
        <td><div class='${DETAILS_DATE}'></div></td>
        <td><div class='${DETAILS_EVENT}'></div></td>
        <td><${BUTTON_COMPONENT} text='${t('common.delete')}'></${BUTTON_COMPONENT}></td>
    </tr>
  </template>
  
  <template id='${RECIPE_DETAIL_PHOTO_TEMPLATE}'>
        <img src='${noImage}' class='${DETAILS_PHOTO_FULL}'/>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>     
      <div id='${DESCRIPTION}'></div>  
      <table>
            <caption>${t('leaves.history')}</caption>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
      </table>
  </div>
`;

class LeafPage extends WebElement {

    set leaf(item) {
        this._leaf = item;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);
        this._openFullPhoto = this._openFullPhoto.bind(this);

        // this._renderPage();
    }

    _openFullPhoto(imgPath) {
        const photoTemplate = this.getTemplateById(RECIPE_DETAIL_PHOTO_TEMPLATE);
        photoTemplate.byTag('img').src = imgPath;
        mModal.open(photoTemplate);
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(DESCRIPTION).textContent = '';
        this.$('tbody').innerHTML = '';
    }

    _renderPage() {
        this._clearPage();

        if (this._leaf) {

            this.$_id(CAPTION).textContent = `${this._leaf.variety.name || ''} (leaf ${this._leaf.id})`;
            let text = `${this._leaf.parent && this._leaf.parent.id ? t('exemplars.parent_ref') + this._leaf.parent.name || '' : ''}`;
            this.$_id(DESCRIPTION).textContent = text;

            if (this._leaf.history && this._leaf.history.length) {
                // this.$_id(DETAILS).style.display = 'grid';
                this._leaf.history.forEach(detail => {
                    const detailTemplate = this.getTemplateById(DETAIL_TEMPLATE);
                    if (detail.photo) {
                        detailTemplate.byClass(DETAILS_PHOTO).src = detail.photo;
                        detailTemplate.byClass(DETAILS_PHOTO).addEventListener('click', this._openFullPhoto.bind(this, detail.photoFull));
                        detailTemplate.byClass(DETAILS_DATE).textContent = detail.date;
                        detailTemplate.byClass(DETAILS_EVENT).innerHTML = t(`events.${detail.eventType}`);
                        detailTemplate.byTag(BUTTON_COMPONENT).onConstruct = (el) => {
                            el.onClick = () => {
                                this._leaf.removeHi(detail.id);
                            }
                        }
                    }
                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$('tbody').appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('leaf-page', LeafPage);
