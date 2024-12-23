import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();

  // Improved parallax effect with more subtle transformation
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-width parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img
          src="/hero-car.webp"
          alt="Car Rental Hero"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Centered content with full-width container */}
      <div className="relative z-20 flex items-center justify-center w-full h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Your Journey, Your Way
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto mb-6 px-4"
          >
            Explore freedom with our premium car rental service. Comfort, style, and reliability in every mile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-black ring-1 ring-white hover:text-black hover:bg-white text-white px-6 py-3 rounded-lg text-base md:text-lg font-medium shadow-lg w-full sm:w-auto"
            >
              Book Now
            </motion.button>
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg text-base md:text-lg font-medium shadow-lg w-full sm:w-auto"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
