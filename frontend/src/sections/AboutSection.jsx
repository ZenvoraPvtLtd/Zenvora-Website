import { Link } from "react-router-dom";

const stats = [
  { number: "50+", label: "Happy Clients" },
  { number: "100+", label: "Projects Delivered" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "5+", label: "Years of Excellence" },
];

const values = [
  {
    title: "Innovation First",
    desc: "We stay ahead of the curve, embracing emerging technologies to build solutions that are future-ready.",
  },
  {
    title: "Precision Delivery",
    desc: "On time, on budget, on spec. We take ownership of every milestone from kickoff to launch.",
  },
  {
    title: "Client Partnership",
    desc: "We don't just deliver projects — we build long-term partnerships rooted in trust and transparency.",
  },
  {
    title: "Security & Reliability",
    desc: "Enterprise-grade security and 99.9% uptime are non-negotiables in everything we build.",
  },
  {
    title: "India-Rooted, Global-Ready",
    desc: "Headquartered in Indore, we serve clients across industries and continents with world-class expertise.",
  },
  {
    title: "Outcome-Driven",
    desc: "We measure success by the impact we create — growth, efficiency, and competitive advantage for our clients.",
  },
];

const team = [
  {
    role: "Leadership",
    desc: "Visionary leaders with decades of combined industry experience across tech and business.",
  },
  {
    role: "Engineers",
    desc: "Full-stack experts, cloud architects, and ML specialists building the future, one commit at a time.",
  },
  {
    role: "Designers",
    desc: "UX/UI professionals who craft intuitive experiences that users love and businesses trust.",
  },
  {
    role: "Strategists",
    desc: "Business analysts and consultants who turn complex problems into clear digital roadmaps.",
  },
];

const AboutSection = ({ isPage = false }) => {
  return (
    <div id="about" className="bg-black text-white w-full">
      {/* ================= BREADCRUMB SECTION ================= */}
      {isPage && (
        <section className="relative bg-gray-900 border-b border-gray-800 overflow-hidden py-24">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
              Company
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-5">
              About{" "}
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base">
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition font-medium">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400">About Us</span>
            </div>
          </div>
        </section>
      )}

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 border-b border-gray-800">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-6">
            Our Story
          </span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            We Engineer the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Digital Tomorrow
            </span>{" "}
            for India
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Zenvora Infotech Pvt. Ltd. is a next-generation IT solutions company
            delivering transformative technology services to businesses across
            India and beyond.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 border-b border-gray-800 bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-800/60 border border-gray-700 hover:border-cyan-500 rounded-2xl p-6 text-center transition-all duration-300 group"
              >
                <p className="text-4xl font-black text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-5">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                A Team of Builders,
                <br />
                Thinkers & Innovators
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                Founded with a clear purpose — to bridge the gap between great
                ideas and great software — Zenvora has grown into a trusted
                technology partner for startups, enterprises, and government
                bodies alike.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                From our base in Indore, we operate with global standards,
                delivering cloud infrastructure, AI systems, secure
                applications, and digital transformation strategies that move
                businesses forward.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Software Development",
                  "Cloud Architecture",
                  "AI & ML",
                  "Cybersecurity",
                  "DevOps",
                  "Data Engineering",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="grid grid-cols-1 gap-5">
              {/* Mission */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-7">
                <div className="mb-3 h-12 w-12 rounded-full bg-cyan-500/10" />
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Mission</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To empower businesses with cutting-edge technology solutions
                  that drive growth, innovation, and lasting success in the
                  digital era.
                </p>
              </div>
              {/* Vision */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-2xl p-7">
                <div className="mb-3 h-12 w-12 rounded-full bg-purple-500/10" />
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Vision</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To be the most trusted technology partner for forward-thinking
                  businesses — where every solution we deliver creates a
                  measurable, lasting impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-4">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              The principles behind every decision, every line of code, and
              every client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="group bg-gray-800/50 border border-gray-700 hover:border-cyan-500 rounded-2xl p-7 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-24 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-4">
              The People
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built by a World-Class Team</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Diverse talents united by a shared obsession — building software
              that genuinely matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group bg-gray-800/50 border border-gray-700 hover:border-cyan-500 rounded-2xl p-6 text-center transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-base font-semibold text-cyan-400">{member.role.charAt(0)}</span>
                </div>
                <h3 className="text-base font-bold text-cyan-400 mb-2">{member.role}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isPage && (
        <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Work With{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Whether you have a project in mind or just want to explore
              possibilities, we're ready to listen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition text-sm"
              >
                Get in Touch →
              </Link>
              <Link
                to="/services"
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-400 transition text-sm"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutSection;
