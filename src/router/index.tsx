import * as React from 'react';
import { Layout } from '../../node_modules/antd4';
import FastClick from 'fastclick'
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
                <Layout>
                    <Layout>
                        <Layout style={{ padding: '0 0' }}>
                            <Content style={{ padding: 0, margin: 0, minHeight: 280, height: '100%' }}>
                                    { this.props.children }
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
        );
    }
}

export default withRouter(App);
