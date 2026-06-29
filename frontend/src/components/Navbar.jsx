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
  // { label: "Partnership", href: "/partnership" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login" || location.pathname === "/register") return null;

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

  const isHome = location.pathname === "/" || location.pathname === "/about" || location.pathname === "/experts" || location.pathname === "/services" || location.pathname === "/careers" || location.pathname === "/contact" || location.pathname === "/login";

  const navStyle = isHome
    ? {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        boxShadow: "none",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.97)",
        borderColor: "#e2e8f0",
        backdropFilter: "blur(20px)",
        boxShadow: "0 1px 0 #e2e8f0, 0 4px 24px rgba(15,23,42,0.06)",
      };

  const getLinkStyle = (href) => {
    const active = isActive(href);
    if (isHome) {
      return {
        color: active ? "#ffffff" : "rgba(255,255,255,0.75)",
        backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontSize: "0.75rem",
      };
    }
    return {
      color: active ? "var(--primary)" : "#475569",
      backgroundColor: active ? "#eff6ff" : "transparent",
      textTransform: "none",
      letterSpacing: "normal",
      fontSize: "0.875rem",
    };
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b transition-all duration-300"
      style={navStyle}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-[68px] items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="Zenvora Logo"
              className="h-[48px] w-auto object-contain transition-all duration-300"
              style={isHome ? { filter: "drop-shadow(0 0 8px rgba(14,165,233,0.8)) brightness(1.1)" } : {}}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="relative px-3 py-2 font-semibold rounded-md transition-all duration-300"
                style={getLinkStyle(item.href)}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    if (isHome) {
                      e.currentTarget.style.color = "#ffffff";
                    } else {
                      e.currentTarget.style.color = "var(--primary)";
                      e.currentTarget.style.backgroundColor = "#f0f9ff";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    if (isHome) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    } else {
                      e.currentTarget.style.color = "#475569";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }
                }}
              >
                {item.label}
                {isActive(item.href) && !isHome && (
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
                <span className="font-medium" style={{ color: isHome ? "rgba(255,255,255,0.8)" : "#64748b", fontSize: isHome ? "0.75rem" : "0.875rem", textTransform: isHome ? "uppercase" : "none", letterSpacing: isHome ? "0.1em" : "normal" }}>
                  Hi,{" "}
                  <span style={{ color: isHome ? "#ffffff" : "var(--primary)", fontWeight: 600 }}>
                    {user.name?.split(" ")[0]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full px-5 py-2 font-semibold border transition-all duration-300 hover:scale-105"
                  style={isHome ? {
                    borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", backgroundColor: "transparent",
                    textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.75rem"
                  } : {
                    borderColor: "#e2e8f0", color: "#64748b", backgroundColor: "transparent",
                    fontSize: "0.875rem", borderRadius: "0.5rem"
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold shadow-sm transition-all duration-300 hover:scale-105"
                style={isHome ? {
                  backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff",
                  textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.75rem"
                } : {
                  backgroundColor: "var(--primary)", color: "#ffffff", border: "none",
                  fontSize: "0.875rem", borderRadius: "0.5rem"
                }}
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
            style={isHome ? { borderColor: "rgba(255,255,255,0.3)", color: "#ffffff" } : { borderColor: "#e2e8f0", color: "#475569" }}
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
