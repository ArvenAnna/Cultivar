import WebElement from './abstract/web-element';
import './styled/input-text';
import './styled/action-button';
import './components/expandable-block';
import './components/suggestions-chooser';
import './components/lists/tags-list';
import './components/drop-down/drop-down';
import {retrieveIngredientsByIds, retrieveIngredientsByKeyword, retrieveRecipesByIds, retrieveRecipesByKeyword} from './utils/asyncRequests';
import mDepartments from './model/departments';
import mRecipeSearch from './model/search';
import {t} from "./utils/translateUtils";
import mTranslations from "./model/translations";

const CONTAINER = 'search-container';

const INGREDIENT_CHOOSER = 'ingredient-chooser';
const REF_CHOOSER = 'ref-chooser';
const INGREDIENT_LIST = 'ingredient-list';
const REF_LIST = 'ref-list';
const ADDITIONAL_SEARCH_PARAMS = 'additional-search-params';
const APPLY_BUTTON = 'apply-button';
const RESET_BUTTON = 'reset-button';
const BUTTONS_CONTAINER = 'buttons-container';

const INPUT_COMPONENT = 'input-text';
const EXPANDABLE_COMPONENT = 'expandable-block';
const SUGGESTIONS_COMPONENT = 'suggestions-chooser';
const LIST_COMPONENT = 'tags-list';
const DROP_DOWN_COMPONENT = 'drop-down';
const BUTTON_COMPONENT = 'action-button';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
            margin-top: 1rem;
            background-color: var(--menu-background, green);
            padding: 0.5rem;
        }

        #${ADDITIONAL_SEARCH_PARAMS} {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        
        ${DROP_DOWN_COMPONENT}, ${LIST_COMPONENT} {
            margin-bottom: 1rem;
            margin-top: 0.2rem;
        }
        
        ${BUTTON_COMPONENT} {
            width: 100%;
        }
        
        #${BUTTONS_CONTAINER} {
            display: flex;
        }
    </style>

    <div id="${CONTAINER}">
        <${INPUT_COMPONENT}></${INPUT_COMPONENT}>
        <${EXPANDABLE_COMPONENT} caption='${t('search.additional_params')}' open>
            <div id='${ADDITIONAL_SEARCH_PARAMS}' slot='content'>
                <${DROP_DOWN_COMPONENT} ></${DROP_DOWN_COMPONENT}>
            
                <${SUGGESTIONS_COMPONENT} id='${INGREDIENT_CHOOSER}'></${SUGGESTIONS_COMPONENT}>
                <${LIST_COMPONENT} id='${INGREDIENT_LIST}'></${LIST_COMPONENT}>

                <${SUGGESTIONS_COMPONENT} id='${REF_CHOOSER}'></${SUGGESTIONS_COMPONENT}>
                <${LIST_COMPONENT} id='${REF_LIST}'></${LIST_COMPONENT}>
            
                <div id='${BUTTONS_CONTAINER}'>
                    <${BUTTON_COMPONENT} text='${t('search.apply')}' id='${APPLY_BUTTON}'></${BUTTON_COMPONENT}>
                    <${BUTTON_COMPONENT} text='${t('search.reset')}' id='${RESET_BUTTON}'></${BUTTON_COMPONENT}>
                </div>
               
            </div>
        </${EXPANDABLE_COMPONENT}>
    </div>
