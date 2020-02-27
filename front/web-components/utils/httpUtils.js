import mSpinner from '../model/spinner';
import mNotification from '../model/notification';
import {SEVERITY_TYPES} from "../common-notification";

export const getResponse = (response) => {
    if (!response.ok) {
         return response.json().then(json => {
             mNotification.showMessage(json.message, SEVERITY_TYPES.ERROR);
             throw new Error(json.message);
         });
    }
    return response.json();
}

export const processResponse = (promise) => {
    mSpinner.loading = true;
    return promise
        .then(getResponse)
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            console.error(e);
        })
        .finally(() => mSpinner.loading = false);
}

export const doJsonRequest = (route, method, body) => {
    return processResponse(fetch(route,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }));
}

export const processVoidResponse = (promise) => {
    mSpinner.loading = true;
    return promise
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Request failed with code " + resp.status);
            }
        })
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            console.error(e);
        })
        .finally(() => mSpinner.loading = false);
}

export const doVoidJsonRequest = (route, method, body) => {
    return processVoidResponse(fetch(route,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }));
}
