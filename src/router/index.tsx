import * as React from 'react';
import { Layout } from '../../node_modules/antd4';
import FastClick from 'fastclick'
import IrsErrorBoundary from 'ihr360-web-ui/packages/capture/irs-error-boundary'
const { Content } = Layout;

import { withRouter } from 'react-router-dom';
import '../index.less';

class App extends React.Component<any, any> {
    componentDidMount() {
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', () => {
                (FastClick as any).attach(document.body);
            }, false);
        }
    }
    
    public render() {
        return (
            <IrsErrorBoundary releaseTag='applet_base_production' environment='production'>
                <Layout style={{ padding: '0 0', width: '100%', height: '100%' }}>
                    <Content style={{ padding: 0, margin: 0, minHeight: 280, height: '100%' }}>
                        { this.props.children }
                    </Content>
                </Layout>
            </IrsErrorBoundary>
        );
    }
}

export default withRouter(App);
