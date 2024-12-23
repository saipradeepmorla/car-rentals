import { motion } from "motion/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    { id: 1, icon: <FaFacebook />, link: "#" },
    { id: 2, icon: <FaTwitter />, link: "#" },
    { id: 3, icon: <FaInstagram />, link: "#" },
    { id: 4, icon: <FaLinkedin />, link: "#" },
  ];

  return (
    <footer className="bg-black text-white py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Column 1: Company Info */}
        <div>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-4"
          >
            ROAD ROVER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400"
          >
            Experience the best car rentals in the city. We provide top-notch
            vehicles for every journey, making your ride comfortable and safe.
          </motion.p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl font-semibold mb-4"
          >
            Quick Links
          </motion.h2>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="space-y-2"
          >
            {["Home", "Cars", "Services", "Contact"].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="hover:text-gray-400 cursor-pointer transition transform origin-left"
              >
                {link}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl font-semibold mb-4"
          >
            Contact Info
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-2"
          >
            <p>123 Main Street, Downtown City</p>
            <p>Email: info@roadrover.com</p>
            <p>Phone: +1 234 567 890</p>
          </motion.div>
          <div className="flex mt-4 space-x-4">
            {socialIcons.map((social) => (
              <motion.a
                key={social.id}
                href={social.link}
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="text-xl hover:text-gray-400 transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Copyright Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        &copy; {new Date().getFullYear()} ROAD ROVER. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