`;

class RecipeSearch extends WebElement {
    constructor() {
        super(template, true);

        this.$chosenIngredients = [];
        this.$chosenRefs = [];
        this.$chosenDepartment = null;

        this._render = this._render.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._onApplyAdditionalSearch = this._onApplyAdditionalSearch.bind(this);

        mDepartments.addSubscriber(this._render);
        mDepartments.retrieve();

        mRecipeSearch.addSubscriber(this._render);
        mTranslations.addSubscriber(this._render);

        this.$(INPUT_COMPONENT).addEventListener('keydown', this._onKeyPress);
        this.$_id(APPLY_BUTTON).addEventListener('click', this._onApplyAdditionalSearch);
        this.$_id(RESET_BUTTON).addEventListener('click', mRecipeSearch.reset);

        this._render();
    }

    async _render() {
        const ingPlaceholder = await mTranslations.getTranslation('create-recipe.add_ingredient');
        const refPlaceholder = await mTranslations.getTranslation('create-recipe.add_ref');
        const searchPlaceholder = await mTranslations.getTranslation('search.search');
        const allName = await mTranslations.getTranslation('search.all');

        this.$(INPUT_COMPONENT).placeholder = searchPlaceholder;
        this.$_id(INGREDIENT_CHOOSER).placeholder = ingPlaceholder;
        this.$_id(REF_CHOOSER).placeholder = refPlaceholder;

        this.$chosenIngredients = mRecipeSearch.ingredients && mRecipeSearch.ingredients.length
            ? await retrieveIngredientsByIds(mRecipeSearch.ingredients) : [];
        this.$chosenRefs = mRecipeSearch.refs && mRecipeSearch.refs.length ? await retrieveRecipesByIds(mRecipeSearch.refs) : [];
        this.$chosenDepartment = mRecipeSearch.department ? mDepartments.departments.find(d => d.id === mRecipeSearch.department) : null;
        this.$(INPUT_COMPONENT).value = mRecipeSearch.searchString;

        this.$(DROP_DOWN_COMPONENT).props = {
            chooseItemCallback: item => {
                this.$chosenDepartment = item;
                },
            items: [{id: null, name: allName}, ...mDepartments.departments],
            renderItem: item => item.name,
            chosenItemIndex: this.$chosenDepartment ? mDepartments.departments.indexOf(this.$chosenDepartment) + 1 : 0
        }

        this.$_id(INGREDIENT_CHOOSER).props = {
            getSuggestionsPromise: retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: (item) => {
                retrieveIngredientsByKeyword(item).then(ings => {
                    // find with exact name matching
                    const ingredient = ings.find(ing => ing.name === item);
                    if (ingredient) {
                        this.$chosenIngredients.push(ingredient);
                        this.$_id(INGREDIENT_LIST).items = this.$chosenIngredients;
                    }
                })
            }
        }
        this.$_id(INGREDIENT_LIST).props = {
            renderItem: item => item.name,
            removeItemCallback: item => {
                this.$chosenIngredients = this.$chosenIngredients.filter(ing => ing.id !== item.id);
            },
            items: this.$chosenIngredients
        }
        this.$_id(REF_CHOOSER).props = {
            getSuggestionsPromise: retrieveRecipesByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: (item) => {
                retrieveRecipesByKeyword(item).then(recipes => {
                    // find with exact name matching
                    const recipe = recipes.find(r => r.name === item);
                    if (recipe) {
                        this.$chosenRefs.push(recipe);
                        this.$_id(REF_LIST).items = this.$chosenRefs;
                    }
                })
            }
        }
        this.$_id(REF_LIST).props = {
            renderItem: item => item.name,
            removeItemCallback: item => {
                this.$chosenRefs = this.$chosenRefs.filter(ref => ref.id !== item.id);
            },
            items: this.$chosenRefs
        }
    }

    _onApplyAdditionalSearch() {
        mRecipeSearch.searchByParams ({
            value: this.$(INPUT_COMPONENT).value && this.$(INPUT_COMPONENT).value.trim(),
            department: this.$chosenDepartment && this.$chosenDepartment.id,
            refs: this.$chosenRefs.map(ref => ref.id),
            ingredients: this.$chosenIngredients.map(ing => ing.id)
        });
    }

    _onKeyPress(e) {
        const key = e.key;

        if (key == 'Enter') {
            this._onApplyAdditionalSearch();
        }
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._render);
        mRecipeSearch.removeSubscriber(this._render);
        mTranslations.removeSubscriber(this._render);
    }
}

customElements.define('recipe-search', RecipeSearch);
