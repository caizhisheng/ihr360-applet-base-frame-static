import { IrsDataStorage } from 'irs-tools'
export function dealIntl() {
    const language = IrsDataStorage.getCookie('irenshilocale') || 'zh_CN';
    let lanData = [];
    try {
        lanData = require('../locale/' + process.env.REACT_APP_LANGUAGE_ENV) //process.env.REACT_APP_LANGUAGE_ENV
    } catch (e) {
        lanData = [];
    }
    return {
        language,
        lanData,
        momentData: language.toLowerCase(),// 目前的语言 中文 英文 日语
    }
}