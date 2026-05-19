// import { useMemo, useState } from "react";
// import {
//   ArrowRight,
//   BriefcaseBusiness,
//   CheckCircle2,
//   ChevronDown,
//   Clock,
//   Headphones,
//   Mail,
//   MapPin,
//   MessageCircle,
//   Phone,
//   Send,
//   ShieldCheck,
//   X,
// } from "lucide-react";
// import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
// import { api } from "../api";

// const services = [
//   "Cloud Architecture",
//   "AI & Machine Learning",
//   "Product Engineering",
//   "Cybersecurity",
//   "Website Development",
//   "Mobile App Development",
// ];

// const departments = [
//   {
//     name: "Sales",
//     email: "sales@zenvora.com",
//     phone: "+91 97551 25038",
//     description: "New projects, pricing, and proposal discussions.",
//   },
//   {
//     name: "Support",
//     email: "support@zenvora.com",
//     phone: "+91 97551 25038",
//     description: "Existing client support and technical assistance.",
//   },
//   {
//     name: "Careers",
//     email: "careers@zenvora.com",
//     phone: "+91 97551 25038",
//     description: "Hiring, internships, and partnership conversations.",
//   },
// ];

// const faqs = [
//   {
//     question: "How fast will your team respond?",
//     answer: "Most inquiries receive a response within one business day. Urgent project requests are prioritized.",
//   },
//   {
//     question: "Can I request a project estimate?",
//     answer: "Yes. Choose the relevant service, share your goals, and the team will follow up with next steps.",
//   },
//   {
//     question: "Do you support international clients?",
//     answer: "Yes. We can coordinate meetings and delivery across time zones for remote-first projects.",
//   },
//   {
//     question: "Is my information secure?",
//     answer: "Your inquiry is sent directly to the backend contact endpoint and stored for follow-up by the team.",
//   },
// ];

// const businessHours = [
//   ["Monday - Friday", "10:00 AM - 7:00 PM"],
//   ["Saturday", "10:00 AM - 2:00 PM"],
//   ["Sunday", "Closed"],
// ];

// const emailTopics = [
//   { label: "View Services", topic: "View Services" },
//   { label: "About Experts", topic: "About Experts" },
//   { label: "Contact Team", topic: "Contact Team" },
//   { label: "Company Information", topic: "Company Information" },
// ];

// const initialForm = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   company: "",
//   inquiryType: "",
//   service: "",
//   department: "Sales",
//   preferredContact: "Email",
//   message: "",
// };

// const Contact = () => {
//   const [formData, setFormData] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openFaq, setOpenFaq] = useState(0);
// <<<<<<< HEAD

// =======
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     { from: "team", text: "Hi! Tell us what you need help with." },
//   ]);
//   const [chatInput, setChatInput] = useState("");
//   const [chatLoading, setChatLoading] = useState(false);
//   const [pendingEmailTopic, setPendingEmailTopic] = useState(null);
//   const [customQuestionStep, setCustomQuestionStep] = useState(null);
//   const [customQuestion, setCustomQuestion] = useState("");
// >>>>>>> e6c0ad0e486f835918e19aa75aa19f0bfaa24cbb

//   const responseNote = useMemo(() => {
//     if (formData.department === "Support") return "Support requests are usually reviewed within 4 business hours.";
//     if (formData.department === "Careers") return "Career queries are routed to the hiring team.";
//     return "Project inquiries usually receive a reply within 24 hours.";
//   }, [formData.department]);

//   const showToast = (type, message) => {
//     setToast({ type, message });
//     window.setTimeout(() => setToast(null), 3500);
//   };

//   const validateForm = () => {
//     const nextErrors = {};

//     if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
//     if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = "Enter a valid email address.";
//     if (formData.phone && !/^[0-9+\-\s()]{7,18}$/.test(formData.phone)) {
//       nextErrors.phone = "Enter a valid phone number.";
//     }
//     if (!formData.inquiryType) nextErrors.inquiryType = "Select an inquiry type.";
//     if (!formData.service) nextErrors.service = "Select a service.";
//     if (formData.message.trim().length < 12) {
//       nextErrors.message = "Message should be at least 12 characters.";
//     }

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((current) => ({ ...current, [name]: value }));
//     setErrors((current) => ({ ...current, [name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       showToast("error", "Please fix the highlighted fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.sendContact({
//         ...formData,
//         firstName: formData.firstName.trim(),
//         lastName: formData.lastName.trim(),
//         email: formData.email.trim(),
//         message: formData.message.trim(),
//       });

