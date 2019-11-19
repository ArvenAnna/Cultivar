import WebElement from '../abstract/web-element';

const ID = 'svg_id';

const template = `
  <style>   
    #${ID} {
        width: 4rem;
        height: 4rem;
        fill: green;
        cursor: pointer;
    }
  </style>
  
  <svg version="1.1" id="${ID}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M402.207,182.625
			L217.75,367.083c-4.167,4.167-9.625,6.25-15.083,6.25c-5.458,0-10.917-2.083-15.083-6.25L88.46,267.958
			c-4.167-4.165-4.167-10.919,0-15.085l15.081-15.082c4.167-4.165,10.919-4.165,15.086,0l84.04,84.042L372.04,152.458
			c4.167-4.165,10.919-4.165,15.086,0l15.081,15.082C406.374,171.706,406.374,178.46,402.207,182.625z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
  
`;

class ApplyIcon extends WebElement {

    constructor() {
        super(template, true);
    }
}

customElements.define('apply-icon', ApplyIcon);
