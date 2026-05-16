import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Cpu,
  Headphones,
  SmilePlus,
  UsersRound,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Bespoke solutions tailored to your business needs with cutting-edge technology.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Scalable and secure cloud infrastructure for optimal performance.",
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    desc: "AI-powered applications to automate and optimize your processes.",
  },
];

const stats = [
  { icon: SmilePlus, num: "50+", title: "Happy Clients" },
  { icon: BriefcaseBusiness, num: "100+", title: "Projects Delivered" },
  { icon: UsersRound, num: "150+", title: "Team Members" },
  { icon: BadgeCheck, num: "10+", title: "Years Experience" },
];

const Home = () => {
  return (
    <main className="bg-[#020815] text-white overflow-hidden">
      <section className="relative border-b border-cyan-400/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,172,255,0.18),transparent_34%),linear-gradient(115deg,#020714_0%,#031328_54%,#020815_100%)]" />
        <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(0,205,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,205,255,0.04)_1px,transparent_1px)] bg-[length:44px_44px]" />

        <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-[44px] font-black leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-[64px]">
              Welcome to
              <span className="block">
                <span className="text-[#15c8ff]">Zenvora</span> Infotech
              </span>
            </h1>

            <p className="mt-7 text-xl font-semibold text-white sm:text-2xl">
              Transforming Ideas into Innovative IT Solutions
            </p>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">
              We empower businesses with cutting-edge technology, scalable
              solutions, and a passion for excellence.
            </p>

            <div className="mt-9 flex flex-wrap gap-5">
              <Link
                to="/services"
                className="inline-flex h-14 items-center gap-3 rounded-md bg-[#15c8ff] px-7 text-sm font-black text-[#02101c] shadow-[0_0_24px_rgba(21,200,255,0.24)] transition hover:bg-[#4ed8ff]"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-14 items-center gap-3 rounded-md border border-[#1587da] px-7 text-sm font-bold text-white transition hover:border-[#15c8ff] hover:bg-[#15c8ff]/10 hover:text-[#15c8ff]"
              >
                Contact Us
                <Headphones size={18} className="text-[#15c8ff]" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-[420px] w-full max-w-[590px] items-center justify-center lg:h-[460px]">
            <div className="absolute bottom-6 h-20 w-[82%] rounded-full border border-[#15c8ff]/30 bg-[#15c8ff]/10 blur-sm shadow-[0_0_70px_rgba(21,200,255,0.45)]" />
            <div className="absolute bottom-9 h-28 w-[88%] rounded-full border border-[#15c8ff]/35" />
            <div className="absolute bottom-14 h-20 w-[70%] rounded-full border border-[#0f76ff]/60" />
            <div className="absolute bottom-20 h-10 w-[36%] rounded-full bg-[#15c8ff] blur-md" />

            <div className="planet relative h-72 w-72 rounded-full border border-[#69e3ff]/60 bg-[radial-gradient(circle_at_32%_25%,#79f0ff_0%,#127dff_22%,#052969_48%,#020b24_76%)] shadow-[0_0_58px_rgba(21,200,255,0.72)] sm:h-80 sm:w-80">
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_26%_28%,rgba(255,255,255,0.65),transparent_9%),radial-gradient(circle_at_66%_58%,rgba(21,200,255,0.42),transparent_12%),linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.09)_19%,transparent_21%,transparent_52%,rgba(255,255,255,0.08)_53%,transparent_56%)] opacity-80" />
              <div className="absolute left-1/2 top-1/2 h-[118%] w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-full border-2 border-[#15c8ff]/70" />
              <div className="absolute left-1/2 top-1/2 h-[96%] w-[168%] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] rounded-full border border-[#278dff]/70" />
              <div className="absolute -right-2 top-14 h-5 w-5 rounded-full bg-white shadow-[0_0_30px_12px_rgba(21,200,255,0.8)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#03101d] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionTitle eyebrow="What We Do" title="Our Services" />

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#03101d] pb-9">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="rounded-lg border border-cyan-400/20 bg-[radial-gradient(circle_at_center,rgba(20,141,255,0.13),transparent_58%),#06101e] px-7 py-9 shadow-[0_0_60px_rgba(0,0,0,0.2)]">
            <SectionTitle title="Why Choose Zenvora?" compact />

            <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-cyan-400/15">
              {stats.map((stat) => (
                <StatItem key={stat.title} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#03101d] px-6 pb-16 sm:px-8">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-[#15c8ff]/70 bg-[radial-gradient(circle_at_76%_58%,rgba(14,125,255,0.44),transparent_30%),linear-gradient(112deg,#06101e_0%,#081b35_100%)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 px-8 py-12 sm:px-16 sm:py-14">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#15c8ff]">
              Let's Grow Together
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-black leading-tight sm:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
              Let's work together to bring your ideas to life with innovative
              technology solutions.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-md bg-[#15c8ff] px-7 text-sm font-black text-[#02101c] transition hover:bg-[#4ed8ff]"
            >
              Get Started Today
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative hidden min-h-[345px] items-end justify-center lg:flex">
            <div className="absolute bottom-0 h-56 w-[62%] rounded-t-full bg-[#15c8ff]/40 blur-2xl" />
            <div className="absolute bottom-0 h-32 w-full bg-[radial-gradient(ellipse_at_center,#15c8ff_0%,rgba(21,200,255,0.22)_28%,transparent_62%)]" />
            <div className="rocket relative mb-12 h-56 w-24">
              <div className="absolute left-1/2 top-0 h-44 w-20 -translate-x-1/2 rounded-t-full rounded-b-[36px] border border-white/50 bg-[linear-gradient(90deg,#08234f,#9edfff_48%,#0a3474)] shadow-[0_0_40px_rgba(21,200,255,0.7)]" />
              <div className="absolute left-1/2 top-14 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-[#092e68] bg-[#15c8ff]/50" />
              <div className="absolute bottom-6 left-0 h-20 w-9 skew-y-[-26deg] rounded-tl-[28px] bg-[#0b59b8]" />
              <div className="absolute bottom-6 right-0 h-20 w-9 skew-y-[26deg] rounded-tr-[28px] bg-[#083f91]" />
              <div className="absolute bottom-[-52px] left-1/2 h-28 w-10 -translate-x-1/2 rounded-full bg-[#2fe6ff] blur-md" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

function SectionTitle({ eyebrow, title, compact = false }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.12em] text-[#15c8ff]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-black tracking-normal text-white ${
          compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-11 rounded-full bg-[#15c8ff]" />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <article className="min-h-[286px] rounded-lg border border-cyan-400/20 bg-[linear-gradient(145deg,rgba(8,24,48,0.95),rgba(4,13,28,0.95))] p-8 shadow-[0_0_45px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-[#15c8ff]/70">
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#126fce] text-white shadow-[0_0_0_8px_rgba(21,200,255,0.12),0_0_24px_rgba(21,200,255,0.35)]">
        <Icon size={30} />
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{desc}</p>
      <Link
        to="/services"
        className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#15c8ff] transition hover:gap-3"
      >
        Learn More
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function StatItem({ icon: Icon, num, title }) {
  return (
    <div className="flex items-center justify-center gap-5 lg:px-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#15c8ff] text-[#15c8ff] shadow-[0_0_22px_rgba(21,200,255,0.18)]">
        <Icon size={27} />
      </div>
      <div className="text-left">
        <div className="text-3xl font-black leading-none text-[#15c8ff]">
          {num}
        </div>
        <div className="mt-2 text-sm text-slate-300">{title}</div>
      </div>
    </div>
  );
}

export default Home;
