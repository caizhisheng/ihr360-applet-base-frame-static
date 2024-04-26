/**
 * @author Mike.Cai
 * @time 2018/05/05.
 */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import ConfigureStore from './store/configureStore';
import AppRoute from './router/index';
import { dealIntl } from './util/helper';
import moment from 'moment';
import 'url-search-params-polyfill';//处理URLSearchParams的兼容性
import "./assets/less/common.less";
import "ihr360-web-ui3/packages/theme/index.less";
import 'antd4/dist/antd.less';

import IrsConfigProvider from 'ihr360-web-ui3/packages/config-provider/IrsConfigProvider';
import IrsNotification from 'ihr360-web-ui3/packages/base/irs-notification';
import IrsMessageBox from 'ihr360-web-ui3/packages/message/irs-message-box';
import IrsMessage from 'ihr360-web-ui3/packages/message/irs-message-toast';
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

const intlData = dealIntl();
let languageLocale = {} as any;
let intlDates = {} as any;
if (intlData.language === 'en') {
    languageLocale = require('antd4/es/locale/en_US');
    intlDates = require('react-intl/locale-data/en');
} else if (intlData.language === 'ja') {
    languageLocale = require('antd4/es/locale/ja_JP');
    intlDates = require('react-intl/locale-data/ja');
} else {
    languageLocale = require('antd4/es/locale/zh_CN');
    intlDates = require('react-intl/locale-data/zh');
}

addLocaleData([...intlDates]);
const localeLanguage = intlData.language === 'zh_CN' ? 'zh-cn' : intlData.language;
moment.locale(localeLanguage);


const store = ConfigureStore();

const HomePage = React.lazy(() => import('./pages/home'));

class RootComponent extends React.Component {
    render () {
        return (
            <IntlProvider key={intlData.language} locale={intlData.language} messages={intlData.lanData}>
                    <Provider store={store}>
                    <IrsConfigProvider locale={languageLocale.default}  antPrefixCls={theme["ant-cls-prefix"]} ihrPrefixCls={theme["ihr-prefix"]}>
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
                        </IrsConfigProvider>
                    </Provider>
            </IntlProvider>
        )
    }
}
export default RootComponent;
