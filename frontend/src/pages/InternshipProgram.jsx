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
                <button className="mt-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded hover:from-cyan-400 hover:to-blue-500 transition w-full">
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
    </div>
  );
};

export default InternshipProgram;
