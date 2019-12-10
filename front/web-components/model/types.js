import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import {SEVERITY_TYPES} from "../common-notification";

class Types extends Model {

    constructor() {
        super();

        this._types = [];

        this._setTypes = this._setTypes.bind(this);
        this.retrieve = this.retrieve.bind(this);
    }

    get types() {
        return [...this._types];
    }

    retrieve() {
        fetch(routes.GET_VARIETY_TYPES)
            .then(getResponse)
            .then(this._setTypes)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setTypes(items) {
        this._types = items;
        this.notifySubscribers();
    }
}

export default new Types();
