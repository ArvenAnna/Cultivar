import Model from '../abstract/model';
import {goTo} from '../router/utils';
import {PAGE_SIZE} from '../../constants/limits';

const DEFAULT_SEARCH_STRING = '';
const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_SEARCH_URL = `?page=${DEFAULT_PAGE_NUMBER}&size=${PAGE_SIZE}`;

class VarietiesSearch extends Model {

    constructor() {
        super();

        this.$sportOf = null;
        this.$type = null;
        this.$author = null;
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

    get author() {
        return this.$author;
    }

    get type() {
        return this.$type;
    }

    get sportOf() {
        return this.$sportOf;
    }

    get page() {
        return this.$pageNumber;
    }

    set search(searchUrl) {
        // for direct opening from url
        const PARAMS = {
            VALUE: 'value',
            TYPE: 'type',
            SPORT_OF: '$sportOf',
            AUTHOR: 'hybridisatorId',
            PAGE_SIZE: 'pageSize',
            PAGE_NUMBER: 'pageNumber'
        }
        this.$sportOf = null;
        this.$type = null;
        this.$author = null;
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
                case PARAMS.TYPE:
                    this.$type = paramValue;
                    break;
                case PARAMS.SPORT_OF:
                    this.$sportOf = parseInt(paramValue);
                    break;
                case PARAMS.DEPARTMENT:
                    this.$author = parseInt(paramValue);
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
        this.$author = params.author;
        this.$type = params.type;
        this.$sportOf = params.sportOf;
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
        this.$author = null;
        this.$type = null;
        this.parseInt = null;
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = DEFAULT_PAGE_NUMBER;
    }

    _search() {
        // mandatory params:
        let searchUrl = DEFAULT_SEARCH_URL;

        if (this.$searchString) {
            searchUrl = `${searchUrl}&search=${this.$searchString}`;
        }
        if (this.$author) {
            searchUrl = `${searchUrl}&hybridisatorId=${this.$author}`;
        }
        if (this.$type) {
            searchUrl = `${searchUrl}&type=${this.$type}`;
        }
        if (this.$sportOf) {
            searchUrl = `${searchUrl}&sportOf=${this.$sportOf}`;
        }

        this.$searchUrl = searchUrl;
        goTo(`/varieties${searchUrl}`);
        this.notifySubscribers();
    }
}

export default new VarietiesSearch();
