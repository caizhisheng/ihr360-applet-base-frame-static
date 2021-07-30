/**
 * @component store
 * @description Store 配置
 * @time 2018/05/07
 * @author Mike.Cai
 */
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer  from '../reducers';

// 安装redux-devtools-extension的可视化工具。需去谷歌商店安装Redux-DevTools
import { composeWithDevTools } from 'redux-devtools-extension';

const StoreConfig = () => {
    return createStore<any>(
        reducer,
        composeWithDevTools(
            applyMiddleware(ReduxThunk)
        )
    );
}

export default StoreConfig;

