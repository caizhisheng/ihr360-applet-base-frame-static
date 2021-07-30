import * as Constants from '../constants/actionsTypes';

const initialState = {
    msg: '',
    visible: false,
    icon: 'success',
    redirectTo: '',
    isCloseView: false,
    searchList: null
}

const startQualifyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Constants.SEARCH_APPROVER_LIST:
            return { ...state, searchList: { employees: action.data } };
        case Constants.CLEAR_SEARCH_APPROVER_LIST:
            return { ...state, searchList: null };
        case Constants.SHOW_ERROR_MSG:
            return { ...state, msg: action.msg, visible: true, icon: 'error', redirectTo: action.redirectTo ? action.redirectTo : '', isCloseView: action.isCloseView ? action.isCloseView : false };
        case Constants.HIDE_MSG:
            return { ...state, msg: '', visible: false, icon: 'success' };
        case Constants.SHOW_SUCCESS_MSG:
            return {
                ...state,
                msg: action.msg,
                visible: true,
                icon: 'success',
                redirectTo: action.redirectTo ? action.redirectTo : '',
                isCloseView: action.isCloseView ? action.isCloseView : false
            };
        default:
            return state;
    }
}
export { startQualifyReducer };