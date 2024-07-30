'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50"> {/* Ensure it's on top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-gray-900 text-white shadow-md hover:bg-gray-700 transition-all duration-300"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
