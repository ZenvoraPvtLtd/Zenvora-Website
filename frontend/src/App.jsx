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
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Dashboard     = lazy(() => import("./pages/Dashboard"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));

const App = () => {
  const [appLoading, setAppLoading] = useState(true);

  // Show branded Z-logo loader for 2.5 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="bg-black min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div style={{ background: "#020815", minHeight: "100vh" }} />}>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/experts"      element={<Experts />} />
            <Route path="/services"     element={<Services />} />
            <Route path="/careers"      element={<Careers />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/login"        element={<Login />} />
            <Route path="/register"     element={<Register />} />
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
