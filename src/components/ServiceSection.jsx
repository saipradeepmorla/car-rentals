import { motion } from "motion/react";

export default function ServicesSection() {
  const services = [
    {
      title: "Daily Rentals",
      description: "Flexible car rentals by the day.",
      icon: "🚗",
    },
    {
      title: "Luxury Cars",
      description: "Premium vehicles for special occasions.",
      icon: "🏎️",
    },
    {
      title: "Airport Pick-up/Drop-off",
      description: "Convenient and hassle-free transfers.",
      icon: "✈️",
    },
    {
      title: "Self-Drive Options",
      description: "Freedom to drive at your own pace.",
      icon: "🛻",
    },
  ];

  return (
    <section id="services" className="bg-gray-100 text-gray-800 py-20 px-5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
