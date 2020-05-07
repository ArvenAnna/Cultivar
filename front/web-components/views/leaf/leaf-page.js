import WebElement from '../../abstract/web-element';
import '../../styled/action-button';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../components/date/date-input';

import '../../components/file-upload/photo-upload';
import '../../components/drop-down/drop-down';

import '../../router/router-link';

import mModal from '../../model/modal';
import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";
import routes from "../../../constants/Routes";
import mExemplarsSearch from '../../model/exemplarSearch';

// ID
const CONTAINER = 'leaf-page-container';
const CAPTION = 'leaf-page-caption';
const DESCRIPTION = 'leaf-page-description';
const DESCRIPTION_VALUE = 'description-value';
const CHILDREN_BUTTON = 'leaf-page-children';

const META_INFO_CONTAINER = 'leaf-page-meta-info';


// TEMPLATE
const DETAIL_TEMPLATE = 'detail_template';
const CREATE_TEMPLATE = 'leaf-create-row-template';
const DETAILS_DESCRIPTION = 'leaf-page-details-description';
const DETAILS_DATE = 'details-date';
const DETAILS_EVENT = 'details-event';

// COMPONENTS
const BUTTON_COMPONENT = 'action-button';
const IMAGE_COMPONENT = 'image-with-text-and-zoom';
const UPLOAD_COMPONENT = 'photo-upload';
const DESCRIPTION_COMPONENT = 'text-area';
const DROP_DOWN_COMPONENT = 'drop-down';
const DATE_COMPONENT = 'date-input';

const template = `
  <style>
    #${CONTAINER} {
        position: relative;
    }
    
    .${META_INFO_CONTAINER} {
        font-size: var(--normal-font-size);
        margin: 20px 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        display: flex;
    }
    
    .${DESCRIPTION_VALUE} {
        margin-left: 0.5rem;
        color: var(--dark-dark-background);
        cursor: pointer;
    }

    .${DETAILS_DESCRIPTION} {
        padding: 0.2rem 0;
        color: var(--light-background);
        white-space: pre-wrap;
    }
     
    ${BUTTON_COMPONENT}, ${DESCRIPTION_COMPONENT} {
        --control-width: 5rem;
    }
    
    table {
        padding: 1rem;
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

  </style>
  
  <template id='${DETAIL_TEMPLATE}'>
    <tr>
        <td><${IMAGE_COMPONENT}></${IMAGE_COMPONENT}></td>
        <td><div class='${DETAILS_DESCRIPTION}'></div></td>
        <td><div class='${DETAILS_DATE}'></div></td>
        <td><div class='${DETAILS_EVENT}'></div></td>
        <td><${BUTTON_COMPONENT} text='${t('common.delete')}'></${BUTTON_COMPONENT}></td>
    </tr>
  </template>
  
  <template id='${CREATE_TEMPLATE}'>
    <tr>
        <td><${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}></td>
        <td><${DESCRIPTION_COMPONENT}></${DESCRIPTION_COMPONENT}></td>
        <td><${DATE_COMPONENT}></${DATE_COMPONENT}></td>
        <td><${DROP_DOWN_COMPONENT}></${DROP_DOWN_COMPONENT}></td>
        <td><${BUTTON_COMPONENT} text='${t('common.save')}'></${BUTTON_COMPONENT}></td>
    </tr>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
      <div class='${META_INFO_CONTAINER}'><${BUTTON_COMPONENT} id='${CHILDREN_BUTTON}' text='${t('leaves.children')}'></${BUTTON_COMPONENT}></div>
      <div id='${DESCRIPTION}'></div>  
      <table>
            <caption>${t('leaves.history')}</caption>
            <thead>
                <tr>
                    <th>${t('leaves.photo')}</th>
                    <th>${t('leaves.description')}</th>
                    <th>${t('leaves.date')}</th>
                    <th>${t('leaves.event')}</th>
                    <th>${t('leaves.action')}</th>
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

    set events(events) {
        this.$events = events;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);
        this._renderCreationRow = this._renderCreationRow.bind(this);

        this._save = this._save.bind(this);

        this.$_id(CHILDREN_BUTTON).onClick = () => {
            if (this._leaf) {
                mExemplarsSearch.searchByParams({
                    childrenForLeaf: this._leaf.id,
                });
            }

        };
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(DESCRIPTION).textContent = '';
        this.$('tbody').innerHTML = '';
    }

    _save() {
        this._newHi.description = this.$(DESCRIPTION_COMPONENT).value;
        this._newHi.date = this.$(DATE_COMPONENT).value;
        this._newHi.eventType = this._newHi.eventType || this.$events[0];

        this._leaf.saveHi(this._newHi).then(() => {
            // window.location.hash = '/exemplar/' + this.$exemplarId;
        });
    }

    _renderCreationRow() {
        const createTemplate = this.getTemplateById(CREATE_TEMPLATE);
        this._newHi = {};

        createTemplate.byTag(UPLOAD_COMPONENT).onConstruct = c => {
            c.props = {
                uploadFileCallback: (path) => {
                    this._newHi.photo = path;
                },
                uploadUrl: routes.UPLOAD_FILE,
                src: this._newHi.photo,
                defaultSrc: noImage
            };
        };

        createTemplate.byTag(DROP_DOWN_COMPONENT).onConstruct = c => {
            c.props = {
                chooseItemCallback: item => this._newHi.eventType = item,
                items: this.$events,
                renderItem: item => item,
            }
        };
        createTemplate.byTag(BUTTON_COMPONENT).onConstruct = (el) => {
                el.onClick = this._save;
            }

        this.$('tbody').appendChild(createTemplate);
    }

    _renderPage() {
        this._clearPage();

        if (this._leaf) {
            this.$_id(CAPTION).textContent = `${this._leaf.variety.name || ''} (leaf ${this._leaf.id})`;

            this.$_id(DESCRIPTION).innerHTML = `${this._leaf.parent && this._leaf.parent.id
                ? t('exemplars.parent_ref')
                + '<div class="' + DESCRIPTION_VALUE + '"><router-link path="/exemplar/'
                + this._leaf.parent.id + '">'
                + (this._leaf.parent.name || '') + '</router-link></div>'
                : ''}`

            if (this._leaf.history && this._leaf.history.length) {
                this._leaf.history.forEach(detail => {
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
                    detailTemplate.byClass(DETAILS_EVENT).innerHTML = t(`events.${detail.eventType}`);
                        if (detail.eventType !== "APPEARANCE") {
                            detailTemplate.byTag(BUTTON_COMPONENT).onConstruct = (el) => {
                                el.onClick = () => {
                                    this._leaf.removeHi(detail.id);
                                }
                            }
                        } else {
                            detailTemplate.byTag(BUTTON_COMPONENT).remove();
                        }

                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$('tbody').appendChild(detailTemplate);
                });

                this._renderCreationRow();
            }

        }
    }

}

customElements.define('leaf-page', LeafPage);
