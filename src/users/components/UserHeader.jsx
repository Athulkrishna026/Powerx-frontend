import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { serverURL } from "../../services/serverURL";

const UserHeader = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [profileSrc, setProfileSrc] = useState(
    "https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
  );

  const logout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
  };

  useEffect(() => {
    const raw = sessionStorage.getItem("existingUser");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user.profile && user.profile !== "") {
          setProfileSrc(`${serverURL}/uploads/${user.profile}`);
        }
      } catch (e) {
        console.warn("Invalid existingUser in sessionStorage", e);
      }
    }
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full px-6 py-4 
                bg-gradient-to-r from-black via-slate-900 to-black 
                backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between pt-3 pb-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              Px
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex gap-6">
            <Link
              to="/"
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
            >
              Home
            </Link>

            <Link
              to="/user-home"
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/all-books"
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
            >
              All Tools
            </Link>

            <Link
              to="/user-feedback"
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
            >
              All Feedbacks
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative flex items-center gap-3">
  {/* Greeting Text */}
  <span className="hidden md:block text-white text-sm font-medium opacity-90">
    Hello, <span className="font-semibold">User!</span>
  </span>

  {/* Profile Image */}
  <img
    src={profileSrc}
    className="w-10 h-10 rounded-full border border-white/30 cursor-pointer
               hover:scale-105 transition"
    alt="Profile"
    onClick={() => setOpenMenu(!openMenu)}
  />

  {/* Dropdown Menu */}
  {openMenu && (
    <div
      className="absolute right-0 top-12 w-40
                 rounded-xl bg-white/10 backdrop-blur-xl
                 border border-white/20 shadow-xl
                 text-white text-sm z-50"
    >
      <Link
        to="/user-profile"
        onClick={() => setOpenMenu(false)}
        className="block px-4 py-2 hover:bg-white/20 rounded-t-xl"
      >
        👤 Profile
      </Link>

      <button
        onClick={logout}
        className="w-full text-left px-4 py-2
                   hover:bg-red-500/40 text-red-300 rounded-b-xl"
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>

        </div>

        <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      </nav>
    </>
  );
};

export default UserHeader;
