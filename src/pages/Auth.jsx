import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { googleLoginApi, loginApi, registerApi } from "../services/allApis";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Auth = ({ register }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    mob: "",
    aadhar: "",
  });

  const nav = useNavigate();

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    const { username, email, password, address, mob, aadhar } = userDetails;

    if (!username || !email || !password || !address || !mob || !aadhar) {
      toast.info("Please fill the form completely");
      return;
    }

    try {
      const result = await registerApi(userDetails);

      if (result.status === 200) {
        toast.success("Registration successful");
        setUserDetails({
          username: "",
          email: "",
          password: "",
          address: "",
          mob: "",
          aadhar: "",
        });
        nav("/login");
      } else {
        toast.warning(result.response?.data || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const { email, password } = userDetails;

    if (!email || !password) {
      toast.info("Please fill the form");
      return;
    }

    try {
      const result = await loginApi({ email, password });

      if (result.status === 200) {
        toast.success("Login successful");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        setTimeout(() => {
          if (result.data.existingUser.email === "admin") {
            nav("/admin-home");
          } else {
            nav("/user-home");
          }
        }, 2000);
      }
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);

    try {
      const result = await googleLoginApi({
        username: details.name,
        email: details.email,
        password: "Googlepass123",
        photo: details.picture,
      });

      if (result.status === 200) {
        toast.success("Login successful");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        setTimeout(() => {
          nav("/user-home");
        }, 2000);
      }
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl px-8 py-10">

        {/* HEADER */}
        <h2 className="text-center text-3xl font-semibold text-white mb-2">
          Welcome to Power<span className="text-blue-500">X</span>
        </h2>
        <h3 className="text-center text-xl text-gray-300 mb-6">
          {register ? "Create Account" : "Login"}
        </h3>

        {/* USERNAME (REGISTER ONLY) */}
        {register && (
          <input
            type="text"
            placeholder="Username"
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EXTRA FIELDS (REGISTER ONLY) */}
        {register && (
          <>
            <input
              type="text"
              placeholder="Address"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Mobile"
              value={userDetails.mob}
              onChange={(e) =>
                setUserDetails({ ...userDetails, mob: e.target.value })
              }
              className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Aadhar"
              value={userDetails.aadhar}
              onChange={(e) =>
                setUserDetails({ ...userDetails, aadhar: e.target.value })
              }
              className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <button
          onClick={register ? handleRegister : handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-lg font-semibold transition"
        >
          {register ? "Register" : "Login"}
        </button>

        {/* GOOGLE LOGIN (LOGIN ONLY) */}
        {!register && (
          <>
            <p className="text-center text-gray-300 my-4">OR</p>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google Login Failed")}
              />
            </div>
          </>
        )}

        {/* SWITCH LINK */}
        <p className="text-center text-gray-300 mt-6">
          {register ? "Already have an account? " : "New user? "}
          <Link
            to={register ? "/login" : "/register"}
            className="text-blue-400"
          >
            {register ? "Login" : "Register"}
          </Link>
        </p>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
};

export default Auth;
