// import { useState, useEffect } from "react";
// import axios from "axios";

// const Careers = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loadingJobs, setLoadingJobs] = useState(true);

//   const [selectedJob, setSelectedJob] = useState(null);

//   const [applyForm, setApplyForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     coverLetter: "",
//   });

//   const [applyLoading, setApplyLoading] = useState(false);

//   const [applyError, setApplyError] = useState("");

//   const [applySuccess, setApplySuccess] = useState(false);

//   // ================= GET JOBS =================

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/careers/jobs");

//         setJobs(res.data.data || []);
//       } catch (error) {
//         console.log(error);

//         setJobs([]);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // ================= HANDLE INPUT =================

//   const handleApplyChange = (e) => {
//     setApplyForm({
//       ...applyForm,
//       [e.target.name]: e.target.value,
//     });

//     setApplyError("");
//   };

//   // ================= APPLY JOB =================

//   const handleApplySubmit = async (e) => {
//     e.preventDefault();

//     setApplyLoading(true);

//     setApplyError("");

//     try {
//       await axios.post("http://localhost:5000/api/careers/apply", {
//         ...applyForm,
//         jobId: selectedJob._id,
//         jobTitle: selectedJob.title,
//       });

//       setApplySuccess(true);

//       setApplyForm({
//         name: "",
//         email: "",
//         phone: "",
//         coverLetter: "",
//       });

//       setTimeout(() => {
//         setApplySuccess(false);

//         setSelectedJob(null);
//       }, 3000);
//     } catch (err) {
//       setApplyError(err.response?.data?.message || "Application Failed");
//     } finally {
//       setApplyLoading(false);
//     }
//   };

//   // ================= INPUT CLASS =================

//   const inputCls =
//     "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-cyan-500";

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Hero */}
//       <section className="py-20 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
//         <div className="max-w-7xl mx-auto px-4">
//           <h1 className="text-5xl font-bold">Careers</h1>

//           <p className="text-gray-400 mt-4 text-lg">Join our amazing team</p>
//         </div>
//       </section>

//       {/* Jobs */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-10">Open Positions</h2>

//           {loadingJobs ? (
//             <div className="text-center text-gray-400">Loading Jobs...</div>
//           ) : jobs.length === 0 ? (
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-10 text-center">
//               <p className="text-gray-400">No Jobs Available</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:border-cyan-500 transition"
//                 >
//                   <h3 className="text-xl font-bold text-cyan-400 mb-4">
//                     {job.title}
//                   </h3>

//                   <div className="space-y-3">
//                     <div>
//                       <p className="text-sm text-gray-500">Location</p>
//                       <p className="font-semibold text-gray-300">{job.location}</p>
//                     </div>

//                     {job.department && (
//                       <div>
//                         <p className="text-sm text-gray-500">Department</p>
//                         <p className="font-semibold text-gray-300">{job.department}</p>
//                       </div>
//                     )}

//                     <div>
//                       <p className="text-sm text-gray-500">Type</p>
//                       <p className="font-semibold text-gray-300">{job.type}</p>
//                     </div>

//                     {job.description && (
//                       <div>
//                         <p className="text-sm text-gray-500">Description</p>
//                         <p className="font-semibold text-gray-300 leading-relaxed">{job.description}</p>
//                       </div>
//                     )}

//                     {job.requirements?.length > 0 && (
//                       <div>
//                         <p className="text-sm text-gray-500">Requirements</p>
//                         <ul className="mt-1 space-y-1">
//                           {job.requirements.map((req, index) => (
//                             <li key={index} className="font-semibold text-gray-300 flex gap-2">
//                               <span>•</span>{req}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={() => {
//                       setSelectedJob(job);
//                       setApplyError("");
//                       setApplySuccess(false);
//                     }}
//                     className="mt-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded transition w-full"
//                   >
//                     Apply Now
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Modal */}
//       {selectedJob && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
//           <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
//             {/* Close */}
//             <button
//               onClick={() => setSelectedJob(null)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-1">Apply For</h2>

//             <p className="text-cyan-400 font-semibold mb-6">
//               {selectedJob.title}
//             </p>

//             {applySuccess ? (
//               <div className="text-center py-10">
//                 <div className="text-5xl mb-4">🎉</div>

//                 <p className="text-xl font-semibold">Application Submitted</p>
//               </div>
//             ) : (
//               <form onSubmit={handleApplySubmit} className="space-y-5">
//                 {applyError && (
//                   <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
//                     {applyError}
//                   </div>
//                 )}

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={applyForm.name}
//                   onChange={handleApplyChange}
//                   required
//                   className={inputCls}
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={applyForm.email}
//                   onChange={handleApplyChange}
//                   required
//                   className={inputCls}
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={applyForm.phone}
//                   onChange={handleApplyChange}
//                   className={inputCls}
//                 />

