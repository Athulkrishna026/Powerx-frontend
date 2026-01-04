import React from "react";
import {
    faTools,
    faUser,
    faChartLine,
    faGear,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

const UserSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "My Rentals", icon: faUser, link: "/user-home" },
        { name: "Account Settings", icon: faGear, link: "/user-setting" },
        { name: "Give Feedback", icon: faChartLine, link: "/user-feedback" },
    ];

    return (
        <div className="w-76 h-screen bg-[#0f0f0f] text-gray-300 p-6 flex flex-col gap-6">

            {/* LOGO */}
            <h1 className="text-xl text-center font-semibold text-white">
                User
            </h1>

            {/* LOGOUT BUTTON — moved to top */}
            <div
                onClick={() => navigate("/")}
                className="bg-green-500 hover:bg-red-500 text-white flex items-center justify-center gap-2 py-2 rounded-lg cursor-pointer"
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="font-medium">Logout</span>
            </div>

            {/* MENU TITLE */}
            <h3 className="text-gray-500 text-xs font-semibold mt-4">
                OPERATIONS
            </h3>

            {/* MENU ITEMS */}
            <div className="flex flex-col gap-1">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.link;

                    return (
                        <div
                            key={index}
                            onClick={() => navigate(item.link)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition
                ${isActive ? "bg-green-500 text-white" : "hover:bg-gray-800"}
              `}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default UserSidebar;
