/**
 * Loader – clean 2D animated spinner around the Z logo.
 * No 3D, no text, no internal timer.
 * Duration is controlled entirely by App.jsx (appLoading state).
 */
const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020815",
      }}
    >
      <style>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes loaderSpinRev {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(-360deg);}
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(21,200,255,0.55)); }
          50%       { transform: scale(1.06); filter: drop-shadow(0 0 20px rgba(21,200,255,0.95)); }
        }
      `}</style>

      {/* Spinner rings + logo container */}
      <div style={{ position: "relative", width: 140, height: 140 }}>

        {/* Outer spinning arc — solid cyan quarter-circle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTop: "3px solid #15c8ff",
            borderRight: "3px solid rgba(21,200,255,0.25)",
            animation: "loaderSpin 1.2s linear infinite",
          }}
        />

        {/* Inner spinning arc — reverse direction */}
        <div
          style={{
            position: "absolute",
            inset: 14,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderBottom: "2px solid #0ea5e9",
            borderLeft: "2px solid rgba(14,165,233,0.2)",
            animation: "loaderSpinRev 1.8s linear infinite",
          }}
        />

        {/* Z logo in center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Zenvora"
            style={{
              width: 80,
              height: 80,
              objectFit: "contain",
              animation: "logoPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;