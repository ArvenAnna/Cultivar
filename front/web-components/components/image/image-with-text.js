import WebElement from '../../abstract/web-element';

const CONTAINER = 'image-container';
const TEXT = 'image-text';
const IMAGE = 'image';

const template = `
  <style>
    
    #${CONTAINER} {
        max-width: 100%;
        width: var(--image-width);
    }
    
    #${IMAGE} {
        object-fit: contain;
        border: var(--image-border, 1px);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
     }
        
     #${TEXT} {
        padding: 0.2rem;
        font-size: medium;
        font-weight: 600;
        text-align: center;
     }
    
  </style>
  
  <div id='${CONTAINER}'>
    <img id='${IMAGE}'/>
    <div id='${TEXT}'>
        
    </div>
  </div>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class ImageWithText extends WebElement {

    set props({src, text, brokenImageSrc}) {
        this.setAttribute(supportedAttributes.SRC, src);
        this.$_id(TEXT).textContent = text;
        this.$_id(IMAGE).onerror = function () {
            this.onerror = null;
            this.src = brokenImageSrc;
        }
    }

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    constructor() {
        super(template, true);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).src = newValue;
        }
    }
}

customElements.define('image-with-text', ImageWithText);
