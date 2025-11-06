import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Add this line

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // 🧩 Load Current Profile
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get("/users/me");
        setName(data.name);
        setBio(data.bio || "");
      } catch (err) {
        console.error("Profile load error:", err);
        toast.error("⚠️ You must be logged in to edit your profile."); // ✅ Error toast
        nav("/login");
      }
    };
    load();
  }, [nav]);

  // 🧩 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      if (name) fd.append("name", name);
      if (bio) fd.append("bio", bio);
      if (file) fd.append("profileImage", file);

      await API.patch("/users/me", fd);

      // ✅ Update local user
      const me = await API.get("/users/me");
      localStorage.setItem("user", JSON.stringify(me.data));

      toast.success("✅ Profile updated successfully!"); // ✅ Success toast
      setTimeout(() => nav("/profile"), 800);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Profile update failed"); // ❌ Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 max-w-3xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
            Edit Your Profile
          </h2>

          <label className="block text-gray-600 mb-1">Full Name</label>
          <input
            className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-gray-600 mb-1">Bio</label>
          <textarea
            className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label className="block text-gray-600 mb-1">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="flex justify-center">
            <button
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
