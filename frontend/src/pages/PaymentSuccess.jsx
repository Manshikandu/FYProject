// // src/pages/PaymentSuccess.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function PaymentSuccess() {
//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h1>Payment Successful!</h1>
//       <p>Your payment has been completed successfully.</p>
//       <Link to="/">Go to Home</Link>
//     </div>
//   );
// }


// import { Button } from "../components/ui/Button";

import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
   <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-10 text-center">
  <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Payment was successful!</h1>
  <button
    onClick={() => navigate("/my-bookings")}
    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
  >
    View Bookings
  </button>
</div>

  );
}

export default PaymentSuccessPage;
