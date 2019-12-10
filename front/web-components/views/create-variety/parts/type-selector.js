import WebElement from '../../../abstract/web-element';

import '../../../components/drop-down/drop-down';

import {t} from '../../../utils/translateUtils';

const CONTAINER = 'container';
const CAPTION = 'caption';

const DROP_DOWN_COMPONENT = 'drop-down';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
      }
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION}'>
            ${t('varieties.select_type')}
       </div>
       <${DROP_DOWN_COMPONENT}></${DROP_DOWN_COMPONENT}>
  </div>
  
`;

class TypeSelector extends WebElement {

    set types(newItems) {
        this.$types = newItems;
        this._render();
    }

    set variety(newVariety) {
        this.$variety = newVariety;
        this._render();
    }

    _render() {
        this.$(DROP_DOWN_COMPONENT).props = {
            items: this.$types || [],
            chooseItemCallback: (item) => {
                this.$variety.type = item
            },
            renderItem: item => item,
            chosenItemIndex: this.$variety.type && this.$types
                ? this.$types.indexOf(this.$variety.type)
                : null
        };
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }
}

customElements.define('type-selector', TypeSelector);
