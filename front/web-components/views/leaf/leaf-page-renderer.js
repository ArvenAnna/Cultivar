import mLeaf from '../../model/leaf';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './leaf-page';
import mEvents from "../../model/leafEvents";

const template = `
  <leaf-page></leaf-page>
`;

export default class LeafPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentLeafFetched = this._currentLeafFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);
        this._eventsChanged = this._eventsChanged.bind(this);

        mEvents.addSubscriber(this._eventsChanged);
        mEvents.retrieve(router.params.id);

        mLeaf.addSubscriber(this._currentLeafFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'leaf-page-renderer') {
            mLeaf.retrieve(router.params.id);
        }
    }

    _currentLeafFetched (leaf) {
        this.querySelector('leaf-page').leaf = leaf;
    }

    _eventsChanged(model) {
        this.querySelector('leaf-page').events = model.events;
    }

    disconnectedCallback() {
        mLeaf.removeSubscriber(this._currentLeafFetched);
        router.removeSubscriber(this._currentRouteChanged);
        mEvents.removeSubscriber(this._eventsChanged);
    }

}

customElements.define('leaf-page-renderer', LeafPageRenderer);
