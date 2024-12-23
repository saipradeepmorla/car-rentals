import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

import { motion } from "motion/react";

const seatPriceMapping = {
  4: 14,
  7: 16,
  8: 20,
  12: 28,
};

// Validation schema using Zod
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  from: z
    .object({ label: z.string() })
    .nullable()
    .refine((val) => val, "From location is required"),
  to: z
    .object({ label: z.string() })
    .nullable()
    .refine((val) => val, "To location is required"),
  seats: z.enum(["4", "7", "8", "12"]),
  date: z.string().min(1, "Date is required"),
  isRoundTrip: z.boolean(),
});

const Form = () => {
  const [distance, setDistance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const calculateEstimation = async (data) => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: data.from.label,
        destination: data.to.label,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const distanceInKm = result.routes[0].legs[0].distance.value / 1000;
      const totalDistance = data.isRoundTrip ? distanceInKm * 2 : distanceInKm;
      const pricePerSeat = seatPriceMapping[data.seats];
      const totalPrice = totalDistance * pricePerSeat;

      setDistance(totalDistance);
      setEstimatedPrice(totalPrice);

      // Convert form data to URL parameters using FormData()
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("from", data.from.label);
      formData.append("to", data.to.label);
      formData.append("seats", data.seats);
      formData.append("date", data.date);
      formData.append("isRoundTrip", data.isRoundTrip);
      formData.append("distance", totalDistance.toFixed(2));
      formData.append("estimatedPrice", totalPrice.toFixed(2));

      const params = new URLSearchParams(formData).toString();
      const url = `${import.meta.env.VITE_GOOGLE_SHEETS_API}?${params}`;

      // Send data using Axios GET request
      const response = await axios.get(url);
      // console.log(response?.data)

      if (response.status === 200) {
        toast.success("Form submitted successfully!");
        // Clear the form after success
        reset(); // <-- Reset the form here
        // setDistance(0); // Clear distance and estimated price
        // setEstimatedPrice(0);
      } else {
        toast.error("Error submitting form.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to calculate estimation or send data.");
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-10  bg-white shadow-md hover:drop-shadow-xl ring-1 ring-black my-2 rounded-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Travel Estimation
      </h1>
      <form
        onSubmit={handleSubmit(calculateEstimation)}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
      >
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* From */}
        <div>
          <label className="block font-medium">From</label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <GooglePlacesAutocomplete
                selectProps={{
                  ...field,
                  onChange: (value) => setValue("from", value),
                }}
              />
            )}
          />
          {errors.from && <p className="text-red-500">{errors.from.message}</p>}
        </div>

        {/* To */}
        <div>
          <label className="block font-medium">To</label>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <GooglePlacesAutocomplete
                selectProps={{
                  ...field,
                  onChange: (value) => setValue("to", value),
                }}
              />
            )}
          />
          {errors.to && <p className="text-red-500">{errors.to.message}</p>}
        </div>

        {/* Seats */}
        <div>
          <label className="block font-medium">Seats</label>
          <select {...register("seats")} className="w-full p-2 border rounded">
            {Object.keys(seatPriceMapping).map((seat) => (
              <option key={seat} value={seat}>
                {seat} Seats
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full p-2 border rounded"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Round Trip */}
        <div className="md:col-span-2 flex items-center">
          <label className="font-medium mr-2">Round Trip?</label>
          <input
            type="checkbox"
            {...register("isRoundTrip")}
            className="w-5 h-5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-black text-white p-3 rounded-md md:col-span-2"
        >
          Get Estimation
        </button>
      </form>

      {/* Results */}
      {distance > 0 && (
        <motion.div
          className="mt-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <p>Total Distance: {distance.toFixed(2)} km</p>
          <p>Estimated Price: ₹{estimatedPrice.toFixed(2)}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Form;
