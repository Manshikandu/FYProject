import { useState, useEffect } from 'react';
import img1 from '../assets/black.jpg';
import img2 from '../assets/road.jpg';

const images = [img1, img2];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[1600px] mx-auto h-[500px] overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay Button */}
      <div className="absolute bottom-8 left-8">
        <button className="bg-[#5ff3f3] text-black font-semibold px-6 py-2 rounded-full shadow-lg">
          Get started
        </button>
      </div>
    </div>
  );
};

export default Slider;
