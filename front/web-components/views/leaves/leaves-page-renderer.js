import mSearch from '../../model/leafSearch';
import mLeaves from '../../model/leaves';

import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './leaves-page';

const template = `
  <leaves-page></leaves-page>
`;

export default class LeavesPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._leavesChanged = this._leavesChanged.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mLeaves.addSubscriber(this._leavesChanged);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'leaves-page-renderer') {
            mSearch.search = router.search;
            mLeaves.search();
        }
    }

    _leavesChanged (model) {
        this.querySelector('leaves-page').props = {
            itemsModel: model,
            searchModel: mSearch
        };
    }

    disconnectedCallback() {
        mLeaves.removeSubscriber(this._leavesChanged);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('leaves-page-renderer', LeavesPageRenderer);
