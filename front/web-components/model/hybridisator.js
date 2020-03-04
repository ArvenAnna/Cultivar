import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {doJsonRequest, getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {SEVERITY_TYPES} from "../common-notification";

export class Hybridisator extends Model {

    constructor() {
        super();

        this._hybridisator = {};

        this.retrieve = this.retrieve.bind(this);
        this._setHybridisator = this._setHybridisator.bind(this);
        this.save = this.save.bind(this);
    }

    get id() {
        return this._hybridisator.id;
    }

    get name() {
        return this._hybridisator.name;
    }

    set name(name) {
        this._hybridisator.name = name;
    }

    get description() {
        return this._hybridisator.description;
    }

    set description(description) {
        this._hybridisator.description = description;
    }

    retrieve(id) {
        return fetch(routes.GET_HYBRIDISATOR(id))
            .then(getResponse)
            .then(this._setHybridisator)
            .catch(e => {
                console.error(e);
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    async save() {
        const method = this._hybridisator.id ? 'PUT' : 'POST';
        return await doJsonRequest(routes.GET_HYBRIDISATORS, method, this._hybridisator)
            .then(entity => {
                this._setHybridisator(entity);
                return entity.id;
            });
    }

    _setHybridisator(item) {
        this._hybridisator = item;
        this.notifySubscribers();
    }
}

export default new Hybridisator();
