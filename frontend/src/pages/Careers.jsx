import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  FileText,
  GraduationCap,
  Layers,
  Monitor,
  Rocket,
  Server,
  Trophy,
  UsersRound,
  X,
} from "lucide-react";
import { api } from "../api";

const benefits = [
  {
    icon: Rocket,
    title: "Hands-on experience",
    desc: "Work on real-world projects with latest technologies.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: UsersRound,
    title: "Mentorship",
    desc: "Learn and grow under the guidance of experienced professionals.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Trophy,
    title: "Competitive stipend",
    desc: "Our internships come with a competitive stipend.",
    color: "#0f766e",
    bg: "#f0fdf4",
  },
  {
    icon: Award,
    title: "Certificate of completion",
    desc: "Earn a recognized certificate to boost your career.",
    color: "#b45309",
    bg: "#fffbeb",
  },
  {
    icon: BarChart3,
    title: "Potential for full-time",
    desc: "Top performers get a chance for pre-placement opportunities.",
    color: "#be185d",
    bg: "#fdf2f8",
  },
  {
    icon: CalendarDays,
    title: "Flexible work timings",
    desc: "Balanced schedule to help you learn and grow.",
    color: "#0369a1",
    bg: "#f0f9ff",
  },
];

const tracks = [
  {
    icon: Code2,
    title: "Frontend Development",
    duration: "3-6 months",
    requirements: "HTML, CSS, JavaScript, React basics",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    btnColor: "#2563eb",
  },
  {
    icon: Server,
    title: "Backend Development",
    duration: "3-6 months",
    requirements: "Node.js, Express, MongoDB basics",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    btnColor: "#7c3aed",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    duration: "6 months",
    requirements: "MERN Stack knowledge",
    color: "#0f766e",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    btnColor: "#0f766e",
  },
  {
    icon: Monitor,
    title: "UI/UX Design",
    duration: "3-6 months",
    requirements: "Figma, Design fundamentals",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    btnColor: "#ea580c",
  },
];

const steps = [
  {
    icon: Monitor,
    num: "01",
    title: "Visit our careers page",
    desc: "Explore and select your preferred track.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: FileText,
    num: "02",
    title: "Submit your application",
    desc: "Fill out the form and upload your resume.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: ClipboardCheck,
    num: "03",
    title: "Complete assessment",
    desc: "Take the online assessment to showcase your skills.",
    color: "#0f766e",
    bg: "#f0fdf4",
  },
  {
    icon: BriefcaseBusiness,
    num: "04",
    title: "Attend interview",
    desc: "Shortlisted candidates will be invited for an interview.",
    color: "#b45309",
    bg: "#fffbeb",
  },
  {
    icon: Rocket,
    num: "05",
    title: "Start your journey",
    desc: "Get onboarded and begin your learning journey.",
    color: "#be185d",
    bg: "#fdf2f8",
  },
];

