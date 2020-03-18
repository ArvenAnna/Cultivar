import WebElement from '../../../abstract/web-element';
import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveVarietiesByKeyword} from '../../../utils/asyncRequests';
import mNotification from '../../../model/notification';
import {SEVERITY_TYPES} from "../../../common-notification";

// ID
const CONTAINER = 'variety-selector-container';

// TEMPLATE
const VARIETY_TAG_TEMPLATE = 'variety-tag-template';

// COMPONENTS
const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
const REMOVABLE_TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
         font-size: var(--variety-selector-font-size);
      }
      
      .label {
        margin-right: 0.5rem;
      }
  </style>
  
  <template id='${VARIETY_TAG_TEMPLATE}'>
     <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
       <span class='label'>${t('exemplars.choose_variety')} </span> 
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
  </div>
  
`;

class VarietySelector extends WebElement {

    set exemplar(exemplar) {
        this.$exemplar = exemplar;
        this._render();
    }

    _renderRemovableTag(tagContent) {
        if (!this.$(REMOVABLE_TAG_COMPONENT)) {
            const tagTemplate = this.getTemplateById(VARIETY_TAG_TEMPLATE);
            tagTemplate.byTag(REMOVABLE_TAG_COMPONENT).innerHTML = tagContent;
            this.$_id(CONTAINER).appendChild(tagTemplate);
            this.$(REMOVABLE_TAG_COMPONENT).props = {
                removeItemCallback: this._removeVarietyCallback
            };
        } else {
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = tagContent;
        }
    }

    _render() {
        if (this.$exemplar.variety && this.$exemplar.variety.id) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this._renderRemovableTag(this.$exemplar.variety.name);

        } else {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveVarietiesByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    if (!item) {
                        mNotification.showMessage(t('common.you_should_choose_value'), SEVERITY_TYPES.INFO)
                    } else {
                        this._retrieveVarietiesByKeyword(item).then(items => {
                            const variety = items.find(i => i.name === item);
                            if (variety) {
                                this.$exemplar.variety = variety;
                                this._renderRemovableTag(variety.name);
                                this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
                            }
                        })
                    }
                }
            }
        }
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._retrieveVarietiesByKeyword = this._retrieveVarietiesByKeyword.bind(this);
        this._removeVarietyCallback = this._removeVarietyCallback.bind(this);
        this._renderRemovableTag = this._renderRemovableTag.bind(this);
    }

    async _retrieveVarietiesByKeyword(keyword) {
        let page = await retrieveVarietiesByKeyword(keyword);
        return page.varieties;
    }

    _removeVarietyCallback() {
        this.$exemplar.variety = null;
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }

}

customElements.define('variety-selector', VarietySelector);
