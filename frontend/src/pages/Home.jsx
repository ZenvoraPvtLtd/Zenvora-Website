import { useEffect, useState } from "react"; import Loader from "../components/Loader";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  // If the top-level app loader already ran this session, skip the page loader.
  const appLoaded = typeof window !== "undefined" && sessionStorage.getItem("appLoaded");
  const [loading, setLoading] = useState(!appLoaded);

  useEffect(() => {
    if (appLoaded) return; // skip page loader when app already showed its loader

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [appLoaded]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#020815] text-white overflow-hidden min-h-screen">
      {/* 1. Hero Dynamic Entrance */}
      <HeroSection />

      {/* 2. About Preview Section (Rich company introduction, values, team context) */}
      <AboutSection isPage={false} />

      {/* 3. Services Preview Section (Capabilities showcase and structured workflow) */}
      <ServicesSection isPage={false} />

      {/* 4. Home Dedicated Rocket CTA Banner */}
      <section className="bg-[#03101d] px-6 py-20 sm:px-8 border-t border-cyan-400/10">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#15c8ff]/70 bg-[radial-gradient(circle_at_76%_58%,rgba(14,125,255,0.44),transparent_30%),linear-gradient(112deg,#06101e_0%,#081b35_100%)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 px-8 py-14 sm:px-16 sm:py-16">
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
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-md bg-[#15c8ff] px-7 text-sm font-black text-[#02101c] transition hover:bg-[#4ed8ff]"
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

export default Home;