const Careers = () => {
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  const openApplyForm = (track) => {
    if (!isLoggedIn) {
      navigate(`/login?redirectTo=/careers`);
      return;
    }
    setSelectedTrack(track);
    setFormData({ name: user?.name || "", email: user?.email || "", phone: "", portfolio: "", skills: "", track: track.title });
    setSubmitStatus({ loading: false, error: "", success: "" });
    setShowSuccessModal(false);
    setShowTermsModal(false);
    setIsApplyOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus({ ...submitStatus, error: "", success: "" });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ ...submitStatus, error: "", success: "" });
    setShowTermsModal(true);
  };

  const submitApplication = async () => {
    setSubmitStatus({ ...submitStatus, loading: true, error: "", success: "" });
    try {
      await api.applyJob({ name: formData.name, email: formData.email, phone: formData.phone, portfolio: formData.portfolio, skills: formData.skills, track: formData.track });
      setSubmitStatus({ loading: false, error: "", success: "Application submitted!" });
      setShowTermsModal(false);
      setIsApplyOpen(false);
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitStatus({ loading: false, error: err?.message || "Unable to submit application.", success: "" });
      setShowTermsModal(false);
    }
  };

  const closeApplyForm = () => {
    setIsApplyOpen(false);
    setSelectedTrack(null);
    setShowTermsModal(false);
  };

  useEffect(() => {
    const loadJobs = async () => {
      setJobsLoading(true);
      setJobsError("");
      try {
        const response = await api.getJobs();
        setJobs((response.data || []).filter((job) => job.isActive !== false));
      } catch {
        setJobsError("Unable to load open positions at the moment.");
      } finally {
        setJobsLoading(false);
      }
    };
    loadJobs();
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>

      {/* ── BREADCRUMB ── */}
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
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.22em] rounded-full px-4 py-1.5 mb-6"
            style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
          >
            Company
          </span>
          <h1 className="mb-5 text-5xl font-black md:text-6xl" style={{ color: "#0f172a" }}>
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Careers
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <a href="/" className="font-medium transition-colors" style={{ color: "#2563eb" }}>
              Home
            </a>
            <span style={{ color: "#94a3b8" }}>/</span>
            <span style={{ color: "#64748b" }}>Careers</span>
          </div>
        </div>
      </section>

      {/* ── INTERNSHIP HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafbff 50%, #eef2ff 100%)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span
              className="inline-flex rounded-full px-4 py-2 text-xs font-bold mb-6"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
            >
              Grow. Learn. Build.
            </span>
            <h1 className="mt-2 text-5xl font-black leading-[1.05] tracking-normal sm:text-6xl lg:text-[68px]" style={{ color: "#0f172a" }}>
              Internship
              <span className="block" style={{ color: "#2563eb" }}>Program</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8" style={{ color: "#64748b" }}>
              Launch your tech career with Zenvora Infotech. Gain real-world experience, mentorship,
              and the skills to build your future.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tracks"
                className="inline-flex h-12 items-center gap-3 rounded-lg px-6 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
                style={{ backgroundColor: "#2563eb", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}
              >
                Explore Tracks
                <ArrowRight size={17} />
              </a>
              <a
                href="#apply"
                className="inline-flex h-12 items-center gap-3 rounded-lg px-6 text-sm font-bold transition hover:-translate-y-0.5"
                style={{ backgroundColor: "#ffffff", color: "#334155", border: "1px solid #e2e8f0" }}
              >
                How to Apply
                <CheckCircle2 size={16} style={{ color: "#2563eb" }} />
              </a>
            </div>
          </div>

          <HeroLaptop />
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className="py-14" style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Open Roles"
            title="Current Job Openings"
            subtitle="See all live positions created by the admin dashboard and apply for the right role."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {jobsLoading ? (
              <div
                className="col-span-full rounded-2xl px-6 py-10 text-center"
                style={{ border: "1px solid #e2e8f0", color: "#64748b", backgroundColor: "#f8fafc" }}
              >
                Loading job openings...
              </div>
            ) : jobsError ? (
              <div
                className="col-span-full rounded-2xl px-6 py-10 text-center"
                style={{ border: "1px solid #fecaca", color: "#dc2626", backgroundColor: "#fff5f5" }}
              >
                {jobsError}
              </div>
            ) : jobs.length === 0 ? (
              <div
                className="col-span-full rounded-2xl px-6 py-10 text-center"
                style={{ border: "1px solid #e2e8f0", color: "#64748b", backgroundColor: "#f8fafc" }}
              >
                No open roles available right now. Please check back soon.
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-2xl p-6 shadow-sm transition"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
                  }}
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
                        {job.department || "General"}
                      </p>
                      <h3 className="mt-2 text-xl font-black" style={{ color: "#0f172a" }}>
                        {job.title}
                      </h3>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                      style={
                        job.isActive !== false
                          ? { border: "1px solid #bbf7d0", color: "#15803d", backgroundColor: "#f0fdf4" }
                          : { border: "1px solid #e2e8f0", color: "#64748b", backgroundColor: "#f8fafc" }
                      }
                    >
                      {job.isActive !== false ? "Open" : "Closed"}
                    </span>
                  </div>
                  <div className="mb-5 space-y-3 text-sm" style={{ color: "#64748b" }}>
                    <p>{job.description || "A great opportunity to grow your skills on a real product team."}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span
                        className="rounded-full px-3 py-1"
                        style={{ border: "1px solid #e2e8f0", color: "#475569", backgroundColor: "#f8fafc" }}
                      >
                        {job.location || "Remote"}
                      </span>
                      <span
                        className="rounded-full px-3 py-1"
                        style={{ border: "1px solid #e2e8f0", color: "#475569", backgroundColor: "#f8fafc" }}
                      >
                        {job.type || "Full-time"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openApplyForm({ title: job.title })}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #2563eb, #0ea5e9)" }}
                  >
                    Apply now
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-14" style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Why Join Us"
            title="Why Our Internship Program?"
            subtitle="We provide the perfect environment to learn, grow, and succeed."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section id="tracks" className="py-14" style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Choose Your Path"
            title="Internship Tracks"
            subtitle="Explore diverse tracks designed to build in-demand skills."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard key={track.title} track={track} onApply={() => openApplyForm(track)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section id="apply" className="px-6 py-14 sm:px-8" style={{ backgroundColor: "#f8fafc" }}>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Get Started"
            title="How to Apply"
            subtitle="Follow these simple steps to kickstart your internship journey."
          />
          <div
            className="mt-8 grid gap-5 rounded-2xl p-6 md:grid-cols-5"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
          >
            {steps.map((step) => (
              <StepCard key={step.num} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}
      {isApplyOpen && (
        <ApplyModal
          selectedTrack={selectedTrack}
          formData={formData}
          submitStatus={submitStatus}
          onChange={handleFormChange}
          onSubmit={handleApplySubmit}
          onClose={closeApplyForm}
        />
      )}
      {showTermsModal && (
        <TermsModal
          loading={submitStatus.loading}
          error={submitStatus.error}
          onBack={() => setShowTermsModal(false)}
          onAgree={submitApplication}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          selectedTrack={selectedTrack}
          email={formData.email}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </main>
  );
};

/* ── Section title ── */
function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-[0.18em] mb-2" style={{ color: "#2563eb" }}>
        {eyebrow}
      </p>
      <h2 className="mt-1 text-3xl font-black tracking-normal sm:text-4xl" style={{ color: "#0f172a" }}>
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: "#64748b" }}>{subtitle}</p>
    </div>
  );
}

