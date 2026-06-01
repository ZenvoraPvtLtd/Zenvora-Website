import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2 style={{ color: "#b91c1c" }}>Something went wrong loading this page.</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#111827" }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          {this.state.info && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
              {this.state.info.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
