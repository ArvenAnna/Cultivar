import mSearch from '../../model/exemplarSearch';
import mExemplars from '../../model/exemplars';

import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './exemplars-page';

const template = `
  <exemplars-page></exemplars-page>
`;

export default class ExemplarsPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._exemplarsChanged = this._exemplarsChanged.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mExemplars.addSubscriber(this._exemplarsChanged);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'exemplars-page-renderer') {
            mSearch.search = router.search;
            mExemplars.search();
        }
    }

    _exemplarsChanged (model) {
        this.querySelector('exemplars-page').props = {
            itemsModel: model,
            searchModel: mSearch
        };
    }

    disconnectedCallback() {
        mExemplars.removeSubscriber(this._exemplarsChanged);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('exemplars-page-renderer', ExemplarsPageRenderer);
