import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";

const Navbar = ({ notifications = [] , isOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`fixed top-0  flex justify-between items-center  bg-gradient-to-r from-black to-purple-800 dark:from-gray-900 dark:to-gray-800 text-white p-6 shadow-md z-10  shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ${isOpen ? " w-[calc(100%-16rem)]" : "w-[calc(100%-5rem)]"}`}>
     
        <h1 className="text-xl font-bold pl-3 z-10">MHindu</h1>
        <div className="flex items-center space-x-6 ">
          
          <div className="relative cursor-pointer ">
            <IoMdNotifications size={30} className="hover:scale-105 transition-transform duration-300 z-3" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {notifications.length}
              </span>
            )}
          </div>

          
          <div 
            className="relative "
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <CgProfile size={40} className="cursor-pointer hover:scale-105 transition-transform duration-300 " />

            
            <div 
              className={`absolute right-0 mt-2 w-34 bg-gray-800 border border-gray-600 text-white rounded-lg shadow-lg p-3 transition-all duration-300 ${
                showMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-red-900 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default Navbar;
