import { useState, useEffect } from "react";
import axios from "axios";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);

  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [applyLoading, setApplyLoading] = useState(false);

  const [applyError, setApplyError] = useState("");

  const [applySuccess, setApplySuccess] = useState(false);

  // ================= GET JOBS =================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/careers/jobs");

        setJobs(res.data.data || []);
      } catch (error) {
        console.log(error);

        setJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  // ================= HANDLE INPUT =================

  const handleApplyChange = (e) => {
    setApplyForm({
      ...applyForm,
      [e.target.name]: e.target.value,
    });

    setApplyError("");
  };

  // ================= APPLY JOB =================

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    setApplyLoading(true);

    setApplyError("");

    try {
      await axios.post("http://localhost:5000/api/careers/apply", {
        ...applyForm,
        jobId: selectedJob._id,
        jobTitle: selectedJob.title,
      });

      setApplySuccess(true);

      setApplyForm({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
      });

      setTimeout(() => {
        setApplySuccess(false);

        setSelectedJob(null);
      }, 3000);
    } catch (err) {
      setApplyError(err.response?.data?.message || "Application Failed");
    } finally {
      setApplyLoading(false);
    }
  };

  // ================= INPUT CLASS =================

  const inputCls =
    "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white outline-none focus:border-cyan-500";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-20 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold">Careers</h1>

          <p className="text-gray-400 mt-4 text-lg">Join our amazing team</p>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">Open Positions</h2>

          {loadingJobs ? (
            <div className="text-center text-gray-400">Loading Jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-10 text-center">
              <p className="text-gray-400">No Jobs Available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:border-cyan-500 transition"
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">
                    {job.title}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-300">{job.location}</p>
                    </div>

                    {job.department && (
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-semibold text-gray-300">{job.department}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-semibold text-gray-300">{job.type}</p>
                    </div>

                    {job.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-semibold text-gray-300 leading-relaxed">{job.description}</p>
                      </div>
                    )}

                    {job.requirements?.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500">Requirements</p>
                        <ul className="mt-1 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="font-semibold text-gray-300 flex gap-2">
                              <span>•</span>{req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setApplyError("");
                      setApplySuccess(false);
                    }}
                    className="mt-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded transition w-full"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-1">Apply For</h2>

            <p className="text-cyan-400 font-semibold mb-6">
              {selectedJob.title}
            </p>

            {applySuccess ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎉</div>

                <p className="text-xl font-semibold">Application Submitted</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                {applyError && (
                  <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    {applyError}
                  </div>
                )}

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={applyForm.name}
                  onChange={handleApplyChange}
                  required
                  className={inputCls}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={applyForm.email}
                  onChange={handleApplyChange}
                  required
                  className={inputCls}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={applyForm.phone}
                  onChange={handleApplyChange}
                  className={inputCls}
                />

                <textarea
                  name="coverLetter"
                  rows="5"
                  placeholder="Cover Letter"
                  value={applyForm.coverLetter}
                  onChange={handleApplyChange}
                  className={`${inputCls} resize-none`}
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 border border-gray-600 py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={applyLoading}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-semibold disabled:opacity-60"
                  >
                    {applyLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
