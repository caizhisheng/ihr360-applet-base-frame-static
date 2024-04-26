import * as React from 'react';
import * as Sentry from '@sentry/browser';
// import { IrsError } from 'ihr360-web-ui3';

Sentry.init({
  dsn: "https://5aeb981ed5364582920447314cfe7c7a@sentry.io/1367409"
});

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }
  reportError = () => {
    Sentry.showReportDialog()
  }
  render() {
    // const errCont = {
    //   type: '500',
    //   link: 'http://www.ihr360.com/',
    //   title: '返回首页',
    //   text: '抱歉，您访问的页面不存在'
    // };
    if (this.state.hasError) {
      // You can render any custom fallback UI
      //return <h1>Something went wrong.</h1>;
      return (
        <>
        </>
        // <IrsError
        //   type={errCont.type}
        //   link={errCont.link}
        //   title={errCont.title}
        //   text={errCont.text}
        // />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;