import * as React from 'react';
import { Layout } from '../../node_modules/antd4';
import FastClick from 'fastclick'
import { IrsErrorBoundary } from 'irs-tools'
import IrsError from 'ihr360-web-ui3/packages/capture/irs-error'
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
            <IrsErrorBoundary error={IrsError}>
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