import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/Footer";
import Profile from "../../users/pages/Profile";

import {
  allBooksAdminApi,
  deleteAUserAPI,
  deleteAUserBookAPI,
  getAllUsersApi,
} from "../../services/allApis";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { serverURL } from "../../services/serverURL";

export const AdminBooks = () => {
  const [bookListSatus, setBookListStatus] = useState(true);
  const [usersStatus, setUsersStatus] = useState(false);
  const [token, setToken] = useState("");

  const [allBooks, setAllBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const [toolSearch, setToolSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const [showProfile, setShowProfile] = useState(false);

  /* ================= API ================= */
  const getAllAdminBooks = async (token) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await allBooksAdminApi(reqHeader);
    if (result.status === 200) setAllBooks(result.data);
  };

  const getAllUsers = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllUsersApi(reqHeader);
    if (result.status === 200) setUsers(result.data);
  };

  /* ================= DELETE ================= */
  const handleDeleteBook = async (id) => {
    if (!window.confirm("Delete this tool?")) return;
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await deleteAUserBookAPI(id, reqHeader);
    if (result.status === 200) getAllAdminBooks(token);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await deleteAUserAPI(id, reqHeader);
    if (result.status === 200) getAllUsers();
  };

  /* ================= INIT ================= */
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setToken(t);
    getAllAdminBooks(t);
  }, []);

  useEffect(() => {
    if (usersStatus) getAllUsers();
  }, [usersStatus]);

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <AdminSidebar />

        <div className="p-10 pb-24">

          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold tracking-wide">
              Tool / User Management
            </h1>

            <button
              onClick={() => setShowProfile(true)}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-indigo-500/30
                         border border-cyan-400 text-cyan-300 hover:from-cyan-500/40
                         hover:to-indigo-500/40 transition shadow-lg"
            >
              Add Tool <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* ================= TABS ================= */}
          <div className="flex justify-center gap-3 mb-10">
            {["Tools", "Users"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setBookListStatus(tab === "Tools");
                  setUsersStatus(tab === "Users");
                }}
                className={`px-8 py-3 rounded-xl transition ${
                  (tab === "Tools" && bookListSatus) ||
                  (tab === "Users" && usersStatus)
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ================= TOOLS ================= */}
          {bookListSatus && (
            <>
              <input
                type="text"
                placeholder="Search tools..."
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                className="search-input mb-10"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {allBooks
    .filter((b) =>
      b.title?.toLowerCase().includes(toolSearch.toLowerCase())
    )
    .map((book) => (
      <div
        key={book._id}
        className="
          bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-2xl
          p-4 text-white
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-[0_20px_40px_rgba(59,130,246,0.25)]
        "
      >
        {/* IMAGE + CATEGORY */}
        <div className="relative">
          <img
            src={book.imgUrl}
            alt={book.title}
            className="w-full h-44 object-cover rounded-xl mb-3"
          />

          {book.category && (
            <span
              className="
                absolute top-3 left-3
                px-3 py-1 rounded-full
                text-xs font-semibold
                bg-gradient-to-r from-indigo-500 to-cyan-500
                text-white shadow-lg
              "
            >
              {book.category}
            </span>
          )}
        </div>

        {/* TITLE */}
        <p className="text-gray-300 text-sm truncate">
          {book.title}
        </p>

        {/* PRICE */}
        <p className="font-semibold text-amber-400">
          Rent – ₹{book.price ?? "N/A"}
        </p>

        {/* DELETE BUTTON */}
        <button
          onClick={() => handleDeleteBook(book._id)}
          className="
            mt-4 w-full py-2 rounded-xl
            bg-red-500/20 border border-red-400/30
            text-red-300 hover:bg-red-500/30
            transition
          "
        >
          Delete Tool
        </button>
      </div>
    ))}
</div>

            </>
          )}

          {/* ================= USERS ================= */}
          {usersStatus && (
            <>
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="search-input mb-10"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {users
    // ❌ EXCLUDE ADMIN
    .filter(
      (u) =>
        u.email !== "admin" &&
        u.username?.toLowerCase() !== "admin"
    )
    // 🔍 SEARCH
    .filter((u) => {
      if (!userSearch) return true;
      const key = userSearch.toLowerCase();
      return (
        u.username?.toLowerCase().includes(key) ||
        u.email?.toLowerCase().includes(key)
      );
    })
    .map((user) => (
      <div
        key={user._id}
        className="
          bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-2xl
          p-6 text-white
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-[0_20px_40px_rgba(59,130,246,0.25)]
        "
      >
        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          {user.profile ? (
            <img
              src={`${serverURL}/uploads/${user.profile}`}
              alt={`${user.username} profile`}
              className="h-24 w-24 rounded-full object-cover mb-4
                         border-2 border-cyan-400/50"
            />
          ) : (
            <div
              className="h-24 w-24 rounded-full mb-4
                         flex items-center justify-center
                         bg-cyan-500/20 text-cyan-300 text-2xl font-bold"
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* USER INFO */}
        <h2 className="text-xl text-cyan-400 font-semibold text-center mb-3">
          {user.username}
        </h2>

        <div className="space-y-1 text-sm text-white/80">
          <p>
            <span className="text-white/50">Email:</span>{" "}
            {user.email || "—"}
          </p>

          <p>
            <span className="text-white/50">Mobile:</span>{" "}
            {user.mob || "—"}
          </p>

          <p>
            <span className="text-white/50">Address:</span>{" "}
            {user.address || "—"}
          </p>

          <p>
            <span className="text-white/50">Aadhar:</span>{" "}
            {user.aadhar || "—"}
          </p>

          

          

          <p className="italic text-white/60 pt-2">
            Status : {user.bio || "No bio provided"}
          </p>
        </div>

        {/* DELETE BUTTON */}
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="
            mt-5 w-full py-2 rounded-xl
            bg-red-500/20 border border-red-400/30
            text-red-300 hover:bg-red-500/30
            transition
          "
        >
          Delete User
        </button>
      </div>
    ))}
</div>

            </>
          )}
        </div>
      </div>

      {/* ================= PROFILE MODAL ================= */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-2xl max-w-3xl w-full">
            <Profile />
          </div>
        </div>
      )}

      <Footer />

      {/* ================= STYLES ================= */}
      <style>
        {`
          .tool-card, .user-card {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 20px;
            padding: 16px;
            transition: all 0.3s ease;
          }

          .search-input {
            width: 100%;
            max-width: 420px;
            padding: 14px;
            border-radius: 16px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
          }

          .delete-btn {
            width: 100%;
            margin-top: 12px;
            padding: 10px;
            border-radius: 12px;
            background: rgba(239,68,68,0.2);
            color: #f87171;
            border: 1px solid #f87171;
          }
        `}
      </style>
    </>
  );
};
