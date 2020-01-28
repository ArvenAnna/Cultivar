import mNewExemplar from '../../model/newExemplar';
import WebElement from '../../abstract/web-element';
import './create-exemplar-page';

const template = `
  <create-exemplar-page></create-exemplar-page>
`;

class CreateExemplarPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newExemplarChanged = this._newExemplarChanged.bind(this);

        mNewExemplar.addSubscriber(this._newExemplarChanged);
        mNewExemplar.clear();

        // this.querySelector('create-exemplar-page').exemplar = mNewExemplar;
        this.querySelector('create-exemplar-page').props = {
            exemplar: mNewExemplar,
            isCreate: true
        };

    }

    _newExemplarChanged (model) {
        // this.querySelector('create-exemplar-page').exemplar = model;
        this.querySelector('create-exemplar-page').props = {
            exemplar: model,
            isCreate: true
        };
    }


    disconnectedCallback() {
        mNewExemplar.removeSubscriber(this._newExemplarChanged);
    }

}

customElements.define('create-exemplar-page-renderer', CreateExemplarPageRenderer);
