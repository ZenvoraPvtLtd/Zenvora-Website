import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Custom Software Development",
  "Cloud Solutions",
  "AI Solutions",
];

const Footer = () => {
  return (
    <footer className="border-t border-cyan-400/15 bg-[#020815] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.9fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15c8ff] text-xl font-black italic text-[#031120]">
                Z
              </span>
              <span className="text-2xl font-black text-[#15c8ff]">Zenvora</span>
            </Link>
            <p className="max-w-xs text-sm leading-7">
              Transforming Ideas into Innovative IT Solutions. Building the
              future, together.
            </p>

            <div className="mt-7 flex gap-4">
              {[FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#07172a] text-white transition hover:bg-[#15c8ff] hover:text-[#02101c]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links">
            {quickLinks.map((link) => (
              <Link key={link.href} to={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <Link key={service} to="/services" className="footer-link">
                {service}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <a href="tel:+911234567890" className="footer-contact">
              <Phone size={16} className="text-[#15c8ff]" />
              +91 12345 67890
            </a>
            <a href="mailto:info@zenvora.com" className="footer-contact">
              <Mail size={16} className="text-[#15c8ff]" />
              info@zenvora.com
            </a>
            <p className="footer-contact">
              <MapPin size={16} className="mt-1 shrink-0 text-[#15c8ff]" />
              123 IT Park, Tech City, India - 560001
            </p>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cyan-400/10 pt-7 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2024 Zenvora Infotech. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-[#15c8ff]">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="transition hover:text-[#15c8ff]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-black text-white">{title}</h3>
      <div className="flex flex-col gap-4 text-sm">{children}</div>
    </div>
  );
}

export default Footer;
