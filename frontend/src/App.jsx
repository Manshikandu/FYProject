
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import ClientSignUp from "./pages/ClientSignUp";



// import ArtistSignUp from "./pages/ArtistSignUp";
// import SignUpSelect from "./pages/SignUpSelect";
// import HomePage from "./pages/HomePage";
// import About from "./pages/About";

// import ArtistBookingForm from "./pages/ArtistBooking";
// import ClientPostsPage from "./pages/ClientPostsPage";
// import CreatePostPage from "./pages/CreatePostPage";
// import BookingCalendar from "./pages/BookingCalendar";

// import ArtistDashboard from "./pages/ArtistDashboard";
// import ArtistProfile from "./pages/ArtistProfile";


// import SearchResult from "./pages/SearchResult";

// import { Toaster } from "react-hot-toast";

// function App() {
  

//   return (

//     <div >
//       <Router>
//         <Routes>
//           <Route path="/" element = { <HomePage />} />
//           <Route path="/login" element = { <Login />} />
//           < Route path="/clientSignup" element = { <ClientSignUp /> } />
//           <Route path="/artistSignup" element={<ArtistSignUp />} />
//           <Route path="/signup-select" element={<SignUpSelect />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/artistprofile" element={<ArtistProfile />} />
//           <Route path="/artistdash" element={<ArtistDashboard />} />
         


//           <Route path="/artist-booking" element={<ArtistBookingForm />} />

//           <Route path="/job-post" element={<JobPostForm />} />

//           <Route path="/booking-calendar" element={<BookingCalendar />} />

//           <Route path="/search" element={<SearchResult />} />


//         </Routes>     
//       </Router> 
      
//       <Toaster />      
//     </div>
       
      
//   )
// }

// export default App;

import React from "react";
// import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login"
import ClientSignUp from "./pages/ClientSignUp"
import ArtistSignUp from "./pages/ArtistSignUp";
import SignUpSelect from "./pages/SignUpSelect";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ArtistDashboard from "./pages/ArtistDashboard";
//import ArtistProfile from "./pages/ArtistProfile";
import JobPostForm from "./pages/JobPostForm";
import ClientPostsPage from "./pages/ClientPostsPage"
import ArtistBookingForm from "./pages/ArtistBooking";
import MyBookings from "./pages/MyBookings";

// import ClientPostsPage from "./pages/ClientPostsPage";
// import CreatePostPage from "./pages/CreatePostPage";
import BookingCalendar from "./pages/BookingCalendar";

import ArtistDashboard from "./pages/ArtistDashboard";
//import ArtistProfile from "./pages/ArtistProfile";
import JobPostForm from "./pages/JobPostForm";
import ClientPostsPage from "./pages/ClientPostsPage"
// import ArtistBookingForm from "./pages/ArtistBooking";
// import ClientPostsPage from "./pages/ClientPostsPage";
import CreatePostPage from "./pages/CreatePostPage";
// import BookingCalendar from "./pages/BookingCalendar";

// import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistProfile from "./pages/ArtistProfile";

// import JobPostForm from "./pages/JobPostForm";
import SearchResult from "./pages/SearchResult";
import AdminApp from "./Admin/AdminApp";
import Dashboard from "./Admin/pages/Dashboard";
import Artist from "./Admin/pages/Artist";
import MyBookings from "./pages/MyBookings";

// import ArtistProfile from "./pages/ArtistProfile";


// import SearchResult from "./pages/SearchResult";

import { Toaster } from "react-hot-toast";
import AdminLogin from "./Admin/AdminLogin";
import Client from "./Admin/pages/Client";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import PrivateRoute from "./pages/PrivateRoute";
//import EditArtistProfile from "./pages/EditArtistProfile";
import ArtistProfilee from "./pages/ArtistPages";

import EditArtist from "./pages/EditArtist";




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
          <Route path="/profile" element={<PrivateRoute><ArtistProfilee /></PrivateRoute>} />
          <Route path="/editartist" element={<PrivateRoute><EditArtist /></PrivateRoute>} />
          
          <Route path="/artistdash" element={<ArtistDashboard />} />



          <Route path="/post" element={<JobPostForm />} />
          <Route path="/posts" element={<ClientPostsPage />} />
          <Route path="/artist-booking" element={<ArtistBookingForm/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>

          {/* updated version of artist and editartist page */}
          {/* <Route path="/artistpage" element={<ArtistProfilee />} />
          <Route path="/editartist" element={<PrivateRoute><EditArtist /></PrivateRoute>} /> */}

                    <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/admin/*" element={ 
            <ProtectedAdminRoute>
                <AdminApp />
            </ProtectedAdminRoute>
            } 
          >
              
             <Route index element={<Dashboard /> }/>
            <Route path="artists" element={<Artist /> }/> 
            <Route path="clients" element={<Client /> }/> 
          </Route>


        </Routes>     
      </Router> 
      
      <Toaster />      
    </div>
       
      
  )
}

export default App
