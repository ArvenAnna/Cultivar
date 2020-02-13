import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import {SEVERITY_TYPES} from "../common-notification";

class Events extends Model {

    constructor() {
        super();

        this._events = [];

        this._setEvents = this._setEvents.bind(this);
        this.retrieve = this.retrieve.bind(this);
    }

    get events() {
        return [...this._events];
    }

    retrieve(exemplarId, date) {
        fetch(routes.GET_EVENTS(exemplarId), {method: 'POST',
            body: JSON.stringify({date}),
            headers: {'Content-Type': 'application/json'}})
            .then(getResponse)
            .then(this._setEvents)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setEvents(newEvents) {
        this._events = newEvents;
        this.notifySubscribers();
    }
}

export default new Events();
