import mNewVariety from '../../model/newVariety';
import WebElement from '../../abstract/web-element';
import './create-variety-page';
import router from '../../router/router-context';
import mAuthors from '../../model/authors';
import mTypes from '../../model/types';

const template = `
  <create-variety-page></create-variety-page>
`;

class EditVarietyPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newVarietyChanged = this._newVarietyChanged.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);
        this._authorsChanged = this._authorsChanged.bind(this);
        this._typesChanged = this._typesChanged.bind(this);

        mNewVariety.addSubscriber(this._newVarietyChanged);
        router.addSubscriber(this._onRouteChange);
        mAuthors.addSubscriber(this._authorsChanged);
        mTypes.addSubscriber(this._typesChanged);

        mNewVariety.retrieve(router.params.id);
        mAuthors.retrieve();
        mTypes.retrieve();

        this.querySelector('create-variety-page').variety = mNewVariety;

        this.querySelector('create-variety-page').props = {
            variety: mNewVariety,
            authors: mAuthors.authors,
            types: mTypes.types
        }
    }

    _onRouteChange({params: {id}}) {
        if (router.component == 'edit-variety-page-renderer') {
            mNewVariety.retrieve(id);
        }
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
        mNewVariety.removeSubscriber(this._newVarietyChanged);
        router.removeSubscriber(this._onRouteChange);
        mAuthors.removeSubscriber(this._authorsChanged);
        mTypes.removeSubscriber(this._typesChanged);
    }

}

customElements.define('edit-variety-page-renderer', EditVarietyPageRenderer);
