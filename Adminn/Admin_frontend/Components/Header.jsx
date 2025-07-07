import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/admin-login");
  }
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 border-b bg-white">
      <div className="text-lg font-semibold text-gray-700">Admin Panel</div>
      <button onClick={handleLogout} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Logout
      </button>
    </div>
  );
};

export default Header;
