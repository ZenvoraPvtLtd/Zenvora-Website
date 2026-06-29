import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Target,
  Handshake,
  ShieldCheck,
  Globe,
  TrendingUp,
  Briefcase,
  Code2,
  Palette,
  Compass,
  Sparkles,
  // ArrowRight,
} from "lucide-react";

const stats = [
  { number: "50+", label: "HAPPY CLIENTS", desc: "Delivering exceptional software solutions and building trust globally." },
  { number: "100+", label: "PROJECTS DELIVERED", desc: "From custom mobile apps to complex enterprise cloud systems." },
  { number: "98%", label: "SATISFACTION RATE", desc: "Our commitment to quality ensures long-term client success." },
  { number: "5+", label: "YEARS OF EXCELLENCE", desc: "A proven track record of technological innovation and growth." },
];

const values = [
  {
    Icon: Rocket,
    title: "Innovation First",
    desc: "We stay ahead of the curve, embracing emerging technologies to build solutions that are future-ready.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    Icon: Target,
    title: "Precision Delivery",
    desc: "On time, on budget, on spec. We take ownership of every milestone from kickoff to launch.",
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    Icon: Handshake,
    title: "Client Partnership",
    desc: "We don't just deliver projects — we build long-term partnerships rooted in trust and transparency.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    Icon: ShieldCheck,
    title: "Security & Reliability",
    desc: "Enterprise-grade security and 99.9% uptime are non-negotiables in everything we build.",
    color: "#0f766e",
    bg: "#f0fdf4",
  },
  {
    Icon: Globe,
    title: "India-Rooted, Global-Ready",
    desc: "Headquartered in Indore, we serve clients across industries and continents with world-class expertise.",
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    Icon: TrendingUp,
    title: "Outcome-Driven",
    desc: "We measure success by the impact we create — growth, efficiency, and competitive advantage for our clients.",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
];

const team = [
  {
    Icon: Briefcase,
    role: "Leadership",
    desc: "Visionary leaders with decades of combined industry experience across tech and business.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    Icon: Code2,
    role: "Engineers",
    desc: "Full-stack experts, cloud architects, and ML specialists building the future, one commit at a time.",
    color: "#0f766e",
    bg: "#f0fdf4",
  },
  {
    Icon: Palette,
    role: "Designers",
    desc: "UX/UI professionals who craft intuitive experiences that users love and businesses trust.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    Icon: Compass,
    role: "Strategists",
    desc: "Business analysts and consultants who turn complex problems into clear digital roadmaps.",
    color: "#ea580c",
    bg: "#fff7ed",
  },
];

/* ── Badge ── */
const Badge = ({ children }) => (
  <span
    className="inline-block text-xs font-semibold uppercase tracking-[0.22em] rounded-full px-4 py-1.5 mb-5"
    style={{
      color: "#2563eb",
      backgroundColor: "#eff6ff",
      border: "1px solid #bfdbfe",
    }}
  >
    {children}
  </span>
);

const AboutSection = ({ isPage = false, showCTA = true }) => {
  return (
    <div id="about" className="w-full" style={{ backgroundColor: "var(--bg)" }}>

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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge>Company</Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-5" style={{ color: "#0f172a" }}>
              About{" "}
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
              <span style={{ color: "#64748b" }}>About Us</span>
            </div>
          </div>
        </section>
      )}

      {/* ── STORY HERO ── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(37,99,235,0.06) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Badge>Our Story</Badge>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-6 max-w-3xl"
            style={{ color: "#e2e8f0" }}
          >
            We Engineer the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital Tomorrow
            </span>{" "}
            for India
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#94a3b8" }}>
            Zenvora Infotech Pvt. Ltd. is a next-generation IT solutions company delivering
            transformative technology services to businesses across India and beyond.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl p-8 text-left transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(12px)", /* Dark sleek background */
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <p className="text-5xl font-bold mb-5" style={{ color: "#e2e8f0" }}>
                  {stat.number}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#fbbf24" }}>
                  {stat.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24" style={{ backgroundColor: "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <Badge>Who We Are</Badge>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-snug" style={{ color: "#e2e8f0" }}>
                A Team of Builders,
                <br />
                Thinkers &amp; Innovators
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: "#94a3b8" }}>
                Founded with a clear purpose — to bridge the gap between great ideas and great
                software — Zenvora has grown into a trusted technology partner for startups,
                enterprises, and government bodies alike.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                From our base in Indore, we operate with global standards, delivering cloud
                infrastructure, AI systems, secure applications, and digital transformation
                strategies that move businesses forward.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Software Development", "Cloud Architecture", "AI & ML", "Cybersecurity", "DevOps", "Data Engineering"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5 rounded-md"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#1d4ed8",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Mission / Vision */}
            <div className="grid gap-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
              >
                <div
                  className="mb-4 h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(37, 99, 235, 0.2)" }}
                >
                  <Target size={22} style={{ color: "#3b82f6" }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#e2e8f0" }}>Our Mission</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  To empower businesses with cutting-edge technology solutions that drive growth,
                  innovation, and lasting success in the digital era.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
              >
                <div
                  className="mb-4 h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                >
                  <Sparkles size={22} style={{ color: "#a78bfa" }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#e2e8f0" }}>Our Vision</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  To be the most trusted technology partner for forward-thinking businesses —
                  where every solution we deliver creates a measurable, lasting impact.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section
        className="py-24"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Badge>What Drives Us</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#e2e8f0" }}>
              Our Core Values
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              The principles behind every decision, every line of code, and every client relationship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl p-7 transition-all duration-300"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = v.color;
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.6)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="mb-4 h-12 w-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <v.Icon size={22} style={{ color: v.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#e2e8f0" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24" style={{ backgroundColor: "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Badge>The People</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#e2e8f0" }}>
              Built by a World-Class Team
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
              Diverse talents united by a shared obsession — building software that genuinely matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.6)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = member.color;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <member.Icon size={24} style={{ color: member.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#e2e8f0" }}>
                  {member.role}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (home preview only) ── */}
      {!isPage && showCTA && (
        <section
          className="relative overflow-hidden border-y border-[var(--border)] py-24"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #f8fbff 45%, #eef6ff 100%)",
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[42rem] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--primary)]">
              Start a Conversation
            </p>
            <h2 className="mb-4 text-3xl font-black text-[var(--text)] md:text-4xl">
              Want to Work With Us?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Whether you have a project in mind or just want to explore possibilities,
              we're ready to listen.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-8 py-3 text-[0] font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:shadow-blue-500/30"
              >
                <span className="text-sm">Get in Touch</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--tag-border)] bg-white px-8 py-3 text-sm font-semibold text-[var(--primary)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
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
