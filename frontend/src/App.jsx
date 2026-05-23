import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load all pages for optimal bundle size
const Home          = lazy(() => import("./pages/Home"));
const About         = lazy(() => import("./pages/About"));
const Experts       = lazy(() => import("./pages/Experts"));
const Services      = lazy(() => import("./pages/Services"));
const Careers       = lazy(() => import("./pages/Careers"));
const Contact       = lazy(() => import("./pages/Contact"));
const Login         = lazy(() => import("./pages/Login"));
const Register      = lazy(() => import("./pages/Register"));
const AdminLogin    = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Dashboard     = lazy(() => import("./pages/Dashboard"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));

const App = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Show branded Z-logo loader for 2.5 seconds on first load
  useEffect(() => {
    const storedTheme = window.localStorage.getItem("siteTheme");
    const initialTheme = storedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;

    const timer = setTimeout(() => {
      setAppLoading(false);
      try { sessionStorage.setItem('appLoaded', '1'); } catch (e) { /* ignore */ }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("siteTheme", nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      return nextTheme;
    });
  };

  if (appLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <ScrollToTop />
        <Navbar />
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
            <Route path="/admin-login"  element={<AdminLogin />} />
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
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
