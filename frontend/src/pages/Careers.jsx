import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  const [videoScale, setVideoScale] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005;
      setVideoScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    technicalSkills: "",
    softSkills: "",
    role: "",
    resumeUrl: "",
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
    setFormData({ name: "", email: "", phone: "", portfolio: "", technicalSkills: "", softSkills: "", role: track.title, resumeFile: null });
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
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("email", formData.email);
      uploadData.append("phone", formData.phone);
      uploadData.append("portfolio", formData.portfolio);
      uploadData.append("technicalSkills", formData.technicalSkills);
      uploadData.append("softSkills", formData.softSkills);
      uploadData.append("role", formData.role);
      
      if (formData.resumeFile) {
        uploadData.append("resume", formData.resumeFile);
      }

      await api.applyJob(uploadData);
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
    <main className="home-page-container relative text-[var(--text)] overflow-hidden min-h-screen">
      {/* ── Fixed Background Video for Entire Careers Page ── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center", scale: videoScale }}
        >
          <source src="https://res.cloudinary.com/drynl8beg/video/upload/v1782717775/career_kmkhnz.mp4" type="video/mp4" />
        </motion.video>

        {/* ── Dark overlay for readability across the page ── */}
        <div
          className="absolute inset-0 bg-black/40"
          style={{ backdropFilter: "brightness(0.9)" }}
        />
      </div>

      <div className="relative z-10">
        <style>
          {`
            /* Completely transparent sections to let the video shine */
            .home-page-container,
            .home-page-container section,
            .home-page-container #experts,
            .home-page-container #services,
            .home-page-container #services > div {
               background: transparent !important;
               background-color: transparent !important;
               backdrop-filter: none !important;
               border-color: rgba(255,255,255,0.1) !important;
            }

            /* Hide the dot pattern backgrounds */
            .home-page-container [style*="radial-gradient"] {
                display: none !important;
            }

            /* Force all text to white with a soft shadow for readability */
            .home-page-container h1, 
            .home-page-container h2, 
            .home-page-container h3, 
            .home-page-container p,
            .home-page-container span {
               color: #ffffff !important;
               text-shadow: 0 1px 4px rgba(0,0,0,0.6);
               -webkit-text-fill-color: #ffffff !important;
            }

            /* Give cards a dark frosted glass look instead of solid white */
            .home-page-container article,
            .home-page-container .swiper-slide > div,
            .home-page-container [style*="background-color: rgb(255, 255, 255)"],
            .home-page-container [style*="background-color: #ffffff"],
            .home-page-container [style*="background-color: rgb(248, 250, 252)"],
            .home-page-container [style*="background-color: #f8fafc"],
            .home-page-container [style*="background-color: #eff6ff"],
            .home-page-container [style*="background-color: rgb(239, 246, 255)"],
            .home-page-container [style*="background-color: #f5f3ff"],
            .home-page-container [style*="background-color: rgb(245, 243, 255)"],
            .home-page-container [style*="background-color: #f0fdf4"],
            .home-page-container [style*="background-color: rgb(240, 253, 244)"],
            .home-page-container [style*="background-color: #fff7ed"],
            .home-page-container [style*="background-color: rgb(255, 247, 237)"] {
               background-color: rgba(0, 0, 0, 0.4) !important;
               backdrop-filter: blur(10px) !important;
               border: 1px solid rgba(255,255,255,0.1) !important;
               box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
            }

            /* Adjust icons and small badges so they don't look weird */
            .home-page-container .h-12, 
            .home-page-container .h-10, 
            .home-page-container .h-14,
            .home-page-container .rounded-lg[style*="background-color"] {
               background-color: rgba(255,255,255,0.1) !important;
            }
          `}
        </style>

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
          setFormData={setFormData}
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
      </div>
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
function ApplyModal({ selectedTrack, formData, setFormData, submitStatus, onChange, onSubmit, onClose }) {
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setParseError("Please upload a PDF file.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("resume", file);

    setParsing(true);
    setParseError("");
    setSelectedFileName(file.name);

    try {
      // 1. Store the file in formData so submitApplication can send it to backend
      setFormData(prev => ({
        ...prev,
        resumeFile: file
      }));

      // 2. Parse resume using backend
      const response = await api.parseResume(uploadData);
      if (response.success && response.data) {
        setFormData(prev => ({
          ...prev,
          name: response.data.name || prev.name,
          email: response.data.email || prev.email,
          phone: response.data.phone || prev.phone,
          technicalSkills: response.data.skills || prev.technicalSkills,
        }));
      }
    } catch (err) {
      setParseError(err.response?.data?.message || err.message || "Failed to parse resume.");
      setSelectedFileName(""); // Clear file name on error
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" style={{ backgroundColor: "rgba(15,23,42,0.6)" }}>
      <div
        className="relative w-full max-w-2xl rounded-2xl p-8 shadow-2xl"
        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
      >
        <button onClick={onClose} className="absolute right-4 top-4 transition hover:text-white" style={{ color: "#94a3b8" }} aria-label="Close">
          <X size={22} />
        </button>
        <p className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: "#60a5fa" }}>Application Form</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: "#f8fafc" }}>Apply for {selectedTrack?.title}</h2>
        <p className="mb-6 mt-3 text-sm" style={{ color: "#94a3b8" }}>Fill out the form below to submit your internship application.</p>

        <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#0f172a", border: "1px dashed #334155" }}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeUpload}
            disabled={parsing}
            className="block w-full text-sm text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-500 disabled:opacity-50"
          />
          {selectedFileName && !parsing && !parseError && (
            <p className="mt-1 text-xs" style={{ color: "#86efac" }}>✅ Uploaded: {selectedFileName}</p>
          )}
          {parsing && <p className="mt-2 text-xs" style={{ color: "#2563eb" }}>Parsing your resume... Please wait.</p>}
          {parseError && <p className="mt-2 text-xs text-red-500">{parseError}</p>}
        </div>

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
            <span className="text-sm font-semibold text-slate-200">Your Technical Skills *</span>
            <textarea
              name="technicalSkills"
              value={formData.technicalSkills}
              onChange={onChange}
              placeholder="e.g., React, Node.js, MongoDB, Git..."
              rows={2}
              required
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">Your Soft Skills *</span>
            <textarea
              name="softSkills"
              value={formData.softSkills}
              onChange={onChange}
              placeholder="e.g., Communication, Teamwork, Problem-solving..."
              rows={2}
              required
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500"
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
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <input
        type={type}
        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-blue-500"
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
        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "#60a5fa" }}>
          Terms & Conditions
        </p>
        <h2 className="mt-2 text-2xl font-bold" style={{ color: "#f8fafc" }}>Please review before submitting</h2>
        <div
          className="mt-5 max-h-[45vh] space-y-4 overflow-y-auto rounded-xl p-5 text-sm leading-7"
          style={{ border: "1px solid #334155", backgroundColor: "#0f172a", color: "#cbd5e1" }}
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
            className="flex-1 rounded-lg px-5 py-3 font-semibold transition hover:bg-[#334155] disabled:opacity-60"
            style={{ border: "1px solid #334155", color: "#cbd5e1", backgroundColor: "transparent" }}
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
        style={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
      >
        <div className="mb-6 flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "2px solid #22c55e" }}
          >
            <CheckCircle2 className="h-8 w-8" style={{ color: "#4ade80" }} />
          </div>
        </div>
        <h2 className="mb-3 text-2xl font-bold" style={{ color: "#f8fafc" }}>Application Submitted!</h2>
        <div
          className="mb-6 rounded-xl p-4"
          style={{ border: "1px solid rgba(74,222,128,0.3)", backgroundColor: "rgba(74,222,128,0.1)" }}
        >
          <p className="mb-2 text-sm font-semibold" style={{ color: "#4ade80" }}>
            Track: {selectedTrack?.title}
          </p>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
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
