import mNewVariety from '../../model/newVariety';
import WebElement from '../../abstract/web-element';
import './create-variety-page';
import router from '../../router/router-context';

const template = `
  <create-variety-page></create-variety-page>
`;

class EditVarietyPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newVarietyChanged = this._newVarietyChanged.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);

        mNewVariety.addSubscriber(this._newVarietyChanged);
        router.addSubscriber(this._onRouteChange);

        mNewVariety.retrieve(router.params.id);

        this.querySelector('create-variety-page').variety = mNewVariety;
    }

    _onRouteChange({params: {id}}) {
        if (router.component == 'edit-variety-page-renderer') {
            mNewVariety.retrieve(id);
        }
    }

    _newVarietyChanged (model) {
        this.querySelector('create-variety-page').variety = model;
    }


    disconnectedCallback() {
        mNewVariety.removeSubscriber(this._newVarietyChanged);
        router.removeSubscriber(this._onRouteChange);
    }

}

customElements.define('edit-variety-page-renderer', EditVarietyPageRenderer);
