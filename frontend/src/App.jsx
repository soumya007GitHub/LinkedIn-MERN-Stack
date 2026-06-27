import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { UserDataContext } from './context/userContext';

const App = () => {
  const { user, setUser } = useContext(UserDataContext);
  return (
    <Routes>
      <Route path="/" element={user == null ? <Navigate to="/login" /> :<Home />} />
      <Route path="/login" element={user != null ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user != null ? <Navigate to="/" /> : <Register />} />
    </Routes>
  )
}

export default App