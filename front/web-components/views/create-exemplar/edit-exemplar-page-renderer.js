import mNewExemplar from '../../model/newExemplar';
import mEvents from '../../model/events';
import WebElement from '../../abstract/web-element';
import './create-exemplar-page';
import router from '../../router/router-context';

const template = `
  <create-exemplar-page></create-exemplar-page>
`;

class EditExemplarPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newExemplarChanged = this._newExemplarChanged.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);
        this._eventsChanged = this._eventsChanged.bind(this);

        mNewExemplar.addSubscriber(this._newExemplarChanged);
        mNewExemplar.retrieve(router.params.id);

        mEvents.addSubscriber(this._eventsChanged);
        mEvents.retrieve(router.params.id);

        router.addSubscriber(this._onRouteChange);

        // this.querySelector('create-exemplar-page').exemplar = mNewExemplar;
        this.querySelector('create-exemplar-page').props = {
            exemplar: mNewExemplar,
            isCreate: false
        };
    }

    _eventsChanged(model) {
        this.querySelector('create-exemplar-page').events = model.events;
    }


    _onRouteChange({params: {id}}) {
        if (router.component == 'edit-exemplar-page-renderer') {
            mNewExemplar.retrieve(id);
        }
    }

    _newExemplarChanged (model) {
        // this.querySelector('create-exemplar-page').exemplar = model;
        this.querySelector('create-exemplar-page').props = {
            exemplar: model,
            isCreate: false
        };
    }


    disconnectedCallback() {
        router.removeSubscriber(this._onRouteChange);
        mNewExemplar.removeSubscriber(this._newExemplarChanged);
        mEvents.removeSubscriber(this._eventsChanged);
    }

}

customElements.define('edit-exemplar-page-renderer', EditExemplarPageRenderer);
