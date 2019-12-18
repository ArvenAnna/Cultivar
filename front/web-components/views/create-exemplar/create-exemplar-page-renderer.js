import mNewExemplar from '../../model/newExemplar';
import WebElement from '../../abstract/web-element';
import './create-exemplar-page';

import mAuthors from "../../model/authors";
import mTypes from "../../model/types";

const template = `
  <create-exemplar-page></create-exemplar-page>
`;

class CreateExemplarPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newExemplarChanged = this._newExemplarChanged.bind(this);
        // this._authorsChanged = this._authorsChanged.bind(this);
        // this._typesChanged = this._typesChanged.bind(this);

        // mAuthors.addSubscriber(this._authorsChanged);
        // mTypes.addSubscriber(this._typesChanged);
        mNewExemplar.addSubscriber(this._newExemplarChanged);

        mNewExemplar.clear();
        // mAuthors.retrieve();
        // mTypes.retrieve();

        this.querySelector('create-exemplar-page').exemplar = mNewExemplar;
    }

    _newExemplarChanged (model) {
        this.querySelector('create-exemplar-page').exemplar = model;
    }

    // _authorsChanged (model) {
    //     const newVarietyPage = this.querySelector('create-exemplar-page');
    //     newVarietyPage.authors = model.authors;
    // }
    //
    // _typesChanged (model) {
    //     const newVarietyPage = this.querySelector('create-exemplar-page');
    //     newVarietyPage.types = model.types;
    // }

    disconnectedCallback() {
        // mAuthors.removeSubscriber(this._authorsChanged);
        mNewExemplar.removeSubscriber(this._newExemplarChanged);
        // mTypes.removeSubscriber(this._typesChanged);
    }

}

customElements.define('create-exemplar-page-renderer', CreateExemplarPageRenderer);