//       setFormData(initialForm);
//       showToast("success", "Message sent successfully. We will contact you soon.");
//     } catch (err) {
//       showToast(
//         "error",
//         err.response?.data?.message || `Could not connect to backend at ${api.baseUrl}.`,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

// <<<<<<< HEAD

// =======
//   const sendChatMessage = async (message = chatInput) => {
//     const trimmedMessage = message.trim();

//     if (!trimmedMessage || chatLoading) return;

//     setChatLoading(true);
//     setChatMessages((current) => [
//       ...current,
//       { from: "user", text: trimmedMessage },
//     ]);
//     setChatInput("");

//     try {
//       if (customQuestionStep === "question") {
//         setCustomQuestion(trimmedMessage);
//         setCustomQuestionStep("email");
//         setChatMessages((current) => [
//           ...current,
//           { from: "team", text: "Please share your email address. Our team will reply to your question there." },
//         ]);
//         return;
//       }

//       if (customQuestionStep === "email") {
//         if (!/^\S+@\S+\.\S+$/.test(trimmedMessage)) {
//           setChatMessages((current) => [
//             ...current,
//             { from: "team", text: "Please enter a valid email address so I can send your question to the team." },
//           ]);
//           return;
//         }

//         const data = await api.sendChatQuestionEmail({
//           email: trimmedMessage,
//           question: customQuestion,
//         });

//         setChatMessages((current) => [
//           ...current,
//           { from: "team", text: data.reply || "Your question has been sent." },
//         ]);
//         setCustomQuestionStep(null);
//         setCustomQuestion("");
//         return;
//       }

//       if (pendingEmailTopic) {
//         if (!/^\S+@\S+\.\S+$/.test(trimmedMessage)) {
//           setChatMessages((current) => [
//             ...current,
//             { from: "team", text: "Please enter a valid email address so I can send the details." },
//           ]);
//           return;
//         }

//         const data = await api.sendChatEmail({
//           email: trimmedMessage,
//           topic: pendingEmailTopic,
//         });

//         setChatMessages((current) => [
//           ...current,
//           { from: "team", text: data.reply || "Email request processed." },
//         ]);
//         setPendingEmailTopic(null);
//         return;
//       }

//       const selectedEmailTopic = emailTopics.find((item) => item.topic === trimmedMessage);

//       if (selectedEmailTopic) {
//         setPendingEmailTopic(selectedEmailTopic.topic);
//         setChatMessages((current) => [
//           ...current,
//           { from: "team", text: `Please share your email address. I will send you ${selectedEmailTopic.label} details.` },
//         ]);
//         return;
//       }

//       const data = await api.sendChatMessage(trimmedMessage);

//       setChatMessages((current) => [
//         ...current,
//         {
//           from: "team",
//           text: data.reply || "I could not find an answer for that.",
//           experts: data.experts || [],
//           page: data.page,
//           intent: data.intent,
//         },
//       ]);
//     } catch (err) {
//       setChatMessages((current) => [
//         ...current,
//         {
//           from: "team",
//           text: `Chatbot is not reachable at ${api.chatbotUrl}. Please try again in a moment.`,
//         },
//       ]);
//     } finally {
//       setChatLoading(false);
//     }
//   };

//   const handleFaqClick = (faq) => {
//     sendChatMessage(faq.question);
//   };

//   const handleExpertsClick = () => {
//     sendChatMessage("our experts");
//   };

//   const handleEmailTopicClick = (topic) => {
//     sendChatMessage(topic.topic);
//   };

//   const handleCustomQuestionEmailClick = () => {
//     setPendingEmailTopic(null);
//     setCustomQuestion("");
//     setCustomQuestionStep("question");
//     setChatMessages((current) => [
//       ...current,
//       { from: "team", text: "Please type your question. I will email it to our team." },
//     ]);
//   };
// >>>>>>> e6c0ad0e486f835918e19aa75aa19f0bfaa24cbb

//   const inputClass = (name) =>
//     `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 dark:bg-gray-950 dark:text-white ${errors[name] ? "border-red-400" : "border-slate-200 dark:border-gray-800"
//     }`;

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-black dark:text-white">



