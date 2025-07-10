// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Slider from '../components/Slider';
// import CategorySection from '../components/CategorySection';
// import RecommendedArtists from '../components/RecommendedArtists';
// import { useUserStore } from '../stores/useUserStore';

// const HomePage = () => {
//   const location = useLocation();
//   const user = useUserStore((state) => state.user);

//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const section = document.getElementById(location.state.scrollTo);
//       if (section) {
//         setTimeout(() => {
//           section.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//       }
//     }
//   }, [location]);

//   return (
//     <>
//       <Navbar />
//       <Slider />
//       <CategorySection />

//       {/* For not-logged-in users */}
//       {!user && (
//         <>
//           {/* Hero Section */}
//           <section className="text-center py-20 bg-gradient-to-br from-purple-100 to-indigo-50">
//             <h1 className="text-4xl font-bold mb-4">Find & Book Artists for Your Events</h1>
//             <p className="text-lg text-gray-700 mb-6">Discover singers, dancers, emcees, and more with ease.</p>
//             <div className="space-x-4">
//               <a
//                 href="/signup"
//                 className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//               >
//                 Get Started
//               </a>
//               <a
//                 href="/about"
//                 className="px-6 py-3 border border-purple-600 text-purple-600 rounded hover:bg-purple-100 transition"
//               >
//                 Learn More
//               </a>
//             </div>
//           </section>

//           {/* How It Works */}
//           <section className="bg-white py-16 text-center">
//             <h2 className="text-3xl font-bold mb-10">How It Works</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">1. Explore</h3>
//                 <p className="text-gray-600">Browse artists by category, genre, and rating.</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
//                 <p className="text-gray-600">Chat with artists and check their availability.</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">3. Book</h3>
//                 <p className="text-gray-600">Securely book and receive confirmation instantly.</p>
//               </div>
//             </div>
//           </section>

//           {/* Testimonials */}
//           <section className="bg-gray-100 py-16">
//             <h2 className="text-3xl text-center font-bold mb-10">What Our Users Say</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <p>"Booking artists was so simple and quick. Highly recommend this platform!"</p>
//                 <p className="mt-4 font-semibold">- Sita R., Event Planner</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <p>"As a singer, this site helped me land gigs and connect with organizers."</p>
//                 <p className="mt-4 font-semibold">- Raj K., Singer</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <p>"It made managing my event lineup easy and stress-free."</p>
//                 <p className="mt-4 font-semibold">- Anu M., Organizer</p>
//               </div>
//             </div>
//           </section>

//           {/* Platform Stats */}
//           <section className="bg-white py-16 text-center">
//             <h2 className="text-2xl font-bold mb-8 text-gray-800">Trusted by Event Planners Across Nepal</h2>
//             <div className="flex justify-center gap-12 text-lg font-semibold text-purple-700">
//               <div>
//                 <p>1000+ Artists</p>
//               </div>
//               <div>
//                 <p>500+ Events Booked</p>
//               </div>
//               <div>
//                 <p>4.8/5 Avg Rating</p>
//               </div>
//             </div>
//           </section>
//         </>
//       )}

//       {/* For logged-in clients */}
//       {user?.role === 'client' && (
//         <RecommendedArtists clientId={user._id} />
//       )}

//       <Footer />
//     </>
//   );
// };

// export default HomePage;


// // import React, { useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import Navbar from '../components/Navbar';
// // import Footer from '../components/Footer';
// // import Slider from '../components/Slider';
// // import CategorySection from '../components/CategorySection';
// // import RecommendedArtists from '../components/RecommendedArtists';
// // import { useUserStore } from '../stores/useUserStore';

// // const HomePage = () => {
// //   const location = useLocation();
// //   const user = useUserStore((state) => state.user);

// //   useEffect(() => {
// //     if (location.state?.scrollTo) {
// //       const section = document.getElementById(location.state.scrollTo);
// //       if (section) {
// //         setTimeout(() => {
// //           section.scrollIntoView({ behavior: 'smooth' });
// //         }, 100);
// //       }
// //     }
// //   }, [location]);

// //   return (
// //     <>
// //       <Navbar />
// //       <Slider />
// //       <CategorySection />

