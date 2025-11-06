import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/auth/register", { name, email, password });
    loginUser(data);
    toast.success("🎉 Registration successful!");
    setTimeout(() => navigate("/feed"), 800);
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          alt="LinkedIn Clone"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-3xl font-bold text-[#0A66C2]">LinkedIn Clone</h1>
      </div>

      {/* Register Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Make the most of your professional life
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />

        <input
          type="password"
          placeholder="Password (6 or more characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
        />

        <p className="text-xs text-gray-500 mb-5 text-center">
          By clicking <strong>Agree & Join</strong>, you agree to the LinkedIn Clone’s{" "}
          <span className="text-[#0A66C2] cursor-pointer">User Agreement</span>,{" "}
          <span className="text-[#0A66C2] cursor-pointer">Privacy Policy</span>, and{" "}
          <span className="text-[#0A66C2] cursor-pointer">Cookie Policy</span>.
        </p>

        <button
          type="submit"
          className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold py-2 rounded-full transition"
        >
          Agree & Join
        </button>

        <div className="mt-6 text-center text-gray-600">
          Already on LinkedIn Clone?{" "}
          <Link to="/login" className="text-[#0A66C2] hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </form>

      <footer className="text-gray-500 text-sm mt-10">
        © 2025 LinkedIn Clone — All Rights Reserved
      </footer>
    </div>
  );
}
