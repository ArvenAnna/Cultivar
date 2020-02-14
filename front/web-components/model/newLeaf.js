import routes from '../../constants/Routes';
import {doJsonRequest} from '../utils/httpUtils';

import {Leaf} from "./leaf";

export class NewLeaf extends Leaf {

    constructor() {
        super();
    }

    set description(newDescription) {
        this._leaf.description = newDescription;
    }

    get description() {
        return super.description;
    }

    get variety() {
        return super.variety;
    }

    set variety(variety) {
        this._leaf.variety = { ... variety };
    }

    get parent() {
        return super.parent;
    }

    set parent(parent) {
        this._leaf.parent = { ... parent };
    }

    set photo(path) {
        this._leaf.photo = path;
    }

    get photo() {
        return super.photo;
    }

    get date() {
        return super.date;
    }

    set date(date) {
        this._leaf.date = date && new Date(date);
    }

    async save() {
        const method = this._leaf.id ? 'PUT' : 'POST';
        const newEntity = await doJsonRequest(routes.POST_CREATE_LEAF, method, this._leaf);
        return newEntity.id;
    }

    clear() {
        this._leaf = {};
    }
}

// export default new NewLeaf();
