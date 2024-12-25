import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
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

const CarFilterSection = () => {
  const [cars, setCars] = useState([]);
  const [seatFilter, setSeatFilter] = useState(4);
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

  const filteredVehicles = seatFilter
    ? cars.filter((car) => car.seats === seatFilter)
    : cars;

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
    <div id="fleet" className="bg-white text-black p-6">
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
              <div className="flex justify-between items-center">
                <span className="text-sm">Price per km: ₹{car.pricePerKm}</span>
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

export default CarFilterSection;
