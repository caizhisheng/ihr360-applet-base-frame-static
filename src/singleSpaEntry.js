import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import RootComponent from './index';


// 开发环境直接渲染
if (process.env.NODE_ENV==='development') {
    ReactDOM.render(<RootComponent/>, document.getElementById('applet-base-spa')); // id名字为各个项目自定义
}

function domElementGetter() {
    let el = document.getElementById('applet-base-spa');// id名字为各个项目自定义
    if (!el) {
        el = document.createElement('div');
        el.id = 'applet-base-spa';// id名字为各个项目自定义
        el.className = 'applet-base-spa'
    }
    let timer = null;
    timer = setInterval(() => {
                if (document.querySelector('#single-spa-content')) {
                    document.body.appendChild(el);
                    document.querySelector('#single-spa-content').appendChild(el)
                    clearInterval(timer);
                }
            }, 100);
    return el;
}

// 创建生命周期实例
const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    domElementGetter,
    rootComponent: () => {
    return (
        <RootComponent/>
    )
    }
})

// 项目启动的钩子, 项目启动后的钩子，项目卸载的钩子
export function bootstrap(props) {
    return  reactLifecycles.bootstrap(props);
}

export function mount(props) {
    const singleSpaContentDom = document.getElementById("single-spa-content")
    if(singleSpaContentDom.children.length > 0) {
        singleSpaContentDom.removeChild(singleSpaContentDom.children[0])
    }
    document.body.classList.add('applet-base-spa-wrap');
    return  reactLifecycles.mount(props);
}

export function unmount(props) {
    document.body.classList.remove('applet-base-spa-wrap');
    const childDom = document.getElementById('applet-base-spa');
    if (childDom && childDom.parentNode) {
        childDom.parentNode.removeChild(childDom);
    }
    return reactLifecycles.unmount(props);
}
