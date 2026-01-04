import React from "react";
import { Link } from "react-router-dom";

const AdminHead = () => {
    return (
        <nav className="w-full px-6 py-4 bg-gradient-to-r from-black via-slate-900 to-black">
            <div className="max-w-7xl mx-auto flex items-center justify-between pt-3 pb-3">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        Px
                    </div>
                </div>

                {/* Center Navigation */}
                <div className="hidden md:flex gap-6">
                    <Link
                        to="/"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/user-home"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/all-books"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        All Tools
                    </Link>

                    
                </div>

                {/* Right Action */}
                <div className="flex gap-2">
                    <Link
                        to="/login"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        Logout
                    </Link>
                    <Link to="/profile">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              className="w-10 h-10 rounded-full border border-white/30 cursor-pointer hover:scale-105 transition"
              alt="Profile"
            />
          </Link>

                </div>


            </div>
        </nav>
    );
};

export default AdminHead;
