import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faScrewdriverWrench,
  faShieldHalved,
  faBolt,
  faClock,
  faArrowRightLong,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { homeBooksApi } from "../../services/allApis";
import { toast, ToastContainer } from "react-toastify";
import Chatbot from "../components/Chatbot";

const Home = () => {

  const [homeTools, setHomeTools] = useState([])


  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");

    toast.success("Logout successful"); // ✅ FIX

    navigate("/");
  };


  const getHomeTools = async () => {
    const result = await homeBooksApi()
    if (result.status === 200) {
      setHomeTools(result.data)
    }
  }

  useEffect(() => {
    getHomeTools()
  }, [])



  return (
    <>
      {/* GLOBAL ANIMATIONS */}
      <style>
        {`
          .fadeIn {
            animation: fadeIn 1.2s ease-in-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }

          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      {/* 🌑 FULL PAGE BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black px-4 py-10">

        {/* 🧊 MAIN GLASS WRAPPER */}
        <div className="
          max-w-7xl mx-auto
          backdrop-blur-xl bg-white/10
          border border-white/20
          rounded-3xl shadow-2xl
          p-6 md:p-12
          fadeIn
        ">

          {/* ------------ NAVBAR ------------ */}
          <nav className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold float">
                Px
              </div>
              <h1 className="text-2xl font-bold text-white">
                Power<span className="text-blue-400">X</span>
              </h1>
            </div>

            <ul className="hidden md:flex gap-10 text-gray-300">
              <li className="idden md:block bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full ">Home</li>
              <Link to="/all-books">
                <li className="idden md:block bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full ">Tools</li>
              </Link>
              <li className="idden md:block bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full "><a href="#contact">Contact</a></li>
              <Link to="/rate-card">
                <li className="idden md:block bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full ">Rate Card</li>
              </Link>
            </ul>

            {token ? (
              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-500/80 border border-red-400
                           text-white px-5 py-2 rounded-full
                           hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="hidden md:block bg-white/10 border border-white/20
                                   text-white px-5 py-2 rounded-full
                                   hover:bg-blue-600 transition">
                  Sign In
                </button>
              </Link>
            )}

            <button className="md:hidden text-white">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </nav>

          {/* ------------ HERO ------------ */}
          <section id="hero" className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                Rent Premium Tools{" "}
                <span className="text-blue-400">Effortlessly</span>
              </h1>
              <p className="text-gray-300 mt-4">
                Access high-performance tools anytime without ownership hassles.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 mt-8 bg-blue-600 px-6 py-3 rounded-full text-white hover:bg-blue-700 transition"
              >
                Get Started <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </section>

          {/* ------------ BRANDS ------------ */}
          <section id="product" className="mb-16 backdrop-blur bg-white/10 border border-white/20 rounded-xl p-6 text-center">
            <h3 className="text-gray-200 mb-6 font-medium">
              Trusted Tool Manufacturers
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-10">
              <img
                src="data:image/png;base64,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"
                alt="Bosch"
                className="h-8 md:h-10 grayscale hover:grayscale-0 transition rounded-2xl"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Makita_Logo.svg/2560px-Makita_Logo.svg.png"
                alt="Makita"
                className="h-8 md:h-10 grayscale hover:grayscale-0 transition rounded-2xl"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/DeWalt_Logo.svg/1200px-DeWalt_Logo.svg.png"
                alt="DeWalt"
                className="h-8 md:h-10 grayscale hover:grayscale-0 transition rounded-2xl"
              />
              <img
                src="https://1000logos.net/wp-content/uploads/2017/12/Hitachi-Logo.png"
                alt="Hitachi"
                className="h-8 md:h-10 grayscale hover:grayscale-0 transition rounded-2xl"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Stanley_Hand_Tools_logo.svg/1200px-Stanley_Hand_Tools_logo.svg.png"
                alt="Stanley"
                className="h-8 md:h-10 grayscale hover:grayscale-0 transition rounded-2xl"
              />
            </div>
          </section>


          {/* ------------ AVAILABLE TOOLS SECTION ------------ */}
          {/* <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              Available Tools for Rent
            </h2>
            <p className="text-gray-400 mb-10">
              Choose from our wide range of professional tools.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tools?.length > 0 ? (
                tools.map(tool => (
                  <div
                    key={tool._id}
                    className="backdrop-blur bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition"
                  >
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="h-40 w-full object-cover rounded-xl mb-4"
                    />

                    <h3 className="text-lg font-semibold text-white">
                      {tool.name}
                    </h3>

                    <div className="mt-3 text-sm text-gray-300 space-y-1">
                      <p>💰 <span className="font-medium">₹{tool.rentPerHour}</span> / hour</p>
                      <p>📅 <span className="font-medium">₹{tool.rentPerDay}</span> / day</p>
                    </div>

                    <Link
                      to={`/tool/${tool._id}`}
                      className="inline-block mt-4 text-center w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No tools available right now.</p>
              )}
            </div>
          </section> */}
          {/* ------------ AVAILABLE TOOLS SECTION ------------ */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              Available Tools for Rent
            </h2>
            <p className="text-gray-400 mb-10">
              Premium-grade tools ready for immediate use.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {homeTools.length > 0 ? (
                homeTools.map((tool) => (
                  <div
                    key={tool._id}
                    className="backdrop-blur bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition"
                  >
                    <img
                      src={tool.imgUrl}
                      alt={tool.title}
                      className=" w-full object-cover rounded-xl mb-4"
                    />

                    <h3 className="text-lg font-semibold text-white">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-gray-300">
                      ₹{tool.price} / day
                    </p>

                    <button
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
                    >
                      Rent Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  No tools available right now
                </p>
              )}

            </div>

            <Link to="/login" className="block w-fit mx-auto pt-6">
              <button className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition">
                Login to Start Service
              </button>
            </Link>
          </section>




          {/* ------------ FEATURES ------------ */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              Why Choose PowerX?
            </h2>
            <p className="text-gray-400 mb-10">
              Premium tools. Flexible rentals.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <FeatureCard icon={faBolt} title="Industrial Quality" desc="Top-tier durable tools." />
              <FeatureCard icon={faClock} title="Flexible Durations" desc="Rent hourly, daily, weekly." />
              <FeatureCard icon={faShieldHalved} title="Damage Protection" desc="Full safety guarantee." />
              <FeatureCard icon={faScrewdriverWrench} title="100+ Tools" desc="Wide range for any task." />
            </div>
          </section>

          {/* ------------ TESTIMONIAL ------------ */}
          <section id="reviews" className="mb-20 text-center">
            <div className="max-w-3xl mx-auto backdrop-blur bg-white/10 border border-white/20 rounded-2xl p-10">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-blue-400 mb-4" />
              <p className="text-gray-200 italic">
                “A complete game changer! Renting tools from PowerX is smoother than ever.”
              </p>
              <p className="mt-4 font-semibold text-white">Rahul Menon</p>
              <p className="text-xs text-gray-400">Contract Engineer</p>
            </div>
          </section>

          {/* ------------ FEEDBACK SECTION ------------ */}
          <section id="contact" className="mb-20">
            <div className="backdrop-blur bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">

              {/* TITLE */}
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Contact & Feedback
              </h2>
              <p className="text-gray-400 text-center mb-12">
                Reach out to us or share your valuable suggestions.
              </p>

              {/* GRID */}
              <div className="grid md:grid-cols-2 gap-12">

                {/* ---------------- LEFT SIDE : CONTACT ---------------- */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Get in Touch
                  </h3>

                  <p className="text-gray-300 mb-3">
                    📍 <span className="font-medium">Kochi, Kerala</span>
                  </p>
                  <p className="text-gray-300 mb-3">
                    📞 <span className="font-medium">+91 98765 43210</span>
                  </p>
                  <p className="text-gray-300 mb-6">
                    📧 <span className="font-medium">support@powerx.com</span>
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    For tool rentals, partnerships, or support, feel free to contact us.
                    Our team usually responds within 24 hours.
                  </p>

                  {/* CONTACT FORM */}

                </div>

                {/* ---------------- RIGHT SIDE : FEEDBACK ---------------- */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Suggestions & Feedback
                  </h3>



                  <form className="space-y-5">
                    {/* Subject */}
                    <div>
                      <label className="block text-white/70 text-sm mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Brief title of your feedback"
                        className="w-full px-4 py-3 rounded-xl
                   bg-white/10 text-white placeholder-white/40
                   border border-white/20 outline-none
                   focus:border-indigo-500"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-white/70 text-sm mb-1">
                        Category
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl
                   bg-white/10 text-white
                   border border-white/20 outline-none
                   focus:border-indigo-500"
                      >
                        <option className="bg-slate-900">General Feedback</option>
                        <option className="bg-slate-900">Bug / Issue</option>
                        <option className="bg-slate-900">Feature Request</option>
                        <option className="bg-slate-900">Tool Suggestion</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white/70 text-sm mb-1">
                        Message
                      </label>
                      <textarea
                        rows="4"
                        placeholder="Write your feedback here..."
                        className="w-full px-4 py-3 rounded-xl
                   bg-white/10 text-white placeholder-white/40
                   border border-white/20 outline-none
                   focus:border-indigo-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl font-semibold text-white
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:scale-105 transition shadow-lg"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </div>


              </div>
            </div>
          </section>



        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Chatbot />

    </>
  );
};

/* ------------ SUB COMPONENTS ------------ */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="backdrop-blur bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition">
    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-4">
      <FontAwesomeIcon icon={icon} />
    </div>
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="text-sm text-gray-300 mt-1">{desc}</p>
  </div>
);

export default Home;
