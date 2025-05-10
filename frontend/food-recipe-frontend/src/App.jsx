import React, { Suspense, lazy } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from 'react-bootstrap/Spinner';

// Lazy-loaded components
const Home = lazy(() => import("./components/Home"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const SignupPage = lazy(() => import("./components/SignupPage"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const DashBoard = lazy(() => import("./components/DashBoard"));
const NotFound = lazy(() => import("./components/NotFound"));
const MyRecipes = lazy(() => import("./components/MyRecipes"));
const Favourite = lazy(() => import("./components/Favourite"));

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Suspense fallback={<div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Loading...</div>
      </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/myrecipes" element={<MyRecipes />} /> 
          <Route path="/favourite" element={<Favourite />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
