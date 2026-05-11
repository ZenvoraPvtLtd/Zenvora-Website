import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Careers",    href: "/careers" },
  { label: "Internship", href: "/internship" },
  { label: "Contact",    href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();

  const user  = (() => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } })();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!(token && user);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent shrink-0">
            Zenvora
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(item.href) ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-400">
                  Hi, <span className="text-cyan-400 font-medium">{user.name?.split(" ")[0]}</span>
                </span>
                {user.role === "admin" && (
                  <Link to="/admin"
                    className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md border ${
                      isActive("/admin") ? "border-cyan-500 text-cyan-400" : "border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                    }`}>
                    Dashboard
                  </Link>
                )}
                <button onClick={logout}
                  className="border border-gray-600 text-gray-300 px-4 py-1.5 rounded-md text-sm hover:border-red-500 hover:text-red-400 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-cyan-400 text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-cyan-500 text-black px-5 py-2 rounded-md text-sm font-medium hover:bg-cyan-400 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 focus:outline-none" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-cyan-400 bg-gray-800" : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
                }`}>
                {item.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-gray-800 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <p className="px-3 text-sm text-gray-400">Hi, <span className="text-cyan-400 font-medium">{user.name}</span></p>
                  {user.role === "admin" && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 rounded-md text-sm font-medium text-cyan-400 hover:bg-gray-800 transition">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { setIsOpen(false); logout(); }}
                    className="text-left px-3 py-2.5 rounded-md text-sm text-red-400 hover:bg-gray-800 transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}
                    className="text-center bg-cyan-500 text-black px-3 py-2.5 rounded-md text-sm font-medium hover:bg-cyan-400 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
