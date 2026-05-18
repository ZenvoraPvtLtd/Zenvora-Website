import { Link } from "react-router-dom";


import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Zenvora</h3>
            <p className="text-gray-400">
              Leading IT solutions provider transforming ideas into innovative
              technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-400 transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  App Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Cloud Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  AI Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-gray-400 mb-4">
              <MdEmail size={16} className="inline mr-2" />
              info@zenvora.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaLinkedin size={20} />

              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p>&copy; 2024 Zenvora Infotech Pvt. Ltd. All rights reserved.</p>
            </div>
            <div className="md:text-right space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
