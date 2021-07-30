import * as React from 'react';
import { Layout, Menu } from '../../node_modules/antd4';
// import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;
const { Sider } = Layout;

export default class HeadNav extends React.Component<any, any> {
    public render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {/* <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                        <Menu.Item key="1"><Link to="/">DEMO1</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/saraly">DEMO2</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/home/list">DEMO3</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/test/list">DEMO4</Link></Menu.Item>
                        <Menu.Item key="5">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
        )
    }

}