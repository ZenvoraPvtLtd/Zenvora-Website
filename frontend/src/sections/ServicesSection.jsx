import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Headphones,
  Monitor,
  Rocket,
  Search,
  Settings,
  Shield,
  Target,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";

const servicesList = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Design, migrate, and optimize cloud infrastructure on AWS, Azure, and GCP for scalable, secure, and cost-efficient systems.",
    tags: ["AWS", "Azure", "GCP", "Kubernetes"],
    iconBg: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    accentColor: "#2563eb",
  },
  {
    icon: Bot,
    title: "AI & Machine Learning",
    description:
      "Build intelligent systems with custom ML models, NLP pipelines, computer vision, and generative AI integrations.",
    tags: ["LLM", "Python", "MLOps"],
    iconBg: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    accentColor: "#7c3aed",
  },
  {
    icon: Monitor,
    title: "Product Engineering",
    description:
      "Full-cycle web and mobile application development using React, Node.js, Python, and modern framework best practices.",
    tags: ["React", "Node.js", "Python"],
    iconBg: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    accentColor: "#0ea5e9",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security assessments, penetration testing, compliance auditing, and 24/7 threat monitoring solutions.",
    tags: ["Pen Testing", "SOC", "SIEM"],
    iconBg: "linear-gradient(135deg, #0f766e 0%, #10b981 100%)",
    accentColor: "#0f766e",
  },
  {
    icon: BarChart3,
    title: "Data Engineering",
    description:
      "Build and scale data pipelines, warehouses, and analytics platforms to turn raw data into strategic insights.",
    tags: ["Spark", "Kafka", "Snowflake"],
    iconBg: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
    accentColor: "#0ea5e9",
  },
  {
    icon: Settings,
    title: "DevOps & Platform",
    description:
      "Automate delivery with CI/CD pipelines, container orchestration, and scalable infrastructure platforms.",
    tags: ["Kubernetes", "Docker", "Helm"],
    iconBg: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
    accentColor: "#4f46e5",
  },
];

const stats = [
  { icon: BriefcaseBusiness, text: "50+ Projects", color: "#2563eb" },
  { icon: CheckCircle2, text: "98% Satisfaction", color: "#10b981" },
  { icon: UsersRound, text: "Expert Team", color: "#7c3aed" },
  { icon: Headphones, text: "24/7 Support", color: "#0ea5e9" },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    desc: "We understand your goals, users, market, and technical landscape.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: Target,
    step: "02",
    title: "Strategy",
    desc: "We design a tailored roadmap aligned to your business outcomes.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build",
    desc: "Our engineers execute with speed, precision, and quality.",
    color: "#0f766e",
    bg: "#f0fdf4",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    desc: "We deploy, monitor, and iterate to ensure long-term success.",
    color: "#ea580c",
    bg: "#fff7ed",
  },
];

/* ΓöÇΓöÇ Badge ΓöÇΓöÇ */
const Badge = ({ children }) => (
  <p
    className="text-xs font-black uppercase tracking-[0.18em] mb-2"
    style={{ color: "#2563eb" }}
  >
    {children}
  </p>
);

const ServicesSection = ({ isPage = false }) => {
  return (
    <div id="services" className="w-full" style={{ backgroundColor: "var(--bg)" }}>

      {/* ΓöÇΓöÇ BREADCRUMB ΓöÇΓöÇ */}
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
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.22em] rounded-full px-4 py-1.5 mb-6"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
            >
              What We Offer
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-5" style={{ color: "#0f172a" }}>
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Services
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base">
              <Link to="/" className="font-medium transition-colors" style={{ color: "#2563eb" }}>
                Home
              </Link>
              <span style={{ color: "#94a3b8" }}>/</span>
              <span style={{ color: "#64748b" }}>Services</span>
            </div>
          </div>
        </section>
      )}

      {/* ΓöÇΓöÇ STATS BAR ΓöÇΓöÇ */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon size={18} style={{ color }} />
                <span className="text-sm font-semibold" style={{ color: "#334155" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ΓöÇΓöÇ SERVICES GRID ΓöÇΓöÇ */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-14">
            <Badge>What We Do</Badge>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f172a" }}>
              Core Capabilities
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "#64748b" }}>
              Deep expertise across every layer of the modern technology stack.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1060px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ΓöÇΓöÇ PROCESS ΓöÇΓöÇ */}
      <section className="py-20" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-14">
            <Badge>Our Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#0f172a" }}>
              How We Work
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-base" style={{ color: "#64748b" }}>
              A proven delivery framework that turns ideas into reliable, scalable products.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <ProcessCard
                key={item.title}
                item={item}
                showArrow={index < processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ΓöÇΓöÇ CTA (home preview only) ΓöÇΓöÇ */}
      {!isPage && (
        <section
          className="relative overflow-hidden px-6 py-20 text-center sm:px-8"
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #0ea5e9 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Ready to Build Something Remarkable?
            </h2>
            <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.85)" }}>
              Talk to our team and discover how we can accelerate your digital transformation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-lg px-8 text-sm font-bold transition-all"
                style={{ backgroundColor: "#ffffff", color: "#1d4ed8" }}
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/about"
                className="inline-flex h-12 items-center justify-center rounded-lg border px-8 text-sm font-bold text-white transition-all"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

function ServiceCard({ icon: Icon, title, description, tags, iconBg, accentColor }) {
  return (
    <article
      className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(37,99,235,0.12)`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(15,23,42,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-0.5 w-16 rounded-full"
        style={{ background: iconBg }}
      />

      <div className="flex gap-5">
        <div
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: iconBg,
            width: "52px",
            height: "52px",
            boxShadow: `0 4px 16px ${accentColor}33`,
          }}
        >
          <Icon size={24} style={{ color: "#ffffff" }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: "#0f172a" }}>{title}</h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#64748b" }}>{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md px-2.5 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #e2e8f0",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProcessCard({ item, showArrow }) {
  const Icon = item.icon;

  return (
    <div className="relative">
      <article
        className="rounded-xl p-5 transition-all duration-300"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 10px rgba(15,23,42,0.05)",
        }}
      >
        <span
          className="absolute left-5 top-4 text-2xl font-black"
          style={{ color: "#e2e8f0" }}
        >
          {item.step}
        </span>
        <div className="flex items-center gap-4 pt-2">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: item.bg }}
          >
            <Icon size={22} style={{ color: item.color }} />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: "#0f172a" }}>{item.title}</h3>
            <p className="mt-1.5 text-xs leading-5" style={{ color: "#64748b" }}>{item.desc}</p>
          </div>
        </div>
      </article>

      {showArrow && (
        <div
          className="pointer-events-none absolute right-[-28px] top-1/2 hidden -translate-y-1/2 items-center gap-0.5 lg:flex"
          style={{ color: "#2563eb" }}
        >
          <span className="text-xl font-black leading-none" style={{ color: "#cbd5e1" }}>···</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}

export default ServicesSection;
