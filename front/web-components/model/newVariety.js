import {Variety} from './variety';
import routes from '../../constants/Routes';
import {doJsonRequest} from '../utils/httpUtils';
import {INTERNAL_ID_KEY} from '../../constants/common';

class NewVariety extends Variety {

    static _getByInternalId(array, objToFind) {
        return array.find(item => item[`${INTERNAL_ID_KEY}`] === objToFind[`${INTERNAL_ID_KEY}`]);
    }

    static _getNextInternalId(array) {
        const internalKeys = array.map(item => item[`${INTERNAL_ID_KEY}`]);
        return internalKeys.length ? Math.max(...internalKeys) + 1 : 0;
    }

    static _getWithoutByInternalId(array, objToFind) {
        return array.filter(item => item[`${INTERNAL_ID_KEY}`] !== objToFind[`${INTERNAL_ID_KEY}`]);
    }

    constructor() {
        super();
    }

    get name() {
        return super.name;
    }

    set name(newName) {
        this._variety.name = newName;
    }

    set description(newDescription) {
        this._variety.description = newDescription;
    }

    get description() {
        return super.description;
    }

    get author() {
        return super.author;
    }

    set author(newAuthor) {
        this._variety.author = { ... newAuthor };
    }

    get type() {
        return super.type;
    }

    set type(newType) {
        this._variety.type = newType;
    }

    get sportOf() {
        return super.sportOf;
    }

    set sportOf(sport) {
        this._variety.sportOf = {...sport};
    }

    // set imgPath(path) {
    //     this._recipe.imgPath = path;
    // }
    //
    // get imgPath() {
    //     return super.imgPath;
    // }

    set detail (detail) {
        if (!this._variety.details) {
            this._variety.details = [];
        }

        let oldDetail = NewVariety._getByInternalId(this._variety.details, detail);

        if (oldDetail) {
            //then update these fields, img path can not be changed
            oldDetail.description = detail.description;
            oldDetail.order = this._calculateDetailOrder(detail);
        } else {
            //then create
            this._variety.details.push({
                description: detail.description,
                photo: detail.photo,
                order: this._calculateDetailOrder(detail),
                [`${INTERNAL_ID_KEY}`]: NewVariety._getNextInternalId(this._variety.details)
            });
        }
    }

    reorderDetails(detailFrom, detailTo) {
        let oldDetailFrom = NewVariety._getByInternalId(this._variety.details, detailFrom);
        this._variety.details.filter(d => d.order >= detailTo.order).forEach(d => d.order = d.order + 1);
        oldDetailFrom.order = detailTo.order;
        this._variety.details = this._variety.details.sort((d1,d2) => d1.order - d2.order);
    }

    _calculateDetailOrder(detail) {
        if (detail.order) return detail.order;
        if (this._variety.details.length === 0) {
            return 1;
        } else {
            return this._variety.details[this._variety.details.length - 1].order + 1;
        }
    }

    removeDetail(detail) {
        if (this._variety.details) {
            this._variety.details = NewVariety._getWithoutByInternalId(this._variety.details, detail);
        }
    }

    async save() {
        //todo: remove:
        const mockedDate = new Date();
        this._variety.hybridisationDate = mockedDate;
        const method = this._variety.id ? 'PUT' : 'POST';
        const newRecipe = await doJsonRequest(routes.POST_CREATE_VARIETY, method, this._variety);
        return newRecipe.id;
    }

    clear() {
        this._variety = {};
    }
}

export default new NewVariety();
