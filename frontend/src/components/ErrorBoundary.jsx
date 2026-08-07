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
    
    // Auto-reload once if it's a chunk loading error
    if (error?.message?.includes("Failed to fetch dynamically imported module")) {
      const isReloaded = sessionStorage.getItem("chunkLoadError");
      if (!isReloaded) {
        sessionStorage.setItem("chunkLoadError", "true");
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.message?.includes("Failed to fetch dynamically imported module");

      return (
        <div style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "#b91c1c", marginBottom: "1rem" }}>
            {isChunkError ? "A new version of the site is available." : "Something went wrong loading this page."}
          </h2>
          <p style={{ marginBottom: "2rem", color: "var(--text)" }}>
            {isChunkError 
              ? "We are automatically reloading the page to fetch the latest version." 
              : "We're sorry for the inconvenience. Please try again."}
          </p>
          <button 
            onClick={() => {
              sessionStorage.removeItem("chunkLoadError");
              window.location.reload();
            }}
            style={{ 
              padding: "10px 24px", 
              background: "#0ea5e9", 
              color: "white", 
              borderRadius: "8px", 
              cursor: "pointer", 
              border: "none",
              fontWeight: "bold"
            }}
          >
            Refresh Page
          </button>
          
          {!isChunkError && (
            <div style={{ marginTop: "2rem", textAlign: "left", maxWidth: "800px", width: "100%" }}>
              <pre style={{ whiteSpace: "pre-wrap", color: "#111827", fontSize: "12px", background: "#f3f4f6", padding: "12px", borderRadius: "8px", overflowX: "auto" }}>
                {this.state.error && this.state.error.toString()}
              </pre>
              {this.state.info && (
                <details style={{ whiteSpace: "pre-wrap", marginTop: 12, fontSize: "12px", color: "#4b5563" }}>
                  {this.state.info.componentStack}
                </details>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
