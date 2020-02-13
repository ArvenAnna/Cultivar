import mHiItem from '../../model/newHistoryItem';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './edit-history-page';
import mEvents from "../../model/events";

const template = `
  <edit-history-page></edit-history-page>
`;

export default class EditHistoryPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentHiFetched = this._currentHiFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);
        this._eventsChanged = this._eventsChanged.bind(this);

        mEvents.addSubscriber(this._eventsChanged);
        mEvents.retrieve(router.params.id, mHiItem.date);

        mHiItem.addSubscriber(this._currentHiFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _eventsChanged(model) {
        this.querySelector('edit-history-page').events = model.events;
    }

    _currentRouteChanged() {
        if (router.component === 'edit-history-page-renderer') {
            mHiItem.retrieve(router.params.id, router.params.hiId);
        }
    }

    _currentHiFetched (hi) {
        mEvents.retrieve(router.params.id, hi.date);
        this.querySelector('edit-history-page').props = {
            exemplarId: router.params.id,
            hi,
            events: mEvents.events
        };
    }

    disconnectedCallback() {
        mHiItem.removeSubscriber(this._currentHiFetched);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('edit-history-page-renderer', EditHistoryPageRenderer);
