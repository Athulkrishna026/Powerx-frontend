import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverURL } from "../../services/serverURL"; // adjust path if needed
import { getUserProfileAPI } from "../../services/allApis";

const UserProfile = () => {
  const navigate = useNavigate();

  // initial values — will be populated from API
  const [user, setUser] = useState({
    username: "",
    password: "",
    bio: "",
    profile: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("bio", user.bio);

      if (profileFile) {
        formData.append("profile", profileFile);
      }

      const res = await fetch(`${serverURL}/user-profile-update`, {
        method: "PUT",
        headers: reqHeader,
        body: formData,
      });

      const result = await res.json();

      if (res.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Profile update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await getUserProfileAPI({ Authorization: `Bearer ${token}` });
      if (res.status === 200) {
        const data = res.data;
        setUser({
          username: data.username || "",
          password: "",
          bio: data.bio || "",
          profile: data.profile || "",
        });

        if (data.profile) {
          setProfilePreview(`${serverURL}/uploads/${data.profile}`);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center px-4">

      {/* Glass Card */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              profilePreview ||
              "https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />

          <label className="mt-3 text-sm text-indigo-400 cursor-pointer hover:underline">
            Change Profile Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          <h2 className="mt-4 text-2xl font-bold text-white">
            User Profile
          </h2>
          <p className="text-white/60 text-sm">
            Manage your personal information
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Username */}
          <div>
            <label className="block text-white/70 text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 text-white
                         border border-white/20 outline-none
                         focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/70 text-sm mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Leave blank to keep same"
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 text-white placeholder-white/40
                         border border-white/20 outline-none
                         focus:border-indigo-500"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-white/70 text-sm mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 text-white
                         border border-white/20 outline-none
                         focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl
                       bg-white/10 text-white
                       border border-white/20
                       hover:bg-white/20 transition"
          >
            ← Back
          </button>

          <button
            onClick={handleUpdate}
            className="px-8 py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:scale-105 transition shadow-lg"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
