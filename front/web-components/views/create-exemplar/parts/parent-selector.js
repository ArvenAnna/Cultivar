import WebElement from '../../../abstract/web-element';

import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveExemplarsByKeyword} from "../../../utils/asyncRequests";

const CONTAINER = 'container';

const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
const REMOVABLE_TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 0.5rem;
         align-items: center;
      }
      
      ${REMOVABLE_TAG_COMPONENT} {
        display: none;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <span class='label'>${t('exemplars.choose_parent')} </span> 
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
       <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
  </div>
  
`;

class ParentSelector extends WebElement {

    set exemplar(exemplar) {
        this.$exemplar = exemplar;
        this._render();
    }

    _render() {
        this.$(REMOVABLE_TAG_COMPONENT).props = {
            removeItemCallback: this._removeVarietyCallback
        };

        if (this.$exemplar.parent && this.$exemplar.parent.id) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = this.$exemplar.parent.name;
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';

        } else {
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveExemplarsByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    this._retrieveExemplarsByKeyword(item).then(itms => {
                        const variety = itms.find(i => i.name === item);
                        if (variety) {
                            this.$exemplar.parent = variety;
                            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = variety.name;
                            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';
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
        this._removeVarietyCallback = this._removeVarietyCallback.bind(this);
    }

    async _retrieveExemplarsByKeyword(keyword) {
        let page = await retrieveExemplarsByKeyword(keyword);
        return page.exemplars;
    }

    _removeVarietyCallback() {
        this.$exemplar.parent = null;
        this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }
}

customElements.define('parent-selector', ParentSelector);
