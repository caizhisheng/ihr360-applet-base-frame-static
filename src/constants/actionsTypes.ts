
/**
 * @component constants
 * @description action 行为常量
 * @time 2018/05/04
 * @author Mike.Cai
 */

export const GET_EASY_DATA = 'GET_EASY_DATA';
export type GET_EASY_DATA = typeof GET_EASY_DATA;

export const GET_EASY_DATA_ERROR = 'GET_EASY_DATA_ERROR';
export type GET_EASY_DATA_ERROR = typeof GET_EASY_DATA_ERROR;

export const CLEAR_SEARCH_APPROVER_LIST = 'CLEAR_SEARCH_APPROVER_LIST'//清空搜索数据
export const SEARCH_APPROVER_LIST = 'SEARCH_APPROVER_LIST'//搜索选择审批人
export const SHOW_ERROR_MSG = 'SHOW_ERROR_MSG';
export const HIDE_MSG = 'HIDE_MSG';
export const SHOW_SUCCESS_MSG = 'SHOW_SUCCESS_MSG';

export const i18nToBFC64 = {
    "zh_CN": "zh-cn",
    "zh_TW": "zh-tw",
    "en": "en",
    "ja": "ja",
    "fr_FR": "fr",
    "es_ES": "es",
    "de_DE": "de",
    "ko_KR": "ko",
    "in_ID": "id",
    "pt_PT": "pt",
    "vi_VN": "vi",
    "th_TH": "th",
    "ar_AE": "ar",
    "tr_TR": "tr"
} as any;

export const shortI18nToBFC64 = {...i18nToBFC64, 
    "zh_CN": "zh",
    "zh_TW": "zh",
} as any;

export const momentI18nToBFC64 = {...i18nToBFC64,
    "en": "en-au",
} as any;

export const i18nToAntd = {
    "zh_CN": "zh_CN",
    "zh_TW": "zh_TW",
    "en": "en_US",
    "ja": "ja_JP",
    "fr_FR": "fr_FR",
    "es_ES": "es_ES",
    "de_DE": "de_DE",
    "ko_KR": "ko_KR",
    "in_ID": "id_ID",
    "pt_PT": "pt_PT",
    "vi_VN": "vi_VN",
    "th_TH": "th_TH",
    "ar_AE": "ar_EG",
    "tr_TR": "tr_TR"
} as any;

export const ROUTER_PAGE_NAME_OBJ = {
    "/base/home": "首页",
    "/base/demo": "示例"
}