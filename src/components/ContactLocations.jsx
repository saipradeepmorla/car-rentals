import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ContactLocations = () => {
  const contactDetails = [
    {
      name: "Imran",
      role: "Primary Contact",
      phone1: "+91 90630 60170",
      phone2: "+91 91829 87176",
    },
    {
      name: "Syed Sajid",
      role: "Secondary Contact",
      phone1: "+91 95733 32016",
    },
  ];

  const email = "kiyanshaik6579@gmail.com";
  
  const [isLoaded, setIsLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  // 16.526443, 79.210930
  const mapCenter = {
    lat: 16.526443,
    lng: 79.210930,
  };

  const locations = [
    {
      name: "Imran Car Travels - Vijayawada",
      coordinates: { lat: 16.4778952, lng: 80.7104726 },
      address: "Vijayawada, Andhra Pradesh",
    },
    {
      name: "Imran Car Travels - Singarayakonda",
      coordinates: { lat: 15.3260889, lng: 79.8827955 },
      address: "Singarayakonda, Andhra Pradesh",
    },
    {
      name: "Imran Car Travels - Ongole",
      coordinates: { lat: 15.5048639, lng: 80.0173205 },
      address: "Ongole, Andhra Pradesh",
    },
    {
      name: "Imran Car Travels - Guntur",
      coordinates: { lat: 16.3032058, lng: 80.4388482 },
      address: "Guntur, Andhra Pradesh",
    },
    {
      name: "Imran Car Travels - Vijayawada City",
      coordinates: { lat: 16.513219947706, lng: 80.6677908450365 },
      address: "Vijayawada City Center, Andhra Pradesh",
    },
    {
      name: "Imran Car Travels - Hyderabad",
      coordinates: { lat: 17.4668367, lng: 78.3550581 },
      address: "Hyderabad, Telangana",
    },
  ];

  const getGoogleMapsUrl = (location) => {
    return `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
  };

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !mapContainerRef.current || !window.google.maps.marker) return;

      mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center: mapCenter,
        zoom: 7,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID ,
      });

      locations.forEach((location, index) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-4 max-w-xs">
              <h3 class="font-bold text-blue-600 mb-2">${location.name}</h3>
              <p class="text-sm mb-2">${location.address}</p>
              <a href="${getGoogleMapsUrl(location)}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="text-blue-500 hover:text-blue-700 text-sm">
                Open in Google Maps
              </a>
            </div>
          `,
        });
        infoWindowsRef.current.push(infoWindow);

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: location.coordinates,
          title: location.name,
        });

        marker.addEventListener("gmp-click", () => {
          infoWindowsRef.current.forEach((iw) => iw.close());
          infoWindow.open({
            map: mapRef.current,
            anchor: marker,
          });
        });

        markersRef.current.push(marker);
      });
    };

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

      return () => clearInterval(checkGoogleMapsAPI);
    }

    return () => {
      markersRef.current?.forEach((marker) => (marker.map = null));
      infoWindowsRef.current?.forEach((infoWindow) => infoWindow.close());
      markersRef.current = [];
      infoWindowsRef.current = [];
    };
  }, []);

  return (
    <div id="contact" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            "Connecting You Everywhere You Need!"
          </h1>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactDetails.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-3">
                  <FaUserAlt className="text-black text-xl mr-3" />
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                </div>
                <a href={`tel:${contact.phone1}`} className="flex items-center mb-2 hover:text-blue-600">
                  <FaPhone className="text-black text-xl mr-3" />
                  <span>{contact.phone1}</span>
                </a>
                {contact.phone2 && (
                  <a href={`tel:${contact.phone2}`} className="flex items-center mb-2 hover:text-blue-600">
                    <FaPhone className="text-black text-xl mr-3" />
                    <span>{contact.phone2}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Email and Social Links */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <a href={`mailto:${email}`} className="flex items-center mb-4 hover:text-blue-600">
              <FaEnvelope className="text-black text-xl mr-3" />
              <span>{email}</span>
            </a>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/919063060170"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-green-600 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-pink-600 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                    <div>
                      <h3 className="font-semibold text-sm">{location.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                    </div>
                  </div>
                  <a
                    href={getGoogleMapsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="h-[600px] lg:h-full min-h-[400px] relative">
          <div
            ref={mapContainerRef}
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactLocations;