//                 <textarea
//                   name="coverLetter"
//                   rows="5"
//                   placeholder="Cover Letter"
//                   value={applyForm.coverLetter}
//                   onChange={handleApplyChange}
//                   className={`${inputCls} resize-none`}
//                 />

//                 <div className="flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setSelectedJob(null)}
//                     className="flex-1 border border-gray-600 py-3 rounded-lg"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={applyLoading}
//                     className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-semibold disabled:opacity-60"
//                   >
//                     {applyLoading ? "Submitting..." : "Submit"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Careers;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const InternshipProgram = () => {
  const benefits = [
    "Hands-on experience with latest technologies",
    "Mentorship from senior professionals",
    "Competitive stipend",
    "Certificate of completion",
    "Potential for full-time conversion",
    "Flexible work timings",
  ];

  const tracks = [
    {
      title: "Frontend Development",
      duration: "3-6 months",
      requirements: "HTML, CSS, JavaScript, React basics",
    },
    {
      title: "Backend Development",
      duration: "3-6 months",
      requirements: "Node.js, Express, MongoDB basics",
    },
    {
      title: "Full Stack Development",
      duration: "6 months",
      requirements: "MERN Stack knowledge",
    },
    {
      title: "UI/UX Design",
      duration: "3-6 months",
      requirements: "Figma, Design fundamentals",
    },
  ];

  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!(token && user);

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    portfolio: "",
    skills: "",
    track: "",
  });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: "", success: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openApplyForm = (track) => {
    if (!isLoggedIn) {
      navigate("/login?redirectTo=/internship");
      return;
    }

    setSelectedTrack(track);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      portfolio: "",
      skills: "",
      track: track.title,
    });
    setSubmitStatus({ loading: false, error: "", success: "" });
    setShowSuccessModal(false);
    setIsApplyOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus({ ...submitStatus, error: "", success: "" });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ ...submitStatus, loading: true, error: "", success: "" });

    try {
      await api.applyJob({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio,
        skills: formData.skills,
        track: formData.track,
      });
      setSubmitStatus({ loading: false, error: "", success: "Application submitted!" });
      setIsApplyOpen(false);
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitStatus({ loading: false, error: err?.message || "Unable to submit application.", success: "" });
    }
  };

  const closeApplyForm = () => {
    setIsApplyOpen(false);
    setSelectedTrack(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Internship Program</h1>
          <p className="text-lg mt-4 text-gray-400">
            Launch Your Tech Career with Zenvora Infotech
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Why Our Internship Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg border-l-4 border-l-cyan-500"
              >
                <p className="text-gray-300 font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Tracks */}
      <section className="py-20 bg-linear-to-b from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-white">Internship Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, idx) => (
              <div key={idx} className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:border-cyan-500 transition">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  {track.title}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-300">
                      {track.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Requirements</p>
                    <p className="font-semibold text-gray-300">
                      {track.requirements}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openApplyForm(track)}
                  className="mt-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded hover:from-cyan-400 hover:to-blue-500 transition w-full"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Info */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-white">How to Apply</h2>
          <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg">
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-lg text-gray-300">
                Visit our careers page and select your preferred track
              </li>
              <li className="text-lg text-gray-300">
                Submit your resume and portfolio (if applicable)
              </li>
              <li className="text-lg text-gray-300">
                Complete the online assessment
              </li>
              <li className="text-lg text-gray-300">
                Attend the interview round
              </li>
              <li className="text-lg text-gray-300">
                Start your internship journey with Zenvora!
              </li>
            </ol>
          </div>
        </div>
      </section>

      {isApplyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 relative">
            <button
              onClick={closeApplyForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close apply form"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-3 text-white">Apply for {selectedTrack?.title}</h2>
            <p className="text-sm text-gray-400 mb-6">
              Fill out the form below to submit your internship application.
            </p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-300">Full Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-300">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-300">Phone Number *</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                    required
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-300">Portfolio / LinkedIn URL</span>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleFormChange}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-gray-300">Your Skills *</span>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleFormChange}
                  placeholder="e.g., React, Node.js, MongoDB, Git..."
                  rows={3}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </label>



              {submitStatus.error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500 px-4 py-3 text-sm text-red-200">
                  {submitStatus.error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.loading}
                className="w-full rounded-lg bg-cyan-500 px-6 py-3 text-black font-semibold hover:bg-cyan-400 disabled:opacity-60"
              >
                {submitStatus.loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-md bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full border-2 border-emerald-500">
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
              <p className="text-emerald-300 text-sm mb-2">
                <span className="font-semibold">Track:</span> {selectedTrack?.title}
              </p>
              <p className="text-gray-400 text-sm">
                We've received your application. Our team will review it and get back to you soon!
              </p>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              A confirmation email has been sent to <span className="text-cyan-400 font-medium">{formData.email}</span>
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipProgram;
