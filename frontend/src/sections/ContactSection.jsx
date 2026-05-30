import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { api } from "../api";

const services = [
  "Cloud Architecture",
  "AI & Machine Learning",
  "Product Engineering",
  "Cybersecurity",
  "Website Development",
  "Mobile App Development",
];

const departments = [
  {
    name: "Sales",
    email: "hr@zenvorainfo.com",
    phone: "9755125038",
    description: "New projects, pricing, and proposal discussions.",
  },
  {
    name: "Support",
    email: "hr@zenvorainfo.com",
    phone: "9755125038",
    description: "Existing client support and technical assistance.",
  },
  {
    name: "Careers",
    email: "hr@zenvorainfo.com",
    phone: "9755125038",
    description: "Hiring, internships, and partnership conversations.",
  },
];

const faqs = [
  {
    question: "How fast will your team respond?",
    answer: "Most inquiries receive a response within one business day. Urgent project requests are prioritized.",
  },
  {
    question: "Can I request a project estimate?",
    answer: "Yes. Choose the relevant service, share your goals, and the team will follow up with next steps.",
  },
  {
    question: "Do you support international clients?",
    answer: "Yes. We can coordinate meetings and delivery across time zones for remote-first projects.",
  },
  {
    question: "Is my information secure?",
    answer: "Your inquiry is sent directly to the backend contact endpoint and stored for follow-up by the team.",
  },
];

const businessHours = [
  ["Monday - Friday", "10:00 AM - 7:00 PM"],
  ["Saturday", "10:00 AM - 2:00 PM"],
  ["Sunday", "Closed"],
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "",
  service: "",
  department: "Sales",
  preferredContact: "Email",
  message: "",
};

