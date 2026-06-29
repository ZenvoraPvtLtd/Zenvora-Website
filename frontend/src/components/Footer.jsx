import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  const footerStyle = { backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.1)", position: "relative", zIndex: 10 };
  const headingStyle = { color: "#ffffff", letterSpacing: "0.1em" };
  const textStyle = { color: "#d1d5db" };
  const linkStyle = { color: "#cbd5e1" };

  const socialBg = "rgba(255,255,255,0.1)";
  const socialBorder = "rgba(255,255,255,0.2)";
  const socialText = "#ffffff";

  return (
    <footer style={footerStyle}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 pt-16 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
              src="/logo.png"
              alt="Zenvora Logo"
              className="mb-4 h-12 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(14,165,233,0.8)) brightness(1.1)" }}
            /></div>
            <p className="text-sm leading-relaxed" style={textStyle}>
              Leading IT solutions provider transforming ideas into innovative,
              scalable technology from Indore to the world.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: FaLinkedin, href: "https://www.linkedin.com/company/zenvorapvtltd/", label: "LinkedIn" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all"
                  style={{ backgroundColor: socialBg, border: `1px solid ${socialBorder}`, color: socialText }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = socialBg;
                    e.currentTarget.style.borderColor = socialBorder;
                    e.currentTarget.style.color = socialText;
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={headingStyle}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Experts", href: "/experts" },
                { label: "Services", href: "/services" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
                // { label: "Partnership", href: "/partnership" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm transition-colors"
                    style={linkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = linkStyle.color; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={headingStyle}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hr@zenvorainfo.com"
                  className="flex items-start gap-3 text-sm transition-colors"
                  style={linkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = linkStyle.color; }}
                >
                  <MdEmail size={16} className="mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
                  hr@zenvorainfo.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={linkStyle}>
                  <MdLocationOn size={16} className="mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={linkStyle}>
                  <FiPhone size={15} className="mt-0.5 shrink-0" style={{ color: "#60a5fa" }} />
                  <span>Available on request</span>
                </div>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "rgba(59, 130, 246, 0.8)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.8)"; }}
            >
              Get in Touch →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs" style={textStyle}>
            &copy; {new Date().getFullYear()} Zenvora Infotech Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = linkStyle.color; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
