import WebElement from '../../abstract/web-element';
import './image-with-text';

// ID
const CONTAINER = 'image-container';

// TEMPLATES
const ZOOMED_PHOTO_TEMPLATE = 'zoomed-photo-template';
const PHOTO_FULL = 'photo-full';

// COMPONENTS
const IMAGE_COMPONENT = 'image-with-text';

const template = `
  <style>
    
    #${CONTAINER} {
        
    }
        
    .${PHOTO_FULL} {
       width: 100%;
       position: fixed;
    }
    
  </style>
  
  <template id='${ZOOMED_PHOTO_TEMPLATE}'>
     <img class='${PHOTO_FULL}'/>
  </template>
  
  <div id='${CONTAINER}'>
    <${IMAGE_COMPONENT}>
        <slot></slot>
    </${IMAGE_COMPONENT}>
  </div>
  
`;

class ImageWithTextAndZoom extends WebElement {

    set props({src, text, brokenImageSrc, zoomedSrc, openFn}) {
        this.$brokenImageSrc = brokenImageSrc;
        this.$zoomedSrc = zoomedSrc;
        this.$openFn = openFn;
        this.$(IMAGE_COMPONENT).props = {
            brokenImageSrc, src, text
        }
    }

    _openFullPhoto(imgPath) {
        const photoTemplate = this.getTemplateById(ZOOMED_PHOTO_TEMPLATE);
        photoTemplate.byTag('img').src = imgPath;
        const self = this;
        photoTemplate.byTag('img').onerror = function () {
            this.onerror = null;
            this.src = self.$brokenImageSrc;
        }
        this.$openFn(photoTemplate);
    }

    constructor() {
        super(template, true);
        this._openFullPhoto = this._openFullPhoto.bind(this);

        this.$(IMAGE_COMPONENT).addEventListener('dblclick', this._openFullPhoto.bind(this, this.$zoomedSrc));
    }
}

customElements.define('image-with-text-and-zoom', ImageWithTextAndZoom);
