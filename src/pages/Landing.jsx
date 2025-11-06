import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="LinkedIn"
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-blue-700">
            LinkedIn Clone
          </span>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            Join now
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-1 flex-col md:flex-row justify-center items-center px-10 md:px-24">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6 text-center md:text-left">
            Find jobs, connections, and insights to grow your career
          </h1>
          <p className="text-gray-600 mb-8 text-lg text-center md:text-left">
            Join our community and connect with professionals around the world.
          </p>

          <div className="flex flex-col space-y-4 max-w-sm mx-auto md:mx-0">
            <Link
              to="/login"
              className="text-center bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Sign in with Email
            </Link>
            <p className="text-gray-700 text-center">
              New here?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Join now
              </Link>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="https://static.licdn.com/aero-v1/sc/h/dkfub4sc7jgzg3o31flfr91rv"
            alt="Career growth illustration"
            className="rounded-2xl shadow-lg max-w-sm"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t mt-auto">
        © 2025 LinkedIn Clone — All Rights Reserved
      </footer>
    </div>
  );
}
