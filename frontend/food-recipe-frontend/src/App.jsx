import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

// Page components (direct imports)
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import DashBoard from "./components/DashBoard";
import NotFound from "./components/NotFound";
import MyRecipes from "./components/MyRecipes";
import Favourite from "./components/Favourite";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import RecipeInfo from "./pages/RecipeInfo";

// Spinner Wrapper Component
function PageLoaderWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate page loading

    return () => clearTimeout(timeout);
  }, [location]);

  return loading ? (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
      <div className="mt-3">Loading...</div>
    </div>
  ) : (
    children
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <PageLoaderWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="recipeDetails/:id" element={<RecipeInfo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/addRecipe" element={<AddFoodRecipe />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLoaderWrapper>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
