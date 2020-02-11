import mHiItem from '../../model/historyItem';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './edit-history-page';

const template = `
  <edit-history-page></edit-history-page>
`;

export default class EditHistoryPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentHiFetched = this._currentHiFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mHiItem.addSubscriber(this._currentHiFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'edit-history-page-renderer') {
            mHiItem.retrieve(router.params.id, router.params.hiId);
        }
    }

    _currentHiFetched (hi) {
        this.querySelector('edit-history-page').props = {
            exemplarId: router.params.id,
            hi
        };
    }

    disconnectedCallback() {
        mHiItem.removeSubscriber(this._currentHiFetched);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('edit-history-page-renderer', EditHistoryPageRenderer);
