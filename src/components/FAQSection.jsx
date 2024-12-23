// FAQSection.jsx
import React, { useState } from 'react';
import { motion } from 'motion/react';

const FAQs = [
  {
    question: "What documents are required?",
    answer: "You will need a valid driver's license, an ID proof, and a credit card for the security deposit.",
  },
  {
    question: "Is there a mileage limit?",
    answer: "Yes, the mileage limit depends on the car you rent. Additional mileage may incur extra charges.",
  },
  {
    question: "How do I extend my booking?",
    answer: "You can extend your booking via your account dashboard or contact our support team for assistance.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, all charges are disclosed upfront. However, additional fees may apply for late returns or damages.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="bg-white text-black p-6 md:p-12">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {FAQs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            {/* Framer Motion for collapsible animations */}
            <motion.div
              initial={false}
              animate={{
                backgroundColor: expanded === index ? "#f3f4f6" : "#ffffff",
              }}
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-black">{faq.question}</h3>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: expanded === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expanded === index ? "auto" : 0,
                opacity: expanded === index ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <p className="p-4 text-gray-700">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
