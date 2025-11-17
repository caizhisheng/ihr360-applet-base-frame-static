import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// 兼容 react-router-dom v5 的 withRouter HOC
export function withRouter<P extends object>(Component: React.ComponentType<P & RouterProps>) {
  return function WithRouterComponent(props: P) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    
    // 创建兼容 v5 的 history 对象
    const history = {
      push: (path: string, state?: any) => navigate(path, { state }),
      replace: (path: string, state?: any) => navigate(path, { state, replace: true }),
      go: (n: number) => navigate(n),
      goBack: () => navigate(-1),
      goForward: () => navigate(1),
      location,
      listen: (callback: (location: any) => void) => {
        // 在 v6 中，我们使用 useEffect 来监听路由变化
        // 这里提供一个简化的实现
        return () => {};
      }
    };

    // 创建兼容 v5 的 match 对象
    const match = {
      params,
      path: location.pathname,
      url: location.pathname,
      isExact: true
    };

    const routerProps: RouterProps = {
      history,
      location,
      match,
      navigate,
      params
    };

    return <Component {...props} {...routerProps} />;
  };
}

// 路由相关的 props 类型定义
export interface RouterProps {
  history: {
    push: (path: string, state?: any) => void;
    replace: (path: string, state?: any) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    location: any;
    listen: (callback: (location: any) => void) => () => void;
  };
  location: any;
  match: {
    params: any;
    path: string;
    url: string;
    isExact: boolean;
  };
  navigate: any;
  params: any;
}

// 导出 useRouter hook 用于函数组件
export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  const history = {
    push: (path: string, state?: any) => navigate(path, { state }),
    replace: (path: string, state?: any) => navigate(path, { state, replace: true }),
    go: (n: number) => navigate(n),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    location,
    listen: (callback: (location: any) => void) => {
      return () => {};
    }
  };

  const match = {
    params,
    path: location.pathname,
    url: location.pathname,
    isExact: true
  };

  return {
    history,
    location,
    match,
    navigate,
    params
  };
}

export default withRouter;
