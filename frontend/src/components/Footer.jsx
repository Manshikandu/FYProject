const Footer = () => {
  return (
    <footer className="bg-[#d9f3ea] text-gray-600 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h3 className="text-xl font-medium text-black mb-3">KalaConnect</h3>
          <p className="text-gray-400">
            Your one-stop platform to discover and book talented artists for your events. 
            Connecting creativity with opportunity.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-medium text-black mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-cyan-400">About Us</a></li>
            <li><a href="/category" className="hover:text-cyan-400">Categories</a></li>
            <li><a href="/artists" className="hover:text-cyan-400">Privacy policy</a></li>
            <li><a href="/contact" className="hover:text-cyan-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-medium text-black mb-3">Contact Us</h4>
          <p className="text-gray-500">Email: support@kalaconnect.com</p>
          <p className="text-gray-500">Phone: +977 (123) 456-7890</p>
          <div className="flex space-x-4 mt-3">
            {/* Social icons: Replace # with actual URLs */}
            <a href="#" className="hover:text-cyan-400">Facebook</a>
            <a href="#" className="hover:text-cyan-400">Instagram</a>
            <a href="#" className="hover:text-cyan-400">Twitter</a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} KalaConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
