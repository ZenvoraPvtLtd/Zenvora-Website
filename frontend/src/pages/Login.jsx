import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { api } from "../api";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

const getOAuthUserFromParams = (searchParams) => ({
  id: searchParams.get("id"),
  name: searchParams.get("name"),
  email: searchParams.get("email"),
  role: searchParams.get("role") || "user",
});

const Login = () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail") || "";

  const [formData, setFormData] = useState({ email: rememberedEmail, password: "" });
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [, setApiStatus] = useState("checking");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const [error, setError] = useState(() =>
    searchParams.get("error") ? "OAuth login failed. Please try again." : "",
  );
  const captchaCode = useMemo(() => "8Ad4F", []);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        },
      );
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.user.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const destination = data.user?.role === "admin" ? "/admin" : "/dashboard";
      navigate(destination);
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google login authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google OAuth login failed. Please try again.");
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      const user = getOAuthUserFromParams(searchParams);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.role === "admin" ? "/admin" : redirectTo, { replace: true });
    }
  }, [navigate, redirectTo, searchParams]);

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

    if (verificationCode && verificationCode.trim() !== captchaCode) {
      nextErrors.verificationCode = "Verification code does not match.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setError("");
  };

  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    navigate("/");
  };

  const getLoginErrorMessage = (err) =>
    err.response?.data?.message ||
    (!err.response && `Cannot connect to backend at ${api.baseUrl}. Please start the backend server.`) ||
    err.message ||
    "Login failed";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.login(formData);
      saveSession(data);
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const [videoScale, setVideoScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005;
      setVideoScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="home-page-container relative min-h-screen overflow-hidden text-[var(--text)]">
      {/* ── Fixed Background Video for Entire Login Page ── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center", scale: videoScale }}
        >
          <source src="https://res.cloudinary.com/drynl8beg/video/upload/v1782719184/Login_page_sp3asy.mp4" type="video/mp4" />
        </motion.video>

        {/* ── Dark overlay for readability across the page ── */}
        <div
          className="absolute inset-0 bg-black/40"
          style={{ backdropFilter: "brightness(0.9)" }}
        />
      </div>

      <style>{`
        /* Completely transparent sections to let the video shine */
        .home-page-container,
        .home-page-container section {
           background: transparent !important;
           background-color: transparent !important;
           backdrop-filter: none !important;
           border-color: rgba(255,255,255,0.1) !important;
        }

        /* Force all text to white with a soft shadow for readability */
        .home-page-container h1, 
        .home-page-container h2, 
        .home-page-container p,
        .home-page-container span,
        .home-page-container label {
           color: #ffffff !important;
           text-shadow: 0 1px 4px rgba(0,0,0,0.6);
           -webkit-text-fill-color: #ffffff !important;
        }

        /* Give cards a dark frosted glass look */
        .home-page-container .bg-\\[var\\(--surface\\)\\]\\/80,
        .home-page-container .bg-\\[var\\(--surface\\)\\] {
           background-color: rgba(0, 0, 0, 0.4) !important;
           backdrop-filter: blur(10px) !important;
           border: 1px solid rgba(255,255,255,0.1) !important;
           box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
           color: #ffffff !important;
        }

        .home-page-container .bg-\\[var\\(--bg-alt\\)\\] {
           background-color: rgba(0, 0, 0, 0.4) !important;
           color: #ffffff !important;
        }

        .home-page-container input::placeholder {
           color: rgba(255, 255, 255, 0.5) !important;
        }
        
        .home-page-container input {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-8">
        {/* <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-0"> */}
        <div className="w-full">
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-500 hover:border-slate-300/80 sm:p-12">
              <div className="mb-8 flex items-center gap-3 animate-fadeIn">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                    Secure Portal
                  </p>
                  <h1 className="text-3xl font-black leading-tight text-[var(--text)]">Graduate Service</h1>
                </div>
              </div>

              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-slideDown">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mb-6 space-y-5" noValidate>
                <div className="group">
                  <label className="mb-2 block text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary)]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-[var(--primary)]" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pl-12 pr-4 text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)] hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--primary)]/20"
                      aria-invalid={Boolean(fieldErrors.email)}
                    />
                  </div>
                  {fieldErrors.email && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.email}</p>}
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary)]">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-[var(--primary)]" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-3 pl-12 pr-12 text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text-secondary)] hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--primary)]/20"
                      aria-invalid={Boolean(fieldErrors.password)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-[var(--primary)]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.password}</p>}
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--primary)]">
                    Verification Code
                  </label>
                  <div className="grid grid-cols-[1fr_120px] overflow-hidden rounded-lg border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-strong)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        setFieldErrors((current) => ({ ...current, verificationCode: "" }));
                      }}
                      placeholder="Enter code"
                      className="min-w-0 bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-secondary)]"
                      aria-invalid={Boolean(fieldErrors.verificationCode)}
                    />
                    <div className="flex items-center justify-center border-l border-[var(--border)] bg-[var(--bg-alt)] px-4 py-3">
                      <span className="font-mono text-sm font-bold text-[var(--accent)]">{captchaCode}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">Leave blank or enter the shown code.</p>
                  {fieldErrors.verificationCode && (
                    <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.verificationCode}</p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary)] focus:ring-[var(--primary)]/50"
                    />
                    <span className="font-medium">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative flex items-center">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-[var(--border-strong)] to-transparent" />
                  <span className="px-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Or continue with</span>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-[var(--border-strong)] to-transparent" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-center">
                    <div className="w-full flex justify-center [&>div]:w-full overflow-hidden rounded-lg">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log("LOGIN SUCCESS", credentialResponse);
                          handleGoogleSuccess(credentialResponse);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                          handleGoogleError();
                        }}
                        theme="filled_blue"
                        shape="rectangular"
                        size="large"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="font-bold text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]">
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* 
          <div className="relative hidden flex-col items-center justify-center lg:flex">
            <div className="relative h-full max-h-screen w-full overflow-hidden rounded-2xl shadow-2xl shadow-slate-200/50 transition-all duration-500">
              <img 
                src="/login-light.svg" 
                alt="Graduate service illustration" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />
              {/* <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h2 className="mb-3 text-4xl font-black leading-tight">Secure Access</h2>
                <p className="mb-4 text-lg font-light leading-relaxed text-slate-100">
                  Access your Zenvora Graduate Services account with enhanced security and seamless authentication.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Multi-factor Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Real-time Sync</span>
                  </div>
                </div>
              </div> * /}
            </div>
          </div>
          */}
        </div>
      </section>

    </main>
  );
};

export default Login;
