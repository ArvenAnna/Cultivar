import mLeaf from '../../model/leaf';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './leaf-page';

const template = `
  <leaf-page></leaf-page>
`;

export default class LeafPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentLeafFetched = this._currentLeafFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

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

    disconnectedCallback() {
        mLeaf.removeSubscriber(this._currentLeafFetched);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('leaf-page-renderer', LeafPageRenderer);
