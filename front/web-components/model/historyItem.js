import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {SEVERITY_TYPES} from "../common-notification";

export class HistoryItem extends Model {

    constructor() {
        super();

        this._hi = {};

        this.retrieve = this.retrieve.bind(this);
        this._setHistoryItem = this._setHistoryItem.bind(this);
    }

    get id() {
        return this._hi.id;
    }

    get eventType() {
        return this._hi.eventType;
    }

    get eventNumber() {
        return this._hi.eventNumber;
    }

    get description() {
        return this._hi.description;
    }

    get date() {
        return this._hi.date && this._hi.date.toString();
    }

    get photo() {
        return getImageSmallCopy(this._hi.photo && routes.IMAGE_CATALOG + this._hi.photo);
    }

    get photoFull() {
        return this._hi.photo && routes.IMAGE_CATALOG + this._hi.photo;
    }

    retrieve(exemplarId, id) {
        fetch(routes.GET_HISTORY_ITEM(exemplarId, id))
            .then(getResponse)
            .then(this._setHistoryItem)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
                console.log(e)
            });
    }

    delete(exemplarId) {
        if (!this._hi.id) {
            throw new Error("history item can not be deleted -  no id");
        }
        return fetch(routes.DELETE_HISTORY_ITEM(exemplarId, this._hi.id), {method: 'DELETE'})
            .then(() => {
                this._hi = {}
            })
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
                console.log(e)
            });
    }

    _setHistoryItem(item) {
        this._hi = item;
        this.notifySubscribers();
    }
}

export default new HistoryItem();
