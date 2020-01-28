import mExemplar from '../../model/exemplar';
import mHeader from '../../model/header';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './exemplar-page';

const template = `
  <exemplar-page></exemplar-page>
`;

export default class ExemplarPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._currentExemplarFetched = this._currentExemplarFetched.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mExemplar.addSubscriber(this._currentExemplarFetched);
        router.addSubscriber(this._currentRouteChanged);

        this._currentRouteChanged();
    }

    _currentRouteChanged() {
        if (router.component === 'exemplar-page-renderer') {
            mExemplar.retrieve(router.params.id);
        }
    }

    _currentExemplarFetched (exemplar) {
        this.querySelector('exemplar-page').exemplar = exemplar;
        mHeader.addExemplarEditButton(exemplar.id);
    }

    disconnectedCallback() {
        mExemplar.removeSubscriber(this._currentExemplarFetched);
        router.removeSubscriber(this._currentRouteChanged);
        mHeader.removeExemplarEditButton();
    }

}

customElements.define('exemplar-page-renderer', ExemplarPageRenderer);
