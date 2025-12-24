import * as React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LocaleMessages } from '../locale/localeMessage';
import { ROUTER_PAGE_NAME_OBJ } from '../constants/actionsTypes';
import { RouteTracker } from 'irs-react-intl';
import withRouter from './withRouter';
import { Outlet } from 'react-router-dom';
const projectName = require('../../package.json').name;

class App extends React.Component<any, any> {
    public render() {
        return (
            <ErrorBoundary releaseTag='applet_base_production' environment='production'>
                <div className="flex flex-col w-full h-full">
                    <main className="flex-1 p-0 m-0 min-h-[280px] h-full">
                        <RouteTracker
                            routerPageNameObj={ROUTER_PAGE_NAME_OBJ}
                            LocaleMessages={LocaleMessages}
                            projectName={projectName}
                        />
                        <Outlet />
                    </main>
                </div>
            </ErrorBoundary>
        );
    }
}

export default withRouter(App);
