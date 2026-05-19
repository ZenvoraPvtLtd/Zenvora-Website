import { useState } from "react";
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
    color: "from-[#0a7cff] to-[#19c6ff]",
  },
  {
    icon: UsersRound,
    title: "Mentorship",
    desc: "Learn and grow under the guidance of experienced professionals.",
    color: "from-[#5b35d5] to-[#a05bff]",
  },
  {
    icon: Trophy,
    title: "Competitive stipend",
    desc: "Our internships come with a competitive stipend.",
    color: "from-[#03a988] to-[#43e7ca]",
  },
  {
    icon: Award,
    title: "Certificate of completion",
    desc: "Earn a recognized certificate to boost your career.",
    color: "from-[#c88900] to-[#ffb72d]",
  },
  {
    icon: BarChart3,
    title: "Potential for full-time",
    desc: "Top performers get a chance for pre-placement opportunities.",
    color: "from-[#c02d8b] to-[#ff5ab8]",
  },
  {
    icon: CalendarDays,
    title: "Flexible work timings",
    desc: "Balanced schedule to help you learn and grow.",
    color: "from-[#195bea] to-[#577dff]",
  },
];

const tracks = [
  {
    icon: Code2,
    title: "Frontend Development",
    duration: "3-6 months",
    requirements: "HTML, CSS, JavaScript, React basics",
    accent: "cyan",
    button: "from-[#17c6ee] to-[#136fff]",
  },
  {
    icon: Server,
    title: "Backend Development",
    duration: "3-6 months",
    requirements: "Node.js, Express, MongoDB basics",
    accent: "purple",
    button: "from-[#6a46db] to-[#4c2cc0]",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    duration: "6 months",
    requirements: "MERN Stack knowledge",
    accent: "teal",
    button: "from-[#09c5be] to-[#126dff]",
  },
  {
    icon: Monitor,
    title: "UI/UX Design",
    duration: "3-6 months",
    requirements: "Figma, Design fundamentals",
    accent: "orange",
    button: "from-[#ff9100] to-[#ff4b18]",
  },
];

const steps = [
  {
    icon: Monitor,
    num: "01",
    title: "Visit our careers page",
    desc: "Explore and select your preferred track.",
    color: "text-[#188dff]",
  },
  {
    icon: FileText,
    num: "02",
    title: "Submit your application",
    desc: "Fill out the form and upload your resume.",
    color: "text-[#9b59ff]",
  },
  {
    icon: ClipboardCheck,
    num: "03",
    title: "Complete assessment",
    desc: "Take the online assessment to showcase your skills.",
    color: "text-[#16d0c8]",
  },
  {
    icon: BriefcaseBusiness,
    num: "04",
    title: "Attend interview",
    desc: "Shortlisted candidates will be invited for an interview.",
    color: "text-[#f39b22]",
  },
  {
    icon: Rocket,
    num: "05",
    title: "Start your journey",
    desc: "Get onboarded and begin your learning journey.",
    color: "text-[#ff5ab8]",
  },
];

const accentClasses = {
  cyan: "border-[#15c8ff]/70 text-[#15c8ff] bg-[#05213e]",
  purple: "border-[#7448ff]/70 text-[#9b6cff] bg-[#17113c]",
  teal: "border-[#13d6c8]/70 text-[#13d6c8] bg-[#062d34]",
  orange: "border-[#ff941f]/70 text-[#ff941f] bg-[#351f08]",
};

