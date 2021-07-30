/**
 * @component reducers
 * @description Home RootReducer
 * @time 2018/1/9
 * @author ***
 */

import { combineReducers } from 'redux'; // 连接reducers
import { asyncReducer } from './home';
import { startQualifyReducer } from './selectApprover';

const rootReducer = combineReducers({
    startQualifyReducer,
    asyncReducer
})

export default rootReducer;


