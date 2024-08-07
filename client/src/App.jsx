import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Index from "./pages/pools/Index";
import Create from "./pages/pools/Create";
import Show from "./pages/pools/Show";
import Edit from "./pages/pools/Edit";
import Login from "./pages/Login";
import Staff from "./pages/Staff/";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Swal from "sweetalert2";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoggedIn(data.valid);
          if (!data.valid) {
            localStorage.removeItem("token");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Successfully logged in.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Successfully logged out.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
