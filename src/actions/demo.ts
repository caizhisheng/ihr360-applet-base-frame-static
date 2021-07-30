import * as constants from '../constants/actionsTypes';
import IrsFetchHttp  from '../fetch/http';
const mockUrl = process.env.REACT_APP_FETCH_EASY_MOCK_BASE_URL as any;
const fetch = new IrsFetchHttp();

// dispatch 数据到reducer
export const asyncAction = () => {
    return (dispatch: any) => {
        fetch.get(mockUrl, null).then((res) => {
            dispatch({
                type: constants.GET_EASY_DATA,
                data: res
            })
        }, (error) => {
            dispatch({
                type: constants.GET_EASY_DATA_ERROR,
                data: error
            })
        })
    }
}


// dispatch promise到reducer
export const asyncPromiseAction = () => {
    const asyncPromiseData = fetch.get(mockUrl, null);
    return {
        type: constants.GET_EASY_DATA,
        data: asyncPromiseData
    }
}
