import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";
import { getMyRentalsAPI } from "../../services/allApis";
import Chatbot from "../components/Chatbot";
import { createUserStripeSessionAPI } from "../../services/allApis";
import { toast } from "react-toastify";


const UserHome = () => {

  const [activeRentals, setActiveRentals] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastRental, setLastRental] = useState(null);

  const handleUserPayment = async (bookingId) => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await createUserStripeSessionAPI(bookingId, reqHeader);

      if (result.status === 200 && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        toast.error("Failed to start payment");
      }
    } catch (err) {
      toast.error("Payment error");
    }
  };


  useEffect(() => {
    const fetchRentals = async () => {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getMyRentalsAPI(reqHeader);

      if (result.status === 200) {
        const bookings = result.data;
        const active = bookings.filter(
          (b) => b.status !== "Cancelled" && b.status !== "Payment Done"
        );

        const past = bookings.filter((b) => b.status === "Payment Done");

        setActiveRentals(active);
        setHistory(past);
        setLastRental(bookings.length > 0 ? bookings[0] : null);
      }
    };

    fetchRentals();
  }, []);

  return (
    <>
      <UserHeader />

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black px-4 py-10 flex justify-center">
        <div className="w-full max-w-5xl text-white">

          {/* REQUEST TOOL */}
          <div className="mb-10">
            <Link
              to="/all-books"
              className="px-10 py-4 text-lg font-semibold rounded-2xl
                         bg-blue-500/30 border border-blue-400/40 text-blue-100"
            >
              + Request for Tool
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">My Rentals</h1>

          {lastRental && lastRental.toolId && (
            <div className="mb-6 p-6 bg-gradient-to-r from-indigo-700 to-purple-600 rounded-2xl shadow-lg">
              <Link to={`/view-book/${lastRental.toolId._id}`} className="flex items-center gap-4 text-white">
                <img
                  src={lastRental.toolId.imgUrl || lastRental.toolId.uploadImg?.[0] || ''}
                  alt={lastRental.toolId.title}
                  className="w-20 h-20 object-cover rounded-xl border border-white/20"
                />
                <div>
                  <div className="text-lg font-semibold">{lastRental.toolId.title}</div>
                  <div className="text-sm text-white/80">{new Date(lastRental.startDate).toLocaleDateString()} → {new Date(lastRental.endDate).toLocaleDateString()}</div>
                </div>
                <div className="ml-auto text-white/90 font-semibold">₹{lastRental.totalAmount}</div>
              </Link>
            </div>
          )}

          {/* ACTIVE RENTALS */}
          <h2 className="text-xl text-gray-300 mb-4">
            Current Active Rentals
          </h2>

          <div className="space-y-6">
            {activeRentals.length > 0 ? (
              activeRentals.map((rental) => (
                <div
                  key={rental._id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20
                             rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold">
                    {rental.toolId?.title}
                  </h3><br />

                  <div
                    key={rental._id}
                    className="relative bg-white/10 backdrop-blur-xl
             border border-white/20 rounded-2xl p-6"
                  >
                    {/* STATUS BADGE */}
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold
      rounded-full
      ${rental.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/40"
                          : rental.status === "Approved"
                            ? "bg-green-500/20 text-green-300 border border-green-400/40"
                            : rental.status === "Returned"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                              : rental.status === "Cancelled"
                                ? "bg-red-500/20 text-red-300 border border-red-400/40"
                                : "bg-indigo-500/20 text-indigo-300 border border-indigo-400/40"
                        }
    `}
                    >
                      {rental.status}
                    </span>

                    

                    <p className="text-gray-300 text-sm mt-2">
                      Return Date: {new Date(rental.endDate).toLocaleDateString()}
                    </p>

                    <p className="text-gray-300 text-sm">
                      Total: ₹{rental.totalAmount}
                    </p>
                    {rental.status === "Returned" && (
  <button
    onClick={() => handleUserPayment(rental._id)}
    className="mt-4 px-5 py-2 bg-indigo-600
               hover:bg-indigo-700 rounded-xl text-white"
  >
    <span className="text-yellow-200">Pay Now</span> ₹{rental.totalAmount}
  </button>
)}

                  </div>




                </div>
              ))
            ) : (
              <p className="text-gray-400">No active rentals</p>
            )}
          </div>

          {/* HISTORY */}
          <h2 className="text-xl text-gray-300 mt-12 mb-4">
            Past Rental History
          </h2>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-300 text-sm">
                  <th>Tool</th>
                  <th>Period</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item._id} className="border-t border-white/10">
                    <td>{item.toolId?.title}</td>
                    <td>
                      {new Date(item.startDate).toLocaleDateString()} →{" "}
                      {new Date(item.endDate).toLocaleDateString()}
                    </td>
                    <td>₹{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {history.length === 0 && (
              <p className="text-gray-400 mt-3">No rental history</p>
            )}
          </div>

        </div>
      </div>
      <Chatbot />
    </>
  );
};

export default UserHome;
