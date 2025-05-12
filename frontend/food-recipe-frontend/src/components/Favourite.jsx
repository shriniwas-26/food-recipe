import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";

function Favourite() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes/favourites");
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const handleRemoveFavourite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/favourites/${id}`);
      setFavourites(favourites.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return (
    <div className="favourites">
      <h2>Favourite Recipes</h2>
      <div className="recipe-list">
        {favourites.length === 0 ? (
          <p>No favourites found.</p>
        ) : (
          favourites.map((recipe) => (
            <RecipeItem
              key={recipe._id}
              item={recipe}
              isFavourite={true}
              onRemoveFavourite={handleRemoveFavourite}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Favourite;
