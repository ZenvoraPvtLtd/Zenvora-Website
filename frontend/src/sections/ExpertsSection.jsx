import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Filter,
  Moon,
  Search,
  Sparkles,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import {
  experts,
  socialIcons,
  stats,
  teams,
  technologies,
  testimonials,
} from "../data/expertsData";

const experienceOptions = ["All", "5+ years", "8+ years", "10+ years"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  return (
    <motion.span
      ref={(node) => {
        if (!node) return;
        const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
        return () => controls.stop();
      }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
};

const ExpertCard = ({ expert, onOpen, lightMode }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      rotateX: ((y / rect.height) - 0.5) * -8,
      rotateY: ((x / rect.width) - 0.5) * 8,
    });
  };

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      style={{ transformStyle: "preserve-3d", rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      className={`group relative overflow-hidden rounded-3xl border p-5 shadow-2xl transition ${lightMode
          ? "border-sky-100 bg-white shadow-sky-100/70"
          : "border-white/10 bg-white/[0.06] shadow-cyan-950/30 backdrop-blur-xl"
        }`}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-r from-cyan-400/30 via-blue-500/20 to-sky-300/20 opacity-0 blur-2xl transition group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start gap-4">
          <img
            src={expert.image}
            alt={expert.name}
            loading="lazy"
            className="h-20 w-20 rounded-2xl object-cover ring-2 ring-cyan-400/40"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-lg font-bold">{expert.name}</p>
              <span className={`h-3 w-3 rounded-full ${expert.availability === "Available" ? "bg-emerald-400" : "bg-amber-400"}`} />
            </div>
            <p className={`mt-1 text-sm ${lightMode ? "text-slate-500" : "text-slate-400"}`}>
              {expert.role}
            </p>
            <p className="mt-2 text-xs font-semibold text-cyan-500">
              {expert.experience}+ years experience
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {expert.skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${lightMode ? "bg-cyan-50 text-cyan-700" : "bg-cyan-400/10 text-cyan-200"
                }`}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {Object.entries(expert.socials).map(([key, href]) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  href={href}
                  aria-label={`${expert.name} ${key}`}
                  className={`grid h-9 w-9 place-items-center rounded-full transition ${lightMode
                      ? "bg-slate-100 text-slate-600 hover:bg-cyan-100 hover:text-cyan-700"
                      : "bg-white/10 text-slate-300 hover:bg-cyan-400 hover:text-black"
                    }`}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => onOpen(expert)}
            className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-cyan-300"
          >
            View profile
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const ExpertModal = ({ expert, onClose, lightMode }) => {
  if (!expert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 backdrop-blur" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl border p-6 shadow-2xl"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--text)"
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={expert.image} alt={expert.name} className="h-20 w-20 rounded-2xl" />
            <div>
              <h2 className="text-2xl font-bold">{expert.name}</h2>
              <p className={lightMode ? "text-slate-500" : "text-slate-400"}>{expert.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`grid h-10 w-10 place-items-center rounded-full ${lightMode ? "bg-slate-100 hover:bg-slate-200" : "bg-white/10 hover:bg-white/20"
              }`}
            aria-label="Close expert profile"
          >
            <X size={18} />
          </button>
        </div>

        <p className={`mt-6 leading-7 ${lightMode ? "text-slate-600" : "text-slate-300"}`}>
          {expert.bio}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            ["Certifications", expert.certifications],
            ["Achievements", expert.achievements],
            ["Tech Stack", expert.techStack],
            ["Projects", expert.projects],
          ].map(([title, items]) => (
            <div key={title} className={`rounded-2xl border p-5 ${lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.04]"}`}>
              <h3 className="font-bold text-cyan-500">{title}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-400" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-6 rounded-2xl border p-5 ${lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.04]"}`}>
          <h3 className="font-bold text-cyan-500">Timeline</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {expert.timeline.map((item) => (
              <div key={item} className="rounded-xl bg-cyan-400/10 p-3 text-sm">{item}</div>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
        >
          <CalendarCheck size={17} />
          Book consultation
        </Link>
      </motion.div>
    </div>
  );
};

const ExpertsSection = ({ isPage = false }) => {
  const [lightMode, setLightMode] = useState(true);
  const [activeTeam, setActiveTeam] = useState("All");
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [selectedExpert, setSelectedExpert] = useState(null);

  const allSkills = useMemo(
    () => ["All", ...new Set(experts.flatMap((expert) => expert.skills))],
    [],
  );

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const matchesTeam = activeTeam === "All" || expert.department === activeTeam;
      const matchesSkill = skillFilter === "All" || expert.skills.includes(skillFilter);
      const matchesExperience =
        experienceFilter === "All" || expert.experience >= Number.parseInt(experienceFilter, 10);
      const matchesSearch = `${expert.name} ${expert.role} ${expert.skills.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTeam && matchesSkill && matchesExperience && matchesSearch;
    });
  }, [activeTeam, experienceFilter, search, skillFilter]);

  const pageClass = "bg-white text-slate-950";

  return (
    <div id="experts" className={`w-full overflow-hidden transition ${pageClass}`}>
      {/* ================= BREADCRUMB SECTION ================= */}
      {isPage && (
        <section className="relative border-b overflow-hidden py-24" style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)"
        }}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: "rgba(14, 165, 233, 0.1)",
              borderColor: "rgba(14, 165, 233, 0.3)",
              border: "1px solid",
              color: "#0ea5e9"
            }}>
              Company
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-5" style={{
              background: "linear-gradient(to right, #0ea5e9, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Our{" "}
              <span>
                Experts
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base">
              <Link to="/" className="hover:text-blue-600 transition font-medium" style={{ color: "#0ea5e9" }}>
                Home
              </Link>
              <span style={{ color: "var(--text-secondary)" }}>/</span>
              <span style={{ color: "var(--text-secondary)" }}>Our Experts</span>
            </div>
          </div>
        </section>
      )}

      {/* ================= HERO TEXT & TOGGLE ================= */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute right-10 top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-400">
              <Sparkles size={16} />
              Future-ready expert network
            </div>
            <h2 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Build with{" "}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                elite MERN, AI, cloud and security experts
              </span>
            </h2>
            <p className={`mt-6 max-w-2xl text-lg leading-8 ${lightMode ? "text-slate-600" : "text-slate-300"}`}>
              Explore a premium team page with search, filters, profiles, consultation flows, achievements, and interactive expert cards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#experts-grid" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300">
                Explore experts
              </a>
              <Link to="/contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300">
                Book consultation
              </Link>
              <button
                type="button"
                onClick={() => setLightMode(!lightMode)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold ${lightMode ? "border-slate-300 bg-white" : "border-white/15 bg-white/5"}`}
              >
                {lightMode ? <Moon size={16} /> : <Sun size={16} />}
                {lightMode ? "Dark mode" : "Light mode"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`relative rounded-[2rem] border p-3 shadow-2xl ${lightMode ? "border-sky-100 bg-white" : "border-white/10 bg-white/[0.06] backdrop-blur-xl"}`}
          >
            <img
              src="/experts-team-blue.svg"
              alt="Creative team work"
              loading="lazy"
              className="aspect-video w-full rounded-[1.5rem] object-cover"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-5 left-6 rounded-2xl bg-cyan-400 px-5 py-4 text-black shadow-xl"
            >
              <p className="text-xs font-bold uppercase tracking-widest">Experts online</p>
              <p className="text-2xl font-black">24/7</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              className={`rounded-3xl border p-6 ${lightMode ? "border-sky-100 bg-white shadow-lg shadow-sky-100" : "border-white/10 bg-white/[0.06] backdrop-blur-xl"}`}
            >
              <p className="text-4xl font-black text-cyan-400">
                <Counter value={stat.value} suffix={stat.suffix || "+"} />
              </p>
              <p className={`mt-2 text-sm ${lightMode ? "text-slate-500" : "text-slate-400"}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= GRID AND FILTERS ================= */}
      <section id="experts-grid" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-400">Find your specialist</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Search, filter and open expert profiles</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <button
                  key={team}
                  type="button"
                  onClick={() => setActiveTeam(team)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeTeam === team ? "bg-cyan-400 text-black" : "bg-slate-100 text-slate-600"
                    }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 grid gap-3 rounded-3xl border p-4 lg:grid-cols-[1fr_220px_180px]" style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-alt)"
          }}>
            <label className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#0ea5e9" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by expert, role, or skill"
                className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                  color: "var(--text)"
                }}
              />
            </label>
            <label className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#0ea5e9" }} />
              <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm outline-none" style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                color: "var(--text)"
              }}>
                {allSkills.map((skill) => <option key={skill}>{skill}</option>)}
              </select>
            </label>
            <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)} className="rounded-2xl border px-4 py-3 text-sm outline-none" style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)"
            }}>
              {experienceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.09 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} onOpen={setSelectedExpert} lightMode={lightMode} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MARQUEE / TECHNOLOGIES ================= */}
      <section className="py-12">
        <div className={`mx-auto max-w-7xl overflow-hidden border-y py-6 ${lightMode ? "border-sky-100 bg-white" : "border-white/10 bg-white/[0.04]"}`}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="flex w-max gap-4 px-4"
          >
            {[...technologies, ...technologies].map(({ name, icon: Icon }, index) => (
              <div key={`${name}-${index}`} className={`flex items-center gap-3 rounded-2xl border px-5 py-3 ${lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/30"}`}>
                <Icon className="text-cyan-400" size={24} />
                <span className="text-sm font-bold">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-400">Why choose us</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Senior experts, practical delivery, measurable outcomes</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Zap, "Fast discovery", "We identify blockers and next steps quickly."],
              [Award, "Certified talent", "Experts bring proven credentials and production experience."],
              [Trophy, "Outcome focus", "Every engagement is tied to business impact."],
              [CheckCircle2, "Reliable execution", "Clean delivery practices from planning to launch."],
            ].map(([Icon, title, desc]) => (
              <div key={title} className={`rounded-3xl border p-6 ${lightMode ? "border-sky-100 bg-white" : "border-white/10 bg-white/[0.06]"}`}>
                <Icon className="text-cyan-400" size={26} />
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className={`mt-2 text-sm leading-6 ${lightMode ? "text-slate-500" : "text-slate-400"}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            loop
            className="pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="rounded-3xl border p-8 text-center shadow-md" style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)"
                }}>
                  <p className="mx-auto max-w-3xl text-xl font-semibold leading-8" style={{ color: "var(--text)" }}>
                    "{item.quote}"
                  </p>
                  <p className="mt-5 font-bold text-cyan-400">{item.name}</p>
                  <p style={{ color: "var(--text-secondary)" }}>{item.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= BOOK CONSULTATION CTA ================= */}
      {!isPage && (
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-linear-to-r from-cyan-400 to-blue-600 p-8 text-black shadow-2xl shadow-cyan-950/30 md:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-3xl font-black sm:text-4xl">Ready to book a consultation?</h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold text-black/70">
                  Share your goals and we will match you with the right expert for architecture, AI, cloud, security, or product design.
                </p>
              </div>
              <Link to="/contact" className="rounded-full px-7 py-4 text-center text-sm font-bold text-white transition hover:opacity-90" style={{
                backgroundColor: "#0ea5e9"
              }}>
                Schedule now
              </Link>
            </div>
          </div>
        </section>
      )}

      <ExpertModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} lightMode={lightMode} />
    </div>
  );
};

export default ExpertsSection;
