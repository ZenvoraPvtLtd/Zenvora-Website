import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
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
} from "lucide-react";

const services = [
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

const process = [
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

const Services = () => {
  return (
    <main className="min-h-screen bg-[#020815] text-white">
      <section className="relative overflow-hidden border-b border-cyan-400/10 bg-[radial-gradient(circle_at_50%_115%,rgba(0,125,255,0.45),transparent_34%),linear-gradient(180deg,#020714_0%,#031327_100%)]">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_26%_44%,rgba(21,200,255,0.7)_1px,transparent_2px),radial-gradient(circle_at_70%_22%,rgba(21,200,255,0.55)_1px,transparent_2px)] bg-[length:130px_80px,170px_110px]" />
        <div className="absolute -bottom-24 left-1/2 h-52 w-[920px] -translate-x-1/2 rounded-[50%] border-t-2 border-[#168bff] shadow-[0_-20px_55px_rgba(21,130,255,0.55)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-11 text-center sm:px-8">
          <h1 className="text-4xl font-black tracking-normal sm:text-5xl lg:text-[54px]">
            Our Services
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
            End-to-end technology capabilities - from strategy to deployment and beyond.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
            {stats.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Icon size={16} className="text-[#168cff]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-400/10 bg-[radial-gradient(circle_at_center,rgba(4,37,78,0.72),transparent_62%),#020815] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="What We Do"
            title="Core Capabilities"
            subtitle="Deep expertise across every layer of the modern technology stack."
          />

          <div className="mx-auto mt-6 grid max-w-[1030px] gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-cyan-400/10 bg-[#020815] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A proven delivery framework that turns ideas into reliable, scalable products."
          />

          <div className="mx-auto mt-6 grid max-w-[1100px] gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <ProcessCard key={item.title} item={item} showArrow={index < process.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_125%,rgba(0,104,255,0.55),transparent_42%),#020815] px-6 py-9 text-center sm:px-8">
        <div className="services-grid absolute inset-x-0 bottom-0 h-40 opacity-70" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-normal sm:text-4xl">
            Ready to Build Something Remarkable?
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Talk to our team and discover how we can accelerate your digital transformation.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-5 sm:flex-row">
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
    </main>
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
      {showArrow && (
        <div className="pointer-events-none absolute right-[-34px] top-1/2 hidden -translate-y-1/2 items-center gap-1 text-[#168cff] lg:flex">
          <span className="text-2xl font-black leading-none">...</span>
          <ArrowRight size={22} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default Services;
