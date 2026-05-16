import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  QrCode,
  ScanLine,
  ShieldCheck,
  X,
} from "lucide-react";
import { api } from "../api";

const qrCells = [
  1, 1, 1, 0, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 0, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 1, 1,
  0, 1, 0, 1, 1, 0, 0, 1, 0,
  1, 0, 1, 1, 0, 1, 0, 0, 1,
  0, 1, 1, 0, 1, 1, 1, 0, 0,
  1, 1, 1, 0, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 1,
];

const Login = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const scannerTimerRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("checking");
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerMessage, setScannerMessage] = useState("Choose camera scan or upload a QR image.");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const captchaCode = useMemo(() => "8Ad4F", []);
  const scannerSupported = Boolean(window.BarcodeDetector && navigator.mediaDevices?.getUserMedia);

  useEffect(() => {
    let mounted = true;

    api.health()
      .then(() => {
        if (mounted) setApiStatus("connected");
      })
      .catch(() => {
        if (mounted) setApiStatus("offline");
      });

    return () => {
      mounted = false;

      if (scannerTimerRef.current) {
        clearInterval(scannerTimerRef.current);
      }

      const stream = cameraStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    try {
      const data = await api.login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (rememberMe) localStorage.setItem("rememberedEmail", formData.email);
      const destination = data.user?.role === "admin" ? "/admin" : redirectTo;
      navigate(destination);
      window.location.reload();
    } catch (err) {
      const message = err.response?.data?.message
        || (!err.response && `Cannot connect to backend at ${api.baseUrl}. Please start the backend server.`)
        || err.message
        || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const finishQrLogin = (value) => {
    setScannerMessage("QR code scanned successfully.");

    try {
      const decoded = JSON.parse(value);
      if (decoded.token && decoded.user) {
        localStorage.setItem("token", decoded.token);
        localStorage.setItem("user", JSON.stringify(decoded.user));
        navigate(decoded.user?.role === "admin" ? "/admin" : redirectTo);
        window.location.reload();
        return;
      }
    } catch {
      // The QR may be a URL or plain text, so JSON parsing is optional.
    }

    try {
      const qrUrl = new URL(value);
      const token = qrUrl.searchParams.get("token");
      const email = qrUrl.searchParams.get("email");
      const name = qrUrl.searchParams.get("name");
      const role = qrUrl.searchParams.get("role") || "user";

      if (token && email) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email, name, role }));
        navigate(role === "admin" ? "/admin" : redirectTo);
        window.location.reload();
        return;
      }

      if (email) {
        setFormData((current) => ({ ...current, email }));
        setScannerMessage("QR email found. Password is still required.");
        return;
      }
    } catch {
      // Not a URL.
    }

    if (/^\S+@\S+\.\S+$/.test(value)) {
      setFormData((current) => ({ ...current, email: value }));
      setScannerMessage("QR email found. Password is still required.");
      return;
    }

    setScannerMessage("QR scanned, but it does not contain a login token or email.");
  };

  const stopScanner = () => {
    if (scannerTimerRef.current) {
      clearInterval(scannerTimerRef.current);
      scannerTimerRef.current = null;
    }

    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    cameraStreamRef.current = null;

    setScannerActive(false);
  };

  const handleCameraScan = async () => {
    if (!window.BarcodeDetector) {
      setScannerMessage("This browser cannot scan QR codes directly. Upload a QR image instead.");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setScannerMessage("Camera access is not available in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      cameraStreamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setScannerActive(true);
      setScannerMessage("Point your camera at the QR code.");

      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      scannerTimerRef.current = window.setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return;

        try {
          const codes = await detector.detect(videoRef.current);
          if (codes.length > 0) {
            const value = codes[0].rawValue;
            stopScanner();
            finishQrLogin(value);
          }
        } catch (err) {
          setScannerMessage(err.message || "Scanner could not read this frame.");
        }
      }, 700);
    } catch (err) {
      setScannerMessage(err.message || "Camera permission was blocked.");
      stopScanner();
    }
  };

  const handleQrUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.BarcodeDetector) {
      setScannerMessage("QR image scanning needs a browser with BarcodeDetector support.");
      e.target.value = "";
      return;
    }

    try {
      const bitmap = await createImageBitmap(file);
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const codes = await detector.detect(bitmap);
      bitmap.close();

      if (codes.length === 0) {
        setScannerMessage("No QR code found in that image.");
      } else {
        finishQrLogin(codes[0].rawValue);
      }
    } catch (err) {
      setScannerMessage(err.message || "Could not scan that QR image.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#16c7d8_0,#046fd7_36%,#1021ad_74%,#050713_100%)] px-4 py-8 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="relative grid w-full overflow-hidden rounded-[10px] bg-white shadow-2xl shadow-blue-950/40 lg:grid-cols-[0.9fr_1.4fr]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-slate-500 shadow-sm transition hover:bg-white hover:text-cyan-600"
            aria-label="Close login page"
          >
            <X size={18} />
          </button>

          <div className="px-6 py-8 sm:px-10 lg:px-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Zenvora Portal
                </p>
                <h1 className="text-2xl font-bold text-slate-950">Graduate Service</h1>
              </div>
            </div>

            <div className={`mb-4 rounded-lg border px-4 py-3 text-xs font-semibold ${
              apiStatus === "connected"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : apiStatus === "offline"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-slate-200 bg-slate-50 text-slate-500"
            }`}>
              {apiStatus === "connected" && "Backend connected"}
              {apiStatus === "offline" && `Backend not reachable at ${api.baseUrl}`}
              {apiStatus === "checking" && "Checking backend connection..."}
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Email Address
                </span>
                <span className="relative block">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                </span>
                {fieldErrors.email && <span className="mt-1 block text-xs text-red-600">{fieldErrors.email}</span>}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Password
                </span>
                <span className="relative block">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
                {fieldErrors.password && <span className="mt-1 block text-xs text-red-600">{fieldErrors.password}</span>}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Verification Code
                </span>
                <span className="grid grid-cols-[1fr_auto] overflow-hidden rounded-md border border-slate-200 bg-white focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      setFieldErrors({ ...fieldErrors, verificationCode: "" });
                    }}
                    placeholder="Enter code"
                    className="min-w-0 px-3 py-3 text-sm outline-none"
                    aria-invalid={Boolean(fieldErrors.verificationCode)}
                  />
                  <span className="flex min-w-24 items-center justify-center border-l border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold italic text-slate-800">
                    {captchaCode}
                  </span>
                </span>
                {fieldErrors.verificationCode && (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.verificationCode}</span>
                )}
                <span className="mt-1 block text-xs text-slate-400">
                  Optional visual code. Login uses your backend email and password.
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                  />
                  Remember me
                </label>
                <Link to="/login" className="font-semibold text-cyan-600 hover:text-cyan-700">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <div className="mt-5 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="h-28 w-full shrink-0 overflow-hidden rounded bg-white shadow-inner sm:w-28">
                  {scannerActive ? (
                    <video
                      ref={videoRef}
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                      aria-label="QR scanner camera preview"
                    />
                  ) : (
                    <div className="grid h-full w-full grid-cols-9 gap-0.5 p-3">
                      {qrCells.map((cell, index) => (
                        <span key={index} className={cell ? "bg-slate-900" : "bg-transparent"} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <QrCode size={16} />
                    Scanner Login
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Scan a QR with a login token, callback URL, or email address.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={scannerActive ? stopScanner : handleCameraScan}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-cyan-700 ring-1 ring-cyan-200 transition hover:bg-cyan-100"
                    >
                      <ScanLine size={14} />
                      {scannerActive ? "Stop scanner" : "Scan with camera"}
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-cyan-400"
                    >
                      Upload QR
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQrUpload}
                    className="hidden"
                    aria-label="Upload QR code image"
                  />
                  <p className="mt-2 text-xs text-slate-500">{scannerMessage}</p>
                  {!scannerSupported && (
                    <p className="mt-1 text-xs text-amber-600">
                      Camera scanning works best in Chrome or Edge on localhost.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Quick Login
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => api.loginWithGoogle()}
                className="flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-bold text-blue-600 shadow-sm">
                  G
                </span>
                Google
              </button>
              <button
                type="button"
                onClick={() => api.loginWithMicrosoft()}
                className="flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                <span className="grid grid-cols-2 gap-0.5">
                  <i className="block h-2 w-2 bg-red-500" />
                  <i className="block h-2 w-2 bg-green-500" />
                  <i className="block h-2 w-2 bg-blue-500" />
                  <i className="block h-2 w-2 bg-yellow-400" />
                </span>
                Microsoft
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-cyan-600 hover:text-cyan-700">
                Signup
              </Link>
            </p>
          </div>

          <div className="relative hidden min-h-[640px] overflow-hidden bg-[#eaf9ff] lg:block">
            <img
              src="/login-illustration.jpg"
              alt="Graduate service login illustration"
              className="h-full min-h-[640px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
