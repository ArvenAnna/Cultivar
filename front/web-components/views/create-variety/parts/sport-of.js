import WebElement from '../../../abstract/web-element';
import '../../../components/tag/removable-tag';
import '../../../components/suggestions-chooser';

import {t} from '../../../utils/translateUtils';
import {retrieveVarietiesByKeyword} from "../../../utils/asyncRequests";
import {SEVERITY_TYPES} from "../../../common-notification";
import mNotification from "../../../model/notification";

// ID
const CONTAINER = 'sport-of-container';
const LABEL = 'sport-of-label';

// COMPONENTS
const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
const REMOVABLE_TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
         font-size: var(--sport-of-selector-font-size);
      }
      
      ${REMOVABLE_TAG_COMPONENT} {
        display: none;
      }
      
      #${LABEL} {
        margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <span id='${LABEL}'>${t('varieties.sport_of')}</span>
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
       <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
  </div>
  
`;

class SportOf extends WebElement {

    set variety(newVariety) {
        this.$variety = newVariety;
        this._render();
    }

    _render() {
        this.$(REMOVABLE_TAG_COMPONENT).props = {
            removeItemCallback: this._removeSportOfCallback
        };

        if (this.$variety.sportOf && this.$variety.sportOf.id) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = this.$variety.sportOf.name;
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';

        } else {
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveVarietiesByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    if (!item) {
                        mNotification.showMessage(t('common.you_should_choose_value'), SEVERITY_TYPES.INFO)
                    } else {
                        this._retrieveVarietiesByKeyword(item).then(itms => {
                            const variety = itms.find(i => i.name === item);
                            if (variety) {
                                this.$variety.sportOf = variety;
                                this.$(REMOVABLE_TAG_COMPONENT).innerHTML = variety.name;
                                this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';
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
        this._removeSportOfCallback = this._removeSportOfCallback.bind(this);
    }

    async _retrieveVarietiesByKeyword(keyword) {
        let page = await retrieveVarietiesByKeyword(keyword);
        // exclude self
        return page.varieties.filter(item => this.$variety.id !== item.id);
    }

    _removeSportOfCallback() {
        this.$variety.sportof = null;
        this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }
}

customElements.define('sport-of', SportOf);
