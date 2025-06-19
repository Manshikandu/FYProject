import {NavLink} from 'react-router-dom';
import {LayoutDashboard,User,CalendarCheck,Users,FileText,AlertCircle} from 'lucide-react';
import {ChevronFirst} from "lucide-react";
const Sidebar = () => {
  const links = [
    { name: 'Dashboard', icon: <LayoutDashboard />, to: '/admin' },
    { name: 'Artists', icon: <User />, to: '/admin/artists' },
    { name: 'Clients', icon: <Users />, to: '/admin/Clients' },
    { name: 'Bookings', icon: <CalendarCheck />, to: '/admin/bookings' },
    { name: 'Contracts', icon: <FileText />, to: '/admin/contracts' },
    { name: 'Issues', icon: <AlertCircle />, to: '/admin/issues' },
  ];
  return (
     <div className="w-64 h-screen bg-[#FF7EC] border-r px-6 py-4">
      <h1 className="text-2xl font-bold text-purple-700 mb-10">KalaConnect</h1>
      <nav className="flex flex-col gap-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive ? 'bg-purple-100 text-purple-800' : 'text-gray-600'
              } hover:bg-purple-50`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar;
