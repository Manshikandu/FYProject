import { Routes, Route, Outlet } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

import Dashboard from "./pages/Dashboard";
import Artist from "./pages/Artist";
import Client from "./pages/Client";
import AdminLogin from "./AdminLogin";

function AdminApp() {
  


  return (
      
      
     <div className="h-screen flex flex-col">
      
        <Header />

        <div className="flex flex-1 overflow-hidden">
           <Sidebar /> 

         <div>
           <Outlet />
        
           {/* <main className="flex-1 p-6 overflow-auto bg-gray-50">
             <Routes>
               <Route path="/" element={<Dashboard /> }/>
               <Route path="artists" element={<Artist /> }/>
               <Route path="clients" element={<Client /> }/>
             </Routes>
           </main> */}
          
         </div>
         </div>
        
         
      
     </div>
       
      
  )
}

export default AdminApp;
