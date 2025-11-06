import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // ✅ Add this line

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    toast.success("✅ Logged in successfully!"); // ✅ Success toast
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("👋 Logged out successfully!"); // ✅ Info toast
    setTimeout(() => {
      window.location.replace("/");
    }, 1200);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
