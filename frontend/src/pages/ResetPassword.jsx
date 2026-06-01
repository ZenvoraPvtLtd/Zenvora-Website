import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, KeyRound, ShieldCheck, ArrowRight } from "lucide-react";
import { api } from "../api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiStatus, setApiStatus] = useState("checking");

  const navigate = useNavigate();
  const { token: routeToken } = useParams();
  const token = searchParams.get("token") || routeToken;

  useEffect(() => {
    let mounted = true;

    api.health()
      .then(() => {
        if (mounted) setApiStatus("connected");
      })
      .catch(() => {
        if (mounted) setApiStatus("offline");
      });

    if (!token) {
      setError("Invalid reset link. Please request a new one.");
    }

    return () => {
      mounted = false;
    };
  }, [token]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.password) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      nextErrors.password = "Use letters and numbers for a stronger password";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
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

    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.resetPassword({
        token,
        password: formData.password,
      });
      setFormData({ password: "", confirmPassword: "" });
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (!err.response && `Cannot connect to backend at ${api.baseUrl}. Please start the backend server.`) ||
        err.message ||
        "Failed to reset password";
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
        <div className="w-full max-w-md">
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
                  Password Recovery
                </p>
                <h1 className="text-2xl font-black leading-tight" style={{ color: "var(--text)" }}>Create New Password</h1>
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

            {success && (
              <div className="mb-6 rounded-lg border px-4 py-3 text-sm animate-slideDown" style={{
                borderColor: "rgba(16, 185, 129, 0.3)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981"
              }}>
                Password reset successfully! Redirecting to login...
              </div>
            )}

            {!success && (
              <>
                <p className="mb-6 text-sm text-center" style={{ color: "var(--muted)" }}>
                  Enter your new password below.
                </p>

                <form onSubmit={handleSubmit} className="mb-6 space-y-5" noValidate>
                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-cyan-300" style={{ color: "var(--muted)" }}>
                      New Password
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-cyan-400" size={18} style={{ color: "var(--muted)" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="New password"
                        className="w-full rounded-lg border py-3 pl-12 pr-12 outline-none transition-all duration-300"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "rgba(6, 182, 212, 0.2)"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--muted)" }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-2 text-xs font-medium" style={{ color: "#ef4444" }}>{fieldErrors.password}</p>}
                  </div>

                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-cyan-300" style={{ color: "var(--muted)" }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-cyan-400" size={18} style={{ color: "var(--muted)" }} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="w-full rounded-lg border py-3 pl-12 pr-12 outline-none transition-all duration-300"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "rgba(6, 182, 212, 0.2)"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--muted)" }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && <p className="mt-2 text-xs font-medium" style={{ color: "#ef4444" }}>{fieldErrors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full rounded-lg py-3 font-bold transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                      color: "#ffffff",
                      cursor: loading ? "not-allowed" : "pointer"
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? "Resetting..." : "Reset Password"}
                      {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                    </span>
                  </button>
                </form>
              </>
            )}

            <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
              <p className="text-center text-sm" style={{ color: "var(--muted)" }}>
                <Link to="/login" className="font-bold transition-colors" style={{ color: "#06b6d4" }}>
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
