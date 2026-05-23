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
  BriefcaseBusiness
} from "lucide-react";

const servicesList = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description:
      "Design, migrate, and optimize cloud infrastructure on AWS, Azure, and GCP for scalable, secure, and cost-efficient systems.",
    tags: ["AWS", "Azure", "GCP", "Kubernetes"],
    color: "from-[#0a4cc4] to-[#158cff]",
  },
  {
    icon: Bot,
    title: "AI & Machine Learning",
    description:
      "Build intelligent systems with custom ML models, NLP pipelines, computer vision, and generative AI integrations.",
    tags: ["LLM", "Python", "MLOps"],
    color: "from-[#6122b9] to-[#1a89ff]",
  },
  {
    icon: Monitor,
    title: "Product Engineering",
    description:
      "Full-cycle web and mobile application development using React, Node.js, Python, and modern framework best practices.",
    tags: ["React", "Node.js", "Python"],
    color: "from-[#213a74] to-[#208eff]",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security assessments, penetration testing, compliance auditing, and 24/7 threat monitoring solutions.",
    tags: ["Pen Testing", "SOC", "SIEM"],
    color: "from-[#0a4cc4] to-[#18b5ff]",
  },
  {
    icon: BarChart3,
    title: "Data Engineering",
    description:
      "Build and scale data pipelines, warehouses, and analytics platforms to turn raw data into strategic insights.",
    tags: ["Spark", "Kafka", "Snowflake"],
    color: "from-[#22306e] to-[#18d4ff]",
  },
  {
    icon: Settings,
    title: "DevOps & Platform",
    description:
      "Automate delivery with CI/CD pipelines, container orchestration, and scalable infrastructure platforms.",
    tags: ["Kubernetes", "Docker", "Helm"],
    color: "from-[#273c91] to-[#6da1ff]",
  },
];

const stats = [
  { icon: BriefcaseBusiness, text: "50+ Projects" },
  { icon: CheckCircle2, text: "98% Satisfaction" },
  { icon: UsersRound, text: "Expert Team" },
  { icon: Headphones, text: "24/7 Support" },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    desc: "We understand your goals, users, market, and technical landscape.",
    color: "text-[#1bbcff]",
  },
  {
    icon: Target,
    step: "02",
    title: "Strategy",
    desc: "We design a tailored roadmap aligned to your business outcomes.",
    color: "text-[#9b59ff]",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build",
    desc: "Our engineers execute with speed, precision, and quality.",
    color: "text-[#19e0a2]",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    desc: "We deploy, monitor, and iterate to ensure long-term success.",
    color: "text-[#ff921c]",
  },
];

const ServicesSection = ({ isPage = false }) => {
  return (
    <div id="services" className="bg-[#020815] text-white w-full">
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
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-sm md:text-base">
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition font-medium">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400">Services</span>
            </div>
          </div>
        </section>
      )}

      {/* ================= SERVICES LIST ================= */}
      <section className="border-b border-cyan-400/10 bg-[radial-gradient(circle_at_center,rgba(4,37,78,0.72),transparent_62%),#020815] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="What We Do"
            title="Core Capabilities"
            subtitle="Deep expertise across every layer of the modern technology stack."
          />

          <div className="mx-auto mt-12 grid max-w-[1030px] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="border-b border-cyan-400/10 bg-[#020815] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A proven delivery framework that turns ideas into reliable, scalable products."
          />

          <div className="mx-auto mt-12 grid max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <ProcessCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isPage && (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_125%,rgba(0,104,255,0.55),transparent_42%),#020815] px-6 py-20 text-center sm:px-8">
          <div className="services-grid absolute inset-x-0 bottom-0 h-40 opacity-70" />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="text-3xl font-black tracking-normal sm:text-4xl">
              Ready to Build Something Remarkable?
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Talk to our team and discover how we can accelerate your digital transformation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-5 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[#168cff] px-8 text-sm font-black text-white shadow-[0_0_24px_rgba(22,140,255,0.35)] transition hover:bg-[#39bfff]"
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/about"
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#15c8ff] px-8 text-sm font-black text-white transition hover:bg-[#15c8ff]/10 hover:text-[#15c8ff]"
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

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#15c8ff]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300">
        {subtitle}
      </p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, tags, color }) {
  return (
    <article className="group relative min-h-[170px] overflow-hidden rounded-lg border border-[#1161a8]/70 bg-[linear-gradient(145deg,rgba(7,23,45,0.94),rgba(2,11,25,0.96))] p-7 shadow-[0_0_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:border-[#15c8ff]">
      <div className="absolute left-0 top-0 h-px w-20 bg-[#15c8ff]" />
      <div className="flex gap-6">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} shadow-[0_0_0_8px_rgba(21,140,255,0.12)]`}>
          <Icon size={29} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#159bff]">{title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[#245287] bg-[#0d203c] px-3 py-1.5 text-xs font-bold text-slate-200"
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
      <article className="min-h-[96px] rounded-lg border border-[#16345b] bg-[linear-gradient(145deg,rgba(8,24,48,0.95),rgba(3,12,27,0.95))] px-5 py-4">
        <span className="absolute left-4 top-3 text-lg font-black text-slate-600">
          {item.step}
        </span>
        <div className="flex items-center gap-5 pl-2">
          <div className={`mt-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#10274d] ${item.color}`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-base font-black text-white">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">{item.desc}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ServicesSection;
