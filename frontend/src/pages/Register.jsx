import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
  ShieldCheck,
  X,
} from "lucide-react";
import { api } from "../api";
import { GoogleLogin } from "@react-oauth/google";

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.googleLogin(credentialResponse.credential);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const destination = data.user?.role === "admin" ? "/admin" : "/dashboard";
      navigate(destination);
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google signup authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google OAuth signup failed. Please try again.");
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password],
  );

  const strengthLabel = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"][
    passwordStrength
  ];

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (formData.phone && !/^[0-9+\-\s()]{7,18}$/.test(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!acceptedTerms) {
      nextErrors.acceptedTerms = "Please accept the terms and privacy policy.";
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col justify-center">
            <div className="relative rounded-2xl border p-8 shadow-lg transition-all duration-500 hover:shadow-xl sm:p-12" style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-lg)"
            }}>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="absolute right-4 top-4 z-20 rounded-full border p-2 transition hover:bg-slate-100"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)"
                }}
                aria-label="Close signup page"
              >
                <X size={18} />
              </button>

              <div className="mb-8 flex items-center gap-3 animate-fadeIn">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-lg" style={{
                  boxShadow: "0 0 24px rgba(34, 211, 238, 0.3)"
                }}>
                  <Sparkles size={24} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
                    Zenvora Access
                  </p>
                  <h1 className="text-3xl font-black leading-tight" style={{ color: "var(--text)" }}>Create Account</h1>
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

              <form onSubmit={handleSubmit} className="mb-6 space-y-5" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-blue-600" style={{ color: "var(--text)" }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-blue-600" size={18} style={{ color: "var(--text-secondary)" }} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--surface)",
                          color: "var(--text)",
                          focusRing: "2px",
                          focusRingColor: "rgba(37, 99, 235, 0.2)"
                        }}
                        aria-invalid={Boolean(fieldErrors.name)}
                      />
                    </div>
                    {fieldErrors.name && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.name}</p>}
                  </div>

                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-blue-600" style={{ color: "var(--text)" }}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-blue-600" size={18} style={{ color: "var(--text-secondary)" }} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--surface)",
                          color: "var(--text)"
                        }}
                        aria-invalid={Boolean(fieldErrors.phone)}
                      />
                    </div>
                    {fieldErrors.phone && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.phone}</p>}
                  </div>
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-blue-600" style={{ color: "var(--text)" }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-blue-600" size={18} style={{ color: "var(--text-secondary)" }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--surface)",
                        color: "var(--text)"
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                    />
                  </div>
                  {fieldErrors.email && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.email}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-blue-600" style={{ color: "var(--text)" }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-blue-600" size={18} style={{ color: "var(--text-secondary)" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                        className="w-full rounded-lg border py-3 pl-12 pr-12 outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--surface)",
                          color: "var(--text)"
                        }}
                        aria-invalid={Boolean(fieldErrors.password)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.password}</p>}
                  </div>

                  <div className="group">
                    <label className="mb-2 block text-sm font-semibold transition-colors group-hover:text-blue-600" style={{ color: "var(--text)" }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-hover:text-blue-600" size={18} style={{ color: "var(--text-secondary)" }} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                        className="w-full rounded-lg border py-3 pl-12 pr-12 outline-none transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--surface)",
                          color: "var(--text)"
                        }}
                        aria-invalid={Boolean(fieldErrors.confirmPassword)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="animate-fadeIn">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>Password Strength</span>
                    <span className="font-bold" style={{ color: "#0ea5e9" }}>{strengthLabel}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: index < passwordStrength ? "#0ea5e9" : "var(--border)"
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-semibold" style={{ color: "var(--text)" }}>
                    Account Role
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: "user" })}
                      className="flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition-all duration-300 cursor-pointer"
                      style={{
                        borderColor: formData.role === "user" ? "#0ea5e9" : "var(--border)",
                        backgroundColor: formData.role === "user" ? "rgba(14, 165, 233, 0.1)" : "var(--bg-alt)",
                        color: formData.role === "user" ? "#0ea5e9" : "var(--text-secondary)"
                      }}
                    >
                      <User size={16} />
                      User
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm transition-colors" style={{ color: "var(--text-secondary)" }}>
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => {
                        setAcceptedTerms(e.target.checked);
                        setFieldErrors({ ...fieldErrors, acceptedTerms: "" });
                      }}
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--surface)",
                        accentColor: "#0ea5e9"
                      }}
                    />
                    <span>
                      I agree to the{" "}
                      <Link to="/contact" className="font-semibold transition-colors" style={{ color: "#0ea5e9" }}>
                        terms
                      </Link>{" "}
                      and privacy policy.
                    </span>
                  </label>
                  {fieldErrors.acceptedTerms && (
                    <p className="mt-2 text-xs font-medium text-red-500">{fieldErrors.acceptedTerms}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-lg px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  style={{
                    background: "linear-gradient(to right, #0ea5e9, #2563eb)",
                    boxShadow: "0 0 24px rgba(14, 165, 233, 0.3)"
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Sign Up
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative flex items-center">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, var(--border), transparent)` }} />
                  <span className="px-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Or sign up with</span>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, var(--border), transparent)` }} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-full flex justify-center overflow-hidden rounded-lg border transition duration-300 p-1" style={{
                    backgroundColor: "var(--bg-alt)",
                    borderColor: "var(--border)"
                  }}>
                    <div className="w-full flex justify-center [&>div]:w-full">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log("SIGNUP SUCCESS", credentialResponse);
                          handleGoogleSuccess(credentialResponse);
                        }}
                        onError={() => {
                          console.log("Signup Failed");
                          handleGoogleError();
                        }}
                        theme="filled_blue"
                        shape="rectangular"
                        size="large"
                        width="500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                Already have an account?{" "}
                <Link to="/login" className="font-bold transition-colors" style={{ color: "#0ea5e9" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="relative hidden flex-col items-center justify-center lg:flex">
            <div className="relative flex h-full max-h-[780px] w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl shadow-slate-200/50" style={{ borderColor: "var(--border)" }}>
              <div className="flex min-h-0 flex-1 items-center justify-center p-8">
                <img
                  src="/register-growth-illustration.svg"
                  alt="Create account education illustration"
                  className="h-full max-h-[640px] w-full object-contain"
                />
              </div>
              <div className="border-t p-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                <h2 className="mb-3 text-4xl font-black leading-tight" style={{ color: "var(--text)" }}>Elevate Your Career</h2>
                <p className="mb-4 text-lg font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Join Zenvora to unlock opportunities, access exclusive academic resources, and consult industry experts.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--text)" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Free Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Premium Resources</span>
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

export default Register;
