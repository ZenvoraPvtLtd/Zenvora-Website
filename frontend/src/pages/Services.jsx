import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServicesSection from "../sections/ServicesSection";

const Services = () => {
  const [videoScale, setVideoScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005;
      setVideoScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="home-page-container relative text-[var(--text)] overflow-hidden min-h-screen">
      {/* ── Fixed Background Video for Entire Services Page ── */}
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
          <source src="/Service.mp4" type="video/mp4" />
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
            .home-page-container #experts,
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
            .home-page-container .swiper-slide > div,
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
        <ServicesSection isPage={true} />
      </div>
    </main>
  );
};

export default Services;
