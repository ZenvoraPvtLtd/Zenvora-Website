import { Link } from "react-router-dom";

const HeroSection = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background Video is now handled by Home.jsx ── */}

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8 mt-16">
        {/* Tracking Subhead */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 sm:text-sm">
          Zenvora Infotech Pvt. Ltd.
        </p>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          AI-Powered Software Solutions for Modern Businesses
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-3xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
          Enterprise-grade technology experiences for teams managing uptime,
          security, compliance, and scalable digital assets.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="flex h-14 items-center justify-center rounded-full border border-white/20 bg-black/30 px-8 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-105"
          >
            Talk to an Expert
          </Link>
          <button
            onClick={() => handleScroll("services")}
            className="flex h-14 items-center justify-center rounded-full border border-white/20 bg-black/30 px-8 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-105"
          >
            See Solutions
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
