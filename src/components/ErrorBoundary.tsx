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
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center p-4">
          <div className="max-w-lg border border-destructive bg-destructive/10 p-6 rounded-lg">
            <div className="flex items-center gap-2 text-destructive mb-4">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-lg font-semibold">应用出错了</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">抱歉,应用遇到了一个错误。</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              重新加载页面
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;