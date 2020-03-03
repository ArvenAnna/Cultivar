import mAuthors from '../../model/authors';

import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './hybridisators-page';

const template = `
  <hybridisators-page></hybridisators-page>
`;

export default class HybridisatorsPageRenderer extends WebElement {

    constructor() {
        super(template);
        this._authorsChanged = this._authorsChanged.bind(this);
        // this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mAuthors.retrieve();

        mAuthors.addSubscriber(this._authorsChanged);
        // router.addSubscriber(this._currentRouteChanged);

    }

    // _currentRouteChanged() {
    //     if (router.component === 'hybridisators-page-renderer') {
    //         mAuthors.retrieve();
    //     }
    // }

    _authorsChanged (model) {
        this.querySelector('hybridisators-page').props = {
            authors: model,
        };
    }

    disconnectedCallback() {
        mAuthors.removeSubscriber(this._authorsChanged);
        // router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('hybridisators-page-renderer', HybridisatorsPageRenderer);
