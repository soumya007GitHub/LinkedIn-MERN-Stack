import React from 'react';
import { IoMdSearch, IoMdHome, IoMdPeople, IoIosNotifications } from "react-icons/io";
import linkedinLogo from "../assets/linkedin.webp";
import profileImg from "../assets/profile.png";

const Navbar = () => {
    return (
        <div className='w-full h-[80px] flex justify-around items-center ps-10 pr-0 md:px-10 shadow-lg shadow-gray-300'>
            <div className='flex justify-start items-center w-full gap-5'>
                <img src={linkedinLogo} alt="Linkedin Logo" className='w-[50px] h-[50px]' />
                <form method="post" action="" className='border-2 ps-2 px-10 py-2 w-[60%] bg-gray-200 lg:flex justify-center items-center rounded-lg'>
                    <button type="submit"><IoMdSearch /></button>
                    <input type="text" name="name" id="name" placeholder="search user" required className='lg:inline outline-none ms-1 w-full bg-gray-200 hidden' />
                </form>
            </div>
            <div className='flex justify-around items-center w-full'>
                <div className='lg:flex justify-center items-center flex-col text-xl text-gray-700 hidden'><span><IoMdHome /></span><span>Home</span></div>
                <div className='lg:flex justify-center items-center flex-col text-xl text-gray-700 hidden'><span><IoMdPeople /></span><span>My Networks</span></div>
                <div className='md:flex justify-center items-center flex-col text-xl text-gray-700 hidden'><span><IoIosNotifications /></span><span>Notifications</span></div>
                <img src={profileImg} alt="profile image" className='w-[40px] h-[40px] rounded-3xl' />
            </div>
        </div>
    )
}

export default Navbar