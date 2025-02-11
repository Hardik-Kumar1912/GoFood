import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);

  const data = useCart();

  // Check authToken on component mount
  useEffect(() => {
    setIsLoggedIn(!!authToken);
  }, [authToken]);

  // New useEffect to refresh page and update state if authToken changes
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token !== authToken) {
        setAuthToken(token); // Update the authToken state
        setIsLoggedIn(!!token); // Update isLoggedIn
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [authToken]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setAuthToken(null); // Reset authToken state
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-green-600 border-b border-green-700">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* Navbar Brand */}
        <NavLink to="/" className="text-lg md:text-2xl font-bold text-white">
          GoFood
        </NavLink>

        {/* Navbar Links */}
        <div className="flex flex-wrap items-center space-x-4 md:space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium text-sm md:text-base text-white hidden lg:block ${
                isActive ? "text-green-200" : "hover:text-green-300"
              }`
            }
          >
            Home
          </NavLink>

          {isLoggedIn ? (
            <div className="flex flex-wrap items-center space-x-4 md:space-x-6">
              <NavLink
                to="/myOrder"
                className={({ isActive }) =>
                  `font-medium text-sm md:text-base text-white ${
                    isActive ? "text-green-200" : "hover:text-green-300"
                  }`
                }
              >
                MyOrders
              </NavLink>
              <button
                onClick={handleLogout}
                className="font-medium text-sm md:text-base text-white hover:text-green-300"
              >
                Logout
              </button>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative font-medium text-sm md:text-base text-white ${
                    isActive ? "text-green-200" : "hover:text-green-300"
                  }`
                }
                onClick={() => setCartView(true)} // Show modal when clicked
              >
                MyCart
                {data.length !== 0 && (
                  <span className="absolute top-[-8px] right-[-12px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {data.length}
                  </span>
                )}
              </NavLink>

              {/* Modal Component */}
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center space-x-4 md:space-x-6">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `font-medium text-sm md:text-base text-white ${
                    isActive ? "text-green-200" : "hover:text-green-300"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/createuser"
                className={({ isActive }) =>
                  `font-medium text-sm md:text-base text-white ${
                    isActive ? "text-green-200" : "hover:text-green-300"
                  }`
                }
              >
                SignUp
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