/* ── Hero Laptop ── */
function HeroLaptop() {
  return (
    <div className="relative mx-auto hidden h-[390px] w-full max-w-[620px] items-center justify-center lg:flex">
      <div
        className="absolute rounded-[50%]"
        style={{ height: "310px", width: "520px", border: "1.5px solid rgba(37,99,235,0.2)" }}
      />
      <FloatingIcon className="left-8 top-24" icon={GraduationCap} />
      <FloatingIcon className="right-8 top-28" icon={BriefcaseBusiness} />
      <FloatingIcon className="left-1/2 top-2 -translate-x-1/2" icon={Code2} />
      <div
        className="absolute bottom-16 rounded-full"
        style={{ height: "24px", width: "82%", backgroundColor: "rgba(37,99,235,0.15)", filter: "blur(12px)" }}
      />
      <div
        className="absolute bottom-20 rounded-full"
        style={{
          height: "28px", width: "78%",
          border: "1px solid rgba(37,99,235,0.35)",
          backgroundColor: "rgba(37,99,235,0.08)",
          boxShadow: "0 0 30px rgba(37,99,235,0.2)",
        }}
      />
      <div className="relative z-10 mt-4">
        <div
          className="h-48 w-[380px] rounded-t-2xl p-4"
          style={{
            border: "1px solid #bfdbfe",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 40px rgba(37,99,235,0.12)",
          }}
        >
          <div
            className="h-full rounded-lg p-5"
            style={{ border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}
          >
            <div className="mb-4 flex justify-between">
              <div className="space-y-2">
                <div className="h-2 w-28 rounded-full" style={{ backgroundColor: "#2563eb" }} />
                <div className="h-2 w-20 rounded-full" style={{ backgroundColor: "#93c5fd" }} />
              </div>
              <div
                className="flex h-12 w-16 items-center justify-center rounded"
                style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
              >
                <Code2 size={28} />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_0.65fr] gap-5">
              <div className="space-y-2">
                {[72, 110, 94, 130, 82, 118, 66].map((width) => (
                  <div key={width} className="h-2 rounded-full" style={{ width, backgroundColor: "#bfdbfe" }} />
                ))}
              </div>
              <div
                className="rounded-lg"
                style={{ border: "1px solid #e2e8f0", backgroundColor: "#eff6ff" }}
              />
            </div>
          </div>
        </div>
        <div
          className="mx-auto h-8 w-[440px] rounded-b-[50%]"
          style={{ background: "linear-gradient(90deg, #bfdbfe, #2563eb, #bfdbfe)" }}
        />
      </div>
    </div>
  );
}