//       <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[#020815] py-24">

//         {/* Background Glow */}
//         <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

//         {/* Grid Overlay */}
//         <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

//         <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

//          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
//             Company
//           </span>

//           <h1 className="mb-5 text-5xl font-black md:text-6xl">
//             {/* Contract{" "} */} 
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               Contract
//             </span>
//           </h1>
//           <div className="flex items-center justify-center gap-3 text-sm md:text-base">
//             <a
//               href="/"
//               className="font-medium text-cyan-400 transition hover:text-cyan-300"
//             >
//               Home
//             </a>

//             <span className="text-gray-600">/</span>

//             <span className="text-gray-400">Contract</span>
//           </div>
//         </div>
//       </section>


//       {toast && (
//         <div
//           className={`fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-2xl ${toast.type === "success"
//               ? "border-emerald-300 bg-emerald-50 text-emerald-800"
//               : "border-red-300 bg-red-50 text-red-800"
//             }`}
//           role="status"
//         >
//           {toast.type === "success" ? <CheckCircle2 size={18} /> : <X size={18} />}
//           {toast.message}
//         </div>
//       )}

//       <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-cyan-500 blur-3xl" />
//           <div className="absolute right-10 top-12 h-64 w-64 rounded-full bg-blue-600 blur-3xl" />
//         </div>
//         <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
//           <div>
//             <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
//               <Headphones size={16} />
//               Quick response team
//             </p>
//             <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
//               Get in touch with Zenvora
//             </h1>
//             <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
//               Tell us about your project, support need, or partnership idea. We will connect you with the right department.
//             </p>
//             <div className="mt-8 flex flex-wrap gap-3">
//               <a
//                 href="#contact-form"
//                 className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
//               >
//                 Send a message
//                 <ArrowRight size={17} />
//               </a>
//               <a
//                 href="https://wa.me/919755125038"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-200"
//               >
//                 <MessageCircle size={17} />
//                 WhatsApp
//               </a>
//             </div>
//           </div>

//           <div className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur">
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 ["Average reply", "Under 24 hours"],
//                 ["Active clients", "Global & local"],
//                 ["Support", "Email, phone, chat"],
//                 ["Backend", "Contact API ready"],
//               ].map(([label, value]) => (
//                 <div key={label} className="rounded-lg border border-white/10 bg-black/30 p-5">
//                   <p className="text-sm text-slate-400">{label}</p>
//                   <p className="mt-2 text-xl font-bold text-white">{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
//         <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
//           <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
//             <h2 className="text-xl font-bold">Contact options</h2>
//             <div className="mt-5 space-y-4">
//               <a href="mailto:zenvorainfo.com@zenvorainfo.com" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
//                 <Mail className="mt-0.5 text-cyan-500" size={20} />
//                 <span>
//                   <span className="block text-sm font-bold">Email</span>
//                   <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">zenvorainfo.com@zenvorainfo.com</span>
//                 </span>
//               </a>
//               <a href="tel:+919755125038" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
//                 <Phone className="mt-0.5 text-cyan-500" size={20} />
//                 <span>
//                   <span className="block text-sm font-bold">Phone</span>
//                   <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">+91 97551 25038</span>
//                 </span>
//               </a>
//               <a href="https://wa.me/919755125038" target="_blank" rel="noreferrer" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
//                 <MessageCircle className="mt-0.5 text-cyan-500" size={20} />
//                 <span>
//                   <span className="block text-sm font-bold">WhatsApp</span>
//                   <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">Chat with our team</span>
//                 </span>
//               </a>
//             </div>
//           </div>

//           <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
//             <h2 className="flex items-center gap-2 text-xl font-bold">
//               <Clock className="text-cyan-500" size={20} />
//               Business hours
//             </h2>
//             <div className="mt-5 space-y-3">
//               {businessHours.map(([day, time]) => (
//                 <div key={day} className="flex items-center justify-between gap-3 text-sm">
//                   <span className="text-slate-500 dark:text-slate-400">{day}</span>
//                   <span className="font-semibold">{time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
//             <h2 className="text-xl font-bold">Follow us</h2>
//             <div className="mt-5 flex gap-3">
//               {[
//                 [FaLinkedinIn, "LinkedIn", "https://www.linkedin.com"],
//                 [FaXTwitter, "Twitter", "https://twitter.com"],
//                 [FaFacebookF, "Facebook", "https://facebook.com"],
//               ].map(([Icon, label, href]) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label={label}
//                   className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-900"
//                 >
//                   <Icon size={18} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </aside>

