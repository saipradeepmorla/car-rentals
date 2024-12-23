import { motion } from "motion/react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white text-black py-20 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 shadow-md">
        {/* Contact Information */}
        <motion.div
          className="space-y-6 bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-5">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-black text-xl" />
              <p>Business Victory Solutions</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-black text-xl" />
              <p>morlasaipradeep@gmail.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-black text-xl" />
              <p>+91 9100188365</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-5">
            <a
              href="https://linkedin.com/in/saipradeepmorla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          className="rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d865.3099278266477!2d79.984955!3d14.443901!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf373b8947d45%3A0x9e2b0159a402aafb!2sBusiness%20victory%20solutions!5e1!3m2!1sen!2sin!4v1734287476794!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