function FloatingIcon({ icon: Icon, className }) {
  return (
    <div
      className={`absolute z-20 flex h-16 w-16 items-center justify-center rounded-2xl ${className}`}
      style={{
        border: "1px solid #bfdbfe",
        backgroundColor: "#ffffff",
        color: "#2563eb",
        boxShadow: "0 4px 20px rgba(37,99,235,0.15)",
      }}
    >
      <Icon size={28} />
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc, color, bg }) {
  return (
    <article
      className="flex min-h-[110px] items-center gap-5 rounded-xl p-6 transition-all duration-200"
      style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: bg }}
      >
        <Icon size={26} style={{ color }} />
      </div>
      <div>
        <h3 className="font-bold" style={{ color: "#0f172a" }}>{title}</h3>
        <p className="mt-1.5 text-sm leading-6" style={{ color: "#64748b" }}>{desc}</p>
      </div>
    </article>
  );
}

function TrackCard({ track, onApply }) {
  const Icon = track.icon;
  return (
    <article
      className="rounded-xl p-6 transition-all duration-200"
      style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = track.color;
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,99,235,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(15,23,42,0.05)";
      }}
    >
      <div className="flex gap-5">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: track.bg, border: `1px solid ${track.border}` }}
        >
          <Icon size={28} style={{ color: track.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black" style={{ color: track.color }}>{track.title}</h3>
          <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
            <span className="font-semibold" style={{ color: "#334155" }}>Duration:</span>{" "}
            {track.duration}
          </p>
          <p className="mt-1.5 text-sm" style={{ color: "#64748b" }}>
            <span className="font-semibold" style={{ color: "#334155" }}>Skills:</span>{" "}
            {track.requirements}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onApply}
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-white transition hover:brightness-110"
        style={{ backgroundColor: track.btnColor }}
      >
        Apply Now
        <ArrowRight size={16} />
      </button>
    </article>
  );
}

