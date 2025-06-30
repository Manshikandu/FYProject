// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, X, LogOut, User, Bell } from 'lucide-react';
// import { useUserStore } from '../../stores/useUserStore';

// const ArtistNavbar = () => {
//   const { user, logout } = useUserStore();
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);


//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full bg-purple-300 shadow-md z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
//         <nav className="flex items-center justify-between py-4">
//           <Link to="/" className="text-2xl font-bold text-black">KalaConnect</Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-6 text-lg">
//             <button onClick={() => navigate('/artisthome')} className="hover:text-purple-500 transition-colors">Home</button>
//             <button onClick={() => navigate('/artistdash')} className="hover:text-purple-500 transition-colors">Dashboard</button>
//             <button onClick={() => navigate('/my-bookings')} className="hover:text-purple-500 transition-colors">Bookings</button>
//             <button onClick={() => navigate('/profile')} className="hover:text-purple-500 transition-colors">Profile</button>
//             <button onClick={() => navigate('/post')} className="hover:text-purple-500 transition-colors">Posts</button>
//             <Link to="/notifications" className="text-purple-500 hover:text-black">
//               <Bell />
//             </Link>

//             {/* User Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setUserDropdown(!userDropdown)}
//                 className="bg-black text-white px-3 py-2 rounded-full hover:bg-purple-500 transition"
//               >
//                 <User size={18} />
//               </button>
//               {userDropdown && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <LogOut size={16} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden text-black"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </nav>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col gap-4 py-4">
//             <button onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</button>
//             <button onClick={() => { setMenuOpen(false); navigate('/artistdash'); }}>Dashboard</button>
//             <button onClick={() => { setMenuOpen(false); navigate('/my-bookings'); }}>Bookings</button>
//             <button onClick={() => { setMenuOpen(false); navigate('/profile'); }}>Profile</button>
//             <button onClick={() => { setMenuOpen(false); navigate('/post'); }}>Posts</button>
//             <Link to="/notifications" onClick={() => setMenuOpen(false)}>Notifications</Link>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };


// export default ArtistNavbar;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Bell } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

const ArtistNavbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCategoryScroll = () => {
    const section = document.getElementById('categories');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/artisthome', { state: { scrollTo: 'categories' } });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-purple-300 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">KalaConnect</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-8 text-lg font-medium">
            <button onClick={() => navigate('/artisthome')} className="hover:text-purple-600 transition">Home</button>
            <button onClick={() => navigate('/artistdash')} className="hover:text-purple-600 transition">Dashboard</button>
            <button onClick={() => navigate('/my-bookings')} className="hover:text-purple-600 transition">Bookings</button>
            <button onClick={() => navigate('/profile')} className="hover:text-purple-600 transition">Profile</button>
            <button onClick={() => navigate('/post')} className="hover:text-purple-600 transition">Posts</button>
            <button onClick={handleCategoryScroll} className="hover:text-purple-600 transition">Category</button>

            {/* Notification Icon */}
            <Link to="/notifications" className="text-purple-600 hover:text-black transition" aria-label="Notifications">
              <Bell size={20} />
            </Link>

            {/* User Icon with Logout */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="bg-black text-white px-3 py-2 rounded-full hover:bg-purple-600 transition"
                aria-label="User menu"
              >
                <User size={18} />
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-black">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-start gap-4 py-4 text-base font-medium">
            <button onClick={() => { setMenuOpen(false); navigate('/artisthome'); }}>Home</button>
            <button onClick={() => { setMenuOpen(false); navigate('/artistdash'); }}>Dashboard</button>
            <button onClick={() => { setMenuOpen(false); navigate('/my-bookings'); }}>Bookings</button>
            <button onClick={() => { setMenuOpen(false); navigate('/profile'); }}>Profile</button>
            <button onClick={() => { setMenuOpen(false); navigate('/post'); }}>Posts</button>
            <button onClick={() => { setMenuOpen(false); handleCategoryScroll(); }}>Category</button>
            <Link to="/notifications" onClick={() => setMenuOpen(false)}>Notifications</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ArtistNavbar;
