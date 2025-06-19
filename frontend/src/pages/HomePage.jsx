
import Slider from '../components/Slider';
import CategorySection from '../components/CategorySection';
// import NavBar from '../components/NavBar';

// import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const HomePage = () => {
  const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo) {
    const section = document.getElementById(location.state.scrollTo);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 100); // wait until page mounts
    }
  }
}, [location]);
  return (
    <>
      
      <Slider />
      <CategorySection />
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;