import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {INTERNAL_ID_KEY} from '../../constants/common';
import {SEVERITY_TYPES} from "../common-notification";

export class Exemplar extends Model {

    constructor() {
        super();

        this._exemplar = {};

        this.retrieve = this.retrieve.bind(this);
        this._setExemplar = this._setExemplar.bind(this);
    }

    get id() {
        return this._exemplar.id;
    }

    get name() {
        return this._exemplar.name;
    }

    get parent() {
        return { ... this._exemplar.parent};
    }

    get isSport() {
        return this._exemplar.sport;
    }

    get variety() {
        return { ... this._exemplar.variety };
    }

    get history() {
        return this._exemplar.history.map(hi => {
            const isTempImage = hi.photo && `/${hi.photo}`.startsWith(routes.TEMP_CATALOG);
            return {
            ...hi,
            photo: isTempImage ? hi.photo : getImageSmallCopy(routes.IMAGE_CATALOG + hi.photo),
            photoFull: isTempImage ? hi.photo : routes.IMAGE_CATALOG + hi.photo
        }});
    }

    get description() {
        return this._exemplar.description;
    }

    get date() {
        return this._exemplar.date;
    }

    get photo() {
        return getImageSmallCopy(this._exemplar.photo && routes.IMAGE_CATALOG + this._exemplar.photo);
    }

    get photoFull() {
        return this._exemplar.photo && routes.IMAGE_CATALOG + this._exemplar.photo;
    }
    //
    // get proportions() {
    //     return this._recipe.proportions
    //         && this._recipe.proportions.map(prop => ({ ...prop,
    //             alternativeProportions: prop.alternativeProportions && prop.alternativeProportions.map(altP => ({...altP})),
    //             alternativeRefs: prop.alternativeRefs && prop.alternativeRefs.map(altP => ({...altP}))
    //         }));
    // }
    //
    // get details() {
    //     return this._variety.details && this._variety.details.map((detail) => {
    //         const {photo, id, order, description} = detail;
    //         const isTempImage = photo && `/${photo}`.startsWith(routes.TEMP_CATALOG);
    //         return {
    //             id,
    //             description,
    //             order,
    //             [`${INTERNAL_ID_KEY}`]: detail[`${INTERNAL_ID_KEY}`],
    //             photo: isTempImage ? photo : getImageSmallCopy(routes.IMAGE_CATALOG + photo),
    //             photoFull: isTempImage ? photo : routes.IMAGE_CATALOG + photo
    //         }
    //     });
    // }

    retrieve(id) {
        fetch(routes.GET_EXEMPLAR(id))
            .then(getResponse)
            .then(this._setExemplar)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setExemplar(item) {
        this._exemplar = item;
        // this._variety.details = this._variety.details.sort((d1,d2) => d1.order - d2.order);
        // this._variety.details.forEach((d, i) => d.order = i + 1);
        // this._recipe.proportions = this._recipe.proportions.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        // this._variety.details = this._variety.details.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        // this._recipe.refs = this._recipe.refs.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        this.notifySubscribers();
    }
}

export default new Exemplar();
