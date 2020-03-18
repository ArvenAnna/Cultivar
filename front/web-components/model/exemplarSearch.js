import Model from '../abstract/model';
import {goTo} from '../router/utils';
import {PAGE_SIZE} from '../../constants/limits';

const DEFAULT_SEARCH_STRING = '';
const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_SEARCH_URL = `?page=${DEFAULT_PAGE_NUMBER}&size=${PAGE_SIZE}`;

class ExemplarSearch extends Model {

    constructor() {
        super();

        this.$variety = null;
        this.$searchString = DEFAULT_SEARCH_STRING;

        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = DEFAULT_PAGE_NUMBER;
        this.$searchUrl = DEFAULT_SEARCH_URL;

        this._search = this._search.bind(this);
        this._reset = this._reset.bind(this);
        this.reset = this.reset.bind(this);
        this.searchByParams = this.searchByParams.bind(this);
    }

    get searchUrl() {
        return this.$searchUrl;
    }

    get searchString() {
        return this.$searchString;
    }

    get variety() {
        return this.$variety;
    }

    get page() {
        return this.$pageNumber;
    }

    set search(searchUrl) {
        // for direct opening from url
        const PARAMS = {
            VALUE: 'value',
            VARIETY: 'varietyId',
            PAGE_SIZE: 'pageSize',
            PAGE_NUMBER: 'pageNumber'
        }
        this.$variety = null;
        this.$searchString = '';
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = 0;

        let search = searchUrl.startsWith('?') ? searchUrl.substr(1) : searchUrl;

        const params = search.split('&');
        params.forEach(param => {
            const paramWithValue = param.split('=');
            const paramName = paramWithValue[0];
            const paramValue = paramWithValue[1];
            switch (paramName) {
                case PARAMS.VALUE:
                    this.$searchString = paramValue;
                    break;
                case PARAMS.VARIETY:
                    this.$variety = parseInt(paramValue);
                    break;
                case PARAMS.PAGE_SIZE:
                    this.$pageSize = parseInt(paramValue);
                    break;
                case PARAMS.PAGE_NUMBER:
                    this.$pageNumber = parseInt(paramValue);
                    break;
            }
        });
        this.$searchUrl = search ? searchUrl : DEFAULT_SEARCH_URL;
    }

    set newPage(newPage) {
        this.$pageNumber = newPage;
        this._search();
    }

    searchByParams(params) {
        this.$searchString = params.value || this.$searchString;
        this.$variety = params.variety;
        this.$pageSize = params.pageSize || this.$pageSize;
        this.$pageNumber = params.pageNumber || this.$pageNumber;

        this._search();
    }

    reset() {
        this._reset();
        this._search();
    }

    _reset() {
        this.$searchString = DEFAULT_SEARCH_STRING;
        this.$variety = null;
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = DEFAULT_PAGE_NUMBER;
    }

    _search() {
        // mandatory params:
        let searchUrl = `?page=${this.$pageNumber}&size=${this.$pageSize}`;

        if (this.$searchString) {
            searchUrl = `${searchUrl}&search=${this.$searchString}`;
        }
        if (this.$variety) {
            searchUrl = `${searchUrl}&varietyId=${this.$variety}`
        }

        this.$searchUrl = searchUrl;
        goTo(`/exemplars${searchUrl}`);
        this.notifySubscribers();
    }
}

export default new ExemplarSearch();
