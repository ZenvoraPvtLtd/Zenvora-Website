const Careers = () => {
  const jobs = [
    {
      title: "Senior React Developer",
      location: "Bangalore, India",
      type: "Full-time",
    },
    {
      title: "Backend Engineer",
      location: "Mumbai, India",
      type: "Full-time",
    },
    {
      title: "UI/UX Designer",
      location: "Delhi, India",
      type: "Full-time",
    },
    {
      title: "Data Scientist",
      location: "Pune, India",
      type: "Full-time",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Careers</h1>
          <p className="text-lg mt-4 text-gray-400">
            Join our talented team and grow your career with us
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Join Zenvora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Growth", desc: "Career development opportunities" },
              { title: "Innovation", desc: "Work on cutting-edge projects" },
              { title: "Culture", desc: "Collaborative work environment" },
              { title: "Benefits", desc: "Competitive packages & perks" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow text-center hover:border-cyan-500 transition"
              >
                <h3 className="font-bold text-lg mb-2 text-cyan-400">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-white">
            Open Positions
          </h2>
          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-md hover:border-cyan-500 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{job.location}</p>
                  </div>
                  <span className="bg-cyan-900 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">
                    {job.type}
                  </span>
                </div>
                <button className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded hover:from-cyan-400 hover:to-blue-500 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
