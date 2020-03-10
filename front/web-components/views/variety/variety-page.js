import WebElement from '../../abstract/web-element';
import '../../components/image/image-with-text-and-zoom';

import { noImage } from '../../../constants/themes';

import mModal from '../../model/modal';
import {t} from "../../utils/translateUtils";

// ID
const CONTAINER = 'variety-page-container';
const CAPTION = 'variety-page-caption';
const DESCRIPTION = 'variety-page-description';
const DETAILS = 'variety-page-details';
const AUTHOR = 'variety-page-author';
const TYPE = 'variety-page-type';
const SPORT_INFO = 'variety-page-sport-info';

const DESCRIPTION_VALUE = 'description-value';

// TEMPLATE
const DETAIL_TEMPLATE = 'detail-template';
const DETAIL = 'detail';
const SPORT_INFO_TEMPLATE = 'sport-info-template';

// COMPONENTS
const IMAGE_COMPONENT = 'image-with-text-and-zoom';

const template = `
  <style>
    #${CONTAINER} {
    }
    
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        margin: 1.5rem 0;
        text-shadow: var(--text-shadow);
    }
    
    #${DESCRIPTION} {
        text-align: justify;
        margin: 1rem;
        white-space: pre-wrap;
    }
    
    #${AUTHOR}, #${TYPE}, #${SPORT_INFO} {
        display: flex;
        margin-left: 1rem;
    }
    
    .${DESCRIPTION_VALUE} {
        margin-left: 0.5rem;
        color: var(--dark-dark-background);
    }
    
    router-link {
        display: flex;
        cursor: pointer;
    }
    
    #${DETAILS} {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: var(--dark-background);
        border-radius: var(--theme-border-radius);
        margin: 1rem;
        padding: 1rem;
    }
    
  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
        <${IMAGE_COMPONENT}></${IMAGE_COMPONENT}>
    </div>
  </template>
  
  <template id='${SPORT_INFO_TEMPLATE}'>
    <router-link></router-link>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>     
      <div id='${DESCRIPTION}'></div>
      <div id='${AUTHOR}'></div> 
      <div id='${TYPE}'></div>
      <div id='${SPORT_INFO}'></div> 
      <div id='${DETAILS}'></div>
  </div>
`;

class VarietyPage extends WebElement {

    set variety(item) {
        this.$variety = item;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(AUTHOR).innerHTML = '';
        this.$_id(TYPE).innerHTML = '';
        this.$_id(SPORT_INFO).innerHTML = '';
        this.$_id(DETAILS).innerHTML = '';
    }

    _renderPage() {
        this._clearPage();

        if (this.$variety) {

            this.$_id(CAPTION).textContent = this.$variety.name || '';
            this.$_id(DESCRIPTION).textContent = this.$variety.description || '';
            this.$_id(AUTHOR).innerHTML = this.$variety.author && `${t('varieties.author')} <div class='${DESCRIPTION_VALUE}'>${this.$variety.author.name}</div>` || '';
            this.$_id(TYPE).innerHTML = `${t('varieties.type')} <div class='${DESCRIPTION_VALUE}'>${this.$variety.type}</div>`;

            if (this.$variety.sportOf && this.$variety.sportOf.id) {
                const sportInfoTemplate = this.getTemplateById(SPORT_INFO_TEMPLATE);
                sportInfoTemplate.byTag('router-link').innerHTML = `${t('varieties.sport_of_key')} <div class='${DESCRIPTION_VALUE}'>${this.$variety.sportOf.name}</div>`;
                sportInfoTemplate.byTag('router-link').onConstruct = (link) => {
                    link.path = `/variety/${this.$variety.sportOf.id}`
                }
                this.$_id(SPORT_INFO).appendChild(sportInfoTemplate);
            }

            if (this.$variety.details && this.$variety.details.length) {
                this.$variety.details.forEach(detail => {
                    const detailTemplate = this.getTemplateById(DETAIL_TEMPLATE);

                    detailTemplate.byTag(IMAGE_COMPONENT).onConstruct = (comp) => {
                        comp.props = {
                            brokenImageSrc: noImage,
                            src: detail.photo,
                            text: detail.description,
                            zoomedSrc: detail.photoFull,
                            openFn: mModal.open
                        }
                    }
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('variety-page', VarietyPage);
