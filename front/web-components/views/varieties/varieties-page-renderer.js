import mSearch from '../../model/search';
import mVarieties from '../../model/varieties';

import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './varieties-page';

const template = `
  <varieties-page></varieties-page>
`;

export default class VarietiesPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._varietiesChanged = this._varietiesChanged.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mVarieties.addSubscriber(this._varietiesChanged);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'varieties-page-renderer') {
            mSearch.search = router.search;
            mVarieties.search();
        }
    }

    _varietiesChanged (model) {
        this.querySelector('varieties-page').varieties = model.varieties;
    }

    disconnectedCallback() {
        mVarieties.removeSubscriber(this._varietiesChanged);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('varieties-page-renderer', VarietiesPageRenderer);
