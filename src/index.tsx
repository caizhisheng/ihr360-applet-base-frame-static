/**
 * @author Mike.Cai
 * @time 2018/05/05.
 */

import React, { Suspense } from 'react';
import 'intl';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ConfigureStore from './store/configureStore';
import AppRoute from './router/index';
import 'url-search-params-polyfill';//处理URLSearchParams的兼容性
import "./assets/less/common.less";
import "ihr360-web-ui/packages/theme/index.less";

import IrsConfigProvider from 'ihr360-web-ui/packages/config-provider/IrsConfigProvider';
import IrsNotification from 'ihr360-web-ui/packages/base/irs-notification';
import IrsMessageBox from 'ihr360-web-ui/packages/message/irs-message-box';
import IrsMessage from 'ihr360-web-ui/packages/message/irs-message-toast';
const theme = require('../package.json').theme;

IrsNotification.config({
	ihrPrefixCls: theme["ihr-prefix"],
	antPrefixCls: theme["ant-cls-prefix"],
})
IrsMessageBox.config({
	ihrPrefixCls: theme["ihr-prefix"],
	antPrefixCls: theme["ant-cls-prefix"],
})
IrsMessage.config({
	ihrPrefixCls: theme["ihr-prefix"],
	antPrefixCls: theme["ant-cls-prefix"],
})


const store = ConfigureStore();

const HomePage = React.lazy(() => import('./pages/home'));

class RootComponent extends React.Component {
    render () {
        return (
            <IrsConfigProvider locale='zh_CN' antPrefixCls={theme["ant-cls-prefix"]} ihrPrefixCls={theme["ihr-prefix"]}>
                <Provider store={store}>
                    <Suspense fallback={null}>
                        <HashRouter>
                            <AppRoute>
                                <Switch>
                                    <Route path="/home" exact={true} component={HomePage} />
                                    <Redirect to="/home" />
                                </Switch>
                            </AppRoute>
                        </HashRouter>
                    </Suspense>
                </Provider>
            </IrsConfigProvider>
        )
    }
}
export default RootComponent;
