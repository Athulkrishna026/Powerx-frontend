import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/Footer";
import { getAllAdminBookingsAPI, markBookingReturnedAPI } from "../../services/allApis";
import { toast, ToastContainer } from "react-toastify";

const AdminRental = () => {
  const [bookings, setBookings] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

  // rental list


  const getAllBookings = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getAllAdminBookingsAPI(reqHeader);
      if (result.status === 200) {
        const payload = result.data;
        // Ensure bookings is always an array. API may return an object like { bookings: [...] }
        if (Array.isArray(payload)) setBookings(payload);
        else if (Array.isArray(payload?.bookings)) setBookings(payload.bookings);
        else setBookings([]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const handleReturn = async (id) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    toast.error("Unauthorized. Please login again.");
    return;
  }

  const reqHeader = {
    Authorization: `Bearer ${token}`
  };

  try {
    const result = await markBookingReturnedAPI(id, reqHeader);

    if (result.status === 200) {
      toast.success("✅ Tool marked as returned successfully");
      getAllBookings(); // refresh admin list
    } else {
      toast.error("❌ Failed to update booking status");
    }

  } catch (error) {
    toast.error("⚠️ Server error. Try again later.");
    console.error(error);
  }
};





  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="md:grid md:grid-cols-[260px_1fr] min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="p-10 pb-20">
          <h1 className="text-3xl font-bold mb-6 tracking-wide">
            All Rental Bookings
          </h1>

          {/* SEARCH + SORT */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by booking ID, user, tool, status..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="
                w-full md:max-w-xl p-3 rounded-xl
                bg-white/10 border border-white/20
                placeholder-gray-400 text-white
                focus:outline-none focus:ring-2 focus:ring-cyan-500
              "
            />

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="
                w-full md:w-52 p-3 rounded-xl
                bg-white/10 border border-white/20
                text-white
                focus:outline-none focus:ring-2 focus:ring-cyan-500
              "
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* BOOKINGS LIST */}
          {bookings.length === 0 ? (
            <p className="text-center text-gray-400">
              No bookings found
            </p>
          ) : (
            <div className="space-y-6">
              {bookings
                .filter((booking) => {
                  if (!searchKey) return true;
                  const key = searchKey.toLowerCase();

                  return (
                    booking._id?.toLowerCase().includes(key) ||
                    booking.userId?.username?.toLowerCase().includes(key) ||
                    booking.userId?.mob?.includes(key) ||
                    booking.toolId?.title?.toLowerCase().includes(key) ||
                    booking.status?.toLowerCase().includes(key)
                  );
                })
                .sort((a, b) => {
                  if (sortOrder === "newest") {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  } else {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  }
                })
                .map((booking) => (
                  <div
                    key={booking._id}
                    className="
                      bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-2xl p-6
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                      transition
                    "
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-cyan-400">
                        Booking ID: {booking._id}
                      </h2>
                      <span className="text-sm text-gray-400">
                        {new Date(booking.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* User */}
                      <div>
                        <h3 className="text-sm text-gray-400 mb-1">
                          User Details
                        </h3>
                        <p>Name : {booking.userId?.username}</p>
                        <p>Mobile : {booking.userId?.mob}</p>
                      </div>

                      {/* Tool */}
                      <div>
                        <h3 className="text-sm text-gray-400 mb-1">
                          Tool Details
                        </h3>
                        <p>Tool : {booking.toolId?.title}</p>

                        <p className="text-2xl font-semibold text-amber-400 mt-2">
                          Price :
                          <span className="text-3xl font-bold ml-2">
                            ₹{booking.toolId?.price}
                          </span>
                        </p>

                        <p className="text-xl font-semibold mt-3">
                          Status :
                          <span
                            className="
                              ml-3 text-2xl font-bold
                              text-green-400
                              drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]
                              animate-pulse
                            "
                          >
                            {booking.status}
                          </span>
                        </p>
                        <button
                          onClick={() => handleReturn(booking._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                          Mark as Returned
                        </button>

                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-4 text-sm text-gray-300">
                      Rental Period :
                      <span className="text-white ml-2">
                        {new Date(booking.startDate).toDateString()} →{" "}
                        {new Date(booking.endDate).toDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />

    </>
  );
};

export default AdminRental;
