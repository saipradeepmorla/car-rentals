import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import BookingForm from "./BookingForm"; // Import the BookingForm component

const CarFilterSection = () => {
  const [cars, setCars] = useState([]);
  const [seatFilter, setSeatFilter] = useState(4);
  const [selectedCar, setSelectedCar] = useState(null);

  // Fetch cars from Firestore
  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const fetchedCars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredVehicles = seatFilter
    ? cars.filter((car) => car.seats === seatFilter)
    : cars;

  return (
    <div id="fleet" className="bg-white text-black p-6">
      {/* Filter Section */}
      <motion.div
        className="mb-6 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 break-words">
          Filter Cars by Seats
        </h1>
        <div className="flex justify-center gap-4 flex-wrap">
          {[4, 7, 8, 12].map((seat) => (
            <motion.button
              key={seat}
              onClick={() => setSeatFilter(seat)}
              className={`px-4 py-2 rounded-full ${
                seatFilter === seat ? "bg-black text-white" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {seat} Seats
            </motion.button>
          ))}
          <motion.button
            onClick={() => setSeatFilter(null)}
            className="px-4 py-2 rounded-full bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            All
          </motion.button>
        </div>
      </motion.div>

      {/* Cars Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredVehicles.map((car) => (
          <motion.div
            key={car.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <img
              src={car.image}
              alt={car.name}
              className="rounded-md mb-4 w-full h-32 object-cover"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{car.name}</h2>
              <p className="text-gray-600 mb-2 text-sm">{car.description}</p>
              <p className="text-sm">Price per km: ₹{car.pricePerKm}</p>
            </div>
            <button
              className="w-full py-2 mt-4 bg-black text-white font-semibold rounded-lg"
              onClick={() => setSelectedCar(car)}
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking Form */}
      {selectedCar && (
        <BookingForm car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
};

export default CarFilterSection;
