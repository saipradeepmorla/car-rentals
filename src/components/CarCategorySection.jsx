import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import BookingForm from "./BookingForm";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const CarCategorySection = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

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

  const TariffDetails = ({ tariffs }) => (
    <>
      <h2 className="text-2xl font-bold mb-4">Pricing Details</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Full Day Tariffs</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              12 Hours: ₹{tariffs.fullDayTariffs["12HrsRent"]}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              24 Hours: ₹{tariffs.fullDayTariffs["24HrsRent"]}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              Per KM: ₹{tariffs.fullDayTariffs.perKm}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              Extra Hour: ₹{tariffs.fullDayTariffs.perExtraHour}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              12Hr Driver: ₹{tariffs.fullDayTariffs["12HrsDriverBatta"]}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              24Hr Driver: ₹{tariffs.fullDayTariffs["24HrsDriverBatta"]}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Local Trips</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              4Hrs/40Km: ₹{tariffs.localTrips["4Hrs40Km"]}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              8Hrs/80Km: ₹{tariffs.localTrips["8Hrs80Km"]}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              Extra KM: ₹{tariffs.localTrips.perExtraKm}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              Extra Hour: ₹{tariffs.localTrips.perExtraHour}
            </div>
          </div>
        </div>
      </div>
    </>
  );

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
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {categoryCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="min-w-[240px] max-w-[280px] w-full flex-shrink-0 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 text-white px-3 py-1 rounded-bl-lg">
                      {car.seats} Seats
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 truncate">
                      {car.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 h-8 mb-2">
                      {car.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-base font-semibold">
                        ₹{car.pricePerKm}/km
                      </span>
                      <button
                        onClick={() => {
                          setSelectedTariff(car.tariffs);
                          setShowPricing(true);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Pricing
                      </button>
                    </div>
                    <button
                      className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm"
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

      <Modal
        isOpen={showPricing}
        onClose={() => {
          setShowPricing(false);
          setSelectedTariff(null);
        }}
      >
        {selectedTariff && <TariffDetails tariffs={selectedTariff} />}
      </Modal>
    </div>
  );
};

export default CarCategorySection;
