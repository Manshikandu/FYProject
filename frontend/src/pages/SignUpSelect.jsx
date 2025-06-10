import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

   const handleClientClick = () => {
    navigate("/clientSignup");
  };
  const handleArtistClick = () => {
    navigate("/artistSignup");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f4f1e8] p-4">
      <div className="flex flex-col md:flex-row items-center gap-16">
       
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-18">
            <img
              src="/src/assets/welcome.svg" 
              alt="welcome"
              className="h-100" 
            />
            
          </div>
         
        </div>

        {/* Right Side: Card with Options */}
        <div className="bg-white p-12 rounded-xl shadow-md text-center w-120 h-80">
          <h2 className="text-2xl font-semibold mb-8 ">Are you</h2>
          <button
            onClick={handleClientClick}
           className="w-full bg-[#1da1f2] text-white py-2 rounded-full mb-4 hover:bg-[#0d8ddb] transition">
            Client
          </button>
          <div className="mb-4 font-medium text-gray-600">Or</div>
          <button
          onClick={handleArtistClick}
           className="w-full bg-[#1da1f2] text-white py-2 rounded-full hover:bg-[#0d8ddb] transition">
            Artists
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
