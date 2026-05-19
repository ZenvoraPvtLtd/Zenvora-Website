import { ArrowRight, Headphones } from "lucide-react";

const HeroSection = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative border-b border-cyan-400/10 bg-[#020815] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(0,172,255,0.18),transparent_34%),linear-gradient(115deg,#020714_0%,#031328_54%,#020815_100%)]" />
      <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(0,205,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,205,255,0.04)_1px,transparent_1px)] bg-[length:44px_44px]" />

      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-[40px] font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[64px]">
            <span className="block text-white">
              Software Development
            </span>
            <span className="block bg-gradient-to-r from-[#15c8ff] via-[#4fdcff] to-[#8be8ff] bg-clip-text text-transparent">
              Company & IT Solutions
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
            <button
              onClick={() => handleScroll("services")}
              className="inline-flex h-14 items-center gap-3 rounded-md bg-[#15c8ff] px-7 text-sm font-black text-[#02101c] shadow-[0_0_24px_rgba(21,200,255,0.24)] transition hover:bg-[#4ed8ff]"
            >
              Explore Services
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="inline-flex h-14 items-center gap-3 rounded-md border border-[#1587da] px-7 text-sm font-bold text-white transition hover:border-[#15c8ff] hover:bg-[#15c8ff]/10 hover:text-[#15c8ff]"
            >
              Contact Us
              <Headphones size={18} className="text-[#15c8ff]" />
            </button>
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
  );
};

export default HeroSection;
