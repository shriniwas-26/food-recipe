// src/App.jsx

import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import NotFound from "./components/NotFound";
import { NavigationBar } from "./components/NavigationBar";  // Named import
import { ToastContainer } from "react-toastify";
import { RenderNavigationBar } from "./components/RenderNavigationBar";


function App() {
  return (
    <BrowserRouter>
      <RenderNavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
