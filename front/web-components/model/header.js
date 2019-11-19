import Model from '../abstract/model';
import mTranslations from './translations';

const VARIETIES_ID = 1;
const NEW_VARIETY_ID = 2;
const EDIT_VARIETY_ID = 3;

class Header extends Model {

    get buttons() {
        return Object.values(this.$menu).filter(button => button.active).map(button => ({
            name: button.name,
            to: button.to,
            // count: button.id == MENU_ID ? this.$recipeInMenu : null
        }));
    }

    constructor() {
        super();

        this.$recipeInMenu = 0;

        this.$menu = {
            VARIETIES: {
                trans: () => mTranslations.getTranslation('varieties.varieties'), id: VARIETIES_ID, linkFn: () => '/varieties', active: true
            },
            NEW_VARIETY: { trans: () => mTranslations.getTranslation('varieties.new_variety'), id: NEW_VARIETY_ID, linkFn: () => '/variety', active: true },
            EDIT_VARIETY: { trans: () => mTranslations.getTranslation('varieties.edit_variety'), id: EDIT_VARIETY_ID, linkFn: (id) => `/variety/${id}/edit`, active: false},
            // MENU: {trans: () => mTranslations.getTranslation('common.menu'), id: MENU_ID, linkFn: () => `/menu`, active: true}
        };

        this.addVarietyEditButton = this.addVarietyEditButton.bind(this);
        this.removeVarietyEditButton = this.removeVarietyEditButton.bind(this);
        // this.addIngredientEditButton = this.addIngredientEditButton.bind(this);
        // this.removeIngredientEditButton = this.removeIngredientEditButton.bind(this);
        this._initButtons = this._initButtons.bind(this);
        this._setTranslations = this._setTranslations.bind(this);

        // this.addRecipeToMenu = this.addRecipeToMenu.bind(this);
        // this.removeRecipeFromMenu = this.removeRecipeFromMenu.bind(this);

        mTranslations.addSubscriber(this._setTranslations);

        this._initButtons();
    }

    async _setTranslations() {
        const translations = await Promise.all(Object.values(this.$menu).map(v => {
            return v.trans();
        }));
        Object.values(this.$menu).forEach((value, i) => {
            value.name = translations[i];
        });
        this.notifySubscribers();
    }

    async _initButtons() {
        this.$menu.VARIETIES.to = this.$menu.VARIETIES.linkFn();
        this.$menu.NEW_VARIETY.to = this.$menu.NEW_VARIETY.linkFn();
        // this.$menu.INGREDIENTS.to = this.$menu.INGREDIENTS.linkFn();
        // this.$menu.NEW_INGREDIENT.to = this.$menu.NEW_INGREDIENT.linkFn();
        // this.$menu.MENU.to = this.$menu.MENU.linkFn();
        await this._setTranslations();
    }

    addVarietyEditButton(id) {
       this.$menu.EDIT_VARIETY.to = this.$menu.EDIT_VARIETY.linkFn(id);
       this.$menu.EDIT_VARIETY.active = true;
       this.notifySubscribers();
    }

    removeVarietyEditButton() {
        this.$menu.EDIT_VARIETY.active = false;
        this.notifySubscribers();
    }
    //
    // addIngredientEditButton(id) {
    //     this.$menu.EDIT_INGREDIENT.to = this.$menu.EDIT_INGREDIENT.linkFn(id);
    //     this.$menu.EDIT_INGREDIENT.active = true;
    //     this.notifySubscribers();
    // }
    //
    // removeIngredientEditButton() {
    //     this.$menu.EDIT_INGREDIENT.active = false;
    //     this.notifySubscribers();
    // }

    disconnectedCallback() {
        mTranslations.removeSubscriber(this._setTranslations);
    }

    // addRecipeToMenu() {
    //     this.$recipeInMenu++;
    //     this.notifySubscribers();
    // }
    //
    // removeRecipeFromMenu() {
    //     this.$recipeInMenu--;
    //     this.notifySubscribers();
    // }
}

export default new Header();
