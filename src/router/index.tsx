import * as React from 'react';
import { Layout } from 'antd4';
import IrsErrorBoundary from 'ihr360-web-ui3/packages/capture/irs-error-boundary'
import { LocaleMessages } from '../locale/localeMessage';
import { ROUTER_PAGE_NAME_OBJ } from '../constants/actionsTypes';
import { RouteTracker } from 'irs-react-intl';
const { Content } = Layout;

import '../index.less';
import withRouter from './withRouter';
import { Outlet } from 'react-router-dom';
const projectName = require('../../package.json').name;
class App extends React.Component<any, any> {
    public render() {
        return (
            <IrsErrorBoundary releaseTag='applet_base_production' environment='production'>
                <Layout style={{ padding: '0 0', width: '100%', height: '100%' }}>
                    <Content style={{ padding: 0, margin: 0, minHeight: 280, height: '100%' }}>
                        <RouteTracker 
                            routerPageNameObj={ROUTER_PAGE_NAME_OBJ}
                            LocaleMessages={LocaleMessages}
                            projectName={projectName}
                        />
                        <Outlet />
                    </Content>
                </Layout>
            </IrsErrorBoundary>
        );
    }
}

export default withRouter(App);
