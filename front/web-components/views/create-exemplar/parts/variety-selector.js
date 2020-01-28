import WebElement from '../../../abstract/web-element';

import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveVarietiesByKeyword} from "../../../utils/asyncRequests";

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
       <span class='label'>${t('exemplars.choose_variety')} </span> 
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
       <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
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

    _render() {
        this.$(REMOVABLE_TAG_COMPONENT).props = {
            removeItemCallback: this._removeVarietyCallback
        };

        if (this.$exemplar.variety && this.$exemplar.variety.id) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = this.$exemplar.variety.name;
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';

        } else {
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveVarietiesByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    this._retrieveVarietiesByKeyword(item).then(itms => {
                        const variety = itms.find(i => i.name === item);
                        if (variety) {
                            this.$exemplar.variety = variety;
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
        // this._saveIngredient = this._saveIngredient.bind(this);
        this._retrieveVarietiesByKeyword = this._retrieveVarietiesByKeyword.bind(this);
        this._removeVarietyCallback = this._removeVarietyCallback.bind(this);
    }

    async _retrieveVarietiesByKeyword(keyword) {
        let page = await retrieveVarietiesByKeyword(keyword);
        return page.varieties;
    }

    _removeVarietyCallback() {
        this.$exemplar.variety = null;
        this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }

    // _saveIngredient() {
    //     this.$ingredient.name = this.$(INPUT_COMPONENT).value;
    //     this.$ingredient.description = this.$(TEXT_COMPONENT).value;
    //
    //     // put default behavior
    //     this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
    //     this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    //
    //     this.$ingredient.save().then(id => {
    //         this.$addIngredient();
    //         window.location.hash = '/ingredients/' + id;
    //     });
    // }
}

customElements.define('variety-selector', VarietySelector);
