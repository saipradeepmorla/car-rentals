import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaEnvelope,
  FaPhone,
 FaWhatsapp,
  FaInstagram,
  
} from "react-icons/fa";


const ContactLocations = () => {
  const contactDetails = {
    companyName: "Imran Car Travels",
    name: "Imran",
    phone1: "+91 90630 60170",
    phone2: "+91 91829 87176",
    email: "kiyanshaik6579@gmail.com",
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  const mapCenter = {
    lat: 15.9167125,
    lng: 79.9964902,
  };

  const locations = [
    {
      name: "Imran Car Travels - Vijayawda",
      coordinates: { lat: 16.4778952, lng: 80.7104726 },
    },
    {
      name: "Imran Car Travels - Singarayakonda",
      coordinates: { lat: 15.3260889, lng: 79.8827955 },
    },
    {
      name: "Imran Car Travels - Ongole",
      coordinates: { lat: 15.5048639, lng: 80.0173205 },
    },
    {
      name: "Imran Car Travels - Gunturu",
      coordinates: { lat: 16.3032058, lng: 80.4388482 },
    },
    {
      name: "Imran Car Travels - Vijawada",
      coordinates: { lat: 16.513219947706, lng: 80.6677908450365 },
    },
    {
      name: "Imran Car Travels - Hyderabad",
      coordinates: { lat: 17.4668367, lng: 78.3550581 },
    },
  ];

  useEffect(() => {
    const initializeMap = () => {
      if (
        !window.google ||
        !mapContainerRef.current ||
        !window.google.maps.marker
      )
        return;

      // Create the map instance with a Map ID
      mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center: mapCenter,
        zoom: 8,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        mapId: "YOUR_MAP_ID", // You need to replace this with your actual Map ID from Google Cloud Console
      });

      // Create markers
      locations.forEach((location, index) => {
        // Create info window first
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <strong style="color: #1a73e8;">${location.name}</strong>
              <p style="margin: 8px 0 0 0; font-size: 14px;">Click for directions</p>
            </div>
          `,
        });
        infoWindowsRef.current.push(infoWindow);

        // Create advanced marker
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: location.coordinates,
          title: location.name,
        });

        // Add the gmp-click event listener
        marker.addEventListener("gmp-click", () => {
          // Close all open info windows
          infoWindowsRef.current.forEach((iw) => iw.close());
          // Open this location's info window
          infoWindow.open({
            map: mapRef.current,
            anchor: marker,
          });
        });

        markersRef.current.push(marker);
      });
    };

    // Check if Google Maps API is loaded with marker library
    if (window.google && window.google.maps && window.google.maps.marker) {
      setIsLoaded(true);
      initializeMap();
    } else {
      const checkGoogleMapsAPI = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.marker) {
          setIsLoaded(true);
          initializeMap();
          clearInterval(checkGoogleMapsAPI);
        }
      }, 500);

      setTimeout(() => {
        clearInterval(checkGoogleMapsAPI);
        console.error("Google Maps API or marker library failed to load");
      }, 10000);

      return () => clearInterval(checkGoogleMapsAPI);
    }

    // Cleanup function
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => {
          marker.map = null;
        });
        markersRef.current = [];
      }
      if (infoWindowsRef.current) {
        infoWindowsRef.current.forEach((infoWindow) => {
          infoWindow.close();
        });
        infoWindowsRef.current = [];
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-white text-black p-6 md:p-12 gap-8">
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          "Connecting You Everywhere You Need!"
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
          <FaMapMarkerAlt className="text-black text-xl mr-3" />{contactDetails.companyName}
          </h2>
          <p className="flex items-center">
          <FaUserAlt className="text-black text-xl mr-3" /> {contactDetails.name}
          </p>
          <a href="tel:+919063060170" className="flex items-center">
          <FaPhone className="text-black text-xl mr-3" /> {contactDetails.phone1} <br />
            {contactDetails.phone2}
          </a> 
          <a href={`mailto:${contactDetails.email}`} className="flex items-center">
          <FaEnvelope className="text-black text-xl mr-3" /> {contactDetails.email}
          </a>
         <div className="flex space-x-4 mt-5">
         <a
              href="https://wa.me/919063060170"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              <FaWhatsapp className="text-2xl" />
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
        </div>
        <p className="mt-4 text-sm">
          We have multiple franchises across Andhra Pradesh and Telangana. Click
          the map markers to learn more about each location!
        </p>
      </motion.div>

      {/* Right Column with Map */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "400px" }}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default ContactLocations;
