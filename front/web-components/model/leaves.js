import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import mSearch from './leafSearch';
import {SEVERITY_TYPES} from "../common-notification";

class Leaves extends Model {

    constructor() {
        super();

        this._leaves = [];
        this._page = {};

        this.search = this.search.bind(this);
        this._setLeaves = this._setLeaves.bind(this);
    }

    get leaves() {
        const getImgPath = (item) =>  item.history.map(hi => hi.photo).filter(photo => photo)[0];
        return this._leaves.map(item => ({
            id: item.id,
            parent: item.parent,
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
        fetch(routes.SEARCH_LEAVES_PAGEABLE(searchUrl))
            .then(getResponse)
            .then(this._setLeaves)
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setLeaves(page) {
        this._leaves = page.leaves;
        this._page = page;
        this.notifySubscribers();
    }
}

export default new Leaves();
