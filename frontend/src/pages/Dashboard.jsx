import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
} from "lucide-react";
import { api } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get user from localStorage
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error reading user session:", err);
      navigate("/login");
    }

    // Tick the clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate("/");
    window.location.reload();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-600" />
      </div>
    );
  }

  // Get first name for personalized greeting
  const firstName = currentUser.name ? currentUser.name.split(" ")[0] : "Graduate";

  return (
    <main className="relative min-h-screen bg-white text-slate-900 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Light theme background */}
      <div className="pointer-events-none absolute inset-0 bg-white opacity-50" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Greeting */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Sparkles size={16} className="animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-widest">Client Portal</span>
            </div>
            <h1 className="text-4xl font-black text-slate-950 leading-tight">
              Welcome back, <span className="text-blue-600">{firstName}</span>!
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage your graduate applications and explore premium career consulting.
            </p>
          </div>

          {/* Clock Widget */}
          <div className="flex items-center gap-3.5 border border-slate-200 bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="font-mono text-lg font-bold text-slate-900 leading-none">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">
                {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Profile Card */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Picture Frame */}
              <div className="relative group mb-6">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-50 blur-md group-hover:opacity-75 transition duration-300" />
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-100 border-2 border-blue-400/40">
                  {currentUser.picture || currentUser.avatar ? (
                    <img
                      src={currentUser.picture || currentUser.avatar}
                      alt={currentUser.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <User size={48} />
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-950">{currentUser.name}</h2>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Shield size={12} />
                {currentUser.role || "User"}
              </span>

              <div className="w-full border-t border-slate-200 my-6" />

              {/* Profile Details */}
              <div className="w-full space-y-4 text-left">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold truncate text-slate-900">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                    <Calendar size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Auth Provider</p>
                    <p className="text-sm font-semibold text-slate-900 capitalize">{currentUser.googleId ? "Google OAuth" : "Standard Account"}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 hover:border-red-400"
              >
                <LogOut size={16} />
                Secure Logout
              </button>
            </div>
          </div>

          {/* Quick Actions & Account Status */}
          <div className="lg:col-span-2 space-y-8">
            {/* Real-time Status Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-950 mb-4">Application Services Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-2xl p-5 bg-blue-50 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Active Applications</h4>
                    <p className="text-slate-600 text-xs mt-1">Explore graduate placement and job openings.</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => navigate("/careers")}>
                      View openings <ExternalLink size={10} />
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-cyan-50 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Graduate Support</h4>
                    <p className="text-slate-600 text-xs mt-1">Get custom solutions from industry experts.</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 hover:text-cyan-700 cursor-pointer" onClick={() => navigate("/contact")}>
                      Get in touch <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalized Sync Portal */}
            <div className="rounded-3xl border border-cyan-500/15 bg-linear-to-r from-slate-950 via-slate-950 to-cyan-950/20 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
                  <Sparkles size={28} />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-black text-white">Upgrade Your Career Journey</h3>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                    Gain exclusive access to 1-on-1 resume reviews, expert-led mockup interviews, and fast-track placements with our partner MNCs. Let Zenvora help you stand out.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="mt-4 rounded-xl bg-[#15c8ff] px-6 py-2.5 text-xs font-black text-[#02101c] shadow-[0_0_20px_rgba(21,200,255,0.3)] transition hover:bg-[#4ed8ff] cursor-pointer"
                  >
                    Upgrade Profile Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </main>
  );
};

export default Dashboard;
