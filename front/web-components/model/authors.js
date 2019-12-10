import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import {SEVERITY_TYPES} from "../common-notification";

class Authors extends Model {

    constructor() {
        super();

        this._authors = [];

        this._setAuthors = this._setAuthors.bind(this);
        this.retrieve = this.retrieve.bind(this);
    }

    get authors() {
        return [...this._authors];
    }

    retrieve() {
        fetch(routes.GET_AUTHORS)
            .then(getResponse)
            .then(this._setAuthors)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setAuthors(newAuthors) {
        this._authors = newAuthors;
        this.notifySubscribers();
    }
}

export default new Authors();
