import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    const sanitizedError = error.message.replace(/[\r\n]/g, '').substring(0, 1000);
    console.error("Uncaught error:", sanitizedError);
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const sanitizedError = error.message.replace(/[\r\n]/g, '').substring(0, 1000);
    const sanitizedStack = error.stack?.replace(/[\r\n]/g, ' ').substring(0, 500) || '';
    console.error("Uncaught error:", sanitizedError, sanitizedStack);
  }

  render() {
    if (this.state.hasError) {
      if (IS_PRODUCTION) return <div />;
      return (
        <div className="bg-white p-10">
          <p>Error: {this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
