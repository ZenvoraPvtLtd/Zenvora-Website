import { Link } from "react-router-dom";

const Partnership = () => {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      <section
        className="relative overflow-hidden py-24"
        style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafbff 60%, #f0f4ff 100%)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.22em] rounded-full px-4 py-1.5 mb-6"
            style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
          >
            Partnership
          </span>
          <h1 className="mb-5 text-5xl font-black md:text-6xl" style={{ color: "#0f172a" }}>
            Grow with Zenvora
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover how our partnership programs help startups, enterprises, and technology partners accelerate growth, co-create solutions, and reach global customers.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Contact Partnership Team
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Strategic Alliances",
              description: "Co-develop new products, integrate complementary technologies, and unlock joint market opportunities.",
            },
            {
              title: "Channel Partnerships",
              description: "Work with us to bring Zenvora solutions to your customers and expand your service portfolio.",
            },
            {
              title: "Technology Collaboration",
              description: "Partner on AI, cloud, mobile, and enterprise engineering initiatives for faster innovation.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold" style={{ color: "#0f172a" }}>
                {item.title}
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-slate-900 to-blue-600 p-10 text-white shadow-2xl sm:p-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Let's build together</p>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Start your partnership with Zenvora today.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-200">
                Our team is ready to discuss joint go-to-market plans, referral programs, and custom technology initiatives across industries.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Reach Partnership Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
