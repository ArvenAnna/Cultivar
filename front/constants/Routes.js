import {MAX_SUGGESTIONS_NUMBER} from "./limits";

const httpPrefix = '/api';

const routes = {
    UPLOAD_FILE: httpPrefix + '/file',

    GET_TRANSLATION: (context, bundle) => `/translations/${context}/${bundle}.json`,

    IMAGE_CATALOG: `/${process.env.FOTO_CATALOG}/`,
    TEMP_CATALOG: `/${process.env.TEMP_CATALOG}/`,
    PREVIEW_IMAGE_PREFIX: process.env.PREVIEW_IMAGE_PREFIX,


    SEARCH_VARIETIES_PAGEABLE: (searchUrl) => `${httpPrefix}/varieties${searchUrl}`,
    GET_VARIETY: (variety) => `${httpPrefix}/varieties/${variety}`,
    POST_CREATE_VARIETY: httpPrefix + '/varieties',

    GET_AUTHORS: `${httpPrefix}/varieties/hybridisators`,
    GET_VARIETY_TYPES: `${httpPrefix}/varieties/types`,
    GET_VARIETIS_BY_KEYWORD: (keyword) => `${httpPrefix}/varieties/keyword/${keyword}?pageSize=${MAX_SUGGESTIONS_NUMBER}&pageNumber=0`

};

export const getImageSmallCopy = (imgPath) => {
    if (!imgPath) return null;
    const imgPathParts = imgPath.split('.');
    const extension = `.${imgPathParts[imgPathParts.length - 1]}`;
    imgPathParts.splice(imgPathParts.length - 1, 1, `${routes.PREVIEW_IMAGE_PREFIX}${extension}`);
    return imgPathParts.join('');
}

export default routes;
