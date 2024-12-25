import React from "react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919063060170" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 4.5A9.96 9.96 0 0012 2.25C6.62 2.25 2.25 6.62 2.25 12c0 1.616.396 3.14 1.09 4.475l-.785 3.487a1.125 1.125 0 001.375 1.375l3.487-.785A9.75 9.75 0 0021.75 12c0-2.652-1.031-5.075-2.7-6.75z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75c.288.72.72 1.368 1.274 1.922.554.554 1.202.986 1.922 1.274m0 0l1.275-.425a1.125 1.125 0 011.4.65l.405.94a.75.75 0 01-.328.964c-1.419.81-3.19 1.03-5.095.254-1.181-.507-2.233-1.37-2.971-2.474-.712-1.063-.994-2.145-.75-3.103a.75.75 0 01.939-.55l.94.405c.347.15.56.512.65.9z"
          />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href="tel:+919063060170" // Replace with your phone number
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
        aria-label="Call"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.5c2.33 4.86 5.99 8.52 10.86 10.86l2.35-2.35a1.5 1.5 0 011.605-.325c1.27.515 2.693.805 4.235.805.414 0 .75.336.75.75v3a.75.75 0 01-.75.75C13.197 18.75 3.75 9.303 3.75 3.75A.75.75 0 014.5 3h3c.414 0 .75.336.75.75 0 1.542.29 2.965.805 4.235a1.5 1.5 0 01-.325 1.605L6.375 11.25z"
          />
        </svg>
      </a>
    </div>
  );
};

export default FloatingButtons;
