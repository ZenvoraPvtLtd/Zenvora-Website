import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { api } from "../api";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [apiStatus, setApiStatus] = useState("checking");

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

  const validateEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccessMessage("");
    setResetLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Forgot password submitted");
    console.log("Email:", email);

    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Calling forgotPassword API...");
      const data = await api.forgotPassword({ email, isAdmin: true });
      console.log("Success - Email sent");
      setSuccess(true);
      setSuccessMessage(data.message || "Reset link sent to your email! Redirecting to login...");
      setResetLink(data.resetLink || "");
      setEmail("");

      if (!data.resetLink) {
        // Redirect to login after 3 seconds when email delivery succeeds.
        setTimeout(() => {
          navigate("/admin-login");
        }, 3000);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      const message =
        err.response?.data?.message ||
        (!err.response && `Cannot connect to backend at ${api.baseUrl}. Please start the backend server.`) ||
        err.message ||
        "Failed to send reset email";
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
                  Admin Portal
                </p>
                <h1 className="text-2xl font-black leading-tight" style={{ color: "var(--text)" }}>Reset Password</h1>
              </div>
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
                <p>{successMessage}</p>
                {resetLink && (
                  <a
                    href={resetLink}
                    className="mt-3 block break-all font-bold underline"
                    style={{ color: "#06b6d4" }}
                  >
                    Open reset link
                  </a>
                )}
              </div>
            )}

            {!success && (
              <>
                <p className="mb-6 text-sm text-center" style={{ color: "var(--muted)" }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="mb-6 space-y-5" noValidate>
                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-cyan-300" style={{ color: "var(--muted)" }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-cyan-400" size={18} style={{ color: "var(--muted)" }} />
                      <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none transition-all duration-300"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "rgba(6, 182, 212, 0.2)"
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg py-3 font-bold transition-all duration-300 disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                      color: "#ffffff",
                      cursor: loading ? "not-allowed" : "pointer"
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? "Sending..." : "Send Reset Link"}
                      {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                    </span>
                  </button>
                </form>
              </>
            )}

            <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
              <p className="text-center text-sm" style={{ color: "var(--muted)" }}>
                <Link to="/admin-login" className="font-bold transition-colors" style={{ color: "#06b6d4" }}>
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

export default AdminForgotPassword;
