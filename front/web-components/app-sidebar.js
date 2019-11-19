import mDepartments from './model/departments';
import WebElement from './abstract/web-element';
import './components/menu/vertical-menu';
import mRecipeSearch from "./model/search";

const CONTAINER = 'sidebar-menu';

const MENU_COMPONENT = 'vertical-menu';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
        }
    </style>

    <div id='${CONTAINER}'><${MENU_COMPONENT}></${MENU_COMPONENT}></div>
`;

class AppSidebar extends WebElement {
    constructor() {
        super(template, true);

        this._render = this._render.bind(this);

        mDepartments.addSubscriber(this._render);
        mDepartments.retrieve();
    }


    _render() {
        const newDepartments = mDepartments.departments;
        if (newDepartments.length) {

            this.$(MENU_COMPONENT).items = newDepartments.map(dep => ({
                onClick: () => mRecipeSearch.searchByDepartment(dep.id),
                text: dep.name
            }));
        }
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._render);
    }
}

customElements.define('app-sidebar', AppSidebar);
