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
  X,
} from "lucide-react";
import { api } from "../api";

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
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#16c7d8_0,#046fd7_36%,#1021ad_74%,#050713_100%)] px-4 py-8 text-slate-900">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="relative grid w-full overflow-hidden rounded-[10px] bg-white shadow-2xl shadow-blue-950/40 lg:grid-cols-[1.05fr_1.2fr]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-slate-500 shadow-sm transition hover:bg-white hover:text-cyan-600"
            aria-label="Close signup page"
          >
            <X size={18} />
          </button>

          <div className="px-6 py-8 sm:px-10 lg:px-12">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Zenvora Access
                </p>
                <h1 className="text-2xl font-bold text-slate-950">Create Account</h1>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Full Name
                  </span>
                  <span className="relative block">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      aria-invalid={Boolean(fieldErrors.name)}
                    />
                  </span>
                  {fieldErrors.name && <span className="mt-1 block text-xs text-red-600">{fieldErrors.name}</span>}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Phone Number
                  </span>
                  <span className="relative block">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      aria-invalid={Boolean(fieldErrors.phone)}
                    />
                  </span>
                  {fieldErrors.phone && <span className="mt-1 block text-xs text-red-600">{fieldErrors.phone}</span>}
                </label>
              </div>

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

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Password
                  </span>
                  <span className="relative block">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
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
                    Confirm Password
                  </span>
                  <span className="relative block">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-600"
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                  {fieldErrors.confirmPassword && (
                    <span className="mt-1 block text-xs text-red-600">{fieldErrors.confirmPassword}</span>
                  )}
                </label>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Password Strength</span>
                  <span className="font-bold text-cyan-700">{strengthLabel}</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 rounded-full ${
                        index < passwordStrength ? "bg-cyan-500" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <label className="block text-sm text-slate-600">
                <span className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      setFieldErrors({ ...fieldErrors, acceptedTerms: "" });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/contact" className="font-semibold text-cyan-600 hover:text-cyan-700">
                      terms
                    </Link>{" "}
                    and privacy policy.
                  </span>
                </span>
                {fieldErrors.acceptedTerms && (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.acceptedTerms}</span>
                )}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Signup"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Social Signup
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
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-cyan-600 hover:text-cyan-700">
                Login
              </Link>
            </p>
          </div>

          <div className="relative hidden min-h-[680px] overflow-hidden bg-[#eaf9ff] lg:block">
            <img
              src="/auth-campus.svg"
              alt="Blue education campus illustration"
              className="h-full min-h-[680px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
