import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { markUserPaymentDoneAPI } from "../../services/allApis";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const bookingId = params.get("bookingId");
    const token = sessionStorage.getItem("token");

    if (bookingId && token) {
      markUserPaymentDoneAPI(bookingId, {
        Authorization: `Bearer ${token}`
      });
    }

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/user-home");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black
                    flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-3xl shadow-2xl p-8
                      text-center text-white">

        {/* Icon */}
        <div className="text-6xl mb-4">✅</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          Payment Successful
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-sm mb-6">
          Your payment has been processed successfully.
          The tool has been booked and added to your rentals.
        </p>

        {/* Redirect Info */}
        <p className="text-gray-400 text-xs mb-6">
          You’ll be redirected to your dashboard shortly…
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/user-home")}
          className="px-8 py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:scale-105 transition shadow-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
