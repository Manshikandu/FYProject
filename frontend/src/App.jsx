import React from "react";
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

import MainLayout from "./components/MainLayout";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/clientSignup" element={<ClientSignUp />} />
        <Route path="/artistSignup" element={<ArtistSignUp />} />
        <Route path="/signup-select" element={<SignUpSelect />} />

        {/* Pages WITH Navbar/Footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/artist-booking"
          element={
            <MainLayout>
              <ArtistBookingForm />
            </MainLayout>
          }
        />
        <Route
          path="/post"
          element={
            <MainLayout>
              <ClientPostsPage />
            </MainLayout>
          }
        />
        <Route
          path="/create-post"
          element={
            <MainLayout>
              <CreatePostPage />
            </MainLayout>
          }
        />
        <Route
          path="/booking-calendar"
          element={
            <MainLayout>
              <BookingCalendar />
            </MainLayout>
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;
