import React, { useState } from "react";
import { toast } from "react-toastify";
import { addFeedbackAPI } from "../../services/allApis";
import UserHeader from "../components/UserHeader";
import Footer from "../../components/Footer";

const UserFeedback = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!message) {
      toast.info("Please share your experience");
      return;
    }

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await addFeedbackAPI({ rating, message }, reqHeader);

    if (result.status === 201) {
      toast.success("Thank you for your feedback ❤️");
      setMessage("");
      setRating(5);
    }
  };

  return (
    <>
    <UserHeader />

      {/* 🔮 Animations */}
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
        `}
      </style>

      {/* 🌑 PAGE BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black px-4 py-10">

        {/* 🧊 MAIN GLASS WRAPPER */}
        <div
          className="
            max-w-7xl mx-auto
            backdrop-blur-xl bg-white/10
            border border-white/20
            rounded-3xl shadow-2xl
            p-6 md:p-12
            fadeIn
          "
        >
          {/* 🔵 Floating Icon */}
          <div className="flex justify-center mb-8">
            <div
              className="
                w-10 h-10 rounded-xl
                bg-gradient-to-br from-blue-600 to-indigo-600
                flex items-center justify-center
                text-white font-bold
                float shadow-lg
              "
            >
              Px
            </div>
          </div>

          {/* 📢 Title */}
          <h2 className="text-3xl font-semibold text-white text-center mb-2">
            Feedback & Suggestions
          </h2>

          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">
            Your feedback helps us improve PowerX services and provide
            better rental experiences.
          </p>

          {/* 📝 FORM */}
          <div className="max-w-xl mx-auto space-y-6">

            {/* ⭐ Rating */}
            <div>
              <label className="text-white text-sm mb-2 block">
                Rating
              </label>
              <select
                className="
                  w-full p-3 rounded-xl
                  bg-white/10 text-white
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option className="text-black" value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option className="text-black" value="4">⭐⭐⭐⭐ Good</option>
                <option className="text-black" value="3">⭐⭐⭐ Average</option>
                <option className="text-black" value="2">⭐⭐ Poor</option>
                <option className="text-black" value="1">⭐ Very Bad</option>
              </select>
            </div>

            {/* 💬 Message */}
            <div>
              <label className="text-white text-sm mb-2 block">
                Your Experience
              </label>
              <textarea
                rows="4"
                className="
                  w-full p-4 rounded-xl
                  bg-white/10 text-white
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
                placeholder="Share your experience with PowerX..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* 🚀 Submit */}
            <button
              onClick={handleSubmit}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-indigo-600 hover:to-blue-600
                text-white font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-blue-500/40
              "
            >
              Submit Feedback
            </button>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserFeedback;
