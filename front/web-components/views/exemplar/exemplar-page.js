import WebElement from '../../abstract/web-element';
import '../../styled/action-button';
import '../../components/image/image-with-text-and-zoom';

import mModal from '../../model/modal';
import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";

// ID
const CONTAINER = 'page-container';
const BUTTON_CONTAINER = 'button-container';

// TEMPLATE
const DETAIL_TEMPLATE = 'detail_template';

const CAPTION = 'recipe_page_caption';
const DESCRIPTION = 'recipe_page_description';
const DETAILS = 'recipe_page_details';

const DETAIL = 'detail';
const DETAILS_DESCRIPTION = 'recipe_page_details_description';
const DETAILS_DATE = 'details-date';
const DETAILS_EVENT = 'details-event';

// COMPONENTS
const BUTTON_COMPONENT = 'action-button';
const IMAGE_COMPONENT = 'image-with-text-and-zoom';

const template = `
  <style>
    #${CONTAINER} {
    }
    
    #${CAPTION} {
        font-size: var(--header-font-size);
        text-align: center;
        margin: 20px 0;
        text-shadow: var(--text-shadow);
    }
    
    #${DESCRIPTION} {
        text-align: justify;
        margin: 1rem;
        white-space: pre-wrap;
    }
    
    #${DETAILS} {
        display: grid;
        background-color: var(--dark-background);
        border-radius: var(--theme-border-radius);
        grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
        justify-items: center;
        margin: 1rem;
        padding: 1rem;
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
    
    .${BUTTON_CONTAINER} {
       margin: 1rem 0;
       display: flex;
       justify-content: center;
    }
    
  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
        <${IMAGE_COMPONENT}>
            <div class='${DETAILS_DESCRIPTION}'></div>
            <div class='${DETAILS_DATE}'></div>
            <div class='${DETAILS_EVENT}'></div>
            <div class='${BUTTON_CONTAINER}'>
                <${BUTTON_COMPONENT} text='${t('common.edit')}'></${BUTTON_COMPONENT}>
            </div>
        </${IMAGE_COMPONENT}>        
    </div>
    
  </template>
 
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>     
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

        this._renderPage();
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(DETAILS).innerHTML = '';
    }

    _renderPage() {
        this._clearPage();

        if (this.$exemplar) {

            this.$_id(CAPTION).textContent = `${this.$exemplar.name || ''} (${this.$exemplar.variety.name || ''})`;

            let text = this.$exemplar.isSport ? t('exemplars.it_is_sport') : ' ';
            text += `${this.$exemplar.parent && this.$exemplar.parent.id ? t('exemplars.parent_ref') + this.$exemplar.parent.name || '' : ''}`
            this.$_id(DESCRIPTION).innerHTML = text;

            if (this.$exemplar.history && this.$exemplar.history.length) {
                this.$exemplar.history.forEach(detail => {
                    const detailTemplate = this.getTemplateById(DETAIL_TEMPLATE);
                    if (detail.photo) {
                        detailTemplate.byTag(IMAGE_COMPONENT).onConstruct = (comp) => {
                            comp.props = {
                                brokenImageSrc: noImage,
                                src: detail.photo,
                                zoomedSrc: detail.photoFull,
                                openFn: mModal.open
                            }
                        }
                        detailTemplate.byClass(DETAILS_DATE).textContent = detail.date;
                        detailTemplate.byClass(DETAILS_EVENT).innerHTML = t(`events.${detail.eventType}`) + ' '
                            + (detail.eventNumber || '');
                        detailTemplate.byTag(BUTTON_COMPONENT).onConstruct = (el) => {
                            el.onClick = () => window.location.hash = '/exemplar/' + this.$exemplar.id + '/hi/' + detail.id + '/edit';
                        }
                    }
                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('exemplar-page', ExemplarPage);
