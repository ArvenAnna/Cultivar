import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import mSearch from './exemplarSearch';
import {SEVERITY_TYPES} from "../common-notification";

class Exemplars extends Model {

    constructor() {
        super();

        this._exemplars = [];
        this._page = {};

        this.search = this.search.bind(this);
        this._setExemplars = this._setExemplars.bind(this);
    }

    get exemplars() {
        const getImgPath = (item) =>  item.history.map(hi => hi.photo).filter(photo => photo).pop();

        return this._exemplars.map(item => ({
            id: item.id,
            parent: item.parent,
            isSport: item.isSport,
            variety: {
                id: item.variety.id,
                name: item.variety.name
            },
            imgPath: getImageSmallCopy(getImgPath(item) && routes.IMAGE_CATALOG + getImgPath(item)),
            imgPathFull: getImgPath(item) && routes.IMAGE_CATALOG + getImgPath(item)
        }))
    }

    get currentPage() {
        return this._page.currentPage;
    }

    get totalElements() {
        return this._page.totalElements;
    }

    get totalPages() {
        return this._page.totalPages;
    }

    search() {
        const searchUrl = mSearch.searchUrl;
        fetch(routes.SEARCH_EXEMPLARS_PAGEABLE(searchUrl))
            .then(getResponse)
            .then(this._setExemplars)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setExemplars(page) {
        this._exemplars = page.exemplars;
        this._page = page;
        this.notifySubscribers();
    }
}

export default new Exemplars();
