import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "../api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Admin users go to dashboard, non-admin users go back to where they came from
      const destination = data.user?.role === "admin" ? "/admin" : redirectTo;
      navigate(destination);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
          title="Close"
        >
          <AiOutlineClose size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} required placeholder="your@email.com"
              className="w-full px-3 py-2 text-sm border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password" name="password" value={formData.password}
              onChange={handleChange} required placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-cyan-500 text-black py-2 rounded-lg font-semibold hover:bg-cyan-400 transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5">
          <div className="flex items-center gap-3 mb-4">
            <hr className="flex-1 border-gray-600" />
            <span className="text-xs text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => api.loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => api.loginWithMicrosoft()}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
            >
              <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-cyan-400 font-semibold hover:text-cyan-300">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