//         <div className="space-y-8">
//           <section id="contact-form" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
//             <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">Contact us</p>
//                 <h2 className="mt-2 text-3xl font-bold">Send a message</h2>
//                 <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{responseNote}</p>
//               </div>
//               <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
//                 <ShieldCheck size={14} />
//                 Backend ready
//               </span>
//             </div>

//             <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">First name *</span>
//                 <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass("firstName")} placeholder="First name" />
//                 {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Last name *</span>
//                 <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass("lastName")} placeholder="Last name" />
//                 {errors.lastName && <span className="mt-1 block text-xs text-red-500">{errors.lastName}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Email *</span>
//                 <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="you@company.com" />
//                 {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Phone</span>
//                 <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+91 98765 43210" />
//                 {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Company</span>
//                 <input name="company" value={formData.company} onChange={handleChange} className={inputClass("company")} placeholder="Company name" />
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Inquiry type *</span>
//                 <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className={inputClass("inquiryType")}>
//                   <option value="">Select a value</option>
//                   <option>New project</option>
//                   <option>Support request</option>
//                   <option>Partnership</option>
//                   <option>Careers</option>
//                 </select>
//                 {errors.inquiryType && <span className="mt-1 block text-xs text-red-500">{errors.inquiryType}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Service *</span>
//                 <select name="service" value={formData.service} onChange={handleChange} className={inputClass("service")}>
//                   <option value="">Select service</option>
//                   {services.map((service) => <option key={service}>{service}</option>)}
//                 </select>
//                 {errors.service && <span className="mt-1 block text-xs text-red-500">{errors.service}</span>}
//               </label>
//               <label>
//                 <span className="mb-1.5 block text-sm font-semibold">Department</span>
//                 <select name="department" value={formData.department} onChange={handleChange} className={inputClass("department")}>
//                   {departments.map((dept) => <option key={dept.name}>{dept.name}</option>)}
//                 </select>
//               </label>
//               <label className="sm:col-span-2">
//                 <span className="mb-1.5 block text-sm font-semibold">Message *</span>
//                 <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className={`${inputClass("message")} resize-none`} placeholder="Tell us about your goals, timeline, and requirements." />
//                 {errors.message && <span className="mt-1 block text-xs text-red-500">{errors.message}</span>}
//               </label>
//               <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-gray-800 dark:bg-gray-950">
//                   <option>Email</option>
//                   <option>Phone</option>
//                   <option>WhatsApp</option>
//                 </select>
//                 <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
//                   {loading ? "Sending..." : "Send message"}
//                   <Send size={16} />
//                 </button>
//               </div>
//             </form>
//           </section>

//           <section className="grid gap-4 md:grid-cols-3">
//             {departments.map((dept) => (
//               <article key={dept.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
//                 <BriefcaseBusiness className="text-cyan-500" size={24} />
//                 <h3 className="mt-4 text-lg font-bold">{dept.name}</h3>
//                 <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{dept.description}</p>
//                 <a className="mt-4 block text-sm font-semibold text-cyan-600" href={`mailto:${dept.email}`}>{dept.email}</a>
//                 <a className="mt-1 block text-sm text-slate-500 dark:text-slate-400" href={`tel:${dept.phone.replace(/\s/g, "")}`}>{dept.phone}</a>
//               </article>
//             ))}
//           </section>

//           <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
//             <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
//               <div className="p-6 sm:p-8">
//                 <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">
//                   <MapPin size={16} />
//                   Visit us
//                 </p>
//                 <h2 className="mt-3 text-2xl font-bold">Indore office</h2>
//                 <p className="mt-3 text-slate-500 dark:text-slate-400">
//                   206, Sagun Arcade, Vijay Nagar, Indore, Madhya Pradesh.
//                 </p>
//               </div>
//               <iframe
//                 title="Zenvora office map"
//                 src="https://www.google.com/maps?q=Vijay%20Nagar%20Indore&output=embed"
//                 className="h-80 w-full border-0"
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               />
//             </div>
//           </section>

