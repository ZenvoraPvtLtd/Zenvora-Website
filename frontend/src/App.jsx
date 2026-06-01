import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load all pages for optimal bundle size
const Home          = lazy(() => import("./pages/Home"));
const About         = lazy(() => import("./pages/About"));
const Experts       = lazy(() => import("./pages/Experts"));
const Services      = lazy(() => import("./pages/Services"));
const Careers       = lazy(() => import("./pages/Careers"));
const Contact       = lazy(() => import("./pages/Contact"));
const Login         = lazy(() => import("./pages/Login"));
const Register      = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminLogin    = lazy(() => import("./pages/AdminLogin"));
const AdminForgotPassword = lazy(() => import("./pages/AdminForgotPassword"));
const AdminResetPassword = lazy(() => import("./pages/AdminResetPassword"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Dashboard     = lazy(() => import("./pages/Dashboard"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));

const App = () => {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem("appLoaded");
    } catch {
      return true;
    }
  });

  // Show branded Z-logo loader for 2.0 seconds on first load
  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("appLoaded", "1");
      } catch {
        /* ignore */
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <ScrollToTop />
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<div style={{ background: "var(--bg)", minHeight: "100vh" }} />}>
            <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/experts"      element={<Experts />} />
            <Route path="/services"     element={<Services />} />
            <Route path="/careers"      element={<Careers />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/admin-login"  element={<AdminLogin />} />
            <Route path="/admin/login"  element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            <Route path="/admin/reset-password/:token" element={<AdminResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
