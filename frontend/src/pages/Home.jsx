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
    }, 2500);

    return () => clearTimeout(timer);
  }, [appLoaded]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="bg-[var(--bg)] text-[var(--text)] overflow-hidden min-h-screen">
      {/* 1. Hero Dynamic Entrance */}
      <HeroSection />

      {/* 2. About Preview Section (Rich company introduction, values, team context) */}
      <AboutSection isPage={false} />

      {/* 3. Services Preview Section (Capabilities showcase and structured workflow) */}
      <ServicesSection isPage={false} />

      {/* 4. Home Dedicated Rocket CTA Banner */}
      <section className="bg-[var(--bg)] px-6 py-20 sm:px-8 border-t border-[var(--border)]">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[var(--border)] bg-linear-to-br from-white via-[var(--bg-alt)] to-blue-50/40 shadow-xl shadow-blue-100/30 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 px-8 py-14 sm:px-16 sm:py-16">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--primary)]">
              Let's Grow Together
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-black leading-tight sm:text-5xl text-[var(--text)]">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-[var(--text-secondary)]">
              Let's work together to bring your ideas to life with innovative
              technology solutions.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-md bg-[var(--primary)] px-7 text-sm font-black text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition hover:bg-[var(--primary-hover)]"
            >
              Get Started Today
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative hidden min-h-[345px] items-end justify-center lg:flex">
            <div className="absolute bottom-0 h-56 w-[62%] rounded-t-full bg-blue-400/10 blur-2xl" />
            <div className="absolute bottom-0 h-32 w-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(59,130,246,0.05)_30%,transparent_65%)]" />
            <div className="rocket relative mb-12 h-56 w-24">
              <div className="absolute left-1/2 top-0 h-44 w-20 -translate-x-1/2 rounded-t-full rounded-b-[36px] border border-slate-200 bg-[linear-gradient(90deg,#f1f5f9,#ffffff_48%,#cbd5e1)] shadow-[0_4px_20px_rgba(37,99,235,0.15)]" />
              <div className="absolute left-1/2 top-14 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-slate-200 bg-blue-100 shadow-inner" />
              <div className="absolute bottom-6 left-0 h-20 w-9 skew-y-[-26deg] rounded-tl-[28px] bg-[var(--primary)]" />
              <div className="absolute bottom-6 right-0 h-20 w-9 skew-y-[26deg] rounded-tr-[28px] bg-blue-700" />
              <div className="absolute bottom-[-52px] left-1/2 h-28 w-10 -translate-x-1/2 rounded-full bg-amber-400/60 blur-md animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