//           <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
//             <h2 className="text-2xl font-bold">Frequently asked questions</h2>
//             <div className="mt-5 divide-y divide-slate-200 dark:divide-gray-800">
//               {faqs.map((faq, index) => (
//                 <button
//                   key={faq.question}
//                   type="button"
//                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                   className="w-full py-4 text-left"
//                 >
//                   <span className="flex items-center justify-between gap-4">
//                     <span className="font-semibold">{faq.question}</span>
//                     <ChevronDown className={`shrink-0 transition ${openFaq === index ? "rotate-180 text-cyan-500" : "text-slate-400"}`} size={18} />
//                   </span>
//                   {openFaq === index && (
//                     <span className="mt-3 block text-sm leading-6 text-slate-500 dark:text-slate-400">{faq.answer}</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </section>
//         </div>
//       </section>

//     </main>
//   );
// };

// export default Contact;

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
    email: "sales@zenvora.com",
    phone: "+91 97551 25038",
    description: "New projects, pricing, and proposal discussions.",
  },
  {
    name: "Support",
    email: "support@zenvora.com",
    phone: "+91 97551 25038",
    description: "Existing client support and technical assistance.",
  },
  {
    name: "Careers",
    email: "careers@zenvora.com",
    phone: "+91 97551 25038",
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
      showToast(
        "error",
        err.response?.data?.message || `Could not connect to backend at ${api.baseUrl}.`,
      );
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
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15 dark:bg-gray-950 dark:text-white ${errors[name] ? "border-red-400" : "border-slate-200 dark:border-gray-800"
    }`;

  return (
    <div id="contact" className="min-h-screen bg-slate-50 text-slate-950 dark:bg-black dark:text-white w-full">
      {/* ================= BREADCRUMB SECTION ================= */}
      {isPage && (
        <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[#020815] py-24">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
              Company
            </span>
            <h1 className="mb-5 text-5xl font-black md:text-6xl text-white">
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-400">
              <Link to="/" className="font-medium text-cyan-400 transition hover:text-cyan-300">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400">Contact</span>
            </div>
          </div>
        </section>
      )}

      {toast && (
        <div
          className={`fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-2xl ${toast.type === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-red-300 bg-red-50 text-red-800"
            }`}
          role="status"
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.message}
        </div>
      )}

      {/* ================= HERO INTRO ================= */}
      <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute right-10 top-12 h-64 w-64 rounded-full bg-blue-600 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <Headphones size={16} />
              Quick response team
            </p>
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get in touch with Zenvora
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Tell us about your project, support need, or partnership idea. We will connect you with the right department.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
              >
                Send a message
                <ArrowRight size={17} />
              </a>
              <a
                href="https://wa.me/919755125038"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Average reply", "Under 24 hours"],
                ["Active clients", "Global & local"],
                ["Support", "Email, phone, chat"],
                ["Backend", "Contact API ready"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OPTIONS & FORM ================= */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8 bg-slate-50 dark:bg-black">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-xl font-bold">Contact options</h3>
            <div className="mt-5 space-y-4">
              <a href="mailto:zenvorainfo.com@zenvorainfo.com" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
                <Mail className="mt-0.5 text-cyan-500" size={20} />
                <span>
                  <span className="block text-sm font-bold">Email</span>
                  <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">zenvorainfo.com@zenvorainfo.com</span>
                </span>
              </a>
              <a href="tel:+919755125038" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
                <Phone className="mt-0.5 text-cyan-500" size={20} />
                <span>
                  <span className="block text-sm font-bold">Phone</span>
                  <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">+91 97551 25038</span>
                </span>
              </a>
              <a href="https://wa.me/919755125038" target="_blank" rel="noreferrer" className="group flex gap-3 rounded-lg p-3 transition hover:bg-cyan-50 dark:hover:bg-gray-900">
                <MessageCircle className="mt-0.5 text-cyan-500" size={20} />
                <span>
                  <span className="block text-sm font-bold">WhatsApp</span>
                  <span className="text-sm text-slate-500 group-hover:text-cyan-600 dark:text-slate-400">Chat with our team</span>
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Clock className="text-cyan-500" size={20} />
              Business hours
            </h3>
            <div className="mt-5 space-y-3">
              {businessHours.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{day}</span>
                  <span className="font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-xl font-bold">Follow us</h3>
            <div className="mt-5 flex gap-3">
              {[
                [FaLinkedinIn, "LinkedIn", "https://www.linkedin.com"],
                [FaXTwitter, "Twitter", "https://twitter.com"],
                [FaFacebookF, "Facebook", "https://facebook.com"],
              ].map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-900"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <section id="contact-form" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">Contact us</p>
                <h3 className="mt-2 text-3xl font-bold">Send a message</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{responseNote}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck size={14} />
                Backend ready
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">First name *</span>
                <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass("firstName")} placeholder="First name" />
                {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Last name *</span>
                <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass("lastName")} placeholder="Last name" />
                {errors.lastName && <span className="mt-1 block text-xs text-red-500">{errors.lastName}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Email *</span>
                <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="you@company.com" />
                {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Phone</span>
                <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+91 98765 43210" />
                {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Company</span>
                <input name="company" value={formData.company} onChange={handleChange} className={inputClass("company")} placeholder="Company name" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Inquiry type *</span>
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
                <span className="mb-1.5 block text-sm font-semibold">Service *</span>
                <select name="service" value={formData.service} onChange={handleChange} className={inputClass("service")}>
                  <option value="">Select service</option>
                  {services.map((service) => <option key={service}>{service}</option>)}
                </select>
                {errors.service && <span className="mt-1 block text-xs text-red-500">{errors.service}</span>}
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold">Department</span>
                <select name="department" value={formData.department} onChange={handleChange} className={inputClass("department")}>
                  {departments.map((dept) => <option key={dept.name}>{dept.name}</option>)}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold">Message *</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className={`${inputClass("message")} resize-none`} placeholder="Tell us about your goals, timeline, and requirements." />
                {errors.message && <span className="mt-1 block text-xs text-red-500">{errors.message}</span>}
              </label>
              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white">
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
                <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? "Sending..." : "Send message"}
                  <Send size={16} />
                </button>
              </div>
            </form>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {departments.map((dept) => (
              <article key={dept.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <BriefcaseBusiness className="text-cyan-500" size={24} />
                <h4 className="mt-4 text-lg font-bold">{dept.name}</h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{dept.description}</p>
                <a className="mt-4 block text-sm font-semibold text-cyan-600" href={`mailto:${dept.email}`}>{dept.email}</a>
                <a className="mt-1 block text-sm text-slate-500 dark:text-slate-400" href={`tel:${dept.phone.replace(/\s/g, "")}`}>{dept.phone}</a>
              </article>
            ))}
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">
                  <MapPin size={16} />
                  Visit us
                </p>
                <h3 className="mt-3 text-2xl font-bold">Indore office</h3>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
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

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
            <h3 className="text-2xl font-bold">Frequently asked questions</h3>
            <div className="mt-5 divide-y divide-slate-200 dark:divide-gray-800">
              {faqs.map((faq, index) => (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-4 text-left"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown className={`shrink-0 transition ${openFaq === index ? "rotate-180 text-cyan-500" : "text-slate-400"}`} size={18} />
                  </span>
                  {openFaq === index && (
                    <span className="mt-3 block text-sm leading-6 text-slate-500 dark:text-slate-400">{faq.answer}</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ================= CHAT WINDOW ================= */}
      <div className="fixed bottom-5 right-5 z-40">
        {chatOpen && (
          <div className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between bg-black px-4 py-3 text-white">
              <span className="font-bold">Live chat</span>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-64 space-y-3 overflow-auto p-4">
              {chatMessages.map((message, index) => (
                <div key={`${message.from}-${index}`} className={`rounded-lg px-3 py-2 text-sm ${message.from === "user" ? "ml-8 bg-cyan-500 text-black" : "mr-8 bg-slate-100 text-slate-700 dark:bg-gray-900 dark:text-slate-200"}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-gray-800">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatMessage()} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-black" placeholder="Type a message" />
              <button type="button" onClick={sendChatMessage} className="rounded-lg bg-cyan-500 px-3 py-2 text-black">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
        <button type="button" onClick={() => setChatOpen(!chatOpen)} className="grid h-14 w-14 place-items-center rounded-full bg-cyan-400 text-black shadow-2xl shadow-cyan-500/30 transition hover:scale-105" aria-label="Open live chat">
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContactSection;