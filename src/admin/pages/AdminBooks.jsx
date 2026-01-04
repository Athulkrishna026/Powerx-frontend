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
import { faPlus, faToolbox, faUsers } from "@fortawesome/free-solid-svg-icons";
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
              Tool/ User Management
            </h1>

            <button
              onClick={() => setShowProfile(true)}
              className="
                px-6 py-2 rounded-xl
                bg-gradient-to-r from-cyan-500/30 to-indigo-500/30
                border border-cyan-400 text-cyan-300
                hover:from-cyan-500/40 hover:to-indigo-500/40
                transition shadow-lg
              "
            >
              Add Tool <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* ================= STATS ================= */}
         

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

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {allBooks
                  .filter((b) =>
                    b.title?.toLowerCase().includes(toolSearch.toLowerCase())
                  )
                  .map((book) => (
                    <div key={book._id} className="tool-card">
                      <div className="relative">
                        <img
                          src={book.imgUrl}
                          alt={book.title}
                          className="h-64 w-full object-cover rounded-xl"
                        />

                        {book.category && (
                          <span className="category-badge">
                            {book.category}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-lg font-semibold">
                        {book.title}
                      </h2>

                      <p className="text-amber-400 font-semibold">
                        ₹{book.price}
                      </p>

                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="delete-btn"
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users
                  .filter((u) =>
                    u.username?.toLowerCase().includes(userSearch.toLowerCase())
                  )
                  .map((user) => (
                    <div key={user._id} className="user-card">
                      {user.profile && (
                        <img
                          src={`${serverURL}/uploads/${user.profile}`}
                          alt=""
                          className="h-24 w-24 rounded-full mb-4 object-cover"
                        />
                      )}
                      <h2 className="text-cyan-400 font-semibold">
                        {user.username}
                      </h2>
                      <p>{user.email}</p>

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="delete-btn mt-4"
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
          .glass-card {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(18px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }

          .tool-card, .user-card {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 20px;
            padding: 16px;
            transition: all 0.3s ease;
          }

          .tool-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.6);
          }

          .category-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 4px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: bold;
            background: linear-gradient(135deg,#6366f1,#22d3ee);
            color: white;
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
