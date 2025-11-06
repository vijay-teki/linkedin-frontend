import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify"; // ✅ Add toastify import

export default function Feed() {
  const { user: loggedUser } = useContext(UserContext);
  const [user, setUser] = useState(loggedUser);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Load fresh profile + posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profile } = await API.get("/users/me");
        setUser(profile);

        const { data: allPosts } = await API.get("/posts");
        setPosts(allPosts.reverse());
      } catch (err) {
        console.error("Feed fetch error:", err);
        toast.error("⚠️ Unable to load feed. Please re-login.");
      }
    };
    fetchData();
  }, []);

  // ✅ Create Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !file) {
      toast.warn("⚠️ Please add text or upload an image before posting!");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("text", text);
      if (file) fd.append("media", file);

      await API.post("/posts", fd);

      // ✅ Success feedback
      toast.success("✅ Post created successfully!");

      // Reset input fields
      setText("");
      setFile(null);

      // Refresh posts
      const { data } = await API.get("/posts");
      setPosts(data.reverse());
    } catch (err) {
      console.error("Post creation error:", err);
      toast.error(err.response?.data?.message || "❌ Failed to create post");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-20">
        <div className="max-w-7xl mx-auto flex justify-between px-4 gap-6">
          {/* LEFT SIDEBAR — Fixed */}
          <div className="hidden md:block w-1/4 h-fit sticky top-24 self-start">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-5 text-center">
              <img
                src={
                  user?.profileImage?.url ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border border-gray-300 shadow-sm"
              />
              <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{user?.email}</p>
              <p className="text-gray-600 text-sm italic">
                {user?.bio || "Aspiring professional at LinkedIn Clone"}
              </p>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>Profile views</span>
                  <span className="text-[#0A66C2] font-medium">54</span>
                </div>
                <div className="flex justify-between">
                  <span>Connections</span>
                  <span className="text-[#0A66C2] font-medium">213</span>
                </div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="text-sm text-gray-700 hover:bg-gray-100 rounded-lg py-2 cursor-pointer">
                <i className="fa-solid fa-bookmark text-gray-400 mr-2"></i>
                My Items
              </div>
            </div>
          </div>

          {/* MAIN FEED (Scrollable area) */}
          <div className="w-full md:w-2/4 overflow-y-auto max-h-[calc(100vh-100px)] pr-2">
            {/* CREATE POST */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    user?.profileImage?.url ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <input
                  type="text"
                  placeholder="Start a post"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 border rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                />
              </div>

              {file && (
                <div className="mt-2 text-sm text-gray-600">Attached: {file.name}</div>
              )}

              <div className="flex justify-between items-center mt-3">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <i className="fa-solid fa-image text-blue-600"></i>
                  <span>Photo</span>
                  <input
  type="file"
  accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.txt"
  className="hidden"
  onChange={(e) => setFile(e.target.files[0])}
/>

                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-[#0A66C2] text-white px-5 py-1.5 rounded-full hover:bg-[#004182]"
                >
                  Post
                </button>
              </div>
            </div>

            {/* POSTS */}
            {posts.map((p) => (
  <div
    key={p._id}
    className="bg-white rounded-lg shadow p-4 mb-4 hover:shadow-md transition"
  >
    {/* User Header */}
    <div className="flex items-center gap-3 mb-2">
      <img
        src={
          p.author?.profileImage?.url ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
        alt="user"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h4 className="font-semibold">{p.author?.name}</h4>
        <p className="text-xs text-gray-500">{p.author?.email}</p>
      </div>
    </div>

    {/* Post Text */}
    <p className="text-gray-800 mb-3">{p.text}</p>

    {/* ✅ Media Section */}
    {p.media?.url && (
      <>
        {/* 🎬 Videos */}
        {p.media.type?.includes("video") ? (
          <video
            src={p.media.url}
            controls
            className="w-full rounded-lg max-h-96 object-cover"
          />

        /* 🖼️ Images */
        ) : p.media.type?.includes("image") ? (
          <img
            src={p.media.url}
            alt="post"
            className="w-full rounded-lg object-cover max-h-96"
          />

        /* 📄 PDFs */
        ) : p.media.type?.includes("pdf") ? (
          <iframe
            src={p.media.url}
            title="PDF Viewer"
            className="w-full h-96 border rounded-lg"
          />

        /* 📝 Text files */
        ) : p.media.type?.includes("text") ? (
          <iframe
            src={p.media.url}
            title="Text Viewer"
            className="w-full h-60 bg-gray-50 border rounded-lg p-2 font-mono text-sm"
          />

        /* 📚 Other files (docx, pptx, etc.) */
        ) : (
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              p.media.url
            )}&embedded=true`}
            title="Document Viewer"
            className="w-full h-96 border rounded-lg"
          />
        )}
      </>
    )}
  </div>
))}

          </div>

          {/* RIGHT SIDEBAR — Fixed */}
          <div className="hidden md:block w-1/4 h-fit sticky top-24 self-start">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Add to your feed</h3>
              <div className="space-y-3">
                {["John Doe", "Sarah Lee", "Tech Updates"].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="suggest"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                    <button className="text-[#0A66C2] text-sm border border-[#0A66C2] px-2 py-0.5 rounded-full hover:bg-[#0A66C2] hover:text-white transition">
                      + Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
