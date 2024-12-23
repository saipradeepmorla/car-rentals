import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import BookingForm from "./BookingForm";

const CarCategorySection = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

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

  const seatCategories = [4, 7, 8, 12];

  return (
    <div id="fleet" className="bg-white text-black py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">
        Our Fleet
      </h1>
      {seatCategories.map((seatCount) => {
        const categoryCars = cars.filter((car) => car.seats === seatCount);
        if (categoryCars.length === 0) return null;

        return (
          <div key={seatCount} className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 pl-2">
              {seatCount} Seaters
            </h2>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
              {categoryCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="min-w-[250px] max-w-[300px] w-full flex-shrink-0 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden border border-gray-200"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 text-white px-3 py-1 rounded-bl-lg">
                      {car.seats} Seats
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 truncate">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-600  line-clamp-2 h-10">
                      {car.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">
                        ₹{car.pricePerKm}/km
                      </span>
                    </div>
                    <button
                      className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      onClick={() => setSelectedCar(car)}
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      {selectedCar && (
        <BookingForm car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
};

export default CarCategorySection;


