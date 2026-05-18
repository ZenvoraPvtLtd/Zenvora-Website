import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experts from "./pages/Experts";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import InternshipProgram from "./pages/InternshipProgram";
import AdminDashboard from "./pages/AdminDashboard";
import OAuthCallback from "./pages/OAuthCallback";

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/internship" element={<InternshipProgram />} /> */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

