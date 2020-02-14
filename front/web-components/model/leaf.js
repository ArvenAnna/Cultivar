import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {INTERNAL_ID_KEY} from '../../constants/common';
import {SEVERITY_TYPES} from "../common-notification";

export class Leaf extends Model {

    constructor() {
        super();

        this._leaf = {};

        this.retrieve = this.retrieve.bind(this);
        this._setLeaf = this._setLeaf.bind(this);
        this.removeHi = this.removeHi.bind(this);
    }

    get id() {
        return this._leaf.id;
    }

    get parent() {
        return { ... this._leaf.parent};
    }

    get variety() {
        return { ... this._leaf.variety };
    }

    get history() {
        return this._leaf.history.map(hi => {
            const isTempImage = hi.photo && `/${hi.photo}`.startsWith(routes.TEMP_CATALOG);
            return {
                ...hi,
                photo: isTempImage ? hi.photo : getImageSmallCopy(routes.IMAGE_CATALOG + hi.photo),
                photoFull: isTempImage ? hi.photo : routes.IMAGE_CATALOG + hi.photo
            }});
    }

    // get description() {
    //     return this._exemplar.description;
    // }
    //
    // get date() {
    //     return this._exemplar.date && this._exemplar.date.toString();
    // }

    retrieve(id) {
        fetch(routes.GET_LEAF(id))
            .then(getResponse)
            .then(this._setLeaf)
            .catch(e => {
                console.error(e);
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    removeHi(id) {
        if (!this._leaf.id) {
            throw new Error("history item can not be deleted -  no leaf id");
        }
        if (this._leaf.history.filter(hi => hi.id === id).find(hi => hi.eventType === 'APPEARANCE')) {
            mNotification.showMessage("history item with type APPEARANCE can not be deleted", SEVERITY_TYPES.ERROR);
            throw new Error("history item with type APPEARANCE can not be deleted");
        }
        return fetch(routes.DELETE_LEAF_ITEM(this._leaf.id, id), {method: 'DELETE'})
            .then(() => {
                this.retrieve(this._leaf.id);
            })
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
                console.log(e)
            });
    }

    _setLeaf(item) {
        this._leaf = item;
        this.notifySubscribers();
    }
}

export default new Leaf();
