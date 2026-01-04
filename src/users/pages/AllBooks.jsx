import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { addToolBookApi, allBooksApi } from "../../services/allApis";
import { Link } from "react-router-dom";
import { searchKeyContext } from "../../context/ContextShare";
import UserHeader from "../components/UserHeader";
import { toast, ToastContainer } from "react-toastify";

const AllBooks = () => {
  const [status, setStatus] = useState(true);
  const [token, setToken] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [tempAllBooks, setTempAllBooks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { searchKey, setSearchKey } = useContext(searchKeyContext);

  const getAllBooks = async (searchKey, token) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await allBooksApi(searchKey, reqHeader);
    setAllBooks(result.data);
    setTempAllBooks(result.data);
  };

  const handleFilter = (data) => {
    if (data === "all") setAllBooks(tempAllBooks);
    else {
      setAllBooks(
        tempAllBooks.filter(
          (item) => item.category?.toLowerCase() === data.toLowerCase()
        )
      );
    }
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.warning("Please select dates");
      return;
    }

    const reqBody = {
      toolId: selectedTool._id,
      startDate,
      endDate,
    };

    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await addToolBookApi(reqBody, reqHeader);

    if (result.status === 201) {
      toast.success("Booking request sent");
      setShowModal(false);
      setSelectedTool(null);
      setStartDate("");
      setEndDate("");
    } else {
      toast.error(result.response.data);
    }
  };

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setToken(t);
    if (t) getAllBooks(searchKey, t);
  }, [searchKey]);

  return (
    <>
      {token && <UserHeader />}

      {token ? (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black px-4 py-10">

          {/* 🧊 MAIN GLASS WRAPPER */}
          <div
            className="
              max-w-7xl mx-auto
              backdrop-blur-xl bg-white/10
              border border-white/20
              rounded-3xl shadow-2xl
              p-6 md:p-12
            "
          >
            {/* TITLE */}
            <h1 className="text-white text-3xl font-bold text-center mb-10">
              Available Tools
            </h1>

            {/* SEARCH */}
            <div className="flex justify-center mb-12">
              <input
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search tools..."
                className="
                  w-72 sm:w-96 px-5 py-3 rounded-xl
                  bg-white/10 backdrop-blur-lg
                  border border-white/20
                  text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <div className="grid md:grid-cols-5 gap-8">

              {/* FILTER */}
              <div
                className="
                  md:col-span-1
                  bg-white/10 backdrop-blur-xl
                  border border-white/20
                  rounded-2xl p-6
                  text-white
                "
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Filter</h2>
                  <button
                    onClick={() => setStatus(!status)}
                    className="md:hidden"
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>

                <div className={status ? "block mt-6" : "hidden md:block mt-6"}>
                  {[
                    { id: "drill", label: "Drilling & Fastening" },
                    { id: "cut", label: "Cutting & Grinding" },
                    { id: "heavy", label: "Heavy-Duty Tools" },
                    { id: "finish", label: "Finishing Tools" },
                    { id: "all", label: "All Tools" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleFilter(item.id)}
                      className="
                        mt-3 cursor-pointer flex gap-2 items-center
                        text-gray-300 hover:text-white transition
                      "
                    >
                      <input type="radio" name="filter" />
                      <label>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOOLS GRID */}
              <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {allBooks.map((book) => (
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
                        alt="tool"
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

                    <p className="font-semibold">{book.author}</p>
                    <p className="text-gray-300 text-sm">{book.title}</p>

                    <Link to={`/view-book/${book._id}`}>
                      <button
                        className="
                          mt-3 w-full py-2 rounded-xl
                          bg-blue-500/20 border border-blue-400/30
                          text-blue-200 hover:bg-blue-500/30 transition
                        "
                      >
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedTool(book);
                        setShowModal(true);
                      }}
                      className="
                        mt-3 w-full py-2 rounded-xl
                        bg-green-500/20 border border-green-400/30
                        text-green-200 hover:bg-green-500/30 transition
                      "
                    >
                      Take Rent
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOOKING MODAL */}
          {showModal && selectedTool && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div
                className="
                  bg-slate-900 w-[90%] max-w-md
                  rounded-2xl p-6 text-white relative
                  shadow-2xl
                "
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-4 text-xl text-gray-400 hover:text-red-400"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">Book Tool</h2>

                <p className="font-semibold">{selectedTool.title}</p>
                <p className="text-sm text-gray-400 mb-4">
                  {selectedTool.author}
                </p>

                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full mb-3 px-3 py-2 rounded bg-black/40 border border-white/20"
                />

                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full mb-4 px-3 py-2 rounded bg-black/40 border border-white/20"
                />

                <button
                  onClick={handleBooking}
                  className="
                    w-full py-2 rounded-xl
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    hover:from-indigo-600 hover:to-blue-600
                  "
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-white">
          Please Login
        </div>
      )}

      {token && <Footer />}
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
};

export default AllBooks;
