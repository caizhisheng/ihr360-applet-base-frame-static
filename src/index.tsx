/**
 * @author Mike.Cai
 * @time 2018/05/05.
 */

import React, { Suspense } from 'react';
import 'intl';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ConfigureStore from './store/configureStore';
import AppRoute from './router/index';
import 'url-search-params-polyfill';//处理URLSearchParams的兼容性
import "./assets/less/common.less";
import { unregister } from './registerServiceWorker';
const store = ConfigureStore();

const HomePage = React.lazy(() => import(/* webpackChunkName: "home-page-chunk" */'./pages/home'));


ReactDOM.render(
    (
        <Provider store={store}>
            <HashRouter>
                <Suspense fallback={<div>Load...</div>}>
                    <AppRoute>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                        </Switch>
                    </AppRoute>
                </Suspense>
            </HashRouter>
        </Provider>
    ),
    document.getElementById('root')
);
unregister();
