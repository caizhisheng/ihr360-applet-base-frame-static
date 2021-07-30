import * as React from 'react';
import { Layout, Menu  } from '../../node_modules/antd4';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export default class HeadNav extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >   
                    <Menu.Item key="0"><Link to="/home"><span>首页</span></Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}