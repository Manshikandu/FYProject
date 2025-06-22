import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { motion } from 'framer-motion';
import img1 from '../assets/black.jpg';
import img2 from '../assets/road.jpg';
import welcomeImg from '../assets/welcome.svg'; // 🖼️ your illustration

const images = [img1, img2];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (user) {
    return (
      <div className="relative w-full h-[700px] bg-gradient-to-r from-black to-black text-white rounded-lg shadow-lg flex items-center px-8">
        {/* Left: Welcome Text */}
        <div className="flex-1 space-y-6 px-15">
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome, {user.username || ''}!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Ready to explore artists and make your event unforgettable?
          </motion.p>
          
        </div>

        {/* Right: Illustration */}
        <motion.img
          src={welcomeImg}
          alt="Welcome"
          className="hidden md:block flex-1 w-full h-130 object-contain"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i}`} className="w-full flex-shrink-0 object-cover" />
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 text-white bg-gradient-to-r from-black/50 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Discover. Connect. Celebrate.</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">Book talented artists for your events today.</p>
        
      </div>
    </div>
  );
};

export default Slider;
