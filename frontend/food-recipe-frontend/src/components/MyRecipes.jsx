import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi, deleteRecipeFromApi } from "../services/recipeService";
import MyRecipeItems from "./myRecipeItems";
import { toast } from "react-toastify";
import { Container, Button, Modal, Form } from "react-bootstrap";
import Footer from "../components/Footer";

const RECIPES_PER_PAGE = 5;

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const getMyRecipes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        toast.error("User not found. Please log in again.");
        return;
      }
      const allRecipes = await getAllRecipesFromApi();
      const userRecipes = allRecipes.filter(item => item.createdBy === user._id);
      setMyRecipes(userRecipes);
    } catch (error) {
      toast.error("Failed to fetch your recipes.");
    }
  };

  useEffect(() => {
    getMyRecipes();
  }, []);

  const closeDialog = () => {
    setDialogVisibility(false);
  };

  const handleRecipeDelete = async () => {
    try {
      const response = await deleteRecipeFromApi(selectedRecipeId);
      if (response.status === 200) {
        toast.success("Recipe deleted successfully");
        setMyRecipes(prev => prev.filter(recipe => recipe._id !== selectedRecipeId));
        closeDialog();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  };

  const filteredRecipes = myRecipes
    .filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  return (
    <Container className="mt-5">
      <h2>My Recipes</h2>
      <p>This is where your saved recipes will appear.</p>

      {/* Search and Sort */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          className="w-50 me-2"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Form.Select
          className="w-25"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="asc">Sort by Name: A-Z</option>
          <option value="desc">Sort by Name: Z-A</option>
        </Form.Select>
      </div>

      {/* Recipe List */}
      
      {currentRecipes.length === 0 ? (
        <p className="text-muted">No matching recipes found.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
          {currentRecipes.map(item => (
            <MyRecipeItems
              key={item._id}
              item={item}
              deleteRecipe={() => {
                setSelectedRecipeId(item._id);
                setDialogVisibility(true);
              }}
            />
          ))}
        </div>
      )}
      

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              variant={currentPage === idx + 1 ? "primary" : "outline-primary"}
              className="me-2"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={dialogVisibility} onHide={closeDialog} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleRecipeDelete}>
            Yes
          </Button>
          <Button variant="danger" onClick={closeDialog}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyRecipes;
