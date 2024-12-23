import { motion } from "motion/react";

const AboutUs = () => {
  return (
    <div id="about" className="bg-white text-black py-16 px-8 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
            Welcome to <span className="text-gray-900">Luxury Drives</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Elevate your journey with our premium car rental services. Seamless,
            stylish, and made for those who demand excellence.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Luxury Fleet",
              description:
                "Choose from a collection of high-end vehicles, from sleek sedans to powerful SUVs.",
            },
            {
              title: "Seamless Experience",
              description:
                "Book your ride effortlessly with our user-friendly platform.",
            },
            {
              title: "Unmatched Comfort",
              description:
                "Experience luxury on every mile with our meticulously maintained cars.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <a href="#contact"  className="px-8 py-3 bg-black text-white font-medium text-lg rounded-full hover:bg-gray-900 transition-all duration-300">
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
