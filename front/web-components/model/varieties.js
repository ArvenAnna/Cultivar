import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import mSearch from './varietiesSearch';
import {SEVERITY_TYPES} from "../common-notification";

class Varieties extends Model {

    constructor() {
        super();

        this._varieties = [];
        this._page = {};

        this.search = this.search.bind(this);
        this._setVarieties = this._setVarieties.bind(this);
    }

    get varieties() {
        const getImgPath = (item) => {
            return item.details && item.details.length && item.details.sort((d1, d2) => d1.order - d2.order)[0].photo;
        }
        return this._varieties.map(item => ({
            id: item.id,
            name: item.name,
            author: item.author,
            description: item.description,
            imgPath: getImgPath(item) && getImageSmallCopy(routes.IMAGE_CATALOG + getImgPath(item)),
            // imgPathFull: item.imgPath && routes.IMAGE_CATALOG + item.imgPath
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
        fetch(routes.SEARCH_VARIETIES_PAGEABLE(searchUrl))
            .then(getResponse)
            .then(this._setVarieties)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setVarieties(page) {
        this._varieties = page.varieties;
        this._page = page;
        this.notifySubscribers();
    }
}

export default new Varieties();
