import { ArrowRight, Headphones, CheckCircle2, Cloud, Bot, Shield } from "lucide-react";

const highlights = [
  "Cloud & AI Solutions",
  "Agile Delivery",
  "Enterprise Security",
];

const HeroSection = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* ── Background Video ── */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center" }}
      >
        <source src="/vv.mp4" type="video/mp4" />
      </video> */}

      <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="absolute inset-0 w-full h-full"
  style={{ objectFit: "cover", objectPosition: "center" }}
>
  <source src="/vv_compressed.mp4" type="video/mp4" />
</video>

      {/* ── Dark blue overlay for readability ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,26,60,0.88) 0%, rgba(15,35,80,0.80) 45%, rgba(10,20,50,0.65) 100%)",
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">

          {/* Eyebrow badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(37,99,235,0.35)",
              color: "#93c5fd",
              border: "1px solid rgba(147,197,253,0.35)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#60a5fa" }}
            />
            Trusted by 50+ Businesses
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.07] tracking-tight text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            <span className="block">Software Development</span>
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 60%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Company &amp; IT Solutions
            </span>
          </h1>

          <p
            className="mt-6 text-lg font-semibold sm:text-xl"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            Transforming Ideas into Innovative IT Solutions
          </p>

          <p
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            We empower businesses with cutting-edge technology, scalable
            solutions, and a passion for excellence — from Indore to the world.
          </p>

          {/* Highlights */}
          <ul className="mt-6 flex flex-wrap gap-5">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-medium" style={{ color: "rgba(255,255,255,0.88)" }}>
                <CheckCircle2 size={16} style={{ color: "#60a5fa" }} />
                {h}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => handleScroll("services")}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.50)",
              }}
            >
              Explore Services
              <ArrowRight size={17} />
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Headphones size={17} style={{ color: "#93c5fd" }} />
              Contact Us
            </button>
          </div>
        </div>

        {/* ── Bottom 3 frosted cards (design from reference) ── */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              Icon: Cloud,
              title: "Cloud Architecture & Infrastructure",
              desc: "Scalable AWS, Azure and GCP solutions engineered for reliability and performance.",
              iconColor: "#60a5fa",
            },
            {
              Icon: Bot,
              title: "AI & Machine Learning",
              desc: "Custom ML models, LLM integrations, and intelligent automation for modern businesses.",
              iconColor: "#34d399",
            },
            {
              Icon: Shield,
              title: "Cybersecurity & Compliance",
              desc: "Enterprise-grade security, penetration testing, and 24/7 threat monitoring.",
              iconColor: "#f59e0b",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                <card.Icon size={20} style={{ color: card.iconColor }} />
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{card.title}</h3>
              <p className="mt-2 text-xs leading-5" style={{ color: "rgba(255,255,255,0.62)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
