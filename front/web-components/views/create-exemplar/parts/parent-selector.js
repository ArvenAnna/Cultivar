import WebElement from '../../../abstract/web-element';

import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveExemplarsByKeyword} from "../../../utils/asyncRequests";

const CONTAINER = 'container';
const PARENT_TAG_TMPL = 'parent-tag-template';

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
  
  <template id='${PARENT_TAG_TMPL}'>
     <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
       <span class='label'>${t('exemplars.choose_parent')} </span> 
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
  </div>
  
`;

class ParentSelector extends WebElement {

    set exemplar(exemplar) {
        this.$exemplar = exemplar;
        this._render();
    }

    _renderRemovableTag(tagContent) {
        if (!this.$(REMOVABLE_TAG_COMPONENT)) {
            const tagTemplate = this.getTemplateById(PARENT_TAG_TMPL);
            tagTemplate.byTag(REMOVABLE_TAG_COMPONENT).innerHTML = tagContent;
            this.$_id(CONTAINER).appendChild(tagTemplate);
            this.$(REMOVABLE_TAG_COMPONENT).props = {
                removeItemCallback: this._removeParentCallback
            };
        } else {
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = tagContent;
        }
    }

    _render() {
        if (this.$exemplar.parent && this.$exemplar.parent.id) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this._renderRemovableTag(this.$exemplar.parent.name);

        } else {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveExemplarsByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    this._retrieveExemplarsByKeyword(item).then(itms => {
                        const variety = itms.find(i => i.name === item);
                        if (variety) {
                            this.$exemplar.parent = variety;
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
        this._retrieveExemplarsByKeyword = this._retrieveExemplarsByKeyword.bind(this);
        this._removeParentCallback = this._removeParentCallback.bind(this);
        this._renderRemovableTag = this._renderRemovableTag.bind(this);
    }

    async _retrieveExemplarsByKeyword(keyword) {
        let page = await retrieveExemplarsByKeyword(keyword);
        return page.exemplars;
    }

    _removeParentCallback() {
        this.$exemplar.parent = null;
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }
}

customElements.define('parent-selector', ParentSelector);
