import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // Log to console for diagnostic monitoring
    console.error('ErrorBoundary caught rendering error:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.hash = 'home';
    }
  };

  toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section
          id="error-boundary-fallback"
          className="min-h-[500px] flex items-center justify-center py-20 px-6 sm:px-12 text-center"
        >
          <div className="max-w-xl w-full bg-[#0d0f14] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-3">
              Application Notice
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
              A temporary interface issue interrupted this section. The application prevented a complete system halt and preserved the surrounding layout.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="error-boundary-retry-button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-600/20"
              >
                <Home className="w-4 h-4" />
                Return to Home
              </button>

              <button
                id="error-boundary-reload-button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-medium text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload View
              </button>
            </div>

            {this.state.error && (
              <div className="mt-8 pt-6 border-t border-white/5 text-left">
                <button
                  id="error-boundary-toggle-details-button"
                  onClick={this.toggleDetails}
                  className="flex items-center justify-between w-full text-xs font-mono text-zinc-400 hover:text-zinc-300 transition-colors uppercase tracking-wider py-1"
                >
                  <span>Diagnostic Details</span>
                  {this.state.showDetails ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {this.state.showDetails && (
                  <div className="mt-3 p-4 rounded-xl bg-black/50 border border-white/5 text-xs font-mono text-zinc-300 overflow-x-auto max-h-48 leading-relaxed">
                    <p className="text-red-400 font-semibold mb-1">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="text-zinc-500 whitespace-pre-wrap mt-2 text-[11px]">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
