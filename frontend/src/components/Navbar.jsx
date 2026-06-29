import React, { useContext, useState } from "react";
import {
    IoMdSearch,
    IoMdHome,
    IoMdPeople,
    IoIosNotifications,
} from "react-icons/io";

import linkedinLogo from "../assets/linkedin.webp";
import profileImg from "../assets/profile.png";
import { UserDataContext } from "../context/userContext";
import { AuthDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const { user, setUser } = useContext(UserDataContext);
    const { serverURL } = useContext(AuthDataContext);
    const navigate = useNavigate();

    const logout = async () => {
        console.log("Logout btn clicked");
        try {
            const response = await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true });
            console.log(response.data);
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <nav className="w-full h-16 bg-white px-4 md:px-10 flex items-center justify-between shadow-md shadow-gray-300">

            {/* Left */}
            <div className="flex items-center gap-3">

                <img
                    src={linkedinLogo}
                    alt="LinkedIn"
                    className="w-10 h-10 md:w-12 md:h-12"
                />

                {/* Desktop Search */}
                <form className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 w-80">
                    <IoMdSearch className="text-xl text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 bg-transparent outline-none w-full"
                    />
                </form>

                {/* Mobile Search */}
                <div className="md:hidden flex items-center">

                    {!showSearchBar ? (
                        <button
                            onClick={() => setShowSearchBar(true)}
                            className="text-2xl"
                        >
                            <IoMdSearch />
                        </button>
                    ) : (
                        <form className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                            <IoMdSearch className="text-xl text-gray-500" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search"
                                className="bg-transparent outline-none ml-2 w-36"
                            />
                            <button
                                type="button"
                                className="ml-2 text-sm"
                                onClick={() => setShowSearchBar(false)}
                            >
                                ✕
                            </button>
                        </form>
                    )}

                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6 relative">

                <div className="hidden lg:flex flex-col items-center text-gray-700 cursor-pointer">
                    <IoMdHome className="text-2xl" />
                    <span className="text-xs">Home</span>
                </div>

                <div className="hidden lg:flex flex-col items-center text-gray-700 cursor-pointer">
                    <IoMdPeople className="text-2xl" />
                    <span className="text-xs">My Network</span>
                </div>

                <div className="flex flex-col items-center text-gray-700 cursor-pointer">
                    <IoIosNotifications className="text-2xl" />
                    <span className="hidden md:block text-xs">
                        Notifications
                    </span>
                </div>

                <img
                    src={profileImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setShowOptions(!showOptions)}
                />

                {/* Options Section */}
                {showOptions &&
                    <div className="w-[200px] min-h-[200px] flex justify-around items-center flex-col absolute top-[70px] right-[10px] bg-gray-200 rounded-md shadow-md shadow-gray-300 p-2">
                        <h3 className="">{user.firstName + " " + user.lastName}</h3>
                        <hr className="border-1 border-gray-300 w-[90%]" />
                        <a href="/profile" className="">Profile</a>
                        <button className="border-2 border-sky-700 w-full p-2 rounded-3xl" onClick={logout}>Logout</button>
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;