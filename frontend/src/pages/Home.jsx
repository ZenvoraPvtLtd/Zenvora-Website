import { useEffect, useState } from "react"; import Loader from "../components/Loader";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 2000], [1.05, 1.4]);

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
    <main className="home-page-container relative text-[var(--text)] overflow-hidden min-h-screen">
      {/* ── Fixed Background Video for Entire Home Page ── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center", scale: videoScale }}
        >
          <source src="https://res.cloudinary.com/drynl8beg/video/upload/v1782543713/15344763_1920_1080_25fps_mh8d7i.mp4" type="video/mp4" />
        </motion.video>

        {/* ── Dark overlay for readability across the page ── */}
        <div
          className="absolute inset-0 bg-black/40"
          style={{ backdropFilter: "brightness(0.9)" }}
        />
      </div>

      <div className="relative z-10">
      <style>
        {`
          /* Completely transparent sections to let the video shine */
          .home-page-container,
          .home-page-container section,
          .home-page-container #about,
          .home-page-container #services,
          .home-page-container #services > div {
             background: transparent !important;
             border-color: rgba(255,255,255,0.1) !important;
          }

          /* Force all text to white with a soft shadow for readability */
          .home-page-container h1, 
          .home-page-container h2, 
          .home-page-container h3, 
          .home-page-container p,
          .home-page-container span {
             color: #ffffff !important;
             text-shadow: 0 1px 4px rgba(0,0,0,0.6);
             -webkit-text-fill-color: #ffffff !important;
          }

          /* Give cards a dark frosted glass look instead of solid white */
          .home-page-container article,
          .home-page-container [style*="background-color: rgb(255, 255, 255)"],
          .home-page-container [style*="background-color: #ffffff"],
          .home-page-container [style*="background-color: rgb(248, 250, 252)"],
          .home-page-container [style*="background-color: #f8fafc"],
          .home-page-container [style*="background-color: #eff6ff"],
          .home-page-container [style*="background-color: rgb(239, 246, 255)"],
          .home-page-container [style*="background-color: #f5f3ff"],
          .home-page-container [style*="background-color: rgb(245, 243, 255)"],
          .home-page-container [style*="background-color: #f0fdf4"],
          .home-page-container [style*="background-color: rgb(240, 253, 244)"],
          .home-page-container [style*="background-color: #fff7ed"],
          .home-page-container [style*="background-color: rgb(255, 247, 237)"] {
             background-color: rgba(0, 0, 0, 0.4) !important;
             backdrop-filter: blur(10px) !important;
             border: 1px solid rgba(255,255,255,0.1) !important;
             box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
          }

          /* Adjust icons and small badges so they don't look weird */
          .home-page-container .h-12, 
          .home-page-container .h-10, 
          .home-page-container .h-14 {
             background-color: rgba(255,255,255,0.1) !important;
          }
        `}
      </style>
      {/* 1. Hero Dynamic Entrance */}
      <HeroSection />

      {/* 2. About Preview Section (Rich company introduction, values, team context) */}
      <AboutSection isPage={false} showCTA={false} />

      {/* 3. Services Preview Section (Capabilities showcase and structured workflow) */}
      <ServicesSection isPage={false} showCTA={false} />

      {/* 4. Home Dedicated Rocket CTA Banner */}
      <section className="px-6 py-20 sm:px-8 bg-transparent">
        <div 
          className="relative mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-[0.9fr_1.1fr]"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
          }}
        >
          <div className="relative z-10 px-8 py-14 sm:px-16 sm:py-16">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-400">
              Let's Grow Together
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-black leading-tight sm:text-5xl text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-gray-300">
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
      </div>
    </main>
  );
};

export default Home;
