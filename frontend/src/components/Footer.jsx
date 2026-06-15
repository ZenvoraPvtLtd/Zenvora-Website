import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 pt-16 pb-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img src="/logo.png" alt="Zenvora" className="h-11 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
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
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#eff6ff";
                    e.currentTarget.style.borderColor = "#bfdbfe";
                    e.currentTarget.style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.color = "#64748b";
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
              style={{ color: "#0f172a", letterSpacing: "0.1em" }}
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
                { label: "Partnership", href: "/partnership" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm transition-colors"
                    style={{ color: "#64748b" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#2563eb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#0f172a", letterSpacing: "0.1em" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Cloud Architecture",
                "AI & Machine Learning",
                "Product Engineering",
                "Cybersecurity",
                "Data Engineering",
                "DevOps & Platform",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors"
                    style={{ color: "#64748b" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#2563eb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#0f172a", letterSpacing: "0.1em" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hr@zenvorainfo.com"
                  className="flex items-start gap-3 text-sm transition-colors"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#2563eb"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
                >
                  <MdEmail size={16} className="mt-0.5 shrink-0" style={{ color: "#2563eb" }} />
                  hr@zenvorainfo.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "#64748b" }}>
                  <MdLocationOn size={16} className="mt-0.5 shrink-0" style={{ color: "#2563eb" }} />
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "#64748b" }}>
                  <FiPhone size={15} className="mt-0.5 shrink-0" style={{ color: "#2563eb" }} />
                  <span>Available on request</span>
                </div>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "#2563eb" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2563eb"; }}
            >
              Get in Touch →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "#e2e8f0" }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs" style={{ color: "#94a3b8" }}>
            &copy; {new Date().getFullYear()} Zenvora Infotech Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "#94a3b8" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2563eb"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
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
