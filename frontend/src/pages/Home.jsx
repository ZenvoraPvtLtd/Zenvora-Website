import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-32 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Zenvora Infotech
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-cyan-300">
              Transforming Ideas into Innovative IT Solutions
            </p>
            <div className="space-x-4">
              <Link
                to="/services"
                className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-md font-semibold hover:bg-cyan-400 transition"
              >
                Explore Services
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md font-semibold hover:bg-cyan-400 hover:text-black transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Software Development",
                desc: "Bespoke solutions tailored to your business needs with cutting-edge technology.",
              },
              {
                title: "Cloud Solutions",
                desc: "Scalable and secure cloud infrastructure for optimal performance.",
              },
              {
                title: "AI Solutions",
                desc: "AI-powered applications to automate and optimize your processes.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl hover:border-cyan-500 transition"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <Link
                  to="/services"
                  className="text-cyan-400 font-semibold hover:text-cyan-300"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose Zenvora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Happy Clients" },
              { number: "100+", label: "Projects Delivered" },
              { number: "150+", label: "Team Members" },
              { number: "10+", label: "Years Experience" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                <p className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-gray-400">
            Let's work together to bring your ideas to life with innovative
            technology solutions.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-cyan-500 text-black px-8 py-3 rounded-md font-semibold hover:bg-cyan-400 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
