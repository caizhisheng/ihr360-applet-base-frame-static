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
            async lazy() {
              const HomePage = await import('../pages/home');
              return {
                Component: HomePage.default,
              };
            },
          },
          {
            path: "demo", 
            async lazy() {
              const DemoPage = await import('../pages/demo');
              return {
                Component: DemoPage.default,
              };
            },
          }
        ]
    }
]

export default routerConfig;