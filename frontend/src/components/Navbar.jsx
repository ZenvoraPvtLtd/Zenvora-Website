import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token && user);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        borderColor: "#e2e8f0",
        backdropFilter: "blur(20px)",
        boxShadow: "0 1px 0 #e2e8f0, 0 4px 24px rgba(15,23,42,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-[68px] items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="Zenvora Logo"
              className="h-[48px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="relative px-3 py-2 text-sm font-semibold rounded-md transition-all duration-150"
                style={{
                  color: isActive(item.href) ? "var(--primary)" : "#475569",
                  backgroundColor: isActive(item.href) ? "#eff6ff" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.backgroundColor = "#f0f9ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium" style={{ color: "#64748b" }}>
                  Hi,{" "}
                  <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                    {user.name?.split(" ")[0]}
                  </span>
                </span>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/dashboard"}
                  className="rounded-lg px-4 py-1.5 text-sm font-semibold border transition-all"
                  style={{
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "#eff6ff",
                  }}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg px-4 py-1.5 text-sm font-semibold border transition-all"
                  style={{ borderColor: "#e2e8f0", color: "#64748b", backgroundColor: "transparent" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex h-9 items-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-all"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            style={{ borderColor: "#e2e8f0", color: "#475569" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}
        >
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                style={{
                  color: isActive(item.href) ? "var(--primary)" : "#475569",
                  backgroundColor: isActive(item.href) ? "#eff6ff" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="mt-3 border-t pt-4"
              style={{ borderColor: "#e2e8f0" }}
            >
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "#64748b" }}>
                    Hi,{" "}
                    <strong style={{ color: "var(--primary)" }}>
                      {user.name?.split(" ")[0]}
                    </strong>
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={user?.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-1.5 text-sm font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setIsOpen(false); logout(); }}
                      className="rounded-lg px-3 py-1.5 text-sm"
                      style={{ color: "#ef4444" }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold text-white"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
