
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ClientSignUp from "./pages/ClientSignUp";



import ArtistSignUp from "./pages/ArtistSignUp";
import SignUpSelect from "./pages/SignUpSelect";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

import ArtistBookingForm from "./pages/ArtistBooking";
import ClientPostsPage from "./pages/ClientPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import BookingCalendar from "./pages/BookingCalendar";

import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistProfile from "./pages/ArtistProfile";


import SearchResult from "./pages/SearchResult";

import { Toaster } from "react-hot-toast";

function App() {
  

  return (

    <div >
      <Router>
        <Routes>
          <Route path="/" element = { <HomePage />} />
          <Route path="/login" element = { <Login />} />
          < Route path="/clientSignup" element = { <ClientSignUp /> } />
          <Route path="/artistSignup" element={<ArtistSignUp />} />
          <Route path="/signup-select" element={<SignUpSelect />} />
          <Route path="/about" element={<About />} />
          <Route path="/artistprofile" element={<ArtistProfile />} />
          <Route path="/artistdash" element={<ArtistDashboard />} />
         


          <Route path="/artist-booking" element={<ArtistBookingForm />} />

          <Route path="/job-post" element={<JobPostForm />} />

          <Route path="/booking-calendar" element={<BookingCalendar />} />

          <Route path="/search" element={<SearchResult />} />


        </Routes>     
      </Router> 
      
      <Toaster />      
    </div>
       
      
  )
}

export default App;
