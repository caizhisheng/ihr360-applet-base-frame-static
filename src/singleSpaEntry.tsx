import React from 'react';
import { createRoot, Root } from 'react-dom/client'
import RootComponent from './index';

let root: Root;

const microAppMount = () => {
  if (root) {
    return;
  }
  return new Promise((resolve: any, reject) => {
    document.body.classList.add('applet-base-spa-wrap');
    const container = document.getElementById('applet-base-spa');
    root = createRoot(container!);
    root.render(React.createElement(RootComponent, {}, null)); // id名字为各个项目自定义
    resolve();
  })
}


const microAppUnmount = () => {
  return new Promise((resolve: any, reject) => {
    document.body.classList.remove('applet-base-spa-wrap');
    root?.unmount();
    const childDom = document.getElementById('applet-base-spa');
    if (childDom && childDom.parentNode) {
      childDom.parentNode.removeChild(childDom);
    }
    resolve();
  }).catch((err) => {
    console.log(err)
  })
}


if (!(window as any).__MICRO_APP_MODE__) {
  microAppMount();
}


export {
  microAppMount,
  microAppUnmount,
}