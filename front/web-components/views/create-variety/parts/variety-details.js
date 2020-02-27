import WebElement from '../../../abstract/web-element';
import '../../../components/lists/draggable-image-list';

import './variety-detail';

import {noImage} from '../../../../constants/themes';
import {t} from '../../../utils/translateUtils';

// ID
const CONTAINER = 'variety-details-container';
const LIST_CONTAINER = 'variety-details-list-container';

// COMPONENTS
const LIST_COMPONENT = 'draggable-image-list';
const DETAIL_COMPONENT = 'variety-detail';

const template = `
  <style>
      #${LIST_CONTAINER} {
          margin-left: 1rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <${DETAIL_COMPONENT}></${DETAIL_COMPONENT}>
       <div id='${LIST_CONTAINER}'>
            <${LIST_COMPONENT} list-title='${t('varieties.details_list')}'></${LIST_COMPONENT}>
       </div>
  </div>
  
`;

class VarietyDetails extends WebElement {

    set variety(variety) {
        this.$variety = variety;
        this._render();
    }

    _render() {
        this.$(DETAIL_COMPONENT).props = {
            addDetail: detail => {
                this.$variety.detail = detail;
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            }
        };
        this.$(LIST_COMPONENT).props = {
            data: this._constructDataForList(),
            removeItemCallback: detail => {
                this.$variety.removeDetail(detail);
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            },
            defaultSrc: noImage,
            editTextCallback: (dataItem, newText) => {
                dataItem.description = newText;
                this.$variety.detail = dataItem;
            },
            dragCallback: (dataItemFrom, dataItemTo) => {
                this.$variety.reorderDetails(dataItemFrom, dataItemTo);
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            }
        }
    }

    _constructDataForList() {
        return this.$variety.details && this.$variety.details.map(detail =>({
            item: detail,
            src: detail.photo,
            text: detail.description,
        }));
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._constructDataForList = this._constructDataForList.bind(this);
    }
}

customElements.define('variety-details', VarietyDetails);
