import {Variety} from './variety';
import routes from '../../constants/Routes';
import {doJsonRequest} from '../utils/httpUtils';
import {INTERNAL_ID_KEY} from '../../constants/common';

class NewVariety extends Variety {

    constructor() {
        super();
    }

    get name() {
        return super.name;
    }

    set name(newName) {
        this.$variety.name = newName;
    }

    set description(newDescription) {
        this.$variety.description = newDescription;
    }

    get description() {
        return super.description;
    }

    get author() {
        return super.author;
    }

    set author(newAuthor) {
        this.$variety.author = { ... newAuthor };
    }

    get type() {
        return super.type;
    }

    set type(newType) {
        this.$variety.type = newType;
    }

    get sportOf() {
        return super.sportOf;
    }

    set sportOf(sport) {
        this.$variety.sportOf = {...sport};
    }

    // set imgPath(path) {
    //     this._recipe.imgPath = path;
    // }
    //
    // get imgPath() {
    //     return super.imgPath;
    // }

    async save() {
        const method = this.$variety.id ? 'PUT' : 'POST';
        const newRecipe = await doJsonRequest(routes.POST_CREATE_VARIETY, method, this.$variety);
        return newRecipe.id;
    }

    clear() {
        this.$variety = {};
    }
}

export default new NewVariety();
