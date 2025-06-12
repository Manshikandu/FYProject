import React from "react";

import './App.css'
// import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login"
import ClientSignUp from "./pages/ClientSignUp"
import ArtistSignUp from "./pages/ArtistSignUp";
import SignUpSelect from "./pages/SignUpSelect";

import HomePage from "./pages/HomePage";
import About from "./pages/About";

import ArtistBookingForm from "./pages/ArtistBooking";

import JobPostForm from "./pages/JobPostForm";

import BookingCalendar from "./pages/BookingCalendar";

import { Toaster } from "react-hot-toast";




// import { Router, RouterProvider } from "react-router-dom"


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

          <Route path="/artist-booking" element={<ArtistBookingForm />} />

          <Route path="/job-post" element={<JobPostForm />} />

          <Route path="/booking-calendar" element={<BookingCalendar />} />
        </Routes>     
      </Router> 
      
      <Toaster />      
    </div>
       
      
  )
}

export default App
