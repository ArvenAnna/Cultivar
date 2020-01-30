import WebElement from '../../../abstract/web-element';

import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveVarietiesByKeyword} from "../../../utils/asyncRequests";

const CONTAINER = 'container';
const VARIETY_TAG_TMPL = 'variety-tag-template';

const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
const REMOVABLE_TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 0.5rem;
         align-items: center;
      }
      
      // ${REMOVABLE_TAG_COMPONENT} {
      //   display: none;
      // }
  </style>
  
  <template id='${VARIETY_TAG_TMPL}'>
     <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
       <span class='label'>${t('exemplars.choose_variety')} </span> 
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
  </div>
  
`;

class VarietySelector extends WebElement {

    // set props(newItems) {
    //     this.$types = newItems;
    //     this._render();
    // }

    set exemplar(exemplar) {
        this.$exemplar = exemplar;
        this._render();
    }

    _renderRemovableTag(tagContent) {
        if (!this.$(REMOVABLE_TAG_COMPONENT)) {
            const tagTemplate = this.getTemplateById(VARIETY_TAG_TMPL);
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
                    this._retrieveVarietiesByKeyword(item).then(itms => {
                        const variety = itms.find(i => i.name === item);
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
