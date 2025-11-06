import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await API.get("/users/me");
        setUser(me.data);

        const allPosts = await API.get("/posts");
        const myPosts = allPosts.data.filter((p) => p.author._id === me.data._id);
        setPosts(myPosts);
      } catch (err) {
        console.error("Profile fetch error:", err);
        alert("Please login to view your profile.");
        nav("/login");
      }
    };
    fetchData();
  }, [nav]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="pt-24 bg-gray-100 min-h-screen px-4 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center mb-8">
            <img
              src={
                user.profileImage?.url ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white mx-auto shadow-md object-cover"
            />

            <h2 className="text-2xl font-semibold mt-3 text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="mt-3 text-gray-700 text-center max-w-md mx-auto">
              {user.bio || "No bio available yet."}
            </p>

            <div className="mt-5 flex justify-center gap-4">
              <button
                onClick={() => nav("/edit-profile")}
                className="bg-[#0A66C2] text-white px-4 py-2 rounded-full font-medium hover:bg-[#004182] transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => nav("/feed")}
                className="border border-[#0A66C2] text-[#0A66C2] px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition"
              >
                View Feed
              </button>
            </div>
          </div>

          {/* Posts Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Your Posts
            </h3>

            {posts.length === 0 ? (
              <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500">
                  You haven’t posted anything yet. Create a post to share updates.
                </p>
              </div>
            ) : (
              posts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-5 mb-4 rounded-lg shadow-sm border border-gray-100 hover:shadow transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={
                        user.profileImage?.url ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(p.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{p.text}</p>

                  {p.media?.url && (
                    <>
                      {p.media.type === "video" ? (
                        <video
                          controls
                          className="rounded-lg w-full mt-2"
                          src={p.media.url}
                        />
                      ) : (
                        <img
                          src={p.media.url}
                          alt="post"
                          className="rounded-lg w-full mt-2"
                        />
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm py-6 mt-8">
            © 2025 LinkedIn Clone — All Rights Reserved
          </footer>
        </div>
      </div>
    </>
  );
}
