import WebElement from '../abstract/web-element';

const supportedAttributes = {
    PATH: 'path'
}

class RouterLink extends WebElement {

    constructor() {
        super();
        this.bindMethods(this.changeUrl);
    }

    set path(newPath) {
        this.setAttribute(supportedAttributes.PATH, newPath);
    }

    changeUrl() {
        window.location.hash = '#' + this.getAttribute(supportedAttributes.PATH);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.changeUrl);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.changeUrl);
    }

}

customElements.define('router-link', RouterLink);
