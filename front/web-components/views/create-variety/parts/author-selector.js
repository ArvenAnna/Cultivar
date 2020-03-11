import WebElement from '../../../abstract/web-element';
import '../../../components/drop-down/drop-down';

import {t} from '../../../utils/translateUtils';

// ID
const CONTAINER = 'author-selector-container';
const CAPTION = 'author-selector-caption';

// COMPONENTS
const DROP_DOWN_COMPONENT = 'drop-down';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
         font-size: var(--author-selector-font-size);
      }
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION}'>
            ${t('varieties.select_cultivator')}
       </div>
       <${DROP_DOWN_COMPONENT}></${DROP_DOWN_COMPONENT}>
  </div>
  
`;

class AuthorSelector extends WebElement {

    set authors(newAuthors) {
        this.$authors = newAuthors;
        this._render();
    }

    set variety(newVariety) {
        this.$variety = newVariety;
        this._render();
    }

    _render() {
        this.$(DROP_DOWN_COMPONENT).props = {
            items: this.$authors || [],
            chooseItemCallback: (item) => {
                this.$variety.author = item
            },
            renderItem: (item) => `${item.name}`,
            chosenItemIndex: this.$variety.author && this.$variety.author.id && this.$authors
                ? this.$authors.map(d => d.id).indexOf(this.$variety.author.id)
                : null
        };
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }
}

customElements.define('author-selector', AuthorSelector);
