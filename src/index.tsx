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
import './index.css';
import { IrsDataStorage } from 'irs-tools';
import { momentI18nToBFC64, i18nToBFC64 } from './constants/actionsTypes';
import { Spinner } from '@/components/ui/spinner';
import routerConfig from './router/routerConfig';
const projectName = require('../package.json').name;
const store = ConfigureStore();

let lanData: any = []
try {
    lanData = require('./locale/' + process.env.REACT_APP_LANGUAGE_ENV)
} catch (e) {
    lanData = []
}
const language = IrsDataStorage.getCookie('irenshilocale') || 'zh_CN'//me.locale
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
            return (
                <div className="flex h-screen w-full items-center justify-center">
                    <Spinner spinning={true} size="lg" />
                </div>
            )
        }
        return (
            <IntlProvider key={i18nToBFC64[language]} locale={i18nToBFC64[language]} messages={this.state.lanData}>
                <Provider store={store}>
                    <Suspense fallback={
                        <div className="flex h-screen w-full items-center justify-center">
                            <Spinner spinning={true} size="lg" tip="页面加载中..." />
                        </div>
                    }>
                        <RouterProvider router={router} />
                    </Suspense>
                </Provider>
            </IntlProvider>
        )
    }
}
export default RootComponent;
