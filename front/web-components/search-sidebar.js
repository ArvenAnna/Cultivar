import WebElement from './abstract/web-element';
import './styled/input-text';
import './styled/action-button';
import './components/expandable-block';
import './components/suggestions-chooser';
import './components/lists/tags-list';
import './components/drop-down/drop-down';

import './views/create-variety/parts/author-selector';
import './views/create-variety/parts/type-selector';
import './views/create-variety/parts/sport-of';
import './views/create-exemplar/parts/variety-selector';

import {t} from "./utils/translateUtils";
import mVarietiesSearch from './model/varietiesSearch';
import mAuthors from './model/authors';
import mTypes from './model/types';
import mExemplarsSearch from './model/exemplarSearch';
import mLeavesSearch from './model/leafSearch';

import mTranslations from './model/translations';

const CONTAINER = 'search-container';

const VARIETIES_SEARCH_INPUT = 'varieties-search-input';
const VARIETIES_SEARCH_APPLY = 'varieties-search-apply';
const VARIETIES_SEARCH_RESET = 'varieties-search-reset';

const EXEMPLARS_SEARCH_INPUT = 'exemplars-search-input';
const EXEMPLARS_SEARCH_APPLY = 'exemplars-search-apply';
const EXEMPLARS_SEARCH_RESET = 'exemplars-search-reset';
const EXEMPLARS_VARIETY_SEARCH = 'exemplars-varieties-search';

const LEAVES_VARIETY_SEARCH = 'leaves-varieties-search';
const LEAVES_SEARCH_APPLY = 'leaves-search-apply';
const LEAVES_SEARCH_RESET = 'leaves-search-reset';

const ELEMENT_CONTAINER = 'search-element-container';

const INGREDIENT_CHOOSER = 'ingredient-chooser';
const REF_CHOOSER = 'ref-chooser';
const INGREDIENT_LIST = 'ingredient-list';
const REF_LIST = 'ref-list';
const ADDITIONAL_SEARCH_PARAMS = 'additional-search-params';
const APPLY_BUTTON = 'apply-button';
const BUTTONS_CONTAINER = 'buttons-container';

// COMPONENTS
const INPUT_COMPONENT = 'input-text';
const EXPANDABLE_COMPONENT = 'expandable-block';
const SUGGESTIONS_COMPONENT = 'suggestions-chooser';
const AUTHOR_SELECTOR_COMPONENT = 'author-selector';
const TYPE_SELECTOR_COMPONENT = 'type-selector';
const SPORT_OF_SELECTOR_COMPONENT = 'sport-of';
const VARIETY_SELECTOR_COMPONENT = 'variety-selector';

const DROP_DOWN_COMPONENT = 'drop-down';
const BUTTON_COMPONENT = 'action-button';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
            background-color: var(--menu-background, green);
            padding: 0.5rem;
            font-size: var(--small-font-size);
        }
      
       .${ELEMENT_CONTAINER} {
            padding: 0.5rem 0;
            margin-left: 1rem;
            display: flex;
       }

      
    </style>

    <div id="${CONTAINER}">
        <div>${t('search.varieties')}</div>
        <div class='${ELEMENT_CONTAINER}'>${t('search.search_string')}<${INPUT_COMPONENT} id='${VARIETIES_SEARCH_INPUT}'></${INPUT_COMPONENT}></div>
        <${AUTHOR_SELECTOR_COMPONENT}></${AUTHOR_SELECTOR_COMPONENT}>
        <${TYPE_SELECTOR_COMPONENT}></${TYPE_SELECTOR_COMPONENT}>
        <${SPORT_OF_SELECTOR_COMPONENT}></${SPORT_OF_SELECTOR_COMPONENT}>
        <div class='${ELEMENT_CONTAINER}'>
            <${BUTTON_COMPONENT} id='${VARIETIES_SEARCH_APPLY}' text='${t('search.apply')}'></${BUTTON_COMPONENT}>
            <${BUTTON_COMPONENT} id='${VARIETIES_SEARCH_RESET}' text='${t('search.reset')}'></${BUTTON_COMPONENT}>
        </div>
        <div>${t('search.exemplars')}</div>
        <div class='${ELEMENT_CONTAINER}'>${t('search.search_string')}<${INPUT_COMPONENT} id='${EXEMPLARS_SEARCH_INPUT}'></${INPUT_COMPONENT}></div>
        <${VARIETY_SELECTOR_COMPONENT} id='${EXEMPLARS_VARIETY_SEARCH}'></${VARIETY_SELECTOR_COMPONENT}>
        <div class='${ELEMENT_CONTAINER}'>
            <${BUTTON_COMPONENT} id='${EXEMPLARS_SEARCH_APPLY}' text='${t('search.apply')}'></${BUTTON_COMPONENT}>
            <${BUTTON_COMPONENT} id='${EXEMPLARS_SEARCH_RESET}' text='${t('search.reset')}'></${BUTTON_COMPONENT}>
        </div>
        <div>${t('search.leaves')}</div>
        <${VARIETY_SELECTOR_COMPONENT} id='${LEAVES_VARIETY_SEARCH}'></${VARIETY_SELECTOR_COMPONENT}>
        <div class='${ELEMENT_CONTAINER}'>
            <${BUTTON_COMPONENT} id='${LEAVES_SEARCH_APPLY}' text='${t('search.apply')}'></${BUTTON_COMPONENT}>
            <${BUTTON_COMPONENT} id='${LEAVES_SEARCH_RESET}' text='${t('search.reset')}'></${BUTTON_COMPONENT}>
        </div>
    </div>
