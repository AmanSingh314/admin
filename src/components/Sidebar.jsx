import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUsers, FaNewspaper, FaUsersCog } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div
      className={`fixed h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col py-6 z-50 ${
        isOpen ? "w-64" : "w-20"
      } `}
    >
     
      <div className="flex flex-col items-center transition-all duration-300">
        {isOpen && (
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border border-gray-500 bg-gray-700 p-1 hover:scale-105 transition-transform duration-300">
            <img
              src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
        {isOpen && <span className="text-2xl font-bold text-gray-300 mt-3">Admin</span>}
      </div>

     
      <nav className={`flex-1 w-full px-3 ${isOpen ? "mt-12" : "mt-36"}`}>
        <ul className="space-y-3">
          {[
            { to: "/dashboard", icon: <FaHome size={25} />, label: "Dashboard" },
            { to: "/users", icon: <FaUsers size={25} />, label: "Users" },
            { to: "/feeds", icon: <FaNewspaper size={25} />, label: "Feeds" },
            { to: "/communities", icon: <FaUsersCog size={25} />, label: "Communities" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => handleLinkClick(to)}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  activeLink === to ? "bg-purple-700 scale-105 shadow-lg" : "hover:bg-gray-700"
                }`}
              >
                {icon}
                {isOpen && <span className="ml-3">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>


      <button
        onClick={toggleSidebar}
        className="absolute -right-5 top-6 z-50 bg-gray-700 text-white text-2xl w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-transform duration-300 hover:rotate-180"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default Sidebar;
