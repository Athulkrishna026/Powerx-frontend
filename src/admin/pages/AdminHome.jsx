import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUsers,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  getToolCountAPI,
  getUserCountAPI,
  getAllAdminBookingsAPI,
  getRentalsCountAPI,
} from "../../services/allApis";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [toolCount, setToolCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [latestBookings, setLatestBookings] = useState([]);

  const navigate = useNavigate();

  /* LIVE CLOCK */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* TOOL COUNT */
  useEffect(() => {
    const fetchToolCount = async () => {
      const res = await getToolCountAPI();
      if (res.status === 200) {
        setToolCount(res.data.totalTools);
      }
    };
    fetchToolCount();
  }, []);
// RENTAL COUNT
const [rentalCount, setRentalCount] = useState(0);
  useEffect(() => {
  const fetchCount = async () => {
    const token = sessionStorage.getItem("token");
    const res = await getRentalsCountAPI({ Authorization: `Bearer ${token}` });
    if (res.status === 200) setRentalCount(res.data.count);
  };
  fetchCount();
}, []);

  /* USER COUNT (FIXED) */
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await getUserCountAPI();
        if (res.status === 200) {
          const data = res.data;
          setUserCount(
            data.totalUsers ??
            data.totalUser ??
            data.total ??
            (Array.isArray(data.users) ? data.users.length : 0) ??
            (Array.isArray(data.data?.users) ? data.data.users.length : 0)
          );
        }
      } catch (err) {
        console.error("User count error", err);
      }
    };
    fetchUserCount();
  }, []);

  /* LATEST RENTALS */
  useEffect(() => {
    const fetchLatestBookings = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await getAllAdminBookingsAPI({
        Authorization: `Bearer ${token}`,
      });

      if (res.status === 200) {
        const payload = Array.isArray(res.data)
          ? res.data
          : res.data.bookings || [];

        setLatestBookings(
          payload
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
        );
      }
    };

    fetchLatestBookings();
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-[260px_1fr] min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <AdminSidebar />

        <div className="p-10 pb-20">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="animate-pulse" />
              <span className="font-mono text-xl">
                {currentTime.toLocaleTimeString("en-IN")}
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-8 md:grid-cols-3 mb-14">
            <div className="bg-white/10 rounded-xl p-6 flex gap-4">
              <FontAwesomeIcon icon={faBook} className="text-3xl text-blue-400" />
              <div>
                <p className="text-gray-300">Total Tools</p>
                <h2 className="text-3xl font-bold">{toolCount}</h2>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 flex gap-4">
              <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-400" />
              <div>
                <p className="text-gray-300">Total Rentals</p>
                <h2 className="text-3xl font-bold">{rentalCount}</h2>
              </div>
              
            </div>

            <div className="bg-white/10 rounded-xl p-6 flex gap-4">
              <FontAwesomeIcon icon={faUsers} className="text-3xl text-green-400" />
              <div>
                <p className="text-gray-300">Total Users</p>
                <h2 className="text-3xl font-bold">{userCount}</h2>
              </div>
            </div>
          </div>

          

          {/* LATEST RENTALS */}
          <div>
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">Latest Rentals</h2>
              <button
                onClick={() => navigate("/admin-rentals")}
                className="text-sm text-cyan-400"
              >
                View All →
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 max-h-[360px] overflow-y-auto space-y-3">
              {latestBookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white/10 rounded-lg px-4 py-3 flex justify-between"
                >
                  <div>
                    <p className="text-xs text-gray-400">#{b._id.slice(-6)}</p>
                    <p className="text-sm">{b.userId?.username}</p>
                    <p className="text-xs text-gray-400">{b.toolId?.title}</p>
                  </div>
                  <p className="text-amber-400 font-semibold">{b.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminHome;
