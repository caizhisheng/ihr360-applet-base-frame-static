import * as React from 'react';

declare module 'react' {
  // 基础 Props 接口
  interface Props {
    children?: React.ReactNode;
  }

  interface FunctionComponent<P = {}> {
    (props: P & { children?: React.ReactNode }, context?: any): React.ReactElement<any, any> | null;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  
  interface ComponentClass<P = {}, S = ComponentState> {
    new (props: P & { children?: React.ReactNode  }, context?: any): React.Component<P, S>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  // 扩展 Context 相关类型
  interface ProviderProps<T> {
    value: T;
    children?: React.ReactNode;
  }

  interface ConsumerProps<T> {
    children: (value: T) => React.ReactNode;
  }

  interface Context<T> {
    Provider: React.Provider<T>;
    Consumer: React.Consumer<T>;
    displayName?: string;
  }
}

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicAttributes extends React.Attributes { }
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
  }
} 
