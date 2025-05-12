import React, { useEffect, useState } from "react";
import {
  getAllRecipesFromApi,
  deleteRecipeFromApi,
} from "../services/recipeService";
import MyRecipeItems from "./myRecipeItems";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const RECIPES_PER_PAGE = 5;

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("asc"); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1);

  const getMyRecipes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        toast.error("User not found. Please log in again.");
        return;
      }

      const allRecipes = await getAllRecipesFromApi();
      const userRecipes = allRecipes.filter(
        (item) => item.createdBy === user._id
      );
      setMyRecipes(userRecipes);
    } catch (error) {
      toast.error("Failed to fetch your recipes.");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await deleteRecipeFromApi(id);
      if (response.status === 200) {
        toast.success("Recipe deleted successfully");
        setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
        let likeItem = JSON.parse(localStorage.getItem("likes")) || [];
        if (Array.isArray(likeItem)) {
          const updatedLikes = likeItem.filter((item) => item !== id);
          localStorage.setItem("likes", JSON.stringify(updatedLikes));
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  };

  useEffect(() => {
    getMyRecipes();
  }, []);

  // Filter, Sort, and Paginate
  const filteredRecipes = myRecipes
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortBy === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const currentRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + RECIPES_PER_PAGE
  );

  return (
    <div className="container mt-5">
      <h2>My Recipes</h2>
      <p>This is where your saved recipes will appear.</p>

      {/* Search and Sort Controls */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="form-select w-25"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="asc">Sort by Name: A-Z</option>
          <option value="desc">Sort by Name: Z-A</option>
        </select>
      </div>

      {/* Recipe List */}

      {currentRecipes.length === 0 ? (
        <p className="text-muted">No matching recipes found.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
          {currentRecipes.map((item) => (
            <MyRecipeItems
              key={item._id}
              item={item}
              deleteRecipe={deleteRecipe}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn me-2 ${
                currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
