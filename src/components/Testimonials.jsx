import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const Testimonials = () => {
  const sheetApi = import.meta.env.VITE_GOOGLE_SHEETS_API_REVIEW;
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch testimonials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sheetApi);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetApi]);

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || loading || testimonials.length <= 1 || isHovered) return;

    const totalWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;

    const autoScroll = () => {
      // If we've scrolled to the end, reset to the beginning
      if (container.scrollLeft >= totalWidth - visibleWidth) {
        container.scrollLeft = 0;
      } else {
        // Scroll by a small amount
        container.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(autoScroll, 20);

    return () => clearInterval(intervalId);
  }, [loading, testimonials.length, isHovered]);

  // Render star ratings
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div className="text-yellow-500 text-lg">
        {"★".repeat(filledStars)}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div className="bg-black dark:bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white dark:text-black mb-6">
          Testimonials & Success Stories
        </h2>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            <div
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg p-6 min-w-[320px] max-w-[400px] w-[320px] border dark:border-gray-700 flex-shrink-0 flex flex-col justify-between"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div>
                    <blockquote className="italic mb-4 line-clamp-4 h-24">
                      "{testimonial.feedback.length > 150 
                        ? testimonial.feedback.substring(0, 150) + '...' 
                        : testimonial.feedback}"
                    </blockquote>
                  </div>
                  <div>
                    <footer className="text-sm font-medium mb-2">
                      {testimonial.name}, <span>{testimonial.place}</span>
                    </footer>
                    <div>{renderStars(testimonial.stars)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