// //       {!user && (
// //         <>
// //           {/* Hero Section */}
// //           <section className="text-center py-20 bg-gradient-to-br from-purple-100 to-indigo-50">
// //             <h1 className="text-4xl font-bold mb-4">Find & Book Artists for Your Events</h1>
// //             <p className="text-lg text-gray-700 mb-6">Discover singers, dancers, DJs, emcees, and more with ease.</p>
// //             <div className="space-x-4">
// //               <a
// //                 href="/signup"
// //                 className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
// //               >
// //                 Get Started
// //               </a>
// //               <a
// //                 href="/about"
// //                 className="px-6 py-3 border border-purple-600 text-purple-600 rounded hover:bg-purple-100 transition"
// //               >
// //                 Learn More
// //               </a>
// //             </div>
// //           </section>

// //           {/* Top Categories Section */}
// //           <section className="py-16 bg-white text-center">
// //             <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
// //               <div className="bg-purple-100 rounded-lg p-6 hover:shadow-lg transition">
// //                 <p className="font-semibold text-lg">🎤 Singers</p>
// //               </div>
// //               <div className="bg-indigo-100 rounded-lg p-6 hover:shadow-lg transition">
// //                 <p className="font-semibold text-lg">💃 Dancers</p>
// //               </div>
// //               <div className="bg-pink-100 rounded-lg p-6 hover:shadow-lg transition">
// //                 <p className="font-semibold text-lg">🎧 DJs</p>
// //               </div>
// //               <div className="bg-yellow-100 rounded-lg p-6 hover:shadow-lg transition">
// //                 <p className="font-semibold text-lg">🎤 Emcees</p>
// //               </div>
// //             </div>
// //           </section>

// //           {/* Featured Artists Section */}
// //           <section className="py-16 bg-gray-100 text-center">
// //             <h2 className="text-3xl font-bold mb-8">Featured Artists</h2>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
// //               {[1, 2, 3, 4].map((i) => (
// //                 <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
// //                   <div className="h-40 bg-gray-200 rounded mb-4"></div>
// //                   <h3 className="font-semibold text-lg">Artist Name {i}</h3>
// //                   <p className="text-sm text-gray-600">Singer • Kathmandu</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>

// //           {/* FAQs Section */}
// //           <section className="py-16 bg-gray-50 text-center">
// //             <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
// //             <div className="max-w-3xl mx-auto text-left space-y-6 px-4">
// //               <div>
// //                 <h3 className="font-semibold text-lg">How do I book an artist?</h3>
// //                 <p className="text-gray-600">Sign up, browse artists, and send a booking request from their profile.</p>
// //               </div>
// //               <div>
// //                 <h3 className="font-semibold text-lg">Is there any booking fee?</h3>
// //                 <p className="text-gray-600">No platform fees for clients. Artists may set their own rates.</p>
// //               </div>
// //               <div>
// //                 <h3 className="font-semibold text-lg">Can I contact artists before booking?</h3>
// //                 <p className="text-gray-600">Yes! You can message verified artists to clarify details.</p>
// //               </div>
// //             </div>
// //           </section>

// //           {/* Signup CTA */}
// //           <section className="bg-indigo-600 text-white text-center py-10">
// //             <h3 className="text-xl font-semibold mb-2">Ready to Book Your First Artist?</h3>
// //             <a
// //               href="/signup"
// //               className="bg-white text-indigo-600 px-6 py-2 rounded font-medium hover:bg-gray-100 transition"
// //             >
// //               Create Account
// //             </a>
// //           </section>
// //         </>
// //       )}

// //       {user?.role === 'client' && <RecommendedArtists clientId={user._id} />}
// //       <Footer />
// //     </>
// //   );
// // };

// // export default HomePage;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import CategorySection from '../components/CategorySection';
import RecommendedArtists from '../components/RecommendedArtists';
import { useUserStore } from '../stores/useUserStore';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Slider />
      <CategorySection />

      {user?.role === 'client' && <RecommendedArtists clientId={user._id} />}

      <Footer />
    </>
  );
};

export default HomePage;

