import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar for public routes
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);
  if (hideNavbar) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Left - Logo */}
        <div
          onClick={() => navigate("/feed")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="LinkedIn Clone"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold text-[#0A66C2] hidden sm:block">
            LinkedIn Clone
          </span>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 justify-center mx-6">
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 px-4 py-1.5 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-6 text-gray-600">
          <button
            onClick={() => navigate("/feed")}
            className={`flex flex-col items-center text-sm ${
              location.pathname === "/feed" ? "text-[#0A66C2]" : ""
            }`}
          >
            <i className="fa-solid fa-house text-lg"></i>
            <span className="hidden sm:block">Home</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center text-sm ${
              location.pathname === "/profile" ? "text-[#0A66C2]" : ""
            }`}
          >
            <i className="fa-solid fa-user text-lg"></i>
            <span className="hidden sm:block">Me</span>
          </button>

          <button
            onClick={() => logout()}
            className="flex flex-col items-center text-sm hover:text-red-500"
          >
            <i className="fa-solid fa-right-from-bracket text-lg"></i>
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
