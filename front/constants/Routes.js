const httpPrefix = '/api';

const routes = {
    GET_DEPARTMENTS: `${httpPrefix}/departs`,

    UPLOAD_FILE: httpPrefix + '/file',

    GET_TRANSLATION: (context, bundle) => `/translations/${context}/${bundle}.json`,

    IMAGE_CATALOG: `/${process.env.FOTO_CATALOG}/`,
    TEMP_CATALOG: `/${process.env.TEMP_CATALOG}/`,
    PREVIEW_IMAGE_PREFIX: process.env.PREVIEW_IMAGE_PREFIX,


    SEARCH_VARIETIES_PAGEABLE: (searchUrl) => `${httpPrefix}/varieties${searchUrl}`,
    GET_VARIETY: (variety) => `${httpPrefix}/varieties/${variety}`,
    POST_CREATE_VARIETY: httpPrefix + '/varieties',

};

export const getImageSmallCopy = (imgPath) => {
    if (!imgPath) return null;
    const imgPathParts = imgPath.split('.');
    const extension = `.${imgPathParts[imgPathParts.length - 1]}`;
    imgPathParts.splice(imgPathParts.length - 1, 1, `${routes.PREVIEW_IMAGE_PREFIX}${extension}`);
    return imgPathParts.join('');
}

export default routes;
