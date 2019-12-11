import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {INTERNAL_ID_KEY} from '../../constants/common';
import {SEVERITY_TYPES} from "../common-notification";

export class Variety extends Model {

    constructor() {
        super();

        this._variety = {};

        this.retrieve = this.retrieve.bind(this);
        this._setVariety = this._setVariety.bind(this);
    }

    get id() {
        return this._variety.id;
    }

    get name() {
        return this._variety.name;
    }

    get description() {
        return this._variety.description;
    }

    get author() {
        return { ... this._variety.author };
    }

    get type() {
        return this._variety.type;
    }

    get sportOf() {
        return {...this._variety.sportOf};
    }

    // get refs() {
    //     if (!this._recipe.refs || !this._recipe.refs.length) {
    //         return null;
    //     }
    //     return this._recipe.refs.map(ref => ({
    //         ...ref
    //     }));
    // }
    //
    // get imgPath() {
    //     return getImageSmallCopy(this._recipe.imgPath && routes.IMAGE_CATALOG + this._recipe.imgPath);
    // }
    //
    // get imgPathFull() {
    //     return this._recipe.imgPath && routes.IMAGE_CATALOG + this._recipe.imgPath;
    // }
    //
    // get proportions() {
    //     return this._recipe.proportions
    //         && this._recipe.proportions.map(prop => ({ ...prop,
    //             alternativeProportions: prop.alternativeProportions && prop.alternativeProportions.map(altP => ({...altP})),
    //             alternativeRefs: prop.alternativeRefs && prop.alternativeRefs.map(altP => ({...altP}))
    //         }));
    // }
    //
    get details() {
        return this._variety.details && this._variety.details.map((detail) => {
            const {photo, id, order, description} = detail;
            const isTempImage = photo && `/${photo}`.startsWith(routes.TEMP_CATALOG);
            return {
                id,
                description,
                order,
                [`${INTERNAL_ID_KEY}`]: detail[`${INTERNAL_ID_KEY}`],
                photo: isTempImage ? photo : getImageSmallCopy(routes.IMAGE_CATALOG + photo),
                photoFull: isTempImage ? photo : routes.IMAGE_CATALOG + photo
            }
        });
    }

    retrieve(id) {
        fetch(routes.GET_VARIETY(id))
            .then(getResponse)
            .then(this._setVariety)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setVariety(item) {
        this._variety = item;
        this._variety.details = this._variety.details.sort((d1,d2) => d1.order - d2.order);
        this._variety.details.forEach((d, i) => d.order = i + 1);
        // this._recipe.proportions = this._recipe.proportions.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        this._variety.details = this._variety.details.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        // this._recipe.refs = this._recipe.refs.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        this.notifySubscribers();
    }
}

export default new Variety();
