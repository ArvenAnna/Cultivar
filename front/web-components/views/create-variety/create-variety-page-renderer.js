import mNewVariety from '../../model/newVariety';
import WebElement from '../../abstract/web-element';
import './create-variety-page';

import mAuthors from "../../model/authors";
import mTypes from "../../model/types";

const template = `
  <create-variety-page></create-variety-page>
`;

class CreateVarietyPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newVarietyChanged = this._newVarietyChanged.bind(this);
        this._authorsChanged = this._authorsChanged.bind(this);
        this._typesChanged = this._typesChanged.bind(this);

        mAuthors.addSubscriber(this._authorsChanged);
        mTypes.addSubscriber(this._typesChanged);
        mNewVariety.addSubscriber(this._newVarietyChanged);

        mNewVariety.clear();
        mAuthors.retrieve();
        mTypes.retrieve();

        this.querySelector('create-variety-page').variety = mNewVariety;
    }

    _newVarietyChanged (model) {
        this.querySelector('create-variety-page').variety = model;
    }

    _authorsChanged (model) {
        const newVarietyPage = this.querySelector('create-variety-page');
        newVarietyPage.authors = model.authors;
    }

    _typesChanged (model) {
        const newVarietyPage = this.querySelector('create-variety-page');
        newVarietyPage.types = model.types;
    }

    disconnectedCallback() {
        mAuthors.removeSubscriber(this._authorsChanged);
        mNewVariety.removeSubscriber(this._newVarietyChanged);
        mTypes.removeSubscriber(this._typesChanged);
    }

}

customElements.define('create-variety-page-renderer', CreateVarietyPageRenderer);
