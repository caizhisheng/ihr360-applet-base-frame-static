/**
 * @author Mike.Cai
 * @time 2018/05/05.
 */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { getLanguage } from 'irs-react-intl';
import ConfigureStore from './store/configureStore';
import moment from 'moment';
import 'url-search-params-polyfill';//处理URLSearchParams的兼容性
import "./assets/less/common.less";
import "ihr360-web-ui3/packages/theme/index.less";
import 'antd4/dist/antd.less';
import { zh_CN, en } from 'ihr360-web-ui3/packages/locale';
import IrsConfigProvider from 'ihr360-web-ui3/packages/config-provider/IrsConfigProvider';
import IrsNotification from 'ihr360-web-ui3/packages/base/irs-notification';
import IrsMessageBox from 'ihr360-web-ui3/packages/message/irs-message-box';
import IrsMessage from 'ihr360-web-ui3/packages/message/irs-message-toast';
import { IrsDataStorage } from 'irs-tools';
import { i18nToAntd, momentI18nToBFC64, i18nToBFC64 } from './constants/actionsTypes';
import IrsLoading from 'ihr360-web-ui3/packages/loading/irs-loading';
import routerConfig from './router/routerConfig';
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
const projectName = require('../package.json').name;
const store = ConfigureStore();

let lanData: any = []
try {
    lanData = require('./locale/' + process.env.REACT_APP_LANGUAGE_ENV)
} catch (e) {
    lanData = []
}
const language = IrsDataStorage.getCookie('irenshilocale') || 'zh_CN'//me.locale
const webui3SupportLanguage = {
    'zh_CN': zh_CN,
    'en': en
} as any;
const webUi3Language = webui3SupportLanguage[language]; 
const antdLanguage = i18nToAntd[language];
const momentLanguage = momentI18nToBFC64[language];
// @ts-ignore
const momentLocal = require(`moment/locale/${momentLanguage}`);
moment.locale(i18nToBFC64[language]);

const router = createHashRouter(routerConfig)

// const HomePage = React.lazy(() => import('./pages/home'));

class RootComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            lanData,
            reload: 1,
            lanDataLoading: true
        }
        getLanguage(projectName).then((res: any) => {
            this.setState({
                lanData:  res?.messageResources || {},
                lanDataLoading: false
            })
        })
    }
    render () {
        if(this.state.lanDataLoading) {
            return <IrsLoading spinning={true} delay={0} className="router-spin-loading" tip="" />
        }
        return (
            <IntlProvider key={i18nToBFC64[language]} locale={i18nToBFC64[language]} messages={this.state.lanData}>
                <IrsConfigProvider locale={antdLanguage} localeEntry={webUi3Language} antPrefixCls={theme["ant-cls-prefix"]} ihrPrefixCls={theme["ihr-prefix"]}>
                    <Provider store={store}>
                        <Suspense fallback={<IrsLoading spinning={true} tip="页面加载中..." />}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </Provider>
                </IrsConfigProvider>
            </IntlProvider>
        )
    }
}
export default RootComponent;