const Careers = () => {
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
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const openApplyForm = (track) => {
    if (!isLoggedIn) {
      navigate("/login?redirectTo=/careers");
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
      await api.applyJob({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio,
        skills: formData.skills,
        track: formData.track,
      });
      setSubmitStatus({
        loading: false,
        error: "",
        success: "Application submitted!",
      });
      setShowTermsModal(false);
      setIsApplyOpen(false);
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitStatus({
        loading: false,
        error: err?.message || "Unable to submit application.",
        success: "",
      });
      setShowTermsModal(false);
    }
  };

  const closeApplyForm = () => {
    setIsApplyOpen(false);
    setSelectedTrack(null);
    setShowTermsModal(false);
  };

  return (
    <main className="min-h-screen bg-[#020815] text-white">

      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[#020815] py-24">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
            Company
          </span>

          <h1 className="mb-5 text-5xl font-black md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Careers
            </span>
          </h1>
          {/* 
    <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-gray-400">
      Kickstart your career with real-world projects, mentorship,
      and hands-on internship opportunities at Zenvora Infotech.
    </p> */}

          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <a
              href="/"
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Home
            </a>

            <span className="text-gray-600">/</span>

            <span className="text-gray-400">Careers</span>
          </div>
        </div>
      </section>


      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[radial-gradient(circle_at_70%_45%,rgba(0,101,255,0.35),transparent_34%),linear-gradient(120deg,#020714_0%,#061225_62%,#020815_100%)]">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_16%_18%,rgba(21,200,255,0.55)_1px,transparent_2px),radial-gradient(circle_at_72%_12%,rgba(21,200,255,0.5)_1px,transparent_2px)] bg-[length:120px_90px,180px_120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#1766b4] bg-[#082342] px-4 py-2 text-xs font-bold text-[#15c8ff]">
              Grow. Learn. Build.
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-normal sm:text-6xl lg:text-[72px]">
              Internship
              <span className="block text-[#147cff]">Program</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">
              Launch your tech career with Zenvora Infotech. Gain real-world
              experience, mentorship, and the skills to build your future.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tracks"
                className="inline-flex h-12 items-center gap-3 rounded-md bg-[#147cff] px-6 text-sm font-black text-white shadow-[0_0_24px_rgba(20,124,255,0.32)] transition hover:bg-[#35bfff]"
              >
                Explore Tracks
                <ArrowRight size={17} />
              </a>
              <a
                href="#apply"
                className="inline-flex h-12 items-center gap-3 rounded-md border border-[#1b5a99] px-6 text-sm font-black text-white transition hover:border-[#15c8ff] hover:text-[#15c8ff]"
              >
                How to Apply
                <CheckCircle2 size={16} />
              </a>
            </div>
          </div>

          <HeroLaptop />
        </div>
      </section>

      <section className="border-b border-cyan-400/10 bg-[#020815] py-11">
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

      <section
        id="tracks"
        className="border-b border-cyan-400/10 bg-[radial-gradient(circle_at_center,rgba(7,34,72,0.76),transparent_62%),#020815] py-11"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Choose Your Path"
            title="Internship Tracks"
            subtitle="Explore diverse tracks designed to build in-demand skills."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard
                key={track.title}
                track={track}
                onApply={() => openApplyForm(track)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="bg-[#020815] px-6 py-11 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Get Started"
            title="How to Apply"
            subtitle="Follow these simple steps to kickstart your internship journey."
          />

          <div className="mt-8 grid gap-5 rounded-lg border border-[#153c68] bg-[linear-gradient(145deg,rgba(8,24,48,0.94),rgba(3,12,27,0.98))] p-6 md:grid-cols-5">
            {steps.map((step) => (
              <StepCard key={step.num} {...step} />
            ))}
          </div>
        </div>
      </section>

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

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#15c8ff]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">{subtitle}</p>
    </div>
  );
}

function HeroLaptop() {
  return (
    <div className="relative mx-auto hidden h-[390px] w-full max-w-[620px] items-center justify-center lg:flex">
      <div className="absolute h-[310px] w-[520px] rounded-[50%] border border-[#126dff]/45" />
      <FloatingIcon className="left-8 top-24" icon={GraduationCap} />
      <FloatingIcon className="right-8 top-28" icon={BriefcaseBusiness} />
      <FloatingIcon className="left-1/2 top-2 -translate-x-1/2" icon={Code2} />

      <div className="absolute bottom-16 h-24 w-[82%] rounded-full bg-[#147cff]/25 blur-xl" />
      <div className="absolute bottom-20 h-28 w-[78%] rounded-full border border-[#147cff]/55 bg-[#083b89]/25 shadow-[0_0_45px_rgba(20,124,255,0.55)]" />
      <div className="relative z-10 mt-4">
        <div className="h-48 w-[380px] rounded-t-2xl border border-[#2c6dd6] bg-[#07172b] p-4 shadow-[0_0_40px_rgba(20,124,255,0.55)]">
          <div className="h-full rounded-lg border border-[#1d4f9b] bg-[#051021] p-5">
            <div className="mb-4 flex justify-between">
              <div className="space-y-2">
                <div className="h-2 w-28 rounded-full bg-[#147cff]" />
                <div className="h-2 w-20 rounded-full bg-[#1bbcff]/70" />
              </div>
              <div className="flex h-12 w-16 items-center justify-center rounded bg-[#0c2a58] text-[#15c8ff]">
                <Code2 size={28} />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_0.65fr] gap-5">
              <div className="space-y-2">
                {[72, 110, 94, 130, 82, 118, 66].map((width) => (
                  <div
                    key={width}
                    className="h-2 rounded-full bg-[#168cff]/70"
                    style={{ width }}
                  />
                ))}
              </div>
              <div className="rounded-lg border border-[#164b90] bg-[#081a35]" />
            </div>
          </div>
        </div>
        <div className="mx-auto h-8 w-[440px] rounded-b-[50%] bg-[linear-gradient(90deg,#05225a,#178dff,#05225a)]" />
      </div>
    </div>
  );
}

function FloatingIcon({ icon: Icon, className }) {
  return (
    <div
      className={`absolute z-20 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#126dff]/70 bg-[#071b3e]/85 text-[#15c8ff] shadow-[0_0_28px_rgba(20,124,255,0.35)] ${className}`}
    >
      <Icon size={34} />
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc, color }) {
  return (
    <article className="flex min-h-[118px] items-center gap-6 rounded-lg border border-[#17406f] bg-[linear-gradient(145deg,rgba(8,24,48,0.94),rgba(3,12,27,0.96))] p-6">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white shadow-[0_0_0_8px_rgba(21,140,255,0.08)]`}
      >
        <Icon size={28} />
      </div>
      <div>
        <h3 className="font-black text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
      </div>
    </article>
  );
}

function TrackCard({ track, onApply }) {
  const Icon = track.icon;

  return (
    <article className="rounded-lg border border-[#1761a4] bg-[linear-gradient(145deg,rgba(8,24,48,0.95),rgba(3,12,27,0.98))] p-6">
      <div className="flex gap-5">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border ${accentClasses[track.accent]}`}
        >
          <Icon size={30} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-xl font-black ${accentClasses[track.accent].split(" ")[1]}`}>
            {track.title}
          </h3>
          <p className="mt-3 text-sm text-slate-300">
            <span className="text-[#15c8ff]">Duration:</span> {track.duration}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            <span className="text-[#15c8ff]">Skills:</span> {track.requirements}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onApply}
        className={`mt-6 flex h-11 w-full items-center justify-center gap-2 rounded bg-gradient-to-r ${track.button} text-sm font-black text-white transition hover:brightness-110`}
      >
        Apply Now
        <ArrowRight size={16} />
      </button>
    </article>
  );
}

function StepCard({ icon: Icon, num, title, desc, color }) {
  return (
    <article className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10234a]">
        <Icon size={28} className={color} />
      </div>
      <p className="mt-3 text-sm font-black text-[#15c8ff]">{num}</p>
      <h3 className="mt-3 text-sm font-black text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-[150px] text-xs leading-5 text-slate-300">
        {desc}
      </p>
    </article>
  );
}

function ApplyModal({
  selectedTrack,
  formData,
  submitStatus,
  onChange,
  onSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8">
      <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/25 bg-[#061120] p-8 shadow-2xl shadow-cyan-500/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 transition hover:text-white"
          aria-label="Close apply form"
        >
          <X size={22} />
        </button>

        <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">
          Application Form
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">
          Apply for {selectedTrack?.title}
        </h2>
        <p className="mb-6 mt-3 text-sm text-gray-400">
          Fill out the form below to submit your internship application.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Full Name *" name="name" value={formData.name} onChange={onChange} required />
            <Input label="Email *" type="email" name="email" value={formData.email} onChange={onChange} required />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Phone Number *"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+91 98765 43210"
              required
            />
            <Input
              label="Portfolio / LinkedIn URL"
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={onChange}
              placeholder="https://..."
            />
          </div>

          <label className="block">
            <span className="text-sm text-gray-300">Your Skills *</span>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={onChange}
              placeholder="e.g., React, Node.js, MongoDB, Git..."
              rows={3}
              required
              className="mt-1 w-full resize-none rounded-lg border border-[#1b365e] bg-[#08172b] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </label>

          {submitStatus.error && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {submitStatus.error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitStatus.loading}
            className="w-full rounded-lg bg-cyan-500 px-6 py-3 font-black text-black transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {submitStatus.loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <input
        type={type}
        className="mt-1 w-full rounded-lg border border-[#1b365e] bg-[#08172b] px-4 py-3 text-white outline-none transition focus:border-cyan-500"
        {...props}
      />
    </label>
  );
}

function TermsModal({ loading, error, onBack, onAgree }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-gray-950 p-7 shadow-2xl shadow-cyan-500/10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Terms & Conditions
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Please review before submitting
        </h2>

        <div className="mt-5 max-h-[45vh] space-y-4 overflow-y-auto rounded-xl border border-gray-800 bg-gray-900/70 p-5 text-sm leading-7 text-gray-300">
          <p>
            By submitting this application, you confirm that all details
            provided by you are accurate and complete.
          </p>
          <p>
            Zenvora Infotech may contact you by email or phone for assessment,
            interview, and application updates.
          </p>
          <p>
            Your application information will be used only for recruitment and
            internship selection purposes.
          </p>
          <p>
            Submission does not guarantee selection. Final decisions depend on
            eligibility, assessment performance, and available openings.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-700 px-5 py-3 font-semibold text-gray-200 transition hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-60"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onAgree}
            disabled={loading}
            className="flex-1 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "I Agree & Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ selectedTrack, email, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-gray-900 p-8 text-center shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          Application Submitted!
        </h2>

        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="mb-2 text-sm text-emerald-300">
            <span className="font-semibold">Track:</span> {selectedTrack?.title}
          </p>
          <p className="text-sm text-gray-400">
            We've received your application. Our team will review it and get
            back to you soon!
          </p>
        </div>

        <p className="mb-6 text-sm text-gray-400">
          A confirmation email has been sent to{" "}
          <span className="font-medium text-cyan-400">{email}</span>
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Careers;

