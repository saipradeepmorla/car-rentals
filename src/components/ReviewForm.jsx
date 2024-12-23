import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const ReviewForm = () => {
  const sheetApi = import.meta.env.VITE_GOOGLE_SHEETS_API_REVIEW;
  const [loading, setLoading] = useState(false);

  // Validation schema with Zod
  const validationSchema = z.object({
    name: z
      .string()
      .min(3, "Name needs to be 3 or more characters")
      .max(20, "Name cannot exceed 20 characters"),
    place: z
      .string()
      .min(3, "Place needs to be 3 or more characters")
      .max(20, "Place cannot exceed 20 characters"),
    date: z
      .string()
      .refine((value) => new Date(value) >= new Date(), "Cannot select a past date"),
    stars: z
      .number()
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    feedback: z
      .string()
      .max(150, "Feedback cannot exceed 150 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const scriptURL = sheetApi;
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Thank you for your review!");
        reset();
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 text-gray-900 py-16 px-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Submit Your Review
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We value your feedback! Share your experience with us.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-lg p-8 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-2">Place</label>
            <input
              type="text"
              {...register("place")}
              placeholder="Enter your place"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
            {errors.place && (
              <p className="text-red-500 text-sm mt-1">{errors.place.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium mb-2">Stars (1-5)</label>
            <input
              type="number"
              {...register("stars", { valueAsNumber: true })}
              placeholder="Rate us"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
            {errors.stars && (
              <p className="text-red-500 text-sm mt-1">{errors.stars.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium mb-2">Feedback</label>
            <textarea
              rows="3"
              {...register("feedback")}
              placeholder="Your feedback"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            ></textarea>
            {errors.feedback && (
              <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gray-950 text-white font-bold py-2 rounded-md hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReviewForm;