function StepCard({ icon: Icon, num, title, desc, color, bg }) {
  return (
    <article className="text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: bg }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <p className="mt-3 text-sm font-black" style={{ color }}>
        {num}
      </p>
      <h3 className="mt-2 text-sm font-black" style={{ color: "#0f172a" }}>{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[150px] text-xs leading-5" style={{ color: "#64748b" }}>
        {desc}
      </p>
    </article>
  );
}

/* ── Apply Modal ── */
function ApplyModal({ selectedTrack, formData, submitStatus, onChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" style={{ backgroundColor: "rgba(15,23,42,0.6)" }}>
      <div
        className="relative w-full max-w-2xl rounded-2xl p-8 shadow-2xl"
        style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <button onClick={onClose} className="absolute right-4 top-4 transition" style={{ color: "#94a3b8" }} aria-label="Close">
          <X size={22} />
        </button>
        <p className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: "#2563eb" }}>Application Form</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: "#0f172a" }}>Apply for {selectedTrack?.title}</h2>
        <p className="mb-6 mt-3 text-sm" style={{ color: "#64748b" }}>Fill out the form below to submit your internship application.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ModalInput label="Full Name *" name="name" value={formData.name} onChange={onChange} required />
            <ModalInput label="Email *" type="email" name="email" value={formData.email} onChange={onChange} required />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ModalInput label="Phone Number *" type="tel" name="phone" value={formData.phone} onChange={onChange} placeholder="+91 98765 43210" required />
            <ModalInput label="Portfolio / LinkedIn URL" type="url" name="portfolio" value={formData.portfolio} onChange={onChange} placeholder="https://..." />
          </div>
          <label className="block">
            <span className="text-sm font-semibold" style={{ color: "#374151" }}>Your Skills *</span>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={onChange}
              placeholder="e.g., React, Node.js, MongoDB, Git..."
              rows={3}
              required
              className="mt-1.5 w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition"
              style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a" }}
            />
          </label>
          {submitStatus.error && (
            <div className="rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "#fecaca", backgroundColor: "#fff5f5", color: "#dc2626" }}>
              {submitStatus.error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitStatus.loading}
            className="w-full rounded-lg px-6 py-3 font-black text-white transition disabled:opacity-60"
            style={{ backgroundColor: "#2563eb" }}
          >
            {submitStatus.loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ModalInput({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold" style={{ color: "#374151" }}>{label}</span>
      <input
        type={type}
        className="mt-1.5 w-full rounded-lg border px-4 py-3 text-sm outline-none transition"
        style={{ borderColor: "#e2e8f0", backgroundColor: "#f8fafc", color: "#0f172a" }}
        {...props}
      />
    </label>
  );
}

/* ── Terms Modal ── */
function TermsModal({ loading, error, onBack, onAgree }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8" style={{ backgroundColor: "rgba(15,23,42,0.6)" }}>
      <div
        className="w-full max-w-xl rounded-2xl p-7 shadow-2xl"
        style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "#2563eb" }}>
          Terms & Conditions
        </p>
        <h2 className="mt-2 text-2xl font-bold" style={{ color: "#0f172a" }}>Please review before submitting</h2>
        <div
          className="mt-5 max-h-[45vh] space-y-4 overflow-y-auto rounded-xl p-5 text-sm leading-7"
          style={{ border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#475569" }}
        >
          <p>By submitting this application, you confirm that all details provided by you are accurate and complete.</p>
          <p>Zenvora Infotech may contact you by email or phone for assessment, interview, and application updates.</p>
          <p>Your application information will be used only for recruitment and internship selection purposes.</p>
          <p>Submission does not guarantee selection. Final decisions depend on eligibility, assessment performance, and available openings.</p>
        </div>
        {error && (
          <div className="mt-5 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: "#fecaca", backgroundColor: "#fff5f5", color: "#dc2626" }}>
            {error}
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 rounded-lg px-5 py-3 font-semibold transition disabled:opacity-60"
            style={{ border: "1px solid #e2e8f0", color: "#475569", backgroundColor: "#f8fafc" }}
          >
            Back
          </button>
          <button
            type="button"
            onClick={onAgree}
            disabled={loading}
            className="flex-1 rounded-lg px-5 py-3 font-semibold text-white transition disabled:opacity-60"
            style={{ backgroundColor: "#2563eb" }}
          >
            {loading ? "Submitting..." : "I Agree & Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Success Modal ── */
function SuccessModal({ selectedTrack, email, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(15,23,42,0.6)" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center shadow-2xl"
        style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "#f0fdf4", border: "2px solid #22c55e" }}
          >
            <CheckCircle2 className="h-8 w-8" style={{ color: "#16a34a" }} />
          </div>
        </div>
        <h2 className="mb-3 text-2xl font-bold" style={{ color: "#0f172a" }}>Application Submitted!</h2>
        <div
          className="mb-6 rounded-xl p-4"
          style={{ border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4" }}
        >
          <p className="mb-2 text-sm font-semibold" style={{ color: "#15803d" }}>
            Track: {selectedTrack?.title}
          </p>
          <p className="text-sm" style={{ color: "#64748b" }}>
            We've received your application. Our team will review it and get back to you soon!
          </p>
        </div>
        <p className="mb-6 text-sm" style={{ color: "#64748b" }}>
          A confirmation email has been sent to{" "}
          <span className="font-medium" style={{ color: "#2563eb" }}>{email}</span>
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-lg px-6 py-3 font-semibold text-white transition"
          style={{ backgroundColor: "#16a34a" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Careers;
