import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";

import Home from "./pages/Home";
import Index from "./pages/pools/Index";
import Create from "./pages/pools/Create";
import Show from "./pages/pools/Show";
import Edit from "./pages/pools/Edit";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pools" element={<Index />} />
        <Route path="/pools/new" element={<Create />} />
        <Route path="/pools/:id" element={<Show />} />
        <Route path="/pools/:id/edit" element={<Edit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
