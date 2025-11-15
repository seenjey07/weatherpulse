import { Component } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error details:', errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-2xl border-2 border-destructive/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-destructive/10 p-4">
                  <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-2xl text-destructive mb-2">
                Oops! Something went wrong 🌩️
              </CardTitle>
              <CardDescription className="text-base">
                We encountered an unexpected error. Don't worry, your data is safe.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error message for development */}
              {isDevelopment && this.state.error && (
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <h3 className="text-sm font-semibold text-destructive mb-2">
                    Error Details (Development Mode):
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        Component Stack
                      </summary>
                      <pre className="text-xs mt-2 p-2 bg-background rounded border border-border overflow-auto max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* User-friendly message */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Try refreshing the page or going back to the home screen.
                </p>
                <p className="text-sm text-muted-foreground">
                  If the problem persists, please contact support.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reload Page
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Home className="h-4 w-4" />
                  Go to Home
                </Button>
              </div>

              {/* Additional help */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Still having trouble? Try clearing your browser cache or using a different browser.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;