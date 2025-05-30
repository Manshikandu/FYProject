import React from "react";
// import './App.css'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import { Toaster } from "react-hot-toast";
// import { Router, RouterProvider } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
        <div >
<Router>
<Routes>
<Route path="/" element = { <HomePage />} />
 <Route path="/login" element = { <Login />} />
< Route path="/signup" element = { <SignUp /> } />
  </Routes>
 
</Router>
         
       
          
         
         
        
    
        </div>
    
  )
}

export default App
