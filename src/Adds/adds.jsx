import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Adds = () => {
  const [remainingTime, setRemainingTime] = useState(5);
  const [allowedToSkip, setAllowedToSkip] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTimer, setPopupTimer] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll position:", window.scrollY);
      if (
        window.scrollY > 100 &&
        !document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)
      ) {
        console.log("Popup will show now!");
        showAd();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "adds"));
        const files = [];
        querySnapshot.forEach((doc) => {
          files.push({ id: doc.id, ...doc.data() });
        });

        const imgFiles = files.filter(
          (file) => file.image && file.image.startsWith("data:image/")
        );
        console.log("Fetched images:", imgFiles);

        setImages(imgFiles);
        if (imgFiles.length > 0) {
          setSelectedImage(imgFiles[0]); // Set the first image initially
        }
      } catch (error) {
        console.error("Error fetching files: ", error.message);
      }
    };

    fetchFiles();

    if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/)) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (popupTimer) {
        clearInterval(popupTimer);
      }
    };
  }, [popupTimer]);

  useEffect(() => {
    let interval;
    if (popupVisible && images.length > 0) {
      // Change the image every 3 seconds
      interval = setInterval(() => {
        setImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          setSelectedImage(images[nextIndex]);
          return nextIndex;
        });
      }, 3000); // Change image every 3 seconds
    }

    return () => clearInterval(interval); // Cleanup interval when popup is closed or image changes
  }, [popupVisible, images]);

  const createPopupCookie = () => {
    const date = new Date();
    const expirationTime = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    date.setTime(date.getTime() + expirationTime);
    document.cookie = `popupCookie=true; expires=${date.toUTCString()}; path=/`;
    console.log("Cookie set:", document.cookie);
  };

  const showAd = () => {
    console.log("Showing popup...");
    setPopupVisible(true);
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          setAllowedToSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setPopupTimer(timer);
  };

  const skipAd = () => {
    setPopupVisible(false);
    createPopupCookie();
  };

  const handleSkipButtonClick = () => {
    if (allowedToSkip) {
      skipAd();
    }
  };

  return (
    <>
      {popupVisible && selectedImage && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50`}
          style={{
            display: popupVisible ? "flex" : "none",
          }}
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={handleSkipButtonClick}
              className={`absolute top-4 right-4 px-4 py-2 text-white bg-black rounded-full text-sm font-semibold shadow-md transition-transform ${
                allowedToSkip ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!allowedToSkip}
            >
              {allowedToSkip ? "Skip" : `Skip in ${remainingTime}s`}
            </button>
            <img
              src={selectedImage.image}
              alt={`image-${selectedImage.id}`}
              className="max-w-full max-h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Adds;
