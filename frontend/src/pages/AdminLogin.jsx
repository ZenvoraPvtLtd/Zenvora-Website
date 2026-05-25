import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { api } from "../api";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiStatus, setApiStatus] = useState("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.login(formData);
      
      // Check if user has admin role
      if (data.user?.role !== "admin") {
        setError("Access denied. Only administrators can login here.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (!err.response && `Cannot connect to backend at ${api.baseUrl}. Please start the backend server.`) ||
        err.message ||
        "Admin login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        background: "linear-gradient(to bottom right, rgba(30, 58, 138, 0.4), transparent, rgba(6, 78, 115, 0.2))"
      }} />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:p-12" style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow)"
            }}>
              <div className="mb-8 flex items-center gap-3 animate-fadeIn">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg" style={{
                  boxShadow: "0 0 24px rgba(34, 211, 238, 0.3)"
                }}>
                  <ShieldCheck size={24} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#06b6d4" }}>
                    Admin Portal
                  </p>
                  <h1 className="text-3xl font-black leading-tight" style={{ color: "var(--text)" }}>Admin Login</h1>
                </div>
              </div>

              <div
                className={`mb-6 rounded-lg px-4 py-3 text-xs font-semibold transition-all duration-300`}
                style={{
                  borderColor: apiStatus === "connected" ? "rgba(16, 185, 129, 0.3)" : apiStatus === "offline" ? "rgba(251, 146, 60, 0.3)" : "rgba(148, 163, 184, 0.3)",
                  backgroundColor: apiStatus === "connected" ? "rgba(16, 185, 129, 0.1)" : apiStatus === "offline" ? "rgba(251, 146, 60, 0.1)" : "rgba(148, 163, 184, 0.1)",
                  color: apiStatus === "connected" ? "#10b981" : apiStatus === "offline" ? "#fb923c" : "#94a3b8",
                  border: "1px solid"
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      apiStatus === "connected" ? "animate-pulse bg-emerald-400" : "bg-slate-500"
                    }`}
                  />
                  {apiStatus === "connected" && "Backend connected"}
                  {apiStatus === "offline" && `Backend offline: ${api.baseUrl}`}
                  {apiStatus === "checking" && "Checking connection..."}
                </span>
              </div>

              {error && (
                <div className="mb-6 rounded-lg border px-4 py-3 text-sm animate-slideDown" style={{
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444"
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mb-6 space-y-5" noValidate>
                <div className="group">
                  <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-cyan-300" style={{ color: "var(--muted)" }}>
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-cyan-400" size={18} style={{ color: "var(--muted)" }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none transition-all duration-300"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        "--tw-ring-color": "rgba(6, 182, 212, 0.2)"
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                    />
                  </div>
                  {fieldErrors.email && <p className="mt-2 text-xs font-medium" style={{ color: "#ef4444" }}>{fieldErrors.email}</p>}
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-cyan-300" style={{ color: "var(--muted)" }}>
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-cyan-400" size={18} style={{ color: "var(--muted)" }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full rounded-lg border py-3 pl-12 pr-12 outline-none transition-all duration-300"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                        "--tw-ring-color": "rgba(6, 182, 212, 0.2)"
                      }}
                      aria-invalid={Boolean(fieldErrors.password)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors hover:text-cyan-400"
                      style={{ color: "var(--muted)" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="mt-2 text-xs font-medium" style={{ color: "#ef4444" }}>{fieldErrors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-lg px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  style={{
                    background: "linear-gradient(to right, rgb(6, 182, 212), rgb(37, 99, 235))",
                    boxShadow: "0 0 24px rgba(6, 182, 212, 0.3)"
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Admin Sign In
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
                Not an admin?{" "}
                <Link to="/login" className="font-bold transition-colors" style={{ color: "#06b6d4" }}>
                  User Login
                </Link>
              </p>
            </div>
          </div>

          <div className="relative hidden flex-col items-center justify-center lg:flex">
            <div className="relative h-full max-h-screen w-full overflow-hidden rounded-2xl shadow-2xl" style={{ boxShadow: "var(--shadow)" }}>
              <img src="/login-illustration.jpg" alt="Admin portal illustration" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)"
              }} />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent)"
              }} />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h2 className="mb-3 text-4xl font-black leading-tight">Admin Access</h2>
                <p className="mb-4 text-lg font-light leading-relaxed text-slate-200">
                  Secure access to manage users, applications, and platform operations.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Full Control Panel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Real-time Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
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
    </main>
  );
};

export default AdminLogin;
