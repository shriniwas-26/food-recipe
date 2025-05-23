import React, { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./components/Navbar/NavigationBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { PrivateRoute } from "./components/PrivateRoute";
import MyRecipeItems from "./components/MyRecipes/myRecipeItems";

// Lazy-loaded pages
const Home = lazy(() => import("./components/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const EditFoodRecipe = lazy(() => import("./components/editRecipeForm"));
const NotFound = lazy(() => import("./components/NotFound"));
const MyRecipes = lazy(() => import("./components/MyRecipes/MyRecipes"));
const Favourite = lazy(() => import("./components/Favourite"));
const AddFoodRecipe = lazy(() => import("./pages/AddFoodRecipe"));
const RecipeInfo = lazy(() => import("./pages/RecipeInfo"));

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Suspense
        fallback={
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
            <div className="mt-3">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/recipeDetails/:id" element={<RecipeInfo />} />
          <Route element={<PrivateRoute />}>
            <Route path="/editRecipe/:id" element={<EditFoodRecipe />} />
            
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path="/addRecipe" element={<AddFoodRecipe />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
