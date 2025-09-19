import React from 'react';
import { Navigate } from 'react-router-dom';
import AppRoute from './index';

const routerConfig = [
    {
        path: "/",
        element: <Navigate to="/base/home" replace />
    },
    {
        path: "/base",
        element: <AppRoute />,
        loader: async () => {
          // 在这里可以初始化 RouteTracker 相关的数据
          return { initialized: true };
        },
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />
          },
          {
            path: "home",
            lazy: async () => {
              const Module = await import('../pages/home');
              const Component = Module.default;
              return {
                Component: () => <Component bizType="0" />
              }
            },
          },
          {
            path: "demo",
            lazy: async () => {
              const Module = await import('../pages/demo');
              const Component = Module.default as React.ComponentType<any>;
              return {
                Component: () => <Component bizType="0" />
              }
            },
          }
        ]
    }
]

export default routerConfig;