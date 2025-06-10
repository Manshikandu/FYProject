import React from "react";
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login"
import ClientSignUp from "./pages/ClientSignUp"
import ArtistSignUp from "./pages/ArtistSignUp";
import SignUpSelect from "./pages/SignUpSelect";

import HomePage from "./pages/HomePage";
import About from "./pages/About";

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
          
        </Routes>     
      </Router> 
      
      <Toaster />      
    </div>
    
  )
}

export default App
