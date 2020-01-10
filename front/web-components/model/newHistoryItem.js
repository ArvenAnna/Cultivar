import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {doJsonRequest} from "../utils/httpUtils";

export class NewHistoryItem extends Model {

    constructor() {
        super();
    }

    get eventType() {
        return super.eventType;
    }

    set eventType(eventType) {
        this._hi.eventType = eventType;
    }

    get eventNumber() {
        return super.eventNumber;
    }

    set eventNumber(eventNumber) {
        this._hi.eventType = eventNumber;
    }

    get description() {
        return super.description;
    }

    set description(description) {
        this._hi.description = description;
    }

    get date() {
        return super.date;
    }

    set date(date) {
        this._hi.date = date && new Date(date);
    }

    get photo() {
        return super.photo;
    }

    async save(exemplar) {
        const method = this._hi.id ? 'PUT' : 'POST';
        const newEntity = await doJsonRequest(routes.POST_CREATE_HISTORY_ITEM(exemplar), method, this._hi);
        return newEntity.id;
    }

    clear() {
        this._hi = {};
    }
}

export default new NewHistoryItem();