const ContactSection = ({ isPage = false }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "team", text: "Hi! Tell us what you need help with." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const responseNote = useMemo(() => {
    if (formData.department === "Support") return "Support requests are usually reviewed within 4 business hours.";
    if (formData.department === "Careers") return "Career queries are routed to the hiring team.";
    return "Project inquiries usually receive a reply within 24 hours.";
  }, [formData.department]);

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3500);
  };

  const safeCopyToClipboard = (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) { /* ignore */ }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      return false;
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = "Enter a valid email address.";
    if (formData.phone && !/^[0-9+\-\s()]{7,18}$/.test(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.inquiryType) nextErrors.inquiryType = "Select an inquiry type.";
    if (!formData.service) nextErrors.service = "Select a service.";
    if (formData.message.trim().length < 12) {
      nextErrors.message = "Message should be at least 12 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("error", "Please fix the highlighted fields.");
      return;
    }
    setLoading(true);
    try {
      await api.sendContact({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setFormData(initialForm);
      showToast("success", "Message sent successfully. We will contact you soon.");
    } catch (err) {
      showToast("error", err.response?.data?.message || `Could not connect to backend at ${api.baseUrl}.`);
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((current) => [
      ...current,
      { from: "user", text: chatInput.trim() },
      { from: "team", text: "Thanks. Please leave your email in the form and our team will reply quickly." },
    ]);
    setChatInput("");
  };

  const inputClass = (name) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
      errors[name] ? "border-red-400" : "border-slate-200"
    }`;

  return (
    <div id="contact" className="min-h-screen w-full" style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>

      {/* ── BREADCRUMB ── */}
      {isPage && (
        <section
          className="relative overflow-hidden py-24"
          style={{
            background: "linear-gradient(135deg, #f0f7ff 0%, #fafbff 60%, #f0f4ff 100%)",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.22em] rounded-full px-4 py-1.5 mb-6"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
            >
              Company
            </span>
            <h1 className="mb-5 text-5xl font-black md:text-6xl" style={{ color: "#0f172a" }}>
              Contact{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Us
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base">
              <Link to="/" className="font-medium transition-colors" style={{ color: "#2563eb" }}>
                Home
              </Link>
              <span style={{ color: "#94a3b8" }}>/</span>
              <span style={{ color: "#64748b" }}>Contact</span>
            </div>
          </div>
        </section>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div
          className={`fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-2xl ${
            toast.type === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-red-300 bg-red-50 text-red-800"
          }`}
          role="status"
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.message}
        </div>
      )}

      {/* ── HERO INTRO ── */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafbff 50%, #f0f4ff 100%)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
            >
              <Headphones size={16} />
              Quick response team
            </p>
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#0f172a" }}>
              Get in touch with Zenvora
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: "#64748b" }}>
              Tell us about your project, support need, or partnership idea. We will connect you with the right department.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white transition"
                style={{ backgroundColor: "#2563eb" }}
              >
                Send a message
                <ArrowRight size={17} />
              </a>
              <a
                href="https://wa.me/916232161263"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition"
                style={{ backgroundColor: "#ffffff", color: "#334155", border: "1px solid #e2e8f0" }}
              >
                <MessageCircle size={17} style={{ color: "#2563eb" }} />
                WhatsApp
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Average reply", "Under 24 hours"],
                ["Active clients", "Global & local"],
                ["Support", "Email, phone, chat"],
                ["Backend", "Contact API ready"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <p className="text-sm" style={{ color: "#64748b" }}>{label}</p>
                  <p className="mt-2 text-lg font-bold" style={{ color: "#0f172a" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPTIONS & FORM ── */}
      <section
        className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8"
        style={{ backgroundColor: "#f8fafc" }}
      >
        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {/* Contact options */}
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>Contact options</h3>
            <div className="mt-5 space-y-2">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@zenvorainfo.com&su=Contact%20Inquiry"
                target="_blank"
                rel="noreferrer"
                onClick={() => { safeCopyToClipboard("hr@zenvorainfo.com"); showToast("success", "Email copied to clipboard!"); }}
                className="group flex gap-3 rounded-lg p-3 transition"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f9ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <Mail className="mt-0.5 shrink-0" size={20} style={{ color: "#2563eb" }} />
                <span>
                  <span className="block text-sm font-bold" style={{ color: "#0f172a" }}>Email</span>
                  <span className="text-sm" style={{ color: "#64748b" }}>hr@zenvorainfo.com</span>
                </span>
              </a>
              <a
                href="tel:+919755125038"
                onClick={() => { safeCopyToClipboard("9755125038"); showToast("success", "Phone number copied to clipboard!"); }}
                className="group flex gap-3 rounded-lg p-3 transition"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f9ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <Phone className="mt-0.5 shrink-0" size={20} style={{ color: "#2563eb" }} />
                <span>
                  <span className="block text-sm font-bold" style={{ color: "#0f172a" }}>Phone</span>
                  <span className="text-sm" style={{ color: "#64748b" }}>9755125038</span>
                </span>
              </a>
              <a
                href="https://wa.me/916232161263"
                target="_blank"
                rel="noreferrer"
                onClick={() => { safeCopyToClipboard("6232161263"); showToast("success", "WhatsApp number copied to clipboard!"); }}
                className="group flex gap-3 rounded-lg p-3 transition"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f9ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <MessageCircle className="mt-0.5 shrink-0" size={20} style={{ color: "#2563eb" }} />
                <span>
                  <span className="block text-sm font-bold" style={{ color: "#0f172a" }}>WhatsApp</span>
                  <span className="text-sm" style={{ color: "#64748b" }}>Chat with our team</span>
                </span>
              </a>
            </div>
          </div>

          {/* Business hours */}
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold" style={{ color: "#0f172a" }}>
              <Clock size={20} style={{ color: "#2563eb" }} />
              Business hours
            </h3>
            <div className="mt-5 space-y-3">
              {businessHours.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between gap-3 text-sm">
                  <span style={{ color: "#64748b" }}>{day}</span>
                  <span className="font-semibold" style={{ color: "#0f172a" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>Follow us</h3>
            <div className="mt-5 flex gap-3">
              {[
                [FaLinkedinIn, "LinkedIn", "https://www.linkedin.com/company/zenvorapvtltd/"],
                [FaXTwitter, "Twitter", "https://twitter.com"],
                [FaFacebookF, "Facebook", "https://facebook.com"],
              ].map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg transition"
                  style={{ border: "1px solid #e2e8f0", color: "#475569" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#eff6ff";
                    e.currentTarget.style.borderColor = "#bfdbfe";
                    e.currentTarget.style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.color = "#475569";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-8">
          {/* Contact Form */}
          <section
            id="contact-form"
            className="rounded-xl p-6 shadow-sm sm:p-8"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "#2563eb" }}>
                  Contact us
                </p>
                <h3 className="mt-2 text-3xl font-bold" style={{ color: "#0f172a" }}>Send a message</h3>
                <p className="mt-2 text-sm" style={{ color: "#64748b" }}>{responseNote}</p>
              </div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
                style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
              >
                <ShieldCheck size={14} />
                Backend ready
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>First name *</span>
                <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass("firstName")} placeholder="First name" />
                {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Last name *</span>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass("lastName")} placeholder="Last name" />
                {errors.lastName && <span className="mt-1 block text-xs text-red-500">{errors.lastName}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Email *</span>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="you@company.com" />
                {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Phone</span>
                <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+91 98765 43210" />
                {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Company</span>
                <input name="company" value={formData.company} onChange={handleChange} className={inputClass("company")} placeholder="Company name" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Inquiry type *</span>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className={inputClass("inquiryType")}>
                  <option value="">Select a value</option>
                  <option>New project</option>
                  <option>Support request</option>
                  <option>Partnership</option>
                  <option>Careers</option>
                </select>
                {errors.inquiryType && <span className="mt-1 block text-xs text-red-500">{errors.inquiryType}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Service *</span>
                <select name="service" value={formData.service} onChange={handleChange} className={inputClass("service")}>
                  <option value="">Select service</option>
                  {services.map((service) => <option key={service}>{service}</option>)}
                </select>
                {errors.service && <span className="mt-1 block text-xs text-red-500">{errors.service}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Department</span>
                <select name="department" value={formData.department} onChange={handleChange} className={inputClass("department")}>
                  {departments.map((dept) => <option key={dept.name}>{dept.name}</option>)}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold" style={{ color: "#374151" }}>Message *</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className={`${inputClass("message")} resize-none`} placeholder="Tell us about your goals, timeline, and requirements." />
                {errors.message && <span className="mt-1 block text-xs text-red-500">{errors.message}</span>}
              </label>
              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className="rounded-lg border px-4 py-3 text-sm outline-none"
                  style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff", color: "#0f172a" }}
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  {loading ? "Sending..." : "Send message"}
                  <Send size={16} />
                </button>
              </div>
            </form>
          </section>

          {/* Department cards */}
          <section className="grid gap-4 md:grid-cols-3">
            {departments.map((dept) => (
              <article
                key={dept.name}
                className="rounded-xl p-6 shadow-sm transition"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <BriefcaseBusiness size={24} style={{ color: "#2563eb" }} />
                <h4 className="mt-4 text-lg font-bold" style={{ color: "#0f172a" }}>{dept.name}</h4>
                <p className="mt-2 text-sm" style={{ color: "#64748b" }}>{dept.description}</p>
                <a
                  className="mt-4 block text-sm font-semibold transition"
                  style={{ color: "#2563eb" }}
                  href={`mailto:${dept.email}`}
                  onClick={() => { safeCopyToClipboard(dept.email); showToast("success", `${dept.name} email copied to clipboard!`); }}
                >
                  {dept.email}
                </a>
                <a
                  className="mt-1 block text-sm transition"
                  style={{ color: "#64748b" }}
                  href={`tel:+91${dept.phone}`}
                  onClick={() => { safeCopyToClipboard(dept.phone); showToast("success", `${dept.name} phone copied to clipboard!`); }}
                >
                  {dept.phone}
                </a>
              </article>
            ))}
          </section>

          {/* Map */}
          <section
            className="overflow-hidden rounded-xl shadow-sm"
            style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "#2563eb" }}>
                  <MapPin size={16} />
                  Visit us
                </p>
                <h3 className="mt-3 text-2xl font-bold" style={{ color: "#0f172a" }}>Indore office</h3>
                <p className="mt-3" style={{ color: "#64748b" }}>
                  206, Sagun Arcade, Vijay Nagar, Indore, Madhya Pradesh.
                </p>
              </div>
              <iframe
                title="Zenvora office map"
                src="https://www.google.com/maps?q=Vijay%20Nagar%20Indore&output=embed"
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          {/* FAQ */}
          <section
            className="rounded-xl p-6 shadow-sm sm:p-8"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <h3 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Frequently asked questions</h3>
            <div className="mt-5 divide-y" style={{ borderColor: "#e2e8f0" }}>
              {faqs.map((faq, index) => (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-4 text-left"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-semibold" style={{ color: "#0f172a" }}>{faq.question}</span>
                    <ChevronDown
                      className={`shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`}
                      size={18}
                      style={{ color: openFaq === index ? "#2563eb" : "#94a3b8" }}
                    />
                  </span>
                  {openFaq === index && (
                    <span className="mt-3 block text-sm leading-6" style={{ color: "#64748b" }}>
                      {faq.answer}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ── CHAT WIDGET ── */}
      <div className="fixed bottom-5 right-5 z-40">
        {chatOpen && (
          <div
            className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl shadow-2xl"
            style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ backgroundColor: "#2563eb" }}
            >
              <span className="font-bold text-white text-sm">Live chat</span>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-64 space-y-3 overflow-auto p-4" style={{ backgroundColor: "#f8fafc" }}>
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.from === "user"
                      ? "ml-8 text-white"
                      : "mr-8"
                  }`}
                  style={
                    message.from === "user"
                      ? { backgroundColor: "#2563eb" }
                      : { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", color: "#334155" }
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div
              className="flex gap-2 border-t p-3"
              style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "#e2e8f0", color: "#0f172a", backgroundColor: "#f8fafc" }}
                placeholder="Type a message"
              />
              <button
                type="button"
                onClick={sendChatMessage}
                className="rounded-lg px-3 py-2 text-white"
                style={{ backgroundColor: "#2563eb" }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className="grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl transition hover:scale-105"
          style={{ backgroundColor: "#2563eb", boxShadow: "0 8px 30px rgba(37,99,235,0.4)" }}
          aria-label="Open live chat"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
