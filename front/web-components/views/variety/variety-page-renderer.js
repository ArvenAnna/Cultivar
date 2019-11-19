import mVariety from '../../model/variety';
import mHeader from '../../model/header';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './variety-page';

const template = `
  <variety-page></variety-page>
`;

export default class VarietyPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentVarietyFetched = this._currentVarietyFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mVariety.addSubscriber(this._currentVarietyFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'variety-page-renderer') {
            mVariety.retrieve(router.params.id);
        }
    }

    _currentVarietyFetched (newVariety) {
        this.querySelector('variety-page').variety = newVariety;
        mHeader.addVarietyEditButton(newVariety.id);
    }

    disconnectedCallback() {
        mVariety.removeSubscriber(this._currentVarietyFetched);
        router.removeSubscriber(this._currentRouteChanged);
        mHeader.removeVarietyEditButton();
    }

}

customElements.define('variety-page-renderer', VarietyPageRenderer);
