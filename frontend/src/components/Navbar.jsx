import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Experts", href: "/experts" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token && user);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400/15 bg-[#020815]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-[70px] items-center justify-between">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#15c8ff] text-2xl font-black italic text-[#031120] shadow-[0_0_20px_rgba(21,200,255,0.28)]">
              Z
            </span>
            <span className="text-2xl font-black text-[#15c8ff]">Zenvora</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-1 py-6 text-sm font-bold transition-colors ${
                  isActive(item.href)
                    ? "text-[#15c8ff] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#15c8ff]"
                    : "text-white hover:text-[#15c8ff]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/contact"
              className="rounded-md bg-[#15c8ff] px-5 py-2.5 text-sm font-black text-[#02101c] shadow-[0_0_20px_rgba(21,200,255,0.24)] transition hover:bg-[#4ed8ff]"
            >
              Get In Touch
            </Link>

            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-400">
                  Hi,{" "}
                  <span className="font-medium text-cyan-400">
                    {user.name?.split(" ")[0]}
                  </span>
                </span>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive("/admin")
                        ? "border-cyan-500 text-cyan-400"
                        : "border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-md border border-gray-600 px-4 py-1.5 text-sm text-gray-300 transition hover:border-red-500 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  isActive("/login") || isActive("/register")
                    ? "bg-cyan-400 text-black shadow-lg shadow-cyan-500/20"
                    : "text-gray-200 hover:bg-[#0a1b31] hover:text-cyan-300"
                }`}
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-cyan-400 focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-cyan-400/15 bg-[#051120] md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[#0a1b31] text-[#15c8ff]"
                    : "text-gray-300 hover:bg-[#0a1b31] hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center rounded-md bg-[#15c8ff] px-4 py-3 text-sm font-black text-[#02101c]"
            >
              Get In Touch
            </Link>

            {isLoggedIn ? (
              <div className="mt-2 flex flex-col gap-2 border-t border-cyan-400/15 pt-3">
                <p className="px-3 text-sm text-gray-400">
                  Hi,{" "}
                  <span className="font-medium text-cyan-400">{user.name}</span>
                </p>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-[#0a1b31]"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="rounded-md px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-[#0a1b31]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-cyan-400/15 pt-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan-400 px-3 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-300"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
