// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

// Pages and Components
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

import Login from "./pages/Login";
import SignUpSelect from "./pages/SignUpSelect";
import ClientSignUp from "./pages/ClientSignUp";
import ArtistSignUp from "./pages/ArtistSignUp";

import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistProfilee from "./pages/ArtistPages";
import EditArtist from "./pages/EditArtist";
import PrivateRoute from "./pages/PrivateRoute";
import ArtistSideBooking from "./pages/Artist/ArtistSideBooking";

import ClientPostsPage from "./pages/ClientPostsPage";
import ArtistBookingForm from "./pages/ArtistBooking";
import MyBookings from "./pages/MyBookings";
import ArtistsList from "./pages/ArtistList";
import ArtistProfileView from "./pages/Client/ArtistProfileView";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* All pages that need Navbar + Footer go under Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            
            <Route path="posts" element={<ClientPostsPage />} />
            <Route path="book" element={<ArtistBookingForm />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="category/:categoryName" element={<ArtistsList />} />
            <Route path="artist/:id" element={<ArtistProfileView />} />
        
           
          </Route>

          {/* Standalone pages (no navbar/footer if needed) */}
          <Route path="artistdash" element={<ArtistDashboard />} />
           <Route path="profile" element={<PrivateRoute><ArtistProfilee /></PrivateRoute>} />
            <Route path="editartist" element={<PrivateRoute><EditArtist /></PrivateRoute>} />
            <Route path="artist-bookings" element={<ArtistSideBooking />} />
            
          <Route path="/login" element={<Login />} />
          <Route path="/clientSignup" element={<ClientSignUp />} />
          <Route path="/artistSignup" element={<ArtistSignUp />} />
          <Route path="/signup-select" element={<SignUpSelect />} />
        </Routes>

        <Toaster />
      </Router>
    </div>
  );
}

export default App;