`;

class SearchSidebar extends WebElement {

    constructor() {
        super(template, true);

        this.$allName = null;

        this.$chosenVariety = {};
        this.$chosenExemplar = {};
        this.$chosenLeaf = {};

        this._render = this._render.bind(this);
        this._onApplyVarietiesSearch = this._onApplyVarietiesSearch.bind(this);
        this._onApplyExemplarsSearch = this._onApplyExemplarsSearch.bind(this);
        this._onApplyLeavesSearch = this._onApplyLeavesSearch.bind(this);

        mAuthors.addSubscriber(this._render);
        mAuthors.retrieve();

        mTypes.addSubscriber(this._render);
        mTypes.retrieve();

        mVarietiesSearch.addSubscriber(this._render);
        mExemplarsSearch.addSubscriber(this._render);
        mLeavesSearch.addSubscriber(this._render);
        mTranslations.addSubscriber(this._render);

        this.$_id(VARIETIES_SEARCH_APPLY).addEventListener('click', this._onApplyVarietiesSearch);
        this.$_id(VARIETIES_SEARCH_RESET).addEventListener('click', mVarietiesSearch.reset);

        this.$_id(EXEMPLARS_SEARCH_APPLY).addEventListener('click', this._onApplyExemplarsSearch);
        this.$_id(EXEMPLARS_SEARCH_RESET).addEventListener('click', mExemplarsSearch.reset);

        this.$_id(LEAVES_SEARCH_APPLY).addEventListener('click', this._onApplyLeavesSearch());
        this.$_id(LEAVES_SEARCH_RESET).addEventListener('click', mLeavesSearch.reset);

        this._render();
    }

    async _render() {
        const allName = await mTranslations.getTranslation('search.all');
        this.$allName = allName;

        this.$(AUTHOR_SELECTOR_COMPONENT).variety = this.$chosenVariety;
        this.$(AUTHOR_SELECTOR_COMPONENT).authors = [{id: null, name: allName}, ...mAuthors.authors];
        this.$(TYPE_SELECTOR_COMPONENT).variety = this.$chosenVariety;
        this.$(TYPE_SELECTOR_COMPONENT).types = [allName, ...mTypes.types];
        this.$(SPORT_OF_SELECTOR_COMPONENT).variety = this.$chosenVariety;

        this.$_id(EXEMPLARS_VARIETY_SEARCH).exemplar = this.$chosenExemplar;
        this.$_id(LEAVES_VARIETY_SEARCH).exemplar = this.$chosenLeaf;
    }

    _onApplyVarietiesSearch() {
        mVarietiesSearch.searchByParams ({
            value: this.$_id(VARIETIES_SEARCH_INPUT).value && this.$_id(VARIETIES_SEARCH_INPUT).value.trim(),
            author: this.$chosenVariety.author && this.$chosenVariety.author.id,
            type: this.$chosenVariety.type !== this.$allName ? this.$chosenVariety.type : null,
            sportOf: this.$chosenVariety.sportOf && this.$chosenVariety.sportOf.id
        });
    }

    _onApplyExemplarsSearch() {
        mExemplarsSearch.searchByParams({
            value: this.$_id(EXEMPLARS_SEARCH_INPUT).value && this.$_id(EXEMPLARS_SEARCH_INPUT).value.trim(),
            variety: this.$chosenExemplar.variety && this.$chosenExemplar.variety.id,
        })
    }

    _onApplyLeavesSearch() {
        mLeavesSearch.searchByParams({
            variety: this.$chosenLeaf.variety && this.$chosenLeaf.variety.id,
        })
    }

    disconnectedCallback() {
        mAuthors.removeSubscriber(this._render);
        mTypes.removeSubscriber(this._render);
        mVarietiesSearch.removeSubscriber(this._render);
        mExemplarsSearch.removeSubscriber(this._render);
        mLeavesSearch.removeSubscriber(this._render);
        mTranslations.removeSubscriber(this._render);
    }
}

customElements.define('search-sidebar', SearchSidebar);
