import mHybridisator from '../../model/hybridisator';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './hybridisator-page';

const template = `
  <hybridisator-page></hybridisator-page>
`;

export default class HybridisatorPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentHybridisatorFetched = this._currentHybridisatorFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mHybridisator.addSubscriber(this._currentHybridisatorFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'hybridisator-page-renderer') {
            mHybridisator.retrieve(router.params.id);
        }
    }

    _currentHybridisatorFetched (hybridisator) {
        this.querySelector('hybridisator-page').hybridisator = hybridisator;
    }

    disconnectedCallback() {
        mHybridisator.removeSubscriber(this._currentHybridisatorFetched);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('hybridisator-page-renderer', HybridisatorPageRenderer);
