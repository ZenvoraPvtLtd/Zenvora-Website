import { useState } from "react";
import { api } from "../api";

const contactInfo = [
  {
    icon: "📍",
    label: "Address",
    value: "206, Sagun Arcade, Vijay Nagar, Indore",
  },
  {
    icon: "📧",
    label: "Email",
    value: "zenvorainfo.com@zenvorainfo.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 97551 25038",
  },
];

const services = [
  "Cloud Architecture",
  "AI & Machine Learning",
  "Product Engineering",
  "Cybersecurity",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.sendContact(formData);

      setSubmitted(true);

      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });

      // Hide Success Message
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-cyan-500";

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

          <p className="text-gray-400 mb-10">
            Let's build something amazing together.
          </p>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-2xl">{item.icon}</span>

                <div>
                  <h3 className="font-semibold">{item.label}</h3>

                  <p className="text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send Message</h2>

          {/* Success */}
          {submitted && (
            <div className="mb-4 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
              Message Sent Successfully ✅
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputCls}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={inputCls}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputCls}
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className={inputCls}
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select Service</option>

              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputCls} resize-none`}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
