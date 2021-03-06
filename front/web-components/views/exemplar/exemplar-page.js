import WebElement from '../../abstract/web-element';
import '../../styled/action-button';
import '../../components/image/image-with-text-and-zoom';

import '../../router/router-link';

import mModal from '../../model/modal';
import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";
import mExemplarsSearch from '../../model/exemplarSearch';

// ID
const CONTAINER = 'exemplar-page-container';
const BUTTON_CONTAINER = 'button-container';

// TEMPLATE
const DETAIL_TEMPLATE = 'detail-template';

const CAPTION = 'exemplar-page-caption';
const ID_CAPTION = 'exemplar-page-id-caption';
const SAME_VARIETY_BUTTON = 'exemplar-page-same-button';
const SEE_CHILDREN_BUTTON = 'exemplar-page-children';
const DESCRIPTION = 'exemplar-page-description';
const DESCRIPTION2 = 'exemplar-page-description2';
const DESCRIPTION3 = 'exemplar-page-description3';
const DESCRIPTION_VALUE = 'description-value';
const DETAILS = 'exemplar-page-details';
const META_INFO_CONTAINER = 'exemplar-page-meta-info';


const DETAIL = 'detail';
const DETAILS_DESCRIPTION = 'details-description';
const DETAILS_DATE = 'details-date';
const DETAILS_EVENT = 'details-event';

const EDIT_BUTTON = 'edit-button';
const DOWNLOAD_BUTTON = 'download-button';

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
    
    .${META_INFO_CONTAINER} {
        font-size: var(--normal-font-size);
        margin: 20px 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    #${DESCRIPTION}, #${DESCRIPTION2}, #${DESCRIPTION3} {
        margin: 1rem;
        display: flex;
    }
    
    .${DESCRIPTION_VALUE} {
        margin-left: 0.5rem;
        color: var(--dark-dark-background);
        cursor: pointer;
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
       flex-direction: column;
       align-items: center;
    }
    
  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
        <${IMAGE_COMPONENT}>
            <div class='${DETAILS_DESCRIPTION}'></div>
            <div class='${DETAILS_DATE}'></div>
            <div class='${DETAILS_EVENT}'></div>
            <div class='${BUTTON_CONTAINER}'>
                <${BUTTON_COMPONENT} class='${EDIT_BUTTON}' text='${t('common.edit')}'></${BUTTON_COMPONENT}>
                <a><${BUTTON_COMPONENT} class='${DOWNLOAD_BUTTON}' text='${t('common.download')}'></${BUTTON_COMPONENT}></a>
            </div>
        </${IMAGE_COMPONENT}>        
    </div>
    
  </template>
 
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>  
      <div class='${META_INFO_CONTAINER}'>
        <div>Id:<span id='${ID_CAPTION}'></span> </div>
        <${BUTTON_COMPONENT} id='${SAME_VARIETY_BUTTON}' text='${t('exemplars.see_same_variety')}'></${BUTTON_COMPONENT}>
        <${BUTTON_COMPONENT} id='${SEE_CHILDREN_BUTTON}' text='${t('exemplars.see_children')}'></${BUTTON_COMPONENT}>
      </div> 
      <div id='${DESCRIPTION}'></div>  
      <div id='${DESCRIPTION2}'></div> 
      <div id='${DESCRIPTION3}'></div>   
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

        this.$_id(SAME_VARIETY_BUTTON).onClick = () => {
            if (this.$exemplar) {
                mExemplarsSearch.searchByParams({
                    variety: this.$exemplar.variety && this.$exemplar.variety.id,
                });
            }

        };

        this.$_id(SEE_CHILDREN_BUTTON).onClick = () => {
            if (this.$exemplar) {
                mExemplarsSearch.searchByParams({
                    childrenFor: this.$exemplar.id,
                });
            }

        };
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
            this.$_id(ID_CAPTION).textContent = this.$exemplar.id;


            this.$_id(DESCRIPTION2).innerHTML = this.$exemplar.isSport ? '<div>' + t('exemplars.it_is_sport') + '</div>' : ' ';
            this.$_id(DESCRIPTION).innerHTML = `${this.$exemplar.parent && this.$exemplar.parent.id 
                ? t('exemplars.parent_ref')
                + '<div class="' + DESCRIPTION_VALUE + '"><router-link path="/exemplar/' 
                + this.$exemplar.parent.id + '">'
                + (this.$exemplar.parent.name || '') + '</router-link></div>' 
                : ''}`;
            this.$_id(DESCRIPTION3).innerHTML = `${this.$exemplar.parentLeaf && this.$exemplar.parentLeaf.id
                ? '<div class="' + DESCRIPTION_VALUE + '"><router-link path="/leaves/'
                + this.$exemplar.parentLeaf.id + '">'
                + t('exemplars.parent_leaf_ref') + '</router-link></div>'
                : ''}`;

            if (this.$exemplar.history && this.$exemplar.history.length) {
                this.$exemplar.history.forEach(detail => {
                    const detailTemplate = this.getTemplateById(DETAIL_TEMPLATE);

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
                    detailTemplate.byClass(EDIT_BUTTON).onConstruct = (el) => {
                            el.onClick = () => window.location.hash = '/exemplar/' + this.$exemplar.id + '/hi/' + detail.id + '/edit';
                        };

                    if (detail.photoFull) {
                        const fileNameParts = detail.photoFull.split('/');

                        detailTemplate.byTag('a').download = fileNameParts.pop();
                        detailTemplate.byTag('a').href = detail.photoFull;
                    } else {
                        detailTemplate.byClass(DOWNLOAD_BUTTON).remove();
                    }

                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('exemplar-page', ExemplarPage);
