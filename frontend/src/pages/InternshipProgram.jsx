// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../api";

// const InternshipProgram = () => {
//   const benefits = [
//     "Hands-on experience with latest technologies",
//     "Mentorship from senior professionals",
//     "Competitive stipend",
//     "Certificate of completion",
//     "Potential for full-time conversion",
//     "Flexible work timings",
//   ];

//   const tracks = [
//     {
//       title: "Frontend Development",
//       duration: "3-6 months",
//       requirements: "HTML, CSS, JavaScript, React basics",
//     },
//     {
//       title: "Backend Development",
//       duration: "3-6 months",
//       requirements: "Node.js, Express, MongoDB basics",
//     },
//     {
//       title: "Full Stack Development",
//       duration: "6 months",
//       requirements: "MERN Stack knowledge",
//     },
//     {
//       title: "UI/UX Design",
//       duration: "3-6 months",
//       requirements: "Figma, Design fundamentals",
//     },
//   ];

//   const navigate = useNavigate();
//   const user = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   })();
//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!(token && user);

//   const [isApplyOpen, setIsApplyOpen] = useState(false);
//   const [selectedTrack, setSelectedTrack] = useState(null);
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     portfolio: "",
//     skills: "",
//     track: "",
//   });
//   const [submitStatus, setSubmitStatus] = useState({ loading: false, error: "", success: "" });
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const openApplyForm = (track) => {
//     if (!isLoggedIn) {
//       navigate("/login?redirectTo=/internship");
//       return;
//     }

//     setSelectedTrack(track);
//     setFormData({
//       name: user?.name || "",
//       email: user?.email || "",
//       phone: "",
//       portfolio: "",
//       skills: "",
//       track: track.title,
//     });
//     setSubmitStatus({ loading: false, error: "", success: "" });
//     setShowSuccessModal(false);
//     setIsApplyOpen(true);
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setSubmitStatus({ ...submitStatus, error: "", success: "" });
//   };

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();
//     setSubmitStatus({ ...submitStatus, loading: true, error: "", success: "" });

//     try {
//       await api.applyJob({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         portfolio: formData.portfolio,
//         skills: formData.skills,
//         track: formData.track,
//       });
//       setSubmitStatus({ loading: false, error: "", success: "Application submitted!" });
//       setIsApplyOpen(false);
//       setShowSuccessModal(true);
//     } catch (err) {
//       setSubmitStatus({ loading: false, error: err?.message || "Unable to submit application.", success: "" });
//     }
//   };

//   const closeApplyForm = () => {
//     setIsApplyOpen(false);
//     setSelectedTrack(null);
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl md:text-5xl font-bold">Internship Program</h1>
//           <p className="text-lg mt-4 text-gray-400">
//             Launch Your Tech Career with Zenvora Infotech
//           </p>
//         </div>
//       </section>

//       {/* Program Overview */}
//       <section className="py-20 bg-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold mb-12 text-white">
//             Why Our Internship Program?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {benefits.map((benefit, idx) => (
//               <div
//                 key={idx}
//                 className="bg-gray-800 border border-gray-700 p-6 rounded-lg border-l-4 border-l-cyan-500"
//               >
//                 <p className="text-gray-300 font-semibold">{benefit}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Internship Tracks */}
//       <section className="py-20 bg-linear-to-b from-gray-900 to-black border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold mb-12 text-white">Internship Tracks</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {tracks.map((track, idx) => (
//               <div key={idx} className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:border-cyan-500 transition">
//                 <h3 className="text-xl font-bold text-cyan-400 mb-4">
//                   {track.title}
//                 </h3>
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm text-gray-500">Duration</p>
//                     <p className="font-semibold text-gray-300">
//                       {track.duration}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Requirements</p>
//                     <p className="font-semibold text-gray-300">
//                       {track.requirements}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => openApplyForm(track)}
//                   className="mt-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded hover:from-cyan-400 hover:to-blue-500 transition w-full"
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Application Info */}
//       <section className="py-20 bg-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold mb-8 text-white">How to Apply</h2>
//           <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg">
//             <ol className="space-y-4 list-decimal list-inside">
//               <li className="text-lg text-gray-300">
//                 Visit our careers page and select your preferred track
//               </li>
//               <li className="text-lg text-gray-300">
//                 Submit your resume and portfolio (if applicable)
//               </li>
//               <li className="text-lg text-gray-300">
//                 Complete the online assessment
//               </li>
//               <li className="text-lg text-gray-300">
//                 Attend the interview round
//               </li>
//               <li className="text-lg text-gray-300">
//                 Start your internship journey with Zenvora!
//               </li>
//             </ol>
//           </div>
//         </div>
//       </section>

//       {isApplyOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
//           <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 relative">
//             <button
//               onClick={closeApplyForm}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//               aria-label="Close apply form"
//             >
//               ✕
//             </button>

//             <h2 className="text-3xl font-bold mb-3 text-white">Apply for {selectedTrack?.title}</h2>
//             <p className="text-sm text-gray-400 mb-6">
//               Fill out the form below to submit your internship application.
//             </p>

//             <form onSubmit={handleApplySubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <label className="block">
//                   <span className="text-sm text-gray-300">Full Name *</span>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     required
//                     className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
//                   />
//                 </label>

//                 <label className="block">
//                   <span className="text-sm text-gray-300">Email *</span>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleFormChange}
//                     required
//                     className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
//                   />
//                 </label>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <label className="block">
//                   <span className="text-sm text-gray-300">Phone Number *</span>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleFormChange}
//                     placeholder="+91 98765 43210"
//                     required
//                     className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
//                   />
//                 </label>

//                 <label className="block">
//                   <span className="text-sm text-gray-300">Portfolio / LinkedIn URL</span>
//                   <input
//                     type="url"
//                     name="portfolio"
//                     value={formData.portfolio}
//                     onChange={handleFormChange}
//                     placeholder="https://..."
//                     className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
//                   />
//                 </label>
//               </div>

//               <label className="block">
//                 <span className="text-sm text-gray-300">Your Skills *</span>
//                 <textarea
//                   name="skills"
//                   value={formData.skills}
//                   onChange={handleFormChange}
//                   placeholder="e.g., React, Node.js, MongoDB, Git..."
//                   rows={3}
//                   required
//                   className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
//                 />
//               </label>



//               {submitStatus.error && (
//                 <div className="rounded-lg bg-red-500/10 border border-red-500 px-4 py-3 text-sm text-red-200">
//                   {submitStatus.error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitStatus.loading}
//                 className="w-full rounded-lg bg-cyan-500 px-6 py-3 text-black font-semibold hover:bg-cyan-400 disabled:opacity-60"
//               >
//                 {submitStatus.loading ? "Submitting..." : "Submit Application"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {showSuccessModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
//           <div className="w-full max-w-md bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-8 text-center">
//             <div className="mb-6 flex justify-center">
//               <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full border-2 border-emerald-500">
//                 <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>

//             <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
            
//             <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
//               <p className="text-emerald-300 text-sm mb-2">
//                 <span className="font-semibold">Track:</span> {selectedTrack?.title}
//               </p>
//               <p className="text-gray-400 text-sm">
//                 We've received your application. Our team will review it and get back to you soon!
//               </p>
//             </div>

//             <p className="text-gray-400 text-sm mb-6">
//               A confirmation email has been sent to <span className="text-cyan-400 font-medium">{formData.email}</span>
//             </p>

//             <button
//               onClick={() => setShowSuccessModal(false)}
//               className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InternshipProgram;
