import WebElement from '../../abstract/web-element';
import '../../styled/text-area';
import '../../styled/action-button';
import '../../components/file-upload/photo-upload';
import '../../components/page-list';
import '../../components/image/image-with-text';
import '../../components/date/date-input';

import '../create-exemplar/parts/variety-selector';
import '../create-exemplar/parts/parent-selector';

import { noImage } from '../../../constants/themes';
import {t} from '../../utils/translateUtils';
import {NewLeaf} from '../../model/newLeaf';
import routes from '../../../constants/Routes';
import {SEVERITY_TYPES} from "../../common-notification";
import mNotification from "../../model/notification";

// ID
const CONTAINER = 'leaves-page-container';
const CAPTION = 'caption';
const NAME_CONTAINER = 'name-container';
const DATE_CONTAINER = 'date-container';
const NAME_CAPTION = 'name-caption';
const BUTTON_CONTAINER = 'button-container';

// TEMPLATE
const ITEM_TEMPLATE = 'item-template';
const ITEM = 'item';
const PHOTO = 'photo';
const CONTENT = 'content';

// COMPONENTS
const PAGE_COMPONENT = 'page-list';
const DESCRIPTION_COMPONENT = 'text-area';
const BUTTON_COMPONENT = 'action-button';
const UPLOAD_COMPONENT = 'photo-upload';
const VARIETY_SELECTOR_COMPONENT = 'variety-selector';
const PARENT_SELECTOR_COMPONENT = 'parent-selector';
const IMAGE_COMPONENT = 'image-with-text';
const DATE_COMPONENT = 'date-input';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    #${CONTENT} {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
    .${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        margin: 1.5rem 0;
        text-shadow: var(--text-shadow);
    }
    
    .${ITEM} {
        display: flex;
    }
    
    .${NAME_CAPTION} {
        margin-right: 0.5rem;
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
            <${IMAGE_COMPONENT}></${IMAGE_COMPONENT}>
         </div>
      </router-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div class='${CAPTION}'>${t('leaves.leaves')}</div>
    <div id='${CONTENT}'></div>
    <${PAGE_COMPONENT}></${PAGE_COMPONENT}>
    
    <div class='${CAPTION}'>${t('leaves.create_new_leaf')}</div>
    <${VARIETY_SELECTOR_COMPONENT}></${VARIETY_SELECTOR_COMPONENT}>  
    <${PARENT_SELECTOR_COMPONENT}></${PARENT_SELECTOR_COMPONENT}>
    <div class='${NAME_CONTAINER}'>
       <${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}>
    </div>
    
    <div class='${NAME_CONTAINER}'>
        <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
    </div>
      
    <div class='${DATE_CONTAINER}'>
        <div class='${NAME_CAPTION}'>${t('exemplars.exemplar_date')}</div>
        <${DATE_COMPONENT}></${DATE_COMPONENT}>
    </div> 
      
    <div class='${BUTTON_CONTAINER}'>
        <${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}>
    </div>
    
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
        this._newLeaf.date = this.$(DATE_COMPONENT).value;

        if (!this._newLeaf.variety || !this._newLeaf.variety.id) {
            mNotification.showMessage(t('exemplars.must_choose_variety'), SEVERITY_TYPES.INFO);
            return;
        }
        this._newLeaf.save().then(id => {
            window.location.hash = '/leaves/' + id;
        });
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        this.$(VARIETY_SELECTOR_COMPONENT).exemplar = this._newLeaf;
        this.$(PARENT_SELECTOR_COMPONENT).exemplar = this._newLeaf;
        this.$(DESCRIPTION_COMPONENT).value = this._newLeaf.description || '';
        this.$(UPLOAD_COMPONENT).props = {
            uploadFileCallback: (path) => {
                this._newLeaf.photo = path;
            },
            uploadUrl: routes.UPLOAD_FILE,
            src: this._newLeaf.photo,
            defaultSrc: noImage
        };
        this.$(DATE_COMPONENT).value = this._newLeaf.date || '';

        if (this.$exemplarsModel.leaves && this.$exemplarsModel.leaves.length) {

            this.$exemplarsModel.leaves.forEach(item => {

                const template = this.getTemplateById(ITEM_TEMPLATE);

                template.byTag(IMAGE_COMPONENT).onConstruct = (comp) => {
                    comp.props = {
                        brokenImageSrc: noImage,
                        src: item.imgPath,
                        text: `${item.variety.name} ${item.id}`
                    }
                }

                template.byTag('router-link').onConstruct = (link) => {
                    link.path = `/leaves/${item.id}`
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
