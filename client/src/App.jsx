import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Index from "./pages/pools/Index";
import Create from "./pages/pools/Create";
import Show from "./pages/pools/Show";
import Edit from "./pages/pools/Edit";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("guest_session_id") !== null);
  }, []);

  const handleLogin = () => {
    console.log("User logged in");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("guest_session_id");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pools"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pools/new"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pools/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Show />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pools/:id/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
