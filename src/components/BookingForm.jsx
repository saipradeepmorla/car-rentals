import React from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  from: z.string().nonempty("From location is required"),
  to: z.string().nonempty("To location is required"),
  date: z.string().nonempty("Date is required"),
});

const BookingForm = ({ car, onClose }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("carName", car.name);
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      await axios.post(import.meta.env.VITE_GOOGLE_SHEETS_API2, formData);
      toast.success("Booking submitted successfully!");
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white text-black rounded-lg p-6 w-full max-w-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Book {car.name}</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">From</label>
            <GooglePlacesAutocomplete
              selectProps={{
                onChange: (value) => setValue("from", value.label),
              }}
            />
            {errors.from && (
              <p className="text-red-500 text-sm">{errors.from.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">To</label>
            <GooglePlacesAutocomplete
              selectProps={{
                onChange: (value) => setValue("to", value.label),
              }}
            />
            {errors.to && (
              <p className="text-red-500 text-sm">{errors.to.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              {...register("date")}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white font-bold rounded"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingForm;
