// components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Show footer only on home page
  const showFooter = location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className="pt-[80px] min-h-screen">
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
