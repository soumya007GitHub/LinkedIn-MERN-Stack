import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from '../context/authContext';

const Register = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { serverURL } = useContext(AuthDataContext);
  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${serverURL}/api/auth/register`, {
        firstName: fName,
        lastName: lName,
        userName: username,
        email: email,
        password: password
      }, { withCredentials: true });
      setFName('');
      setLName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.message);
    }
    setLoading(false);
  }
  return (
    <div className='w-full h-full min-h-screen flex items-center flex-col px-5 md:px-10 py-5 gap-5 md:gap-1'>
      <div className='w-full'>
        <img src="/logo.svg" alt="Linkedin Logo" className='w-1/5 md:w-1/12' />
      </div>
      <div className='shadow-lg rounded md:rounded-lg w-[90%] md:w-1/2 lg:w-2/5 p-6 border border-gray-300 bg-white my-auto md:my-10'>
        <h2 className='text-2xl font-semibold mb-6'>Sign Up</h2>

        <form method="post" action="" className='flex flex-col gap-4' onSubmit={signUp}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='fName' className='text-sm font-medium text-gray-700'>First Name</label>
            <input
              type="text"
              name="fName"
              id="fName"
              value={fName}
              className='border w-full border-gray-500 bg-transparent rounded-md p-2 hover:border-gray-800 focus:border-gray-800 hover-within:border-2 focus-within:border-2 outline-none'
              autoComplete="one-time-code"
              required
              onChange={(e) => setFName(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='lName' className='text-sm font-medium text-gray-700'>Last Name</label>
            <input
              type="text"
              name="lName"
              id="lName"
              value={lName}
              className='border w-full border-gray-500 bg-transparent rounded-md p-2 hover:border-gray-800 focus:border-gray-800 hover-within:border-2 focus-within:border-2 outline-none'
              autoComplete="one-time-code"
              required
              onChange={(e) => setLName(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='username' className='text-sm font-medium text-gray-700'>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              className='border w-full border-gray-500 bg-transparent rounded-md p-2 hover:border-gray-800 focus:border-gray-800 hover-within:border-2 focus-within:border-2 outline-none'
              autoComplete="one-time-code"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              className='border w-full border-gray-500 bg-transparent rounded-md p-2 hover:border-gray-800 focus:border-gray-800 hover-within:border-2 focus-within:border-2 outline-none'
              autoComplete="one-time-code"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='text-sm font-medium text-gray-700'>Password</label>
            <div className='flex justify-center items-center gap-1 border border-gray-500 pr-3 rounded-md hover:border-gray-800 focus:border-gray-800 hover-within:border-2 focus-within:border-2'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                className='w-full outline-none bg-transparent p-2'
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none'
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {
            error.length > 0 && <p className='text-center text-red-600'>{error}</p>
          }
          <button
            type="submit"
            className='flex justify-center items-center text-center w-full bg-sky-600 hover:bg-sky-700 text-white mt-4 p-3 rounded-3xl font-medium transition-colors'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p className='text-center'>Already have account? <span className='text-blue-500 hover:underline'
            onClick={() => navigate("/login")}
          >Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default Register;