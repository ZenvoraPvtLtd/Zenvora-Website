import { Link } from "react-router-dom";

const services = [
  {
    icon: "☁️",
    title: "Cloud Architecture",
    description:
      "Design, migrate, and optimize cloud infrastructure across AWS, Azure, and GCP for maximum reliability and cost efficiency.",
    tags: ["AWS", "Azure", "GCP", "Terraform"],
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    description:
      "Build intelligent systems with custom ML models, NLP pipelines, computer vision, and generative AI integrations.",
    tags: ["LLMs", "PyTorch", "MLOps"],
  },
  {
    icon: "📱",
    title: "Product Engineering",
    description:
      "Full-stack web and mobile application development with React, Node.js, Flutter, and modern microservice architectures.",
    tags: ["React", "Node.js", "Flutter"],
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    description:
      "Comprehensive security assessments, penetration testing, compliance consulting, and 24/7 threat monitoring services.",
    tags: ["Pen Testing", "SOC 2", "SIEM"],
  },
  {
    icon: "📊",
    title: "Data Engineering",
    description:
      "Build real-time data pipelines, warehouses, and analytics platforms that turn raw data into strategic insights.",
    tags: ["Spark", "Kafka", "Snowflake"],
  },
  {
    icon: "⚙️",
    title: "DevOps & Platform",
    description:
      "Accelerate delivery with CI/CD pipelines, container orchestration, and site reliability engineering practices.",
    tags: ["Kubernetes", "Docker", "GitOps"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We understand your goals, constraints, and technical landscape.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "We design a tailored roadmap aligned to your business outcomes.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Our engineers execute with speed, precision, and quality.",
  },
  {
    step: "04",
    title: "Launch",
    desc: "We deploy, monitor, and iterate to ensure long-term success.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-black">

      {/* Hero */}
      <section className="bg-linear-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="text-lg mt-4 text-gray-400 max-w-2xl">
            End-to-end technology capabilities — from strategy to deployment and beyond.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {["50+ Projects", "98% Satisfaction", "6 Core Domains", "24/7 Support"].map((s) => (
              <span key={s} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-linear-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Core Capabilities
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Deep expertise across every layer of the modern technology stack.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl hover:border-cyan-500 transition group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-gray-700 text-gray-300 border border-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            How We Work
          </h2>
          <p className="text-gray-400 text-center max-w-lg mx-auto mb-12">
            A proven delivery framework that turns ideas into reliable, scalable products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg hover:border-cyan-500 transition"
              >
                <span className="text-3xl font-black text-gray-700 block mb-4 leading-none">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-gray-900 to-black border-t border-gray-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Something Remarkable?
          </h2>
          <p className="text-lg mb-8 text-gray-400">
            Talk to our team and discover how we can accelerate your digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-md font-semibold hover:bg-cyan-400 transition"
            >
              Get in Touch →
            </Link>
            <Link
              to="/about"
              className="inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md font-semibold hover:bg-cyan-400 hover:text-black transition"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
