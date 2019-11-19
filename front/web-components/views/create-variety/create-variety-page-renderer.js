import mNewVariety from '../../model/newVariety';
import WebElement from '../../abstract/web-element';
import './create-variety-page';

const template = `
  <create-variety-page></create-variety-page>
`;

class CreateVarietyPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newVarietyChanged = this._newVarietyChanged.bind(this);

        mNewVariety.addSubscriber(this._newVarietyChanged);

        mNewVariety.clear();

        this.querySelector('create-variety-page').variety = mNewVariety;
    }

    _newVarietyChanged (model) {
        this.querySelector('create-variety-page').variety = model;
    }


    disconnectedCallback() {
        mNewVariety.removeSubscriber(this._newVarietyChanged);
    }

}

customElements.define('create-variety-page-renderer', CreateVarietyPageRenderer);
