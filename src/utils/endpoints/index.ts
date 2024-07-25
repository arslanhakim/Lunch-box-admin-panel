export const END_POINTS = {
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        LOGOUT: 'auth/logout',
    },
    UPLOAD: {
        UPLOAD: 'uploader/upload',
    },
    USERS: {
        // ADD: 'category/add',
        UPDATE: 'user/adminupdate',
        REMOVE: 'user/delete-user/',
        GET: 'user/list-users',
    },
    ARTICLES: {
        ADD: 'articles/add',
        UPDATE: 'articles/update',
        REMOVE: 'articles/delete',
        GET: 'articles/get',
    },
    COUPONS: {
        ADD: 'coupons/add',
        UPDATE: 'coupons/update',
        REMOVE: 'coupons/delete',
        GET: 'coupons/get',
    },
    ALERGY: {
        ADD: 'alergy/add',
        // UPDATE: 'alergy/update',
        REMOVE: 'alergy/delete',
        GET: 'alergy/get',
    },
    CATEGORY: {
        ADD: 'category/add',
        UPDATE: 'category/update',
        REMOVE: 'category/delete',
        GET: 'category/get',
    },
    DEFAULT_FOOD: {
        ADD: 'fooditems/add',
        UPDATE: 'fooditems/update',
        REMOVE: 'fooditems/delete',
        GET: 'fooditems/getbyadmin',
    },
    RECIPEBOOK: {
        ADD: 'recipebook/add',
        UPDATE: 'recipebook/update',
        REMOVE: 'recipebook/delete',
        GET: 'recipebook/get',
    },
    PROFILES: {
        ADD: 'profiles/add',
        UPDATE: 'profiles/update',
        REMOVE: 'profiles/delete',
        GET: 'profiles/get-all',
    },
    AVATAR: {
        ADD: 'avatars/add',
        UPDATE: 'avatars/update',
        REMOVE: 'avatars/delete',
        GET: 'avatars/get',
    },
    NOTIFICATION: {
        ADD: 'notification/add',
        UPDATE: 'notification/update',
        REMOVE: 'notification/delete',
        GET: 'notification/get',
        CLEAR_ALL: 'notification/clearall',
    },
}
